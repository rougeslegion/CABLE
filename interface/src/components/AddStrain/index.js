import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import "./AddStrain.module.css"
import axios from 'axios';

export default function AddStrain(){
    const navigate = useNavigate();

    function submitStrain(e){
        e.preventDefault();
        var cart = [];
        let fd = new FormData()
        cart.push(
            {
                domain: e.target.dom_field.value,
                phylum: e.target.phylum_field.value,
                tax_class: e.target.class_field.value,
                tax_order: e.target.order_field.value,
                family: e.target.family_field.value,
                genus: e.target.genus_field.value,
                sci_name: e.target.sciName_field.value,
                strain_desc: e.target.desc_field.value,
                species: e.target.species_field.value,
                is_type_strain: e.target.isTypeStrain_field.value,
                is_bacdive: "False",
                strain_hist: e.target.hist_field.value,
                culcolno: e.target.ccn_field.value
            }
        )
        
        console.log(cart);
        fd.append("load", cart);

        axios.post(axios.defaults.baseURL+"/bacdive/store/", {cart}).then((res) =>{
            console.log(res.data)
            alert("added Strain")
            navigate("/strains")
        });
    }
    
    return (
        <div className="main-div">
        <br />
        <input type="button" onClick={() => {navigate("/strains")}} value="Back to list" />
        <h1> Add Strain </h1>
        <form onSubmit={submitStrain}>
        <div style={{display:'inline-block', textAlign: 'left'}} >
            <label> Domain: <input name="dom_field" autocomplete = 'off' placeholder = "Domain"/></label>
            <label> Phylum: <input name="phylum_field" autocomplete = 'off' placeholder = "Phylum"/> </label>
            <label> Class: <input name="class_field" autocomplete = 'off' placeholder = "Class"/><br /> </label>
            <label> Order: <input name="order_field" autocomplete = 'off' placeholder = "Order"/> </label>
            <label> Family: <input name="family_field" autocomplete = 'off' placeholder = "Family"/><br /> </label>
            <label> Genus: <input name="genus_field" autocomplete = 'off' placeholder = "Genus"/> </label>
            <label> Scientific Name: <input name="sciName_field" autocomplete = 'off' placeholder = "Scientific Name"/><br /> </label>
            <label> Strain Description: <input name="desc_field" autocomplete = 'off' placeholder = "Strain Description"/><br /> </label>
            <label> Species: <input name="species_field" autocomplete = 'off' placeholder = "Species"/> </label>
            <br/>
            <label for="isTypeStrain_field">is Type Strain: </label>
            <select name="isTypeStrain_field" id="isTypeStrain">
                <option value="yes"> yes </option>
                <option value="no"> no </option>
            </select><br />
            <label> Strain History <input name="hist_field" autocomplete = 'off' placeholder = "Strain History"/><br /> </label> 
            <label> CCN: <input name="ccn_field" autocomplete = 'off' placeholder = "Culture Collection Nos."/> </label> 
            <br /><br />
            <input type="submit" id="fetchStrains" value="Submit" />
            </div>
        </form >
        </div>
    );
};