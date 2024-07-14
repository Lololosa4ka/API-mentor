import React, { useState, useEffect } from "react";
import TaskBar from "./TaskBar";
import { Link } from "react-router-dom";
export default function Countries(props) {
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const data = props.data;
    useEffect(() => {
        setFilteredData(data);
    }, [data])
    function handleChange(e) {
        const searchValue = e.target.value;
        setSearchText(searchValue);
        if (searchValue.length > 0 ) {
            setFilteredData(
                data.filter((country) =>
                    country.name.common
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                )
            )
        } else{
            setFilteredData(data);
        }
    }
    function handleSelect(e){ 
        const value = e.target.value;
        setFilteredData(data.filter((country) => country.region === value));
        if (value === "filter") {
            setFilteredData(data);
        }
    }
    return (
        <div>
        <TaskBar searchText={searchText} handleChange={handleChange} handleSelect={handleSelect}/>
        <div className="countries">
            {filteredData.map((country) => (
                <div className="country">

                    <div className="flag-box"><Link to={`/${country.name.common}`}><img className="flag" src={country.flags.svg} /></Link></div>
                    <div className="info">
                        <h1>{country.name.common}</h1>
                        <p>Population: <span className="lightweight">{country.population}</span></p>
                        <p>Region: <span className="lightweight">{country.region}</span></p>
                        <p>Capital: <span className="lightweight">{country.capital}</span></p>
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
}