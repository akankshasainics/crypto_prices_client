export const changeStock = (stockName: string) => {
    return {
        type: 'CHANGE_STOCK',
        payload: stockName
    };
};

export const changeStocksName = (data: [string]) => {
    return {
        type: 'SET_STOCKS',
        payload: data
    }
}

export const changeStockPrices = (data: [object]) => {
    return {
        type: 'CHANGE_STOCK_PRICES',
        payload: data
    }
}


export const changePopUpState = (state: boolean) => {
    return {
        type: 'CHANGE_POPUP_STATE',
        payload: state
    }
}


