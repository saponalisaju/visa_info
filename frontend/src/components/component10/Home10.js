import React from "react";
import "./Home10.css";
import { Link } from "react-router-dom";

const Component10 = () => {
  return (
    <div className="section-nine bg-info-subtle">
      <div className="section-nine-one text-center">
        <h1 className="">Apply and Check your eligibility</h1>
        <p className="security_account">
          Check the status of your disability benefits application online using
          your personal My Social Security account. Additionally, review the
          visa application process to work in Australia and ensure you meet all
          eligibility criteria for a smooth experience.&nbsp;
          <Link to="https://www.nationwideedu.com/">
            visa process to work in Australia.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Component10;
