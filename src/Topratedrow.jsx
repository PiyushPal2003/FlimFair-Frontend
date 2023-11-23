import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './Topratedrow.css';

export default function Topratedrow(){
    const[data, setData] = useState([])

    function fetchdata(){
        fetch("https://filmfair-server.vercel.app/toprated")
        .then((res)=>res.json())
        .then((dt)=> {
            console.log(dt);
            setData(dt);
        })
    }

    useEffect(()=>{
        fetchdata();
    }, [])

    return(
        <div className="top-rated">
            <h1 className="trendrow-title">Top Rated Movies</h1>
            <div className="top-rated-row">
                {data.map((ele, key)=>(
                <Link to={`/details/${ele?._id}`}><img className="top-rated-row-poster" key={key} src={`${ele?.poster}` } /></Link>
                ))}

            </div>
        </div>
    )
}