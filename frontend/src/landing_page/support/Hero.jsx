import React from "react";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div className="p-3 mt-5" id="supportWrapper">
        <h4 className="mt-3">Support Portal</h4>
        <a className="mt-3" href="">Track Tickets</a>
      </div>
      <div className="row p-5 mt-5">
        <div className="col-md-6 col-12 p-4">
          <h1 className="fs-3">Search for an answer or browse help topics to create a ticket</h1>
          <input className="mt-3 mb-3" placeholder="Eg. how do i activate F&O"/>
          <br/>
          <a href="">Track account opening</a>
          <a href="">Track segment activation</a>
          <a href="">Intraday margins</a>
          <a href="">Kite user manual</a>
        </div>
        <div className="row col-md-1"></div>
        <div className="col-md-5 col-12 p-4 mt-5 mt-md-0">
          <h1 className="fs-3">Featured</h1>
          <br/>
          <ol>
          <li><a href="">Current Takeovers and Delisting - January 2024</a></li>
          <li className="mt-3"><a href="">Latest Intraday leverages - MIS & CO</a></li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;
