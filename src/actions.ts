const changeStock = (stockName) => {
    return {
      type: 'CHANGE_STOCK',
      payload: stockName
    };
  };

 const changeStocksName = (data) => {
    return {
        type: 'SET_STOCKS',
        payload: data
    }
}

const changeStockPrices = (data) => {
    return {
        type: 'CHANGE_STOCK_PRICES',
        payload: data
    }
}


const changePopUpState = (state) => {
    return {
        type: 'CHANGE_POPUP_STATE',
        payload: state
    }
}

  
module.exports = {
    changeStock,
    changeStocksName,
    changeStockPrices,
    changePopUpState
}
  