import React, { useEffect, useState, useContext } from 'react';
import ReactStars from 'react-stars';
import { UserContext } from './Router';
import './Moviedetail.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Moviedetail() {
  
  const usercontext = useContext(UserContext);

  const [ratedt, setRateDt] = useState([])
  const [data, setData] = useState({})
  const [usrreview, setUsrReview] = useState("");
  const [usrrating, setUsrRating] = useState("");
  let [loading, setLoading] = useState(true);
  
  let {id} = useParams();

  function fetchdata(){
    fetch("https://filmfare-server.vercel.app/details", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({id})
    })
    .then(res=>res.json())
    .then((dt)=>{
      console.log(dt);
      setData(dt);
      setLoading(false);
    });
  }

  function reviewrating() {
    fetch("https://filmfare-server.vercel.app/review", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({id})
    })
    .then(res=>res.json())
    .then(data=>{
      setUsrReview(data.reviews[usercontext.user])
      setUsrRating(data.ratings[usercontext.user])
      setRateDt(Object.values(data.ratings))
    })

    setTimeout(() => {
      wishliststatus();
    }, 2000);
  }

  function reviewchange(e){
    const value = e.target.value;
    setUsrReview(value);
  }

  function updatereviewrating(e){
    e.preventDefault();
    let usr = usercontext.user;
    fetch("https://filmfare-server.vercel.app/updatereviewrating", {
      method: "PATCH",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({id, usrreview, usrrating, usr})
    })
    .then(res=>res.json())
    .then(data=>{
      if(data=="Updated Successfully"){
        toast.success('ThankYou For Sharing', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }
    })
  }

  function ratefunc() {
    const ratedtAsFloats = ratedt.map(ele => parseFloat(ele));
    const sum = ratedtAsFloats.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const average = sum / ratedtAsFloats.length;
    const roundedAverage = average.toFixed(1);
    return roundedAverage;
  }

  function wishlist(){
      let usr = usercontext.user;
      fetch("https://filmfare-server.vercel.app/wishlist", {
        method: "PATCH",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({id, usr})
      })
      .then(res=>res.json())
      .then(data=>{
        document.querySelector("#wish").removeEventListener('click', wishlist);
        console.log(data);
        wishliststatus();

    })
  }

  function deleteWishlist(){
    let usr = usercontext.user;
    fetch("https://filmfare-server.vercel.app/deletewish", {
      method: "PATCH",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({id, usr})
    })
    .then(res=>res.json())
    .then(data=>{
      document.querySelector("#wish").removeEventListener('click', deleteWishlist);
      console.log(data);
      wishliststatus();

    })
  }

  function wishliststatus(){
      let usr = usercontext.user;
      fetch(`https://filmfare-server.vercel.app/wishlistStatus?usr=${usr}`, {
        method: "GET",
        headers: {"Content-Type":"application/json"}
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data.Wishlist)
        if(data.Wishlist.includes(id)){
          document.querySelector("#wish").innerHTML = "Remove from Wishlist";
            document.querySelector("#wish").addEventListener('click', deleteWishlist);
        } else{
          document.querySelector("#wish").innerHTML = "Add to Wishlist +";
          document.querySelector("#wish").addEventListener('click', wishlist);
         }
      });
  }
  
  
  useEffect(()=>{
    fetchdata();
    reviewrating();
    
  }, [])

  return (
    <div className='abcd' >
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
      <Navbar/>

      <div className="det-banner" style={{backgroundImage: `url(${data?.poster})`}}><div className='fade'></div></div>
      {/* md: height: "105rem" */}

      <div className='movie-details'>

        <div className='detail-body'>
        
            <div className='detail-header'>
                <img src={`${data.ver_poster}`} className='movdet-verposter'/>
                <div className='detail-header-txt'>
                  <h1 className='det-text' style={{fontSize: "5rem"}}>{`${data.movies_title}`}</h1>
                  <h1 style={{fontSize: "2.7rem"}} className='det-text'>Year: {`${data.year}`}</h1>
                  <h1>IMDB Rating: {`${data.rating}`}/10 ⭐</h1>
                  {(data.genre)?.map((element, index) => (
                    <span key={index} style={{border: "1px solid white", borderRadius: "1rem", fontSize: "2.6rem", lineHeight: "4rem", padding: "0 0.2rem", margin: "0.8rem 0.9rem 0.8rem 0"}}>{element}</span>
                    ))}
                  <h1>Description: {`${data.desc}`}</h1>
                  <button className='det-text wishlist' id='wish' >Add to WishList +</button>
                </div>
              </div>
          <h1 className='det-text flimfair-users trailer' >Watch the Trailer now🎬</h1>
          <iframe className='ytvid' src={`https://www.youtube.com/embed/${data.ytlink}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

          <h1 className='det-text flimfair-users' >FlimFare Users Ratings</h1>

          <h1>{ratefunc()}/5 ⭐</h1>
        </div>

      <div className='review'>
        <form>
        <h1 style={{fontSize:"4rem", margin: "2.5rem 0 2rem 0"}}>Share Your Thoughts</h1>
        <h1>Rate it Now</h1><ReactStars
          size={26}
          half={true}
          onChange={(rate)=> setUsrRating(rate)}
          value={usrrating}
        />

        <h1 style={{margin: "1.5rem 0 0 0"}}>Write It Down</h1>
        <textarea type='text' name='usreview' className='usreview' placeholder='Review' value={usrreview} onChange={reviewchange}/>
        <button type='submit' className='review-submit' onClick={(e)=>updatereviewrating(e)}>Share</button>
        </form>
      
        </div>

    </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Footer/>
      </>)}
    </div>
  )
}