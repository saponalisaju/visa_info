import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Login from "../../pages/Login";
import "./header.css";
import logo from "../../assets/images/vws-logo-new-ref (1).webp";

const Header = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar expand="lg" className={`fixed-top ${active ? "active-nav" : ""}`}>
        <NavLink to="/">
          <img className="_img" src={logo} alt="Logo" />
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav " className="me-5" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto fs-5">
            <ul className="d-flex ">
              <li className="">
                <NavLink className="btnHome " to="/">
                  HOME
                </NavLink>
              </li>
              <li>
                <NavLink className="btnHome" to="/enquiry">
                  ENQUIRY
                </NavLink>
              </li>
              <li className="button_li">
                <button
                  onClick={toggleSidebar}
                  className="button-style btn btn-outline-info btn-sm"
                >
                  {isOpen ? "LOGIN" : "LOGIN"}
                </button>
              </li>
            </ul>
            <div
              className="sidebar-style"
              style={{ right: isOpen ? "0" : "-25rem" }}
            >
              <Login />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
