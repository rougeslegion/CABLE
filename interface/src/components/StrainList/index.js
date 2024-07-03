import React, { useEffect, useState } from "react";
import "./StrainList.module.css"
import axios from 'axios';

export default function StrainList(){

    const [data,setData] = useState([])

    useEffect(() => {
        axios.get(axios.defaults.baseURL+"/bacdive/strains/")
        .then((res) => {
            setData(res.data)
        })
    }, [])

    function deleteStrain(e, id){
        if( window.confirm("Delete Strain " + id + "?") == true ){
            axios.delete(axios.defaults.baseURL+"/bacdive/strains/"+id)
            window.location.reload()
        }
    }

    return (
        <div className="main-div">
           
        <table>
            <caption><h1>Strains</h1></caption>
            <thead>
                <tr>
                    <th> ID </th>
                    <th> Genus </th>
                    <th> Species </th>
                    <th> isTypeStrain </th>
                    <th> from Bacdive </th>
                    <th> * </th>
                    <th> / </th>
                </tr>
            </thead>
            <tbody name="resultTable">
                {data.map((result, id) => (
                    <tr key={result.id}>
                        <td> {result.id}</td>
                        <td>{result.genus}</td>
                        <td><a href={"/strain/"+result.id}>{result.species}</a></td>
                        <td>{result.is_type_strain ? "yes" : "no"}</td>
                        <td>{result.is_bacdive ? "yes" : "no"}</td>
                        <td><input type="button" id="delButt" onClick={(e) => deleteStrain(e, result.id)} value="Delete" /></td>
                        <td><a href={"/edit/"+result.id}><input type="button" id="editButt" value="Edit" /></a></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <br />
        <a href="/add"> <input type="button" value="Add Local Strain"/></a>
        <br />
        <br /><br />
        </div>
    );
};