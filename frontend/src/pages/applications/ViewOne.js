import React from "react";
import "../../assets/styles/main.css";
import apiUrl from "../../secret";
import { useLocation } from "react-router-dom";
import Print from "./Print";
import logo from "../../assets/images/vws-logo-new-ref (1).webp";
// import flag from "../../assets/images/aus_flag.avif";
// import stamp_img from "../../assets/images/stamp_seal.png";
import moment from "moment";

const ViewOne = () => {
  const location = useLocation();
  const { applications } = location.state || {};

  if (!applications) {
    return <div>No application data found.</div>;
  }

  return (
    <React.Fragment>
      <main
        data-bs-spy="scroll"
        data-bs-target="#example2"
        data-bs-offset="0"
        className=" view_one_top "
        tabIndex="0"
        style={{ overflowY: "scroll", maxHeight: "100vh" }}
      >
        <div className="">
          <ul className="view_one_body ">
            {applications.map((application) => {
              const formattedDate = moment(
                application.dob,
                moment.ISO_8601
              ).format("YYYY-MM-DD");
              return (
                <li className=" " key={application._id}>
                  <h2 className=" view_one_head pb-3">
                    Applicants Copy({application.isStatus})
                  </h2>
                  <div className=" view_one_main">
                    <div className="d-flex me-auto ">
                      <div>
                        {application.image ? (
                          <img
                            className="user_image p-2"
                            src={`${application.image}`}
                            alt="Applicant"
                          />
                        ) : (
                          <p>No image available</p>
                        )}
                        {/* {application.isStatus === "approved" && (
                          <img
                            className="stamp_logo"
                            src={stamp_img}
                            alt="Approved Seal"
                          />
                        )} */}
                      </div>
                      {/* <img className="logo_p" src={flag} alt="flag" /> */}
                      <img className="logo_q " src={logo} alt="logo" />
                    </div>

                    <div className="border border-2 view_one mb-3">
                      <h2 className=" text-black fw-bold text-center text-bg-light text-uppercase">
                        {application.givenN}&nbsp;{application.surname}
                      </h2>

                      <div>
                        <h4 className=" p-2">A. Personal Particulars</h4>
                      </div>
                      <div className="surname_given">
                        <div className="d-flex surname_head_one">
                          <strong className="border surname_one">
                            Surname
                          </strong>
                          <span className="border surname_result_one">
                            {application.surname}
                          </span>
                        </div>
                        <div className="d-flex">
                          <strong className="border surname_one">
                            Given Name
                          </strong>
                          <span className="border surname_result_one">
                            {application.givenN}
                          </span>
                        </div>
                        <div className="d-flex sex_birth">
                          <div className="d-flex surname_head">
                            <strong className="border surname_sex_one">
                              Sex
                            </strong>
                            <span className="border surname_sex">
                              {application.sex}
                            </span>
                          </div>
                          <div className="d-flex surname_head">
                            <strong className="border surname_sex_one">
                              Date of Birth
                            </strong>
                            <span className="border surname_sex">
                              {formattedDate}
                            </span>
                          </div>
                        </div>
                        <div className="d-flex sex_birth">
                          <div className="d-flex surname_head">
                            <strong className="border surname_sex">
                              Place of Birth Town/City
                            </strong>
                            <span className="border surname_sex">
                              {application.birthCity}
                            </span>
                          </div>
                          <div className="d-flex surname_head">
                            <strong className="border surname_sex">
                              Visible Identification Marks
                            </strong>
                            <span className="border surname_sex">
                              {application.identification}
                            </span>
                          </div>
                        </div>
                        <div className="d-flex sex_birth">
                          <div className="d-flex surname_head">
                            <strong className="border surname_sex_one">
                              Current Nationality
                            </strong>
                            <span className="border surname_sex">
                              {application.currentN}
                            </span>
                          </div>
                          <div className="d-flex surname_head">
                            <strong className="border surname_sex_one">
                              National ID No
                            </strong>
                            <span className="border surname_sex">
                              {application.nationalId}
                            </span>
                          </div>
                        </div>
                      </div>

                      <h4 className=" p-2">B. Company Details</h4>

                      <div className="d-flex sex_birth">
                        <div className="d-flex surname_head">
                          <strong className="border surname_sex_one">
                            Company Name
                          </strong>
                          <span className="border surname_sex">
                            {application.company}
                          </span>
                        </div>
                        <div className="d-flex surname_head">
                          <strong className="border surname_sex_one">
                            Job Title
                          </strong>
                          <span className="border surname_sex">
                            {application.jobTitle}
                          </span>
                        </div>
                      </div>
                      <div className="d-flex sex_birth">
                        <div className="d-flex surname_head">
                          <strong className="border surname_sex">
                            Duty Duration
                          </strong>
                          <span className="border surname_sex">
                            {application.dutyDuration}
                          </span>
                        </div>
                        <div className="d-flex surname_head">
                          <strong className="border surname_sex">Salary</strong>
                          <span className="border surname_sex">
                            {application.salary}
                          </span>
                        </div>
                      </div>

                      <h4 className=" p-2">C. Passport Details</h4>

                      <div className="d-flex sex_birth">
                        <div className="d-flex surname_head">
                          <strong className="border surname_sex_one">
                            Passport No
                          </strong>
                          <span className="border surname_sex">
                            {application.passport}
                          </span>
                        </div>
                        <div className="d-flex surname_head">
                          <strong className="border surname_sex_one">
                            Issued Country
                          </strong>
                          <span className="border surname_sex">
                            {application.issuedCountry}
                          </span>
                        </div>
                      </div>

                      <h4 className=" p-2">D. Applicant's Contact Details</h4>

                      <div className="d-flex sex_birth">
                        <div className="d-flex surname_head">
                          <strong className="border surname_sex_one">
                            Phone
                          </strong>
                          <span className="border surname_sex">
                            {application.phone}
                          </span>
                        </div>
                        <div className="d-flex surname_head">
                          <strong className="border surname_sex_one">
                            Email
                          </strong>
                          <span className="border surname_sex email_user">
                            {application.email}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="view_one me-auto p-3">
                      <Print apiUrl={apiUrl} application={application} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="footer">
          <p className="footer_area text-center bg-dark-subtle">
            &copy; Copyright {new Date().getFullYear()} World Visa All Rights
            Reserved.
          </p>
        </div>
      </main>
    </React.Fragment>
  );
};

export default ViewOne;
