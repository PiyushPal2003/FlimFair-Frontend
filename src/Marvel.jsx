import React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './ProdHouseDetails.css';

export default function Marvel() {
  const[show, setShow] = useState(false)
  const [data, setData] = useState({
    cenematic_universe: [],
    universe_phase3: [],
    universe_phase4: [],
  })

  function fetchdata(){
      fetch("https://filmfair-server.vercel.app/marvel")
      .then((res)=>res.json())
      .then((dt)=> {
          console.log(dt);
          let cenematicuniverse = dt.slice(0, 4);
          let universephase3 = dt.slice(4, 8);
          let universephase4 = dt.slice(8, 13);
          setData({
            cenematic_universe: cenematicuniverse,
            universe_phase3: universephase3,
            universe_phase4: universephase4,
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
            <video className={`studio-banner ${show && 'dark'}`} loop autoplay="true"><source src="https://img10.hotstar.com/video/upload/sources/r1/cms/animations/1on5cf_1587393232549" type="video/mp4"/></video>
            <div className='fade'>
            </div>
        </div>
        <div>
            <div style={{color: "white", position: "absolute", top: "40rem"}}>
              <div className="disney-top">
                <h1 className="trendrow-title">Marvel Cenematic Universe</h1>
                <div className="top-rated-row">
                  {data.cenematic_universe.map((ele, key)=>(
                  <Link to={`/details/${ele?._id}`}><img className="disney-row-poster" key={key} src={`${ele?.poster}` } /></Link>
                  ))}

                </div>
              </div>

              <div className="disney-top">
                <h1 className="trendrow-title">Disney Animated</h1>
                <div className="top-rated-row">
                  {data.universe_phase3.map((ele, key)=>(
                  <Link to={`/details/${ele?._id}`}><img className="disney-row-poster" key={key} src={`${ele?.poster}` } /></Link>
                  ))}

                </div>
              </div>

              <div className="disney-top">
                <h1 className="trendrow-title">Disney Originals</h1>
                <div className="top-rated-row">
                  {data.universe_phase4.map((ele, key)=>(
                  <Link to={`/details/${ele?._id}`}><img className="disney-row-poster" key={key} src={`${ele?.poster}` } /></Link>
                  ))}

                </div>
              </div>

            </div>
            
        </div>
    </div>
  )
}