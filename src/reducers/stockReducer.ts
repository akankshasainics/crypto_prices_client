const initialState = {
    stockName: '',
    stocks: [],
    stockPrices: [],
    isPopUpOpen: false,
}

const stockReducer = (state = initialState, action: { type: any; payload: any }) => {
    switch (action.type) {
        case 'CHANGE_STOCK':
            return {
                ...state,
                stockName: action.payload
            }
        case 'CHANGE_POPUP_STATE':
            return {
                ...state,
                isPopUpOpen: action.payload
            }
        case 'SET_STOCKS':
            return {
                ...state,
                stocks: action.payload
            }
        case 'CHANGE_STOCK_PRICES':
            return {
                ...state,
                stockPrices: action.payload
            }
        default:
            return state;
    }
}

export default stockReducer;
export type IRootState = ReturnType<typeof stockReducer>