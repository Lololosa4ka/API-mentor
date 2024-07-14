import React, { useState, useEffect, useMemo } from "react";
import HeaderCountries from "../components/HeaderCountries";
import { Link } from "react-router-dom";
import styles from './CountryPage.module.css';
const CountryPage = (props) => {
    console.log('props.country', props.country);
    const [country, setCountry] = useState([]);
    const [borderCountries, setBorderCountries] = useState([]);
    
    const url = `https://restcountries.com/v3.1/name/${props.country}`;

    useEffect(() => {
        console.log('url', url);
        const getApiData = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                console.log(data);
                setCountry(data);
            } catch (error) {
                console.error("Error fetching the country data:", error);
            }
        };
        getApiData();
    }, [url]);
    const borderCodes = useMemo(() => {
        return country[0]?.borders || [];
    }, [country]);
    console.log('borderCodes', borderCodes);

    useEffect(() => {
        if (borderCodes.length > 0) {
            const getApiData = async () => {
                try {
                    const url = `https://restcountries.com/v3.1/alpha?codes=${borderCodes.join(',')}&fields=name`;
                    console.log(url)
                    const response = await fetch(url);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    console.log('data', data);
                    setBorderCountries(data);
                } catch (error) {
                    console.error("Error fetching the border countries data:", error);
                }
            };
            getApiData();
        }
    }, [borderCodes]);

    console.log('borderCountries', borderCountries);
    if (country.length === 0) {
        return <h1>Loading...</h1>;
    }
    console.log('data theme', props.theme);
    return (
        <div data-theme={localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"} id="app" className={styles.countryPage}> 
            <HeaderCountries />
            <div className={styles.container}>
                <Link className={styles.backLink} to="/"><button className={styles.back}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>Back</button></Link>
                <div className={styles.country}>
                    <img className={styles.flag} src={country[0].flags.svg} alt={country[0].name.common} />
                    <div className={styles.infoContainer}>
                        <div style={{width: "100%"}}>
                            <h1 className={styles.h1}>{country[0].name.common}</h1>
                            <div className={styles.info}>
                                <div>
                                    <p><span className={styles.bold}>Native Name:</span> {country[0].name.official}</p>
                                    <p><span className={styles.bold}>Population:</span> {country[0].population}</p>
                                    <p><span className={styles.bold}>Region:</span> {country[0].region}</p>
                                    <p><span className={styles.bold}>Sub Region:</span> {country[0].subregion}</p>
                                    <p><span className={styles.bold}>Capital:</span> {country[0].capital}</p>
                                </div>
                                <div>
                                    <p><span className={styles.bold}>Top Level Domain:</span> {country[0].tld.join(", ")}</p>
                                    <p><span className={styles.bold}>Currencies:</span> {Object.values(country[0].currencies).map(c => c.name).join(", ")}</p>
                                    <p><span className={styles.bold}>Languages:</span> {Object.values(country[0].languages).join(", ")}</p>
                                </div>
                            </div>
                            <div className={styles.borders}>
                            <p style={{margin: 0, fontWeight: 700}}>Border Countries:</p>
                                {borderCountries && borderCountries.length > 0 ? (
                                    borderCountries.map((country) => (
                                        <div key={country.name.common}>
                                            <Link to={`/${country.name.common}`}><button className={styles.borderButton}>{country.name.common}</button></Link>
                                        </div>
                                    ))
                                ) : (
                                    <p>No borders</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountryPage;
