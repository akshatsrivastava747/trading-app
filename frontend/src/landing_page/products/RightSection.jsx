import React from "react";

function RightSection({
  imageUrl,
  productName,
  productDescription,
  learnMore,
}) {
  return (
    <div className="container  border-bottom">
      <div className="row">
        <div className="col-lg-6 col-12 p-5 mt-lg-5">
          <h1>{productName}</h1>
          <p>{productDescription}</p>
          <div>
            <a href={learnMore}>
              Learn More
            </a>
          </div>
        </div>
        <div className="col-lg-6 col-12 p-5">
          <img src={imageUrl} style={{ width: "80%" }} />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
