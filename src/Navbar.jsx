import { Link } from 'react-router-dom';
import './Navbar.css';

import React, { useEffect, useState } from 'react';

function Navbar() {
  const [show, setShow] = useState(false);

  const Navbar= ()=>{
    if(window.scrollY > 100){
      setShow(true);
    } else{
      setShow(false);
    }
  }

  function Hamburger(){
    const menu_btn = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.mobile-nav');

    menu_btn.addEventListener('click', function(){
      menu_btn.classList.toggle('is-active');
      mobile_menu.classList.toggle('is-active');
    })
  }

  useEffect(()=>{
    window.addEventListener("scroll", Navbar);
    return ()=>window.removeEventListener("scroll", Navbar);
  }, []);

  useEffect(()=>{
    Hamburger();
  })

  return (
      <div>
          <div className={`main ${show && 'black'}`}>
            <div className='main-nav-div'>
              <div className='nav-logo'>
              <h1 className='title'>FlimFair</h1>
              </div>
                  
            {/* <Link to={'/profile'}><img src='/assets/user-img.png' style={{height: "5.5rem", margin: "0.5rem"}}/></Link> */}
            <ul className='nav-items'>
              <li><Link to='/profile'>Profile</Link></li>
              <li><Link to='/wishlist'>Wishlist</Link></li>
            </ul>
            <button className='hamburger'>
              <div className='bar'></div>
            </button>
            </div>
          </div>

          <ul className='mobile-nav'>
              <li><Link to='/profile'>Profile</Link></li>
              <li><Link to='/wishlist'>Wishlist</Link></li>
          </ul>

      </div>
  );
}

export default Navbar;