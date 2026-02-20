import React from 'react';
import {useNavigate} from "react-router-dom";

function Hero() {
    const navigate=useNavigate();                         
    return ( 
        <div className='container p-5'>
            <div className='row text-center'>
                <img src="/media/images/homeHero.png" alt="Hero Image" className='mb-5'/>
                <h1 className='mt-lg-5'>Invest in everything</h1>
                <p>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
                <button className='p-2 btn btn-primary fs-5' style={{width:"25%",margin:"0 auto"}} onClick={() => navigate("/signup")}>Signup Now</button>
            </div>
        </div>
     );
}

export default Hero;