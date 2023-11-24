import React, { useContext, useEffect, useState } from 'react';
import './Wishlist.css';
import { Tilt } from 'react-tilt';
import ClipLoader from "react-spinners/ClipLoader";
import Footer from './Footer';
import { UserContext } from './Router';
import { Link } from 'react-router-dom';

export default function Wishlist() {
    let [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [mywish, setMyWish] = useState([]);
    let wish_array;

    const usercontext = useContext(UserContext);

    function wishes(){
        fetch('https://filmfare-server.vercel.app/wishes',{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({wish_array})
        })
        .then(res=>res.json())
        .then(data=>{
            setMyWish(data);
            setLoading(false);
        })
    }

    function wish(){
        let urid = usercontext.user;
        fetch('https://filmfare-server.vercel.app/SignIn', {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({urid:urid})
        })
        .then((res)=>res.json())
        .then((dt)=>{
            console.log(dt);
          setData(dt);
          wish_array=dt.Wishlist;
          wishes();
          
        })
    }

    useEffect(()=>{
        wish();
      }, [])

      const defaultOptions = {
        reverse:        false,  // reverse the tilt direction
        max:            35,     // max tilt rotation (degrees)
        perspective:    800,   // Transform perspective, the lower the more extreme the tilt gets.
        scale:          1.1,    // 2 = 200%, 1.5 = 150%, etc..
        speed:          1000,   // Speed of the enter/exit transition
        transition:     true,   // Set a transition on enter/exit.
        axis:           null,   // What axis should be disabled. Can be X or Y.
        reset:          true,    // If the tilt effect has to be reset on exit.
        easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
    }

    return (
    <div className='wishlist-main'>
    {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <ClipLoader className='loader'
            color="white"
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
            /></div>) : (
            <>
                <div className='profile-head' style={{display: "flex", margin: "0.5rem 0 0 1rem"}}>
                    <h1 className='title2'>FlimFair</h1>
                </div>

                <div className='wishlist-head'>
                    <div>
                    <Tilt options={defaultOptions} style={{ height: "14rem", width: "42rem"}}>
                        <div>
                        <h1 className='mydetails'>Hi, {`${data.userName}`}</h1>
                        <h1 className='mydetails1'>Hope you are enjoying your day with FlimFair 🤗</h1>
                        <br/>
                        <h1 className='mydetails2'>UserId: {`${data.usrid}`}</h1>
                        </div>
                    </Tilt>
                        <br/>
                        <br/>
                        <br/>
                        <h1 style={{textAlign: 'center', fontSize: "2.3rem"}}>Here's Your Wishlist ❤</h1>

                        <div className='wishes'>
                            <div className="wish-row-main">
                                {mywish.map((ele, key)=>(
                                    <Link to={`/details/${ele?._id}`}><img className="wish-row-poster" key={key} src={`${ele?.ver_poster}` } /></Link>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>

            <Footer /></>)}
        </div>
    )
}