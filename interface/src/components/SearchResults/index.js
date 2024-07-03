import React from "react";
import Styles from "./SearchResults.module.css"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function SearchResults(data){
    // div name="result" disabled>{(JSON.stringify(data.data))}</div>
    const results = data.data;
    const navigate = useNavigate()

    function takeSelected(e){
        e.preventDefault();
        var cart = [];
        let fd = new FormData()

        for(let i=0; i<results.length; i++){
            var checkBox = document.getElementById(i)
            if(checkBox.checked == true){
                
                cart.push(
                    {
                        domain: results[i]["Name and taxonomic classification"].domain,
                        phylum: results[i]["Name and taxonomic classification"].phylum,
                        tax_class: results[i]["Name and taxonomic classification"]["class"],
                        tax_order: results[i]["Name and taxonomic classification"].order,
                        family: results[i]["Name and taxonomic classification"].family,
                        genus: results[i]["Name and taxonomic classification"].genus,
                        sci_name: results[i]["Name and taxonomic classification"]["full scientific name"],
                        strain_desc: results[i].General.description,
                        species: results[i]["Name and taxonomic classification"].species,
                        is_type_strain: results[i]["Name and taxonomic classification"]["type strain"] == "no" ? "False" : "True",
                        is_bacdive: "True",
                        strain_hist: results[i].General["strain history"][0],
                        culcolno: results[i]["External links"]["culture collection no."]
                    }
                )
            }
        }
        
        console.log(cart);
        fd.append("load", cart);

        axios.post(axios.defaults.baseURL+"/bacdive/store/", {cart}).then((res) =>{
            console.log(res.data)
        });

        alert("Downloaded Strains to database")
        navigate("/strains/")
    }

    return (
        <div className="main-div">
        <table className={Styles.Name}>
            <caption><h1>Search Results</h1></caption>
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
                {results.map((result, id) => (
                    <tr key={result.General["BacDive-ID"]}>
                        <td> {result.General["BacDive-ID"]}</td>
                        <td> {result["Name and taxonomic classification"].genus} </td>
                        <td><a href={"https://bacdive.dsmz.de/strain/"+result.General["BacDive-ID"]} target='_blank' rel="noopener noreferrer">{result["Name and taxonomic classification"].species}</a></td>
                        <td>{result["Name and taxonomic classification"]["type strain"]}</td>
                        <td> <input id={id} type="checkbox" key={result.General["BacDive-ID"]+"box"}></input> </td>
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