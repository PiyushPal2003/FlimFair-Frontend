import { useState } from 'react';
import Swal from 'sweetalert2';
import SignIn from './SignIn';
import './SignUp.css';
import Footer from './Footer';

export default function SignUp({info, setInfo}) {
  const [signIn, setSignIn] = useState(false);
  const [data, setData] = useState({
    user_name: "",
    user_email: "",
    user_pass: "",
  })

  const user = {
    user_name : data.user_name,
    user_email : data.user_email,
    user_pass : data.user_pass,
  }

  const handleinp= (e)=>{
    const name = e.target.name;
    const value = e.target.value;

    setData((prev)=>{
      return {...prev, [name]:value};
    });
  }

  function handlesubmit(e){
    e.preventDefault();
    console.log("submit button clicked")
    
    fetch("https://filmfair-server.vercel.app/user_detail", {
      method: "POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify(user),
    } )
    .then((res)=>res.json())
    .then((data)=>{ 
      if(data==="Email Already Registered"){
        Swal.fire({
          title: 'Email Already Registered',
          text: 'Please SignIn to Continue',
          icon: 'info',
        })  
      }
        else{
          console.log(data)
          Swal.fire({
            title: 'Sucessfully Registered',
            text: 'Please SignIn to Continue',
            icon: 'success',
          })
        }
    })
  }

  return (
    <div>
      {
        signIn ? (<SignIn info={info} setInfo={setInfo} />) : (
          <>
          <div style={{backgroundImage: `url("https://assets.nflxext.com/ffe/siteui/vlv3/b85863b0-0609-4dba-8fe8-d0370b25b9ee/fdf508c8-97d0-42fd-a6f9-9bef6bf96934/IN-en-20230731-popsignuptwoweeks-perspective_alpha_website_large.jpg")`, maxWidth: "100vw", backgroundSize: "cover"}}>
  
              <div className='signup-content'>
                  <div className='signup-navbar'>
                      <h1 className='signup-title'>FlimFair</h1>
                      <button type='button' className='signin-btn' onClick={()=> setSignIn(true)}>Sign In</button>
                  </div>
  
                  <div className='signup-banner'>
                  <h1 className='signup-banner1'>Unlimited Movies Trailers, Series, and more</h1>
                  <h1 className='signup-banner2'>Watch anywhere. Cancel anytime.</h1>
                  <h1 className='signup-banner3'>Ready to watch? Register Now!!</h1>

                  <form>
                  
                      <div className='inp'>
                        <div className='inp-box'>
                            <h1 className='inp-title'>Sign up</h1>
                            <input className='inp-text' type='name' placeholder='Enter Your Name' name='user_name' value={data.user_name} onChange={handleinp} required/>
                            
                            <input className='inp-text' type='email' placeholder='Enter Email' name='user_email' value={data.user_email} onChange={handleinp} required/>
                            
                            <input className='inp-text' type='password' placeholder='Password' name='user_pass' value={data.user_pass} onChange={handleinp} required/>
                            
                            <button className='inp-submit' type='submit' onClick={(e)=>handlesubmit(e)}>Submit</button>

                            <h1 className='already-a-user'>Already a user? SignIn</h1>
                        </div>
                      </div>

                  </form>
                  </div>
  
              </div>
  
          </div>
        </>
        )
      }
      <Footer/>
    </div>
  )
}