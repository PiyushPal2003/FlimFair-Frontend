import React from 'react';
import './Footer.css';


function Footer() {
  return (
    <div className='footer-main'>
      <div className='gif'>
        <div>
          <div className='footer-head'>
              <h1 className='title2'>FlimFair</h1>
          </div>
          <h1 className='myname'>Developed with ❤ by PiyushPal</h1>

          <div className='footer-content'>
              <h1>Lets Connect😊</h1>
              <div class="follow">
                  <a href="https://www.facebook.com/" class="fa fa-facebook"></a>
                  <a href="https://twitter.com/explore" class="fa fa-twitter"></a>
                  <a href="https://www.instagram.com/__piyushpal__/" class="fa fa-instagram"></a>
                  <a href="https://www.linkedin.com/in/piyush-pal-52a18722a/" class="fa fa-linkedin"></a>
              </div>
          </div>
        </div>
        <div className='nav-gif'>
          <img className='foot-img' src='/assets/FlimFair-GIF.png'/>
        </div>
      </div>

        <h1 style={{fontSize: "1.5rem", textAlign:"center"}}>Please report if you encounter any Bugs</h1>
    </div>
  )
}

export default Footer;