import './App.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeStock, changeStocksName, changeStockPrices, changePopUpState } from './actions.ts';
import { IRootState } from './reducers/stockReducer.ts'
import { getWebsocketConnection } from './webSocket.ts';


function App() {
  const selectedOption = useSelector((state: IRootState) => state.stockName);
  const stocks = useSelector((state: IRootState) => state.stocks);
  const stockPrices = useSelector((state: IRootState) => state.stockPrices);
  const isPopupOpen = useSelector((state: IRootState) => state.isPopUpOpen);
  const dispatch = useDispatch();
  const ws = getWebsocketConnection();

  const handleSelectChange = async (event) => {
    const selectedOption = event.target.value;
    dispatch(changePopUpState(false));
    dispatch(changeStock(selectedOption));
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(selectedOption);
      ws.onmessage = (event) => {
        console.log(event.data);
        dispatch(changeStockPrices(JSON.parse(event.data)));
      };
    }
  };

  const openPopup = () => {
    dispatch(changePopUpState(true));
  }

  const onClose = () => {
    dispatch(changePopUpState(false));
  }



  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch('http://localhost:8000/coins/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        dispatch(changeStocksName(data));
      } catch (error) {
        alert(error.message);
      }
    };
    fetchStocks();
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={openPopup}> Choose Stock</button>
        {
          isPopupOpen &&
          <div className="popup-overlay">
            <div className="popup-content">
              <span className="close-btn" onClick={onClose}>x</span>
              <label htmlFor="stock-select">Choose a stock:</label>
              <select id="stock-select" value={selectedOption} onChange={handleSelectChange}>
                <option value="">--Please choose an option--</option>
                {stocks.map((stock: String, index: any) => (
                  <option key={index}> {stock} </option>
                ))}
              </select>
            </div>
          </div>
        }

        <div>

        </div>
        {stockPrices.length > 0 &&
          <table>
            <thead>
              <tr>
                <th> #</th>
                <th>Stock</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {stockPrices.map((p: { name: string, rate: number }, index: Number) => (
                <tr key={+index}>
                  <td>{+index + 1}</td>
                  <td>{p.name}</td>
                  <td>{p.rate.toFixed(5)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }

      </header>
    </div>
  );
}

export default App;
