import React from "react";
import { Link } from "react-router-dom";
import "./home1.css";
import "../../assets/styles/main.css";
import video from "../../assets/videos/video4.mp4";

const Component1 = () => {
  return (
    <>
      <div className="main_content ">
        <div className="main-one text-center">
          <div className="video-container">
            <video className="video-content" autoPlay loop muted id="video-bg">
              <source src={video} type="video/mp4" className="" /> Your browser
              does not support the video tag.
            </video>
            <div className="main_heading ">
              <div className="main_heading_one">
                <h1 className="head_title">WORLD JOB VISA</h1>
                <p className="work_text">( Work, Visit, Student )</p>
                <h4 className="heading-two text-white text-center ">
                  If you want to come to Australia, Canada, United States of
                  America, Italy to work you will need a visa that suits the
                  work you intend to do.
                </h4>
              </div>
              <div className="button">
                <Link
                  to="/enquiry"
                  type="button"
                  className="btnCheck btn   btn-outline-warning"
                >
                  CHECK APPLICATION STATUS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Component1;
