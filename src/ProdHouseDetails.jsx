import React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './ProdHouseDetails.css';

export default function ProdHouseDetails() {
  const[show, setShow] = useState(false)
  const [data, setData] = useState({
    disney_action: [],
    disney_animated: [],
    disney_originals: [],
  })

  function fetchdata(){
      fetch("https://filmfare-server.vercel.app/disney")
      .then((res)=>res.json())
      .then((dt)=> {
          console.log(dt);
          let disneyaction = dt.slice(0, 4);
          let disneyanimated = dt.slice(4, 8);
          let disneyoriginals = dt.slice(8, 13);
          setData({
            disney_action: disneyaction,
            disney_animated: disneyanimated,
            disney_originals: disneyoriginals,
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
            <video className={`studio-banner ${show && 'dark'}`} loop autoplay="true"><source src="https://img10.hotstar.com/video/upload/sources/r1/cms/animations/qh3yh_1587393133132" type="video/mp4"/></video>
            <div className='fade'>
            </div>
        </div>
        <div>
            <div style={{color: "white", position: "absolute", top: "40rem"}}>
              <div className="disney-top">
                <h1 className="trendrow-title">Disney Action</h1>
                <div className="top-rated-row">
                  {data.disney_action.map((ele, key)=>(
                  <Link to={`/details/${ele?._id}`}><img className="disney-row-poster" key={key} src={`${ele?.poster}` } /></Link>
                  ))}

                </div>
              </div>

              <div className="disney-top">
                <h1 className="trendrow-title">Disney Animated</h1>
                <div className="top-rated-row">
                  {data.disney_animated.map((ele, key)=>(
                  <Link to={`/details/${ele?._id}`}><img className="disney-row-poster" key={key} src={`${ele?.poster}` } /></Link>
                  ))}

                </div>
              </div>

              <div className="disney-top">
                <h1 className="trendrow-title">Disney Originals</h1>
                <div className="top-rated-row">
                  {data.disney_originals.map((ele, key)=>(
                  <Link to={`/details/${ele?._id}`}><img className="disney-row-poster" key={key} src={`${ele?.poster}` } /></Link>
                  ))}

                </div>
              </div>

            </div>
            
        </div>
    </div>
  )
}
