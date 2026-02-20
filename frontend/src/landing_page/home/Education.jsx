import React from 'react';


function Education() {
    return ( 
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-lg-6 col-12 mb-5 mb-lg-0 p-lg-5'>
                    <img src="/media/images/education.svg" style={{width:"100%"}}/>
                </div>
                <div className='col-lg-6 col-12 mb-5 mt-5 mt-lg-5 mb-lg-0 p-lg-5 mt-3'>
                    <h1 className='fs-2'>Free and open market education</h1>
                    <p className='mt-5'>Varsity, the largest online stock market education book in the world
                    covering everything from the basics to advanced trading.</p>
                    <a href="" style={{textDecoration:"none"}}>Versity <i class="fa-solid fa-arrow-right"></i></a>
                    <p className='mt-5'>Varsity, the largest online stock market education book in the world
                    covering everything from the basics to advanced trading.</p>
                    <a href="" style={{textDecoration:"none"}}>TradingQ&A <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
    );
}

export default Education;