import './Homescreen.css';
import Navbar from "./Navbar";
import Banner from "./Banner";
import Trendrow from "./Trendrow";
import ClipLoader from "react-spinners/ClipLoader";
import React, { useEffect, useState } from 'react';

export default function Homescreen() {
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 400);
    }, [])
    return (
        <div>
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
                    <Navbar />
                    <Banner />
                    <Trendrow />
                </>)}
        </div>
    )
}
