import './App.css';
import React, { useState, useEffect } from 'react';


function App() {
  const [stocks, setStocks] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stockPrices, setStockPrices] = useState([]);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const fetchStockPrices = async() => {
       try {
          if(selectedOption !== '') {
          const response = await fetch(`http://localhost:8000/coins/${selectedOption}`)
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setStockPrices(data || []);
        }

       }
       catch(error) {
        setError(error.message)

       }
    };
    fetchStockPrices();
  }, [selectedOption])

 
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch('http://localhost:8000/coins/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStocks(data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className="App">
      <header className="App-header">
      <div>
      <label htmlFor="stock-select">Choose a stock:</label>
      <select id="stock-select" value={selectedOption} onChange={handleSelectChange}>
        <option value="">--Please choose an option--</option>
         {stocks.map((stock, index) => (
          <option key={index}> {stock} </option>
        ))}
      </select>
    </div> 
    <table>
      <thead>
        <tr>
          <th>Stock</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {stockPrices.map(p => (
          <tr>
            <td>{p.name}</td>
            <td>{p.rate.toFixed(5)}</td>
          </tr>
        ))}
      </tbody>
    </table>
      </header>
    </div>
  );
}

export default App;
