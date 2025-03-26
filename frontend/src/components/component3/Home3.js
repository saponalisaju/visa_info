import React from "react";
import "./Home3.css";
import Imag1 from "../../assets/images/th.jpeg";
import Imag2 from "../../assets/images/gear_2 (2)(1).png";
import Imag3 from "../../assets/images/gear_3.png";

const Component3 = () => {
  return (
    <div className="section-two ">
      <div className="main-two bg-info-subtle">
        <h1 className="text-center text-uppercase">How We Work</h1>
        <h4 className="text-center">
          We excel by conducting thorough research, crafting detailed plans,
          executing tasks with precision, fostering effective communication,
          embracing adaptability, and continuously refining our processes to
          ensure success.
        </h4>
      </div>
      <div className="section-two-a d-flex pb-5">
        <div className="para-1 text-center ">
          <img
            className="border border-5 rounded-circle-pill"
            src={Imag1}
            alt="loading"
          />

          <h4 className="">Assessment</h4>
          <p className="">
            We prioritize identifying objectives, designing effective tasks,
            administering comprehensive assessments, collecting insightful data,
            analyzing results, providing constructive feedback, and adjusting
            instruction based on findings.
          </p>
        </div>
        <div className="para-2 text-center ">
          <img
            className="border border-5 rounded-circle-pill"
            src={Imag2}
            alt="loading"
          />

          <h4 className="">Processing and Communication</h4>
          <p className="">
            Effective processing and communication are vital for successful
            interactions across personal, academic, and professional contexts.
            They ensure that information is not only shared but also
            comprehended and applied effectively to achieve desired outcomes.
          </p>
        </div>
        <div className="para-3 text-center ">
          <img
            className="border border-5 rounded-circle-pill"
            src={Imag3}
            alt="loading"
          />
          <h4 className="">Result</h4>
          <p className="">
            Visa processing generally takes approximately 3 to 5 weeks.
            Following this, the consulate will inform you of their decision. The
            delivery of the visa may require up to two additional working days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Component3;
