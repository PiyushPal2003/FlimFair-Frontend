import React from 'react'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './Actionrow.css';

export default function Actionrow() {
    const[data, setData] = useState([])

    function fetchdata(){
        fetch("https://filmfare-server.vercel.app/actionrow")
        .then((res)=>res.json())
        .then((dt)=> {
            console.log(dt);
            setData(dt);
        })
    }

    useEffect(()=>{
        fetchdata();
    }, [])

  return (
    <div className="top-rated">
        <h1 className="trendrow-title">Popular In Action</h1>
        <div className="top-rated-row">
            {data.map((ele, key)=>(
            <Link to={`/details/${ele?._id}`}><img className="top-rated-row-poster" key={key} src={`${ele?.poster}` } /></Link>
        ))}

        </div>
    </div>
  )
}
