import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { CiEdit } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';




const apiURL = process.env.REACT_APP_API_URL;


const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const user_id = localStorage.getItem('user_id');
  const { authenticated, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {      
        if (!authenticated) {
            navigate('/login');
        } 
    }, [authenticated, navigate]);


  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/resource?user_id=${user_id}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch user data when the component mounts
  }, [user_id]);

  return (
    
    <section className="user-profile login profile_update">
      <Container fluid>
        <Row className="row align-items-center d-flex justify-content-center">
          <Col lg={12} sm={12}>
            <h2 className='text-center'>User Profile</h2>
          </Col>
          <Col lg={4} sm={12} className='profile-sidebar'>
            <img src="assets/images/login_img.png" className='w-100' alt="" />
            <h4>{userData.name}</h4>
            <span className='edit_profile_btn'>
                <Link className="" to="/editprofile">
                    <CiEdit />Edit Profile
                </Link>
            </span>
            <span>{userData.description}</span>
          </Col>
          <Col lg={8} sm={12} className="user-details">
            <div className="user-info">
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Address:</strong> {userData.address}</p>
              <p><strong>Phone Number:</strong> {userData.phone_no}</p>
              <p><strong>Subject:</strong> {userData.subject}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};


export default UserProfile;