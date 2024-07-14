import React from "react";
import Header from "../components/HeaderCountries";
import Countries from "../components/Country";
export default function HomePage(props) {
    return (
        <div data-theme={localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"} id="app">
            <Header />
          
            <Countries data={props.data}/>
          </div>
    );
}