const initialState = {
    stockName: ''
}

const stockReducer = (state = initialState, action) =>{
    switch(action.type)
    {
        case 'CHANGE_STOCK' : 
        return {
            ...state,
            stockName: action.payload
        }
        default:
        return state;
    }
}

export default stockReducer;