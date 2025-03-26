import React, { useEffect, useState } from "react";
import "../../assets/styles/main.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import api from "./api";
// import logo_p from "../../assets/images/aus_flag.avif";
import logo_q from "../../assets/images/vws-logo-new-ref (1).webp";
import moment from "moment";

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const label = {
  file1: "Job Letter",
  file2: "Lmias",
  file3: "Visa",
  file4: "Visa Form",
  file5: "Work Permit",
  file6: "Air Tickets",
};

const FileInput = ({
  fileKey,
  handleChange,
  fileError,
  file,
  loading,
  serverImage,
}) => (
  <div className="pb-4 user_view_body p-2">
    <span className="fw-bold p-2">{label[fileKey]}</span>
    <div className="d-flex pb-3 ">
      <input
        id="file"
        className="form-control ms-auto "
        type="file"
        name={fileKey}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="btn btn-outline-info btn-sm upload_btn"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>

    <div className="w-100">
      {file ? (
        <img
          className="preview_image"
          src={URL.createObjectURL(file)}
          alt="Attachment"
        />
      ) : (
        serverImage && (
          <img className="view_image" src={serverImage} alt="Attachment" />
        )
      )}
    </div>
    {fileError && <p style={{ color: "red" }}>{fileError}</p>}
  </div>
);

const UserView = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(" ");
  const [files, setFiles] = useState({
    file1: null,
    file2: null,
    file3: null,
    file4: null,
    file5: null,
    file6: null,
  });
  const [fileErrors, setFileErrors] = useState({
    file1: "",
    file2: "",
    file3: "",
    file4: "",
    file5: "",
    file6: "",
  });
  const [formData, setFormData] = useState({
    surname: " ",
    givenN: " ",
    email: " ",
    phone: " ",
    nationalId: " ",
    sex: "",
    dob: " ",
    birthCity: " ",
    currentN: " ",
    identification: "",
    company: " ",
    dutyDuration: " ",
    jobTitle: " ",
    salary: " ",
    image: "",
    passport: " ",
    issuedCountry: " ",
  });
  const [serverImages, setServerImages] = useState({
    file1: "",
    file2: "",
    file3: "",
    file4: "",
    file5: "",
    file6: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setError("");
    setLoading(true);

    try {
      if (location.state) {
        setId(location.state._id);
        setFormData(location.state);

        const loadedImages = {};
        for (const [key, value] of Object.entries(location.state)) {
          if (key.startsWith("file") && value) {
            loadedImages[key] = value;
          }
        }
        setServerImages(loadedImages);
        setLoading(false);
      } else {
        navigate("/application");
      }
    } catch (error) {
      console.error("Error loading application data:", error);
      setError("Error loading application data. Please try again.");
      setLoading(false);
    }
  }, [location.state, navigate]);

  const validateFile = (file) => {
    const fileType = file.type.toLowerCase();
    if (!ALLOWED_FILE_TYPES.includes(fileType)) {
      return `Invalid file type. Only JPEG, JPG, and PNG are allowed.`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `File size exceeds the limit of 10MB.`;
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setLoading(true);
    const validationError = validateFile(file);
    if (validationError) {
      setFileErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validationError,
      }));
    } else {
      setFileErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
      setFiles((prevFiles) => ({
        ...prevFiles,
        [name]: file,
      }));
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formDataWithFiles = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      formDataWithFiles.append(key, value);
    }
    for (const [key, value] of Object.entries(files)) {
      if (value) {
        formDataWithFiles.append(key, value);
      }
    }

    try {
      const response = await api.put(
        `/updateApplicationAdd/${id}`,
        formDataWithFiles,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 20000,
        }
      );
      if (response?.status === 200) {
        setFiles({
          file1: null,
          file2: null,
          file3: null,
          file4: null,
          file5: null,
          file6: null,
        });
        navigate("/application", { replace: true });
      } else {
        setError("Failed to update application.");
      }
    } catch (error) {
      console.error("Error updating application:", error);
      setError("Error updating application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setLoading(true);
    setError("");
    try {
      const response = await api.put(`/updateApplicationApprove/${id}`, {
        timeout: 5000,
      });
      if (response?.status === 200) {
        navigate("/userView", { replace: true });
      } else {
        setError(
          `Failed to approve application. Server responded with status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error approving application:", error);
      setError(
        `Error approving application: ${
          error.response ? error.response.data.message : error.message
        }. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePending = async (id) => {
    setLoading(true);
    setError("");
    try {
      const response = await api.put(`/updateApplicationPending/${id}`);
      if (response?.status === 200) {
        navigate("/userView", { replace: true });
      } else {
        setError(
          `Failed to pending application. Server responded with status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error pending application:", error);
      setError(
        `Error pending application: ${
          error.response ? error.response.data.message : error.message
        }. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id) => {
    setLoading(true);
    setError("");
    try {
      const response = await api.put(`/updateApplicationReject/${id}`);
      if (response?.status === 200) {
        navigate("/userView", { replace: true });
      } else {
        setError(
          `Failed to reject application. Server responded with status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error rejecting application:", error);
      setError(
        `Error rejecting application: ${
          error.response ? error.response.data.message : error.message
        }. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (e) => {
    e.target.src =
      "https://res.cloudinary.com/dfkurqnpj/image/upload/v1740317988/travelApp/applications/default.jpg";
  };

  const formattedDate = moment(formData.dob, moment.ISO_8601).format(
    "YYYY-MM-DD"
  );

  return (
    <>
      <React.Fragment>
        <main
          data-bs-spy="scroll"
          data-bs-target="#example2"
          data-bs-offset="0"
          className="p-4 user_view_body "
          tabIndex="0"
          style={{ overflowY: "scroll", maxHeight: "100vh" }}
        >
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <h2 className="  pb-3">Applicants Copy ({formData.isStatus})</h2>

          <div className="user_view_body border border-2">
            <div className="d-flex me-auto">
              {formData.image ? (
                <img
                  className="user_image mb-2 p-1"
                  src={
                    formData.image ||
                    "https://res.cloudinary.com/dfkurqnpj/image/upload/v1740317988/travelApp/application/image.jpg"
                  }
                  alt="Slider Thumbnail"
                  onError={handleImageError}
                />
              ) : (
                <p>No image available</p>
              )}
              {/* <img className="logo_p " src={logo_p} alt="flag" /> */}
              <img
                className="logo_q bg-danger-subtle"
                src={logo_q}
                alt="brand-logo"
              />
            </div>
            <div className="border border-2 view_one mb-2 ">
              <h2 className="text-black fw-bold text-center text-bg-light text-uppercase">
                {formData.givenN}&nbsp;{formData.surname}
              </h2>

              <div>
                <h4 className=" p-2">A. Personal Particulars</h4>
              </div>
              <div className="surname_given ">
                <div className="d-flex surname_head_one">
                  <strong className="border surname_one">Surname</strong>
                  <span className="border surname_result_one">
                    {formData.surname}
                  </span>
                </div>
                <div className="d-flex">
                  <strong className="border surname_one">Given Name</strong>
                  <span className="border surname_result_one">
                    {formData.givenN}
                  </span>
                </div>
                <div className="d-flex sex_birth">
                  <div className="d-flex surname_head">
                    <strong className="border surname_sex_one">Sex</strong>
                    <span className="border surname_sex">{formData.sex}</span>
                  </div>
                  <div className="d-flex surname_head">
                    <strong className="border surname_sex_one">
                      Date of Birth
                    </strong>
                    <span className="border surname_sex">{formattedDate}</span>
                  </div>
                </div>
                <div className="d-flex sex_birth">
                  <div className="d-flex surname_head">
                    <strong className="border surname_sex">
                      Place of Birth Town/City
                    </strong>
                    <span className="border surname_sex">
                      {formData.birthCity}
                    </span>
                  </div>
                  <div className="d-flex surname_head">
                    <strong className="border surname_sex">
                      Visible Identification Marks
                    </strong>
                    <span className="border surname_sex">
                      {formData.identification}
                    </span>
                  </div>
                </div>
                <div className="d-flex sex_birth">
                  <div className="d-flex surname_head">
                    <strong className="border surname_sex_one">
                      Current Nationality
                    </strong>
                    <span className="border surname_sex">
                      {formData.currentN}
                    </span>
                  </div>
                  <div className="d-flex surname_head">
                    <strong className="border surname_sex_one">
                      National ID No
                    </strong>
                    <span className="border surname_sex">
                      {formData.nationalId}
                    </span>
                  </div>
                </div>
              </div>

              <h4 className="p-2">B. Company Details</h4>

              <div className="d-flex sex_birth">
                <div className="d-flex surname_head">
                  <strong className="border surname_sex_one">
                    Company Name
                  </strong>
                  <span className="border surname_sex">{formData.company}</span>
                </div>
                <div className="d-flex surname_head">
                  <strong className="border surname_sex_one">Job Title</strong>
                  <span className="border surname_sex">
                    {formData.jobTitle}
                  </span>
                </div>
              </div>
              <div className="d-flex sex_birth">
                <div className="d-flex surname_head">
                  <strong className="border surname_sex">Duty Duration</strong>
                  <span className="border surname_sex">
                    {formData.dutyDuration}
                  </span>
                </div>
                <div className="d-flex surname_head">
                  <strong className="border surname_sex">Salary</strong>
                  <span className="border surname_sex">{formData.salary}</span>
                </div>
              </div>

              <h4 className=" p-2">C. Passport Details</h4>

              <div className="d-flex sex_birth">
                <div className="d-flex surname_head">
                  <strong className="border surname_sex_one">
                    Passport No
                  </strong>
                  <span className="border surname_sex">
                    {formData.passport}
                  </span>
                </div>
                <div className="d-flex surname_head">
                  <strong className="border surname_sex_one">
                    Issued Country
                  </strong>
                  <span className="border surname_sex">
                    {formData.issuedCountry}
                  </span>
                </div>
              </div>

              <h4 className=" p-2">D. Applicant's Contact Details</h4>

              <div className="d-flex sex_birth">
                <div className="d-flex surname_head">
                  <strong className="border surname_sex_one">Phone</strong>
                  <span className="border surname_sex">{formData.phone}</span>
                </div>
                <div className="d-flex surname_head">
                  <strong className="border surname_sex_one">Email</strong>
                  <span className="border surname_sex email_user">
                    {formData.email}
                  </span>
                </div>
              </div>
            </div>
            <div className="upload_head pb-2 ">
              <div className="file_upload  ">
                <form
                  onSubmit={handleSubmit}
                  className="form-control"
                  encType="multipart/form-data"
                >
                  {Object.keys(files).map((fileKey) => (
                    <FileInput
                      key={fileKey}
                      fileKey={fileKey}
                      handleChange={handleChange}
                      fileError={fileErrors[fileKey]}
                      file={files[fileKey]}
                      loading={loading}
                      serverImage={serverImages[fileKey]}
                    />
                  ))}
                </form>
              </div>
            </div>
            <div className="justify-content-end d-flex theme_description ">
              <Link
                onClick={() => handlePending(id)}
                className="btn btn-secondary btn_approved"
              >
                Pending
              </Link>
              <Link
                className="btn btn-primary btn_approved"
                onClick={() => handleApprove(id)}
              >
                Approve
              </Link>
              <Link
                className="btn btn-danger btn_approved"
                onClick={() => handleReject(id)}
              >
                Reject
              </Link>
            </div>
            {error && <div style={{ color: "red" }}>{error}</div>}
          </div>
          <div className="footer">
            <p className="footer_area text-center">
              &copy; Copyright {new Date().getFullYear()} World Visa All Rights
              Reserved.
            </p>
          </div>
        </main>
      </React.Fragment>
    </>
  );
};

export default UserView;
