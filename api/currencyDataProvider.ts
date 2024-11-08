import { DataProviderURL } from "./Types"

export default function currencyDataProvider(baseCurrency: string, targetCurrency: string): DataProviderURL{

    const providers: DataProviderURL = {
        google: `https://www.google.com/finance/quote/${targetCurrency}-${baseCurrency}?hl=en`,
        wise: `https://wise.com/gb/currency-converter/${targetCurrency.toLowerCase()}-to-${baseCurrency.toLowerCase()}-rate?amount=1`
    }


    return providers
}
