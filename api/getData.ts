import puppeteer, { Browser } from "puppeteer"
import { ScrapingParams, Currency } from './Types.ts'

export async function getCurrencyRate(params: ScrapingParams): Promise<string> {
    const { baseCurrency, targetCurrency, URLprovider } = params

    if (!baseCurrency || !targetCurrency) {
        throw new Error('Moeda não encontrada.')
    }

    if (!URLprovider) {
        throw new Error('Provedor de dados não encontrado.')
    }

    const browser: Browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()

    // Acessa a página do provedor
    await page.goto(URLprovider, { waitUntil: 'domcontentloaded' })

    let currencyValue: string | null = null

    try {
        // Verifica se estamos acessando o Google Finance
        if (URLprovider.includes('google')) {
            await page.waitForSelector('.YMlKec.fxKbKc')
            const currencyElement = await page.$('.YMlKec.fxKbKc')
            currencyValue = currencyElement
                ? await page.evaluate(el => el.textContent?.trim() ?? null, currencyElement)
                : null

        // Verifica se estamos acessando o Wise
        } else if (URLprovider.includes('wise')) {
            await page.waitForSelector('#target-input')
            const currencyElement = await page.$('#target-input')
            currencyValue = currencyElement
                ? await page.evaluate(el => el.getAttribute('value'), currencyElement)
                : null
        }

        // Fallback: Captura o HTML completo caso o seletor falhe
        if (!currencyValue) {
            const pageContent = await page.content()
            console.log("Conteúdo da página carregada:", pageContent)
        }
    } catch (error) {
        console.error("Erro ao buscar o valor da moeda:", error)
    }

    await browser.close()

    // Verifica se currencyValue foi capturado corretamente
    if (!currencyValue) {
        throw new Error("Não foi possível encontrar o valor da moeda.")
    }

    return currencyValue
}
