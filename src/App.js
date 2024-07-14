import './App.css';
import { React, useState, useEffect } from 'react';
import HomePage from './pages/Home';
import CountryPage from './pages/CountryPage';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getApiData = async () => {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region"
      ).then((response) => response.json());
      setData(response);
    }
    getApiData();
  }, []);
  return (
    <Router>
        <Routes>
          <Route path='/' element={<HomePage data={data}/>} />
          {data.map(country =>{
            return <Route path={`/${country.name.common}`} element={<CountryPage country={country.name.common} />} />
          })}
        </Routes>
    </Router>
  );
}

export default App;
