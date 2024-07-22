// PasswordForget.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import loaderGif from '../loader.gif'

const apiURL = process.env.REACT_APP_API_URL;

const PasswordReset = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  useEffect(() => {
    // Fetch email from your API or any other logic if needed
    // Example: fetchEmail(token).then((email) => setEmail(email));
  }, [token]);

  const resetPassword = async () => {

    var element = document.getElementById("loader");
    element.style.display = "block";

    try {
      const response = await axios.post(
        `${apiURL}/api/reset-password`,
        {
          token: token,
          email: email,
          password: password,
          password_confirmation: confirmPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      element.style.display = "none";
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="password-forget login profile_update login">
      <Container fluid>
        <Row className="row align-items-center d-flex justify-content-center">
          <Col lg={5} sm={12} className="form_col">
            <h2>Complete Password Reset</h2>
            <form className="login_form">
              <div className="input-div">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
              </div>
              <div className="input-div">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" />
              </div>
              <div className="input-div">
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
              </div>
              <button type='button' className="register-btn btn_form" onClick={resetPassword}>Reset Password</button>
              <img id='loader' src={loaderGif} alt=""/>  
              {successMessage && <div className="success-message">{successMessage}</div>}
            </form> 
          </Col>
          <Col lg={7} sm={12}>
              <img src="assets/images/login_img.png" alt=""/>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PasswordReset;
