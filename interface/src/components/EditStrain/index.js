import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import "./EditStrain.module.css"
import axios from 'axios';

export default function EditStrain(props){
    let{id} = useParams();

    const [data,setData] = useState([])
    const [ccn,setCCN] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(axios.defaults.baseURL+"/bacdive/strains/?id="+id)
        .then((res) => {
            setData(res.data[0])
            axios.get(axios.defaults.baseURL+"/bacdive/ccn/?strain="+res.data[0].id)
            .then((res) => {
                let ccnStr = "";
                
                res.data.map((cn, key) => {
                    if(key != 0){
                        ccnStr = ", "
                    }
                    ccnStr += cn
                })
                
                setCCN(ccnStr)
            })
        })
    }, [])


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

        axios.put(axios.defaults.baseURL+"/bacdive/strains/"+id, {cart}).then((res) =>{
            console.log(res.data)
            alert("updated Strain")
            navigate("/strain/"+id)
        });
    }
    
    return (
        <div className="main-div">
        <input type="button" onClick={() => {navigate("/strain/"+id)}} value="Back to strain" />
        
        <h1> Edit Strain </h1>
        <form onSubmit={submitStrain}>
            <div style={{display:'inline-block', textAlign: 'left'}} >
            <label> Domain: <input name="dom_field" defaultValue={data.domain} placeholder = "Domain"/> </label>
            <label> Phylum: <input name="phylum_field" defaultValue={data.phylum} placeholder = "Phylum"/> </label>
            <label> Class: <input name="class_field" defaultValue={data.tax_class} placeholder = "Class"/><br /> </label>
            <label> Order: <input name="order_field" defaultValue={data.tax_order} placeholder = "Order"/> </label>
            <label> Family: <input name="family_field" defaultValue={data.family} placeholder = "Family"/><br /> </label>
            <label> Genus: <input name="genus_field" defaultValue={data.genus} placeholder = "Genus"/> </label>
            <label> Scientific Name: <input name="sciName_field" defaultValue={data.sci_name} placeholder = "Scientific Name"/><br /> </label>
            <label> Strain Description: <input name="desc_field" defaultValue={data.strain_desc} placeholder = "Strain Description"/><br /> </label>
            <label> Species: <input name="species_field" defaultValue={data.species} placeholder = "Species"/> </label>

            <label for="isTypeStrain_field">Is Type Strain: </label>
            <select name="isTypeStrain_field" defaultValue={data.is_type_strain ? "yes":"no"} id="isTypeStrain">
                <option value="yes"> yes </option>
                <option value="no"> no </option>
            </select><br />

            <label for="isTypeStrain_field">Imported from BacDive: </label>
            <select name="isBacDive_field" defaultValue={data.is_bacdive ? "yes":"no"} id="isBacDive">
                <option value="yes"> yes </option>
                <option value="no"> no </option>
            </select><br />
            
            <label> Strain History: <input name="hist_field" defaultValue={data.strain_hist} placeholder = "Strain History"/><br /> </label>

            <label> CCN: <input name="ccn_field" defaultValue={ccn} placeholder = "Culture Collection Nos."/> </label>
            <br /> <br />
            <input type="submit" id="fetchStrains" defaultValue="Submit" />
            </div>
        </form >
        </div>
    );
};