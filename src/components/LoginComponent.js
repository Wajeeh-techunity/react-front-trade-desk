import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
const apiURL = process.env.REACT_APP_API_URL;

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${apiURL}/api/user-login`, {
                email: email,
                password: password,
            });

            if (response.data.token) {
                
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user_id', response.data.user_id);
                localStorage.setItem('user_name', response.data.user_name);
                
                window.location.href = '/profile'; 
            } else {                
                
            }
        } catch (error) {
            console.error(error);
            
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('An error occurred while logging in.');
            }
        }
    };


    return (
        <section className="login">
        <Container fluid>
            <>           
                <Row className="row align-items-center d-flex">
                    <Col lg={5} sm={12} className="form_col">
                        <h2>Welcome To Your Trading Desk!</h2>
                        <form className="login_form">
                        <div className="input-div">
                            <input type="email" name={'email'} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />                
                        </div>
                        <div className="input-div">
                            <input type="password" name={'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />                   
                        </div>
                        
                        <button type='button' className="register-btn btn_form" onClick={handleLogin}>Login</button>
                        
                        {errorMessage && <p className="error-message">{errorMessage}</p>}

                        <div className='pt-3'>
                            <a  className='text-center' href='passwordforget'>Forgot Your Password?</a>
                        </div>

                        </form> 

                       
                       

                    </Col>
                    <Col lg={7} sm={12}>
                        <img src="assets/images/login_img.png" alt=""/>
                    </Col>
                </Row>                               
            </>
        </Container>
        </section>
    );
};

export default LoginComponent;
