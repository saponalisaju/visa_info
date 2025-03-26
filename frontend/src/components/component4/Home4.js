import React from "react";
import "./Home4.css";

import flag1 from "../../assets/images/pexels-photo-7885817.webp";

const Component4 = () => {
  return (
    <div className="main-three bg-info-subtle text-center">
      <div className="main-three-head">
        <h4 className=""> WE MAXIMIZE YOUR VISA APPROVAL GRANTEE</h4>
        <p className="">
          Provide thorough supporting documents, including financial proof and
          travel itinerary?
        </p>
      </div>
      <div className="image_1 ">
        <img src={flag1} alt="error" />
      </div>

      <div className="main-four text-center ">
        <h1 className=" ">CORPORATE OF YOUR TRAVEL</h1>
        <p className=" ">
          Corporate Travel Management involves planning, booking, and managing
          business trips for a company. It includes creating travel policies.
        </p>
      </div>
    </div>
  );
};

export default Component4;
