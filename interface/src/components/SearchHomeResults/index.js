import React from "react";
import "./SearchHomeResults.module.css"
import axios from 'axios';

export default function SearchHomeResults(data){
    // div name="result" disabled>{(JSON.stringify(data.data))}</div>

    function takeSelected(e){
        e.preventDefault();
        const cart = ['99'];
        console.log()
        console.log(cart); 
    }

    const results = data.data;
    
    return (
        <div className="main-div">
        <table>
            <caption>Search Results</caption>
            <thead>
                <tr>
                    <th>BacDiveID</th>
                    <th>Genus</th>
                    <th>Species</th>
                    <th>isTypeStrain</th>
                    <th>/</th>
                </tr>
            </thead>
            <tbody name="resultTable">
                {results.map(result => (
                    <tr key={result.General["BacDive-ID"]}>
                        <td> {result.General["BacDive-ID"]}</td>
                        <td>{result["Name and taxonomic classification"].genus}</td>
                        <td>{result["Name and taxonomic classification"].species}</td>
                        <td>{result["Name and taxonomic classification"]["type strain"]}</td>
                        <td> <input type="checkbox" key={result.General["BacDive-ID"]+"box"}></input> </td>
                    </tr>
                ))}
            </tbody>
        </table>
        
        <br />
        <button onClick={(e) => takeSelected(e)}> Download Selected </button>
        <br /><br />
        </div>
    );
};