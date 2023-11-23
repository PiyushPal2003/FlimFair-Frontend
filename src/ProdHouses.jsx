import './ProdHouses.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default function ProdHouses() {
  return (
    <div>
        <h1 className='prodtitle det-text'>Everyone's Favourite</h1>
        <div className='prodhouses'>
            <Link to={`/studio/Disney`}><div className='disney-container'><video className='disney' loop autoplay="true"><source src="https://img10.hotstar.com/video/upload/sources/r1/cms/animations/qh3yh_1587393133132" type="video/mp4"/></video></div></Link>
        
            <Link to={`/studio/Pixar`}><div className='disney-container'><video className='disney' loop autoplay="true"><source src="https://img10.hotstar.com/video/upload/sources/r1/cms/animations/a6lr0r_1587393331483" type="video/mp4"/></video></div></Link>

            <Link to={`/studio/Marvel`}><div className='disney-container'><video className='disney' loop autoplay="true"><source src="https://img10.hotstar.com/video/upload/sources/r1/cms/animations/1on5cf_1587393232549" type="video/mp4"/></video></div></Link>

            <Link to={`/studio/StarWars`}><div className='disney-container'><video className='disney' loop autoplay="true"><source src="https://img10.hotstar.com/video/upload/sources/r1/cms/animations/utwmfd_1587393376512" type="video/mp4"/></video></div></Link>
        </div>

        
    </div>
  )
}
