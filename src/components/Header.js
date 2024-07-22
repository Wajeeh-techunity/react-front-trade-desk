import { Link, useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import RegisterPage from "../pages/RegisterPage";
import UserInfo from "../components/UserInfo"
import { useAuth } from '../components/AuthContext';
import React, { useState, useEffect } from 'react';

function Header() {
const storedLightMode = localStorage.getItem('lightMode') === 'true';
const [isLightMode, setIsLightMode] = useState(storedLightMode);

const toggleLightMode = () => {
  const newLightMode = !isLightMode;
  setIsLightMode(newLightMode);
  document.body.classList.toggle('light_mode', newLightMode);
  localStorage.setItem('lightMode', newLightMode);
};

const [hideFilterIcon, setHideFilterIcon] = useState(false);
const location = useLocation();

useEffect(() => {
    if (location.pathname.includes('/stocks')) {
        setHideFilterIcon(true);
    } else {
        setHideFilterIcon(false);
    }
}, [location]);

// Set light mode class on initial mount
useEffect(() => {
  document.body.classList.toggle('light_mode', isLightMode);
}, [isLightMode]);

  const { authenticated, logout } = useAuth();

  return (

    <>
      <header className="mastheader">
        <div className="container-fluid">
          <Navbar
            className="navbar navbar-expand-lg navbar-light bg-body-tertiary"
            expand="lg"
          >
            <Navbar.Brand className="navbar-brand" href="/">
              <Link className=" home-link" to="/">
                <h1 className="text-white">Your Trade Desk</h1>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className=" home-link" to="/">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="" to="/contact">
                    Contact
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="" to="/about">
                    About
                  </Link>
                </li>
                <li className="dropdown">
                  <a href="#" className="dropbtn">Trading Room <FaChevronDown className="custom-chevron" /></a>
                  <div className="dropdown-content">
                    <Link className="" to="/stocks">
                      Stocks
                    </Link>
                  </div>
                </li>
                {/* <li className="nav-item">
                  <Link className="" to="/register">
                    Register
                  </Link>
                </li> */}
                {authenticated ? (   
                  <>
                  {/* <li className="nav-item">
                    <Link className="" to="/dashboard">
                      Dashboard
                    </Link>
                  </li> */}
                  <UserInfo />                 
                  </>
                ) : (
                  <>
                  <li className="nav-item">
                    <Link className="" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                  <Link className="" to="/register">
                    Register
                  </Link>
                  </li>
                  </>
                )
                }
               
                
              </ul>
            </Navbar.Collapse>
            <div className="header-icon">
              <ul>
                <li>
                  <a href="#">
                    <img src="assets/images/search.png" />
                  </a>
                </li>
                {!hideFilterIcon && (
                    <li>
                        <a href="#" onClick={toggleLightMode}>
                            <img src="assets/images/filter.png" />
                        </a>
                    </li>
                )}           
              </ul>
            </div>
          </Navbar>
        </div>
      </header>
    </>
  );
}

export default Header;
