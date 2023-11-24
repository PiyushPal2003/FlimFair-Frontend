import React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './ProdHouseDetails.css';

export default function ProdHouseDetails() {
  const[show, setShow] = useState(false)
  const [data, setData] = useState({
    starwar_series: [],
    starwar_movies: [],
    starwar_shorts: [],
  })

  function fetchdata(){
      fetch("https://filmfare-server.vercel.app/starwar")
      .then((res)=>res.json())
      .then((dt)=> {
          console.log(dt);
          let starwarseries = dt.slice(0, 4);
          let starwarmovies = dt.slice(4, 8);
          let starwarshorts = dt.slice(8, 13);
          setData({
            starwar_series: starwarseries,
            starwar_movies: starwarmovies,
            starwar_shorts: starwarshorts,
          });
      })
  }


  const screen= ()=>{
    if(window.scrollY > 100){
      setShow(true);
    } else{
      setShow(false);
    }
  }

  
  useEffect(()=>{
    window.addEventListener("scroll", screen);
    return ()=>window.removeEventListener("scroll", screen);
  }, []);

  useEffect(()=>{
      fetchdata();
  }, [])

  return (
    <div>
        <Navbar/>
        <div className='studio'>
            <video className={`studio-banner ${show && 'dark'}`} loop autoplay="true"><source src="https://img10.hotstar.com/video/upload/sources/r1/cms/animations/utwmfd_1587393376512" type="video/mp4"/></video>
            <div className='fade'>
            </div>
        </div>
        <div>
            <div style={{color: "white", position: "absolute", top: "40rem"}}>
              <div className="disney-top">
                <h1 className="trendrow-title">StarWars Series</h1>
                <div className="top-rated-row">
                  {data.starwar_series.map((ele, key)=>(
                  <Link to={`/details/${ele?._id}`}><img className="disney-row-poster" key={key} src={`${ele?.poster}` } /></Link>
                  ))}

                </div>
              </div>

              <div className="disney-top">
                <h1 className="trendrow-title">StarWars Movies</h1>
                <div className="top-rated-row">
                  {data.starwar_movies.map((ele, key)=>(
                  <Link to={`/details/${ele?._id}`}><img className="disney-row-poster" key={key} src={`${ele?.poster}` } /></Link>
                  ))}

                </div>
              </div>

              <div className="disney-top">
                <h1 className="trendrow-title">StarWars Shorts</h1>
                <div className="top-rated-row">
                  {data.starwar_shorts.map((ele, key)=>(
                  <Link to={`/details/${ele?._id}`}><img className="disney-row-poster" key={key} src={`${ele?.poster}` } /></Link>
                  ))}

                </div>
              </div>

            </div>
            
        </div>
    </div>
  )
}