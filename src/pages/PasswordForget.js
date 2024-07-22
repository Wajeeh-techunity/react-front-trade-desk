import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import loaderGif from '../loader.gif'


const apiURL = process.env.REACT_APP_API_URL;

const PasswordForget = () => {
  const [email, setEmail] = useState('');  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

    const initiatePasswordReset = async () => {
      var element = document.getElementById("loader");
      element.style.display = "block";
      
      try {
        const response = await axios.post(
          `${apiURL}/api/forgot-password`,
          { email: email },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
    
        if (response.status >= 200 && response.status < 300) {
          element.style.display = "none";
          setSuccessMessage(response.data.status);
        } else {
          // Handle other non-success responses
          setErrorMessage(response.data.message);
          console.error('Non-success Response:', response.data);
        }
      } catch (error) {
        // Handle error responses
        console.error('Axios Error:', error);
    
        if (error.response && error.response.status === 422) {
          // Handle validation errors
          const validationErrors = error.response.data.errors;
          if (validationErrors && validationErrors.email) {
            setErrorMessage(validationErrors.email[0]);
          } else {
            setErrorMessage('Validation error. Please check your input.');
          }
        } else {
          // Handle other errors
          setErrorMessage('An error occurred. Please try again later.');
        }
      }
    };
  
  return (
    <section className="login profile_update login">
      <Container fluid>
          <Row className="row align-items-center d-flex justify-content-center">
            <Col lg={5} sm={12} className="form_col">
              <h2>Initiate Password Reset</h2>
              <form className="login_form">
              <div className="input-div"> 
              <input type="email" placeholder="Your Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <button type='button' className="register-btn btn_form" id='rest_btn' onClick={initiatePasswordReset}>Send Reset Email</button>   
              <img id='loader' src={loaderGif} alt=""/>   
              {successMessage && <div className="success-message">{successMessage}</div>}
              {errorMessage && <div className="error-message">{errorMessage}</div>}
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

export default PasswordForget;