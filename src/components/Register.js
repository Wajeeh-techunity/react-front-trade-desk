import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import {Link} from "react-router-dom";
const apiURL = process.env.REACT_APP_API_URL;

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setErrors({
            ...errors,
            [name]: undefined,
        });

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = {};
        if (formData.password !== formData.confirmPassword) {
            validationErrors.confirmPassword = 'Passwords do not match';
        }


        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        sendDataToLaravel(formData);
    };


    const sendDataToLaravel = (data) => {
        axios
            .post(`${apiURL}/api/send-data`, {
                name: data.name,
                email: data.email,
                password: data.password,
                password_confirmation: data.confirmPassword,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                setSuccessMessage('User registered successfully');

            })
            .catch((error) => {
                console.error('Error:', error);
                if (error.response && error.response.data && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                }
            });
    };


    return (
    <section className="login">
        <Container fluid >
            <Row className="row align-items-center d-flex">
                <Col lg={5} sm={12} className="form_col">
                    <h2>Welcome To
                        Your Trading Desk!</h2>
                    <form onSubmit={handleSubmit} className="login_form">
                        <div className="input-div">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            className="form-control"
                            required
                            onChange={handleInputChange}
                            placeholder="User Name"
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                        </div>
                        <div className="input-div">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Email"
                        />

                        {errors.email && <span className="error">{errors.email}</span>}
                        </div>
                        <div className="pass">
                            <div className="input-div">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                onChange={handleInputChange}
                                value={formData.password}
                                required
                                placeholder="Password"
                            />
                            {errors.password && <span className="error">{errors.password}</span>}
                            </div>

                            <div className="input-div">
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="form-control"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                                placeholder="Confirm Password"
                            />
                            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                            </div>
                        </div>
                        <button className="register-btn btn_form" type="submit">Register</button>

                        {successMessage && (
                            <div className="success-message">
                                {successMessage}
                            </div>
                        )}
                    </form>
                    <div className="signup_opt">
                        <Link className="" to="/login">
                            Already have an account
                        </Link>
                        <button>Sign in</button>
                    </div>
                </Col>
                <Col lg={7} sm={12}>
                    <img src="assets/images/login_img.png" alt=""/>
                </Col>
            </Row>
        </Container>
    </section>
    );
};

export default RegistrationForm;