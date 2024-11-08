import { Router } from "express"
import { getCurrencyRate } from "./getData"
import { Currencies } from "./Currencies"
import currencyDataProvider from './currencyDataProvider'

const router = Router();



router.get("/", async (req, res) => {

    try {
        const dolarURL = currencyDataProvider(Currencies.BRL.code, Currencies.USD.code)
        const dolarScrapingParams = {
            baseCurrency: Currencies.BRL.code,
            targetCurrency: Currencies.USD.code,
            URLprovider: dolarURL.google
        }
        const newZelandDolarURL = currencyDataProvider(Currencies.BRL.code, Currencies.NZD.code)
        const newZelandDolarScrapingParams = {
            baseCurrency: Currencies.BRL.code,
            targetCurrency: Currencies.USD.code,
            URLprovider: newZelandDolarURL.google
        }

        const australianDolarURL = currencyDataProvider(Currencies.BRL.code, Currencies.AUD.code)
        const australianDolarScrapingParams = {
            baseCurrency: Currencies.BRL.code,
            targetCurrency: Currencies.AUD.code,
            URLprovider: australianDolarURL.google
        }

        const canadianDolarURL = currencyDataProvider(Currencies.BRL.code, Currencies.CAD.code)
        const canadianDolarScrapingParams = {
            baseCurrency: Currencies.BRL.code,
            targetCurrency: Currencies.CAD.code,
            URLprovider: canadianDolarURL.google
        }

        const euroURL = currencyDataProvider(Currencies.BRL.code, Currencies.EUR.code)
        const euroScrapingParams = {
            baseCurrency: Currencies.BRL.code,
            targetCurrency: Currencies.EUR.code,
            URLprovider: euroURL.google
        }
        const britishPoundURL = currencyDataProvider(Currencies.BRL.code, Currencies.GBP.code)
        const britishPoundScrapingParams = {
            baseCurrency: Currencies.BRL.code,
            targetCurrency: Currencies.GBP.code,
            URLprovider: britishPoundURL.google
        }

        const japaneseYenURL = currencyDataProvider(Currencies.BRL.code, Currencies.JPY.code)
        const japaneseYenScrapingParams = {
            baseCurrency: Currencies.BRL.code,
            targetCurrency: Currencies.JPY.code,
            URLprovider: japaneseYenURL.google
        }

        const dolarToReal = await getCurrencyRate(dolarScrapingParams)
        const newZelandDolarToReal = await getCurrencyRate(newZelandDolarScrapingParams)
        const australianDolarToReal = await getCurrencyRate(australianDolarScrapingParams)
        const canadianDolarToReal = await getCurrencyRate(canadianDolarScrapingParams)
        const euroToReal = await getCurrencyRate(euroScrapingParams)
        const britishPoundToReal = await getCurrencyRate(britishPoundScrapingParams)
        const japaneseYenToReal = await getCurrencyRate(japaneseYenScrapingParams)
        

        res.status(200).json({
            message: "Bem-vindo à API de Moedas!",
            "Currency Base": "BRL",
            "United States Dollar": {
                code: `${Currencies.USD.code}`,
                rate: `R\$${dolarToReal}`
            },
            "New Zealand Dollar": {
                code: `${Currencies.NZD.code}`,
                rate: `R\$${newZelandDolarToReal}`
            },
            "Australian Dollar": {
                code: `${Currencies.AUD.code}`,
                rate: `R\$${australianDolarToReal}`
            },
            "Canadian Dollar": {
                code: `${Currencies.CAD.code}`,
                rate: `R\$${canadianDolarToReal}`
            },
            "Euro": {
                code: `${Currencies.EUR.code}`,
                rate: `R\$${euroToReal}`
            },
            "British Pound": {
                code: `${Currencies.GBP.code}`,
                rate: `R\$${britishPoundToReal}`
            },
            "Japanese Yen": {
                code: `${Currencies.JPY.code}`,
                rate: `R\$${japaneseYenToReal}`
            }
            });

    }   catch(error){
        res.status(400).json({
            message: "Bad Request",
            error: error
            });
    }

});

router.get("/dolar", async (req, res) => {
    try {
        const dolarURL = currencyDataProvider(Currencies.BRL.code, Currencies.USD.code)
        const dolarScrapingParams = {
            baseCurrency: Currencies.BRL.code,
            targetCurrency: Currencies.USD.code,
            URLprovider: dolarURL.google
        }

        const dolarToReal = await getCurrencyRate(dolarScrapingParams)

        res.status(200).json({
            message: "Bem-vindo à API de Moedas!",
            dolar: `\$1,00 equivale a R\$${dolarToReal}`,
            });

    }   catch(error){
        res.status(400).json({
            message: "Bad Request",
            error: error instanceof Error ? { message: error.message, stack: error.stack } : error,
        });
    }
});

router.get("/euro", async (req, res) => {
    try {
        const euroURL = currencyDataProvider(Currencies.BRL.code, Currencies.EUR.code)
        const euroScrapingParams = {
            baseCurrency: Currencies.BRL.code,
            targetCurrency: Currencies.EUR.code,
            URLprovider: euroURL.google
        }

        const euroToReal = await getCurrencyRate(euroScrapingParams)

        res.status(200).json({
            message: "Bem-vindo à API de Moedas!",
            euro: `\€1,00 equivale a R\$${euroToReal}`
            });

    }   catch(error){
        res.status(400).json({
            message: "Bad Request",
            error: error
            });
    }
  });

export default router;