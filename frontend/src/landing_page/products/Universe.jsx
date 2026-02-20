import React from "react";

function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
        <div className="col-lg-4 col-12 p-3 mt-4">
          <img src="/media/images/smallcaseLogo.png" />
          <p className="text-small text-muted mt-2">Thematic investment platform</p>
        </div>
        <div className="col-lg-4 col-12 p-3 mt-4">
          <img src="/media/images/streakLogo.png" style={{width:"55%"}} />
          <p className="text-small text-muted mt-2">Algo & strategy platform</p>
        </div>
        <div className="col-lg-4 col-12 p-3 mt-4">
          <img src="/media/images/sensibullLogo.svg"  style={{width:"85%"}} />
          <p className="text-small text-muted mt-3">Options trading platform</p>
        </div>
        <div className="col-lg-4 col-12 p-3 mt-4">
          <img src="/media/images/zerodhaFundhouse.png" style={{width:"65%"}} />
          <p className="text-small text-muted mt-2">Asset management</p>
        </div>
        <div className="col-lg-4 col-12 p-3 mt-4">
          <img src="/media/images/goldenpiLogo.png" />
          <p className="text-small text-muted mt-4">Bonds trading platform</p>
        </div>
        <div className="col-lg-4 col-12 p-3 mt-4">
          <img src="/media/images/dittoLogo.png" style={{width:"45%"}}/>
          <p className="text-small text-muted mt-2">Insurance platform</p>
        </div>
      </div>
    </div>
  );
}

export default Universe;
