import React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './ProdHouseDetails.css';

export default function Pixar() {
  const[show, setShow] = useState(false)
  const [data, setData] = useState({
    pixar_originals: [],
    pixar_movies: [],
    pixar_shorts: [],
  })

  function fetchdata(){
      fetch("https://filmfair-server.vercel.app/pixar")
      .then((res)=>res.json())
      .then((dt)=> {
          console.log(dt);
          let pixaroriginals = dt.slice(0, 4);
          let pixarmovies = dt.slice(4, 8);
          let pixarshorts = dt.slice(8, 13);
          setData({
            pixar_originals: pixaroriginals,
            pixar_movies: pixarmovies,
            pixar_shorts: pixarshorts,
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
            <video className={`studio-banner ${show && 'dark'}`} loop autoplay="true"><source src="https://img10.hotstar.com/video/upload/sources/r1/cms/animations/a6lr0r_1587393331483" type="video/mp4"/></video>
            <div className='fade'>
            </div>
        </div>
        <div>
            <div style={{color: "white", position: "absolute", top: "40rem"}}>
              <div className="disney-top">
                <h1 className="trendrow-title">Pixar Originals</h1>
                <div className="top-rated-row">
                  {data.pixar_originals.map((ele, key)=>(
                  <Link to={`/details/${ele?._id}`}><img className="disney-row-poster" key={key} src={`${ele?.poster}` } /></Link>
                  ))}

                </div>
              </div>

              <div className="disney-top">
                <h1 className="trendrow-title">Pixar Movies</h1>
                <div className="top-rated-row">
                  {data.pixar_movies.map((ele, key)=>(
                  <Link to={`/details/${ele?._id}`}><img className="disney-row-poster" key={key} src={`${ele?.poster}` } /></Link>
                  ))}

                </div>
              </div>

              <div className="disney-top">
                <h1 className="trendrow-title">Pixar Shorts</h1>
                <div className="top-rated-row">
                  {data.pixar_shorts.map((ele, key)=>(
                  <Link to={`/details/${ele?._id}`}><img className="disney-row-poster" key={key} src={`${ele?.poster}` } /></Link>
                  ))}

                </div>
              </div>

            </div>
            
        </div>
    </div>
  )
}