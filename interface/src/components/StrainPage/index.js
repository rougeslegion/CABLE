import React, { useEffect, useState } from "react";
import "./StrainPage.module.css"
import axios from 'axios';
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function StrainPage(props){
    let{id} = useParams();

    const [data,setData] = useState([])
    const [ccn,setCCN] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(axios.defaults.baseURL+"/bacdive/strains/?id="+id)
        .then((res) => {
            setData(res.data[0])
            axios.get(axios.defaults.baseURL+"/bacdive/ccn/?strain="+res.data[0].id)
            .then((res) => {
                setCCN(res.data)
            })
        })
    }, [])

    function deleteStrain(e, id){
        if( window.confirm("Delete Strain " + data.id + "?") == true ){
            axios.delete(axios.defaults.baseURL+"/bacdive/strains/"+id).then((res) => {
                alert("deleted Strain")
                navigate("/strains")
            })
        }
    }
    
    return (
        
        <div className="main-div">
        {/* <h1> Strain </h1>
        <div>
            {data.id}<br />
            {data.species}<br />
            {ccn.map((result, id) => (
                <div key={result.id}>
                    {result.cn}
                </div>
            ))}
        </div> */}
        <input type="button" onClick={() => {navigate("/strains")}} value="Back to list" />

        <table>
            <tr>
                <td id="speciesName" colspan="3"><h1>{data.species}</h1></td>
            </tr>
            <tr>
                <td id="speciesFull" colspan="3"><i>{data.sci_name}</i></td>
            </tr>
            
            <tr>
                <td id="phylum"><b>Phylum: </b>{data.phylum}</td>
                <td id="speciesDesc" rowspan="5">{data.strain_desc}</td>
                <td id="typeStrain" rowspan="5"><b>Is Type Strain?</b><br/>{data.is_type_strain ? "yes" : "no"}</td>
            </tr>

            <tr><td id="class"> <b>Class: </b>{data.tax_class} </td> </tr>
            <tr><td id="order"> <b>Order: </b>{data.tax_order} </td> </tr>
            <tr><td id="family"> <b>Family: </b>{data.family} </td> </tr>
            <tr><td id="genus">  <b>Genus: </b>{data.genus} </td> </tr>
            
        </table>

        <a href={"/edit/"+data.id}><input type="button" id="editButt" value="Edit Strain" /></a>
        <input type="button" onClick={(e) => deleteStrain(e, id)} id="deleteButt" value="Delete Strain" />
        </div>
    );
};