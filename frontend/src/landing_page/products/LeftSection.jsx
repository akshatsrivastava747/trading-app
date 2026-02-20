import React from "react";

function LeftSection({
  imageUrl,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container border-bottom">
      <div className="row">
        <div className="col-lg-6 col-12 p-5">
          <img src={imageUrl} style={{width:"80%"}} />
        </div>
        <div className="col-lg-6 col-12 p-5 mt-lg-5">
          <h1>{productName}</h1>
          <p>{productDescription}</p>
          <div>
            <a href={tryDemo}>Demo</a>
            <a href={learnMore} style={{marginLeft:"50px"}}>Learn More</a>
          </div>
          <div className="mt-3">
          <a href={googlePlay}>
            <img src="/media/images/googlePlayBadge.svg" />
          </a>
          <a href={appStore} style={{marginLeft:"50px"}}>
            <img src="/media/images/appstoreBadge (1).svg" />
          </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
