import React, { useState } from "react";
import "./SearchPage.module.css"
import axios from 'axios';
import SearchResults from "../SearchResults";

export default function SearchPage(){
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
                    <h1> Search From BacDive </h1>
                    <form className="main-div" onSubmit={submitSearch}>
                        <input name="search" placeholder = "Search Strains..." style={{height:'75px', width:'475px', fontSize:'36pt'}}/>
                        <br /><br />
                        <label> API Endpoint: </label>
                        <div className="radio" style={{display:'inline-block', border: '1px solid', padding:'8px'}}>
                            <input type="radio" id="opt_fe" name="endpts" value="opt_fe" defaultChecked={true} />
                            <label value="opt_fe">Fetch</label>
                            <input type="radio" id="opt_ccn" name="endpts" value="opt_ccn" /> 
                            <label value="opt_ccn"> Culture coll no. </label>
                            <input type="radio" id="opt_tx" name="endpts" value="opt_tx" /> 
                            <label value="opt_tx">Taxon</label> <br />
                            <input type="radio" id="opt_s16" name="endpts" value="opt_s16" /> 
                            <label value="opt_s16">Sequence 16</label>
                            <input type="radio" id="opt_sge" name="endpts" value="opt_sge"/> 
                            <label value="opt_sge">Sequence Genome</label>
                        </div>
                        <br /> <br />
                        <input type="submit" id="fetchStrains" value="Search" />

                        <br /><br />
                    </form>
                </div>
            }
        </div>
    );
};