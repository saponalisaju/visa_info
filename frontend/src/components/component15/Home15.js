import React, { useEffect, useState } from "react";
import "./Home15.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faChartSimple,
  faCubes,
  faPaperPlane,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

const Component15 = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    setIsVisible(window.scrollY > 100);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="component_fifteen text-center">
      <h1 className="application_process  text-center bg-info-subtle ">
        Our Application Process
      </h1>
      <div className="bacground_page ">
        <div className="main_content_item  d-flex  bg-light  ">
          <div className="main-item-one ">
            <div className="processing_item_one">
              <FontAwesomeIcon icon={faPaperPlane} className="display-4 icon" />
              <h4 className="">APPLICATION</h4>
              <p className="">
                A visa is an official document granted by a government that
                permits a foreign national to enter, reside, or work within its
                borders for a specific purpose and duration. Emigration, on the
                other hand, refers to the act of leaving one's home country to
                settle permanently in another.
              </p>
            </div>
            <div className="processing_item_two ">
              <FontAwesomeIcon
                icon={faChartSimple}
                className="display-4 icon"
              />
              <h4>VISA FEES</h4>
              <p className="">
                A visa serves as an official permission slip for international
                travel, granting access to a specific country. There are various
                types of visas, such as tourist, work, student, and family-based
                visas, each tailored to different purposes.
              </p>
            </div>
          </div>
          <div className="main-item-two">
            <div className="processing_item_three ">
              <FontAwesomeIcon icon={faCubes} className="display-4 icon" />
              <h4 className="p-1">BIOMETRIC ACCEPT</h4>
              <p className="">
                {" "}
                Biometric data consists of measurable physical traits unique to
                an individual, such as fingerprints or facial features. When
                collected and stored in a secure database, this data aids in
                identity verification or cross-referencing for authentication.
              </p>
            </div>
            <div className="processing_item_four ">
              <FontAwesomeIcon
                icon={faChalkboardUser}
                className="display-4 icon"
              />
              <h4 className="p-1">VISA DECISION AND VALIDITY</h4>
              <p className="">
                While the outcome of an application cannot be guaranteed, most
                applicants receive a decision—whether approval or
                rejection—within a reasonable timeframe. Visa validity specifies
                the period during which the holder is authorized to travel to a
                port of entry, such as those in Australia.
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="copyright ">
        Copyright &copy; {new Date().getFullYear()} World Job Visa's. All Rights
        Reserved.
      </p>

      {isVisible && (
        <button onClick={scrollToTop} className="scroll-top">
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      )}
    </div>
  );
};

export default Component15;
