import { useEffect, useState } from "react";
import './Trendrow.css';
import Topratedrow from './Topratedrow';
import Actionrow from "./Actionrow";
import ProdHouses from "./ProdHouses";
import Footer from './Footer';
import { Link } from 'react-router-dom';

export default function Trendrow(){
    const [data, setData] = useState([]);

    function fetchdata(){
        fetch("https://filmfare-server.vercel.app/movierow")
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
        <div className="row" style={{ paddingTop: "65rem" }}>
            <h1 className="trendrow-title">Trending Movies</h1>
            <div className="row-main">
                {data.map((ele, key)=>(
                    <Link to={`/details/${ele?._id}`}><img className="row-poster" key={key} src={`${ele?.ver_poster}` } /></Link>
                ))}

            </div>
            <Topratedrow/>
            <Actionrow/>
            <ProdHouses/>
            <Footer/>
        </div>
     );
}