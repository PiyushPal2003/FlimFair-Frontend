import React, { useEffect, useState, useContext } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import SignUp from './SignUp';
import { UserContext } from './Router';
import ClipLoader from "react-spinners/ClipLoader";

function Profile({info, setInfo}) {
  const [data, setData] = useState({});
  let [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const usercontext = useContext(UserContext);

  function profile(){
    let urid = usercontext.user;
    fetch('https://filmfare-server.vercel.app/SignIn', {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({urid:urid})
    })
    .then((res)=>res.json())
    .then((dt)=>{
      setData(dt);
      setLoading(false);
    })
  }

  function signout(){
    setInfo(false)
    navigate('/');
    window.history.pushState(null, null, '/');
  }

  useEffect(()=>{
    profile()
  }, [])

  return (
    <div className='profile-main'>
      {loading?(
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <ClipLoader className='loader'
        color="white"
        loading={loading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div> ): (
        <>
        <div className='profile-head' style={{display: "flex", margin: "0.5rem 0 0 1rem"}}>
        <h1 className='title2'>FlimFair</h1>
        </div>

        <div className='profile-content'>
          <div>
            <h1 className='mydetails' >Hi, {`${data.userName}`}</h1>
            <h1 className='mydetails1' >Hope you are enjoying your day with FlimFair 🤗</h1>
            <br/>
            <br/>
            <h1 className='mydetails2' >UserId: {`${data.usrid}`}</h1>
          </div>

          <div>
          
            <button className='signin-btn' onClick={()=>{
              signout();
            }}>SignOut</button>
          </div>

        </div>
      <Footer/></>)}
    </div>
  )
}

export default Profile;