import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Banner.css';


function Banner() {
    const swipeIntervalRef = useRef(null);
    const [data, setData] = useState([]);
    const [key, setKey] = useState(0);

    function truncate(string, n){
        return string?.length>n ? string.substr(0, n-1) + '...' :string;
    }

    function fetchdata(){
        fetch("https://filmfair-server.vercel.app/movieinfo")
        .then((res)=>res.json())
        .then((dt)=>{
            console.log(dt);
            setData(dt);
        })
    }

    useEffect(()=>{
        fetchdata();
    }, [])

    function swipe(nextKey){
        const element = document.querySelector(`.banner${key}`);
        if (element) {
          element.style.zIndex = 1;
          element.style.opacity = 1;
    
          for (let i = key + 1; i <=data.length; i++) {
            const elem = document.querySelector(`.banner${i}`);
            if (elem) {
              elem.style.zIndex = 0;
              elem.style.opacity = 0;
                if(key===1){
                    const banner0 = document.querySelector(`.banner0`);
                    if(banner0){
                      banner0.style.zIndex = 0;
                      banner0.style.opacity = 0; } }
            }
          }
    
          setKey(nextKey);
        }
    }

    useEffect(() => {
        swipeIntervalRef.current = setInterval(() => {
          // Calculate the next key using modulo to loop back to 0 at the end
          const nextKey = (key + 1) % data.length;
          swipe(nextKey);
        }, 5000);
    
        return () => {
          clearInterval(swipeIntervalRef.current);
        };
      }, [key, data.length]);
      
      
        const navigate = useNavigate();

        function linkto(id){
        navigate(`/details/${id}`);
      }

    return(
        <div className='banner-container'>

            {data.map((ele, key)=>(
              <div className={`banner-main banner${key}`} style={{transition: "opacity 0.5s ease-in"}} key={key}>
                        <header className="banner" style={{backgroundImage: `url(${ele?.poster})`, backgroundSize: "cover", backgroundPosition: "center"}}>
                            
                        <div className='banner-title'>
                            <h1 className='ban-mov-tit1'>{ele?.movies_title}</h1><span className='ban-mov-tit2'>({ele?.year})</span>
                            <p className='ban-mov-tit3'>{truncate(`${ele?.desc}`, 150)}</p>
                            <button className='banner-play-btn' onClick={()=>linkto(ele._id)}>▶ Play Trailer</button>
                        </div>
                        <div className='fade'>
                        </div>
                        </header>
                        <button className='right' onClick={() => {
                                    clearInterval(swipeIntervalRef.current);
                                    const nextKey = (key + 1) % data.length;
                                    swipe(nextKey); }}>{">"}</button>
                    </div>
            ))}

        </div>
    )
}


export default Banner;