import React, { useState } from "react";
import "./AdvancedSearch.module.css"
import axios from 'axios';
import SearchResults from "../SearchHomeResults";

export default function AdvancedSearch(){
    const [data,setData] = useState(null)

    function submitSearch(e){
        e.preventDefault();
        var endptSelection = document.querySelector('input[name="endpts"]:checked').value;

        let fd = new FormData()

        fd.append("query", e.target.search.value)
        fd.append("endpoint", endptSelection)

        //console.log(endptSelection)
        //console.log(e.target.search.value);

        axios.post(axios.defaults.baseURL+"/bacdive/test/", fd).then((res) =>{
            //console.log(res.data[0]['Name and taxonomic classification'].species)
            console.log(res.data)
            setData(res.data)
        });
    }

    return (
        <div>
            {data ?
                <div>
                    <br />
                    <button onClick = {() => 
                        setData(null) 
                    }> Back to Search </button> 
                    <SearchResults data = {data} />
                </div>
                :
                <div>
                    <h1> Search </h1>
                    <form className="main-div" onSubmit={submitSearch}>
                        <input name="search" placeholder = "Search Strains..."/>
                        <br />
                        <input type="submit" id="fetchStrains" value="Search" />

                        <br /><br />
                    </form>
                </div>
            }
        </div>
    );
};