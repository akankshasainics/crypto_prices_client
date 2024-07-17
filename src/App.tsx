import './App.css';
import React, {  useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { changeStock, changeStocksName, changeStockPrices, changePopUpState} from './actions.ts';


function App() {
  const selectedOption = useSelector((state) => state.stockName);
  const stocks =  useSelector((state) => state.stocks);
  const stockPrices = useSelector((state) => state.stockPrices);
  const isPopupOpen = useSelector((state) => state.isPopUpOpen);
  const dispatch = useDispatch();
  const [ws, setWs] = useState(React.useRef(null));

  const handleSelectChange = async(event) => {
    const selectedOption = event.target.value;
    dispatch(changePopUpState(false));
    dispatch(changeStock(selectedOption));
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      await ws.current.send(selectedOption);
      ws.current.onmessage = (event) => {
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
       try {
            ws.current = new WebSocket(`http://127.0.0:8000/`);

            // Connection opened
            ws.current.onopen = () => {
              console.log('WebSocket connected');
            };

            ws.current.onclose = () => {
              console.log('WebSocket disconnected');
            };
            setWs(ws);
       }
       catch(error) {
        console.log(error)
        alert(error.message);
       }
       return () => {
        if(ws.current && ws.current.readyState === WebSocket.OPEN)
          {
            ws.current.close();
          }
       }

    
       
  }, [])

 
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
      }     };
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
        {stockPrices.map((p: {name: string, rate: number}, index: Number) => (
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