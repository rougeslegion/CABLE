import React from "react";
import "./SearchResults.module.css"
import axios from 'axios';

export default function SearchResults(data){
    return (
        <div className="main-div">
        <h1> Search Results </h1>
        <div name="result" disabled>{(data.data)}</div>
        </div>
    );
};