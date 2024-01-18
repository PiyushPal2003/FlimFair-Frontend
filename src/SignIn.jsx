import { useContext, useState } from 'react';
import { UserContext } from './Router';
import Swal from 'sweetalert2';
import Footer from './Footer';
import './SignIn.css';
import { useEffect } from 'react';

export default function Login({info, setInfo}) {

    const usercontext = useContext(UserContext);

    const [data, setData] = useState({
        user_email: "",
        user_pass: "",
    })

    const user = {
        user_email : data.user_email,
        user_pass : data.user_pass,
      }
    
    const handleinp = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
    
        setData((prev)=>{
          return {...prev, [name]:value};
        });
    }

    function handlesubmit(e){
        e.preventDefault();
        console.log("submit button clicked")
        
        fetch("https://filmfare-server.vercel.app/SignIn", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json',
          },
          
        } )
        .then((res)=>res.json())
        .then((data)=>{
          console.log(data);
          if(data.message==="SignedIn Successfully"){
            usercontext.setUser(data.usrid);
            sessionStorage.setItem("user_ID", data.usrid);

            Swal.fire({
              title: `Welcome ${data.userName}`,
              text: `UserId: ${data.usrid}`,
              icon: 'success',
            })
            setInfo(true);
            console.log(info);
          }
            else{
              console.log(data)
              Swal.fire({
                title: 'User Not Found',
                text: 'Please SignUp',
                icon: 'info',
              })
            }
        })
    }

    useEffect(()=>{
      const script = document.createElement('script')
      script.src="https://www.google.com/recaptcha/api.js?render=6LdRylQpAAAAAHUjic3Gwzm3AxEyHAhYUJ3SUFfc"
      script.addEventListener('load', ()=>{
        window.grecaptcha.ready(()=>{
          window.grecaptcha.execute("6LdRylQpAAAAAHUjic3Gwzm3AxEyHAhYUJ3SUFfc")
        })
      })
      document.body.appendChild(script)
    }, [])

    return (
        <div>
            <div style={{backgroundImage: `url("https://assets.nflxext.com/ffe/siteui/vlv3/b85863b0-0609-4dba-8fe8-d0370b25b9ee/fdf508c8-97d0-42fd-a6f9-9bef6bf96934/IN-en-20230731-popsignuptwoweeks-perspective_alpha_website_large.jpg")`, maxWidth: "100vw", backgroundSize: "cover"}}>
                
                <div className='login-content'>
                    <div className='sign-navbar'>
                        <h1 className='login-title'>FlimFair</h1>
                    </div>

                    <form >
                    <div className='signin-inp b'>
                        <div className='inp-box1'>
                            <h1 className='inp-title'>Sign In</h1>
                            <input className='inp-text' type='email' placeholder='Enter Email' name='user_email' value={data.user_email} onChange={handleinp} required/>
                            
                            <input className='inp-text' type='password' placeholder='Password' name='user_pass' value={data.user_pass} onChange={handleinp} required/>
                            
                            <button className='inp-submit' type='submit' onClick={(e)=>handlesubmit(e)}>Submit</button>
                        </div>
                        <h1 className='signin-btm1'>New to FlimFare? <a href='/' style={{textDecoration: "none"}}><u>Sign Up Now</u></a></h1>
                        <h1 className='signin-btm2'>This page is protected by Google reCAPTCHA to ensure you're not a bot.</h1>
                    </div>
                    </form>

                </div>

            </div>
            <div className='g-recaptcha'
            data-sitekey="6LcEeyopAAAAAKMbETotjIYVH1twrHf8Po6Kshgo"
            data-size="invisible"
            > </div>

        </div>
    )
}