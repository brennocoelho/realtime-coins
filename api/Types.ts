export interface Currency {
    code: string
    name: string
    symbol: string
}

export interface CurrencyList {
    [currencyCode: string]: Currency;
}

export interface DataProviderURL {
    google: string
    wise: string
}


export interface ScrapingParams {
    baseCurrency: string
    targetCurrency: string
    URLprovider: string
}