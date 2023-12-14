import React from "react";
import "./StrainPage.module.css"
import axios from 'axios';

export default function StrainPage(){
    
    function submitSearch(e){
        e.preventDefault();
        var endptSelection = document.querySelector('input[name="endpts"]:checked').value;

        let fd = new FormData()

        fd.append("query", e.target.search.value)
        fd.append("endpoint", endptSelection)

        //console.log(endptSelection)
        //console.log(e.target.search.value);

        axios.post(axios.defaults.baseURL+"/bacdive/test/", fd).then((res) =>{
            console.log(res.data)
        });
    }

    return (
        <div className="main-div">
        <h1> Strain </h1>
        <input disabled />
        </div>
    );
};