import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';


const apiURL = process.env.REACT_APP_API_URL;


const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_no: '',
    subject: '',
    address: '',
  });


  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const user_id = localStorage.getItem('user_id');
  const [userData, setUserData] = useState({});


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    sendDataToLaravel(formData);
  };


  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/resource?user_id=${user_id}`);
      setUserData(response.data);
      // Set the form data with user data
      setFormData({
        name: response.data.name,
        email: response.data.email,
        phone_no: response.data.phone_no,
        subject: response.data.subject,
        address: response.data.address,
        description: response.data.message,
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    fetchData(); // Fetch user data when the component mounts
  }, [user_id]);


  const sendDataToLaravel = (data) => {
    axios
      .post(
        `${apiURL}/api/update-user`,
        {
          address: data.address,
          subject: data.subject,
          phone_no: data.phone_no,
          description: data.description,
          user_id: user_id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        setSuccessMessage('User Updated Successfully');
        // Optionally, you can fetch updated user data after a successful update
        fetchData();
      })
      .catch((error) => {
        console.error('Error:', error);
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        }
      });
  };


  return (
    <section className="login profile_update">
      <Container fluid>
        <Row className="row align-items-center d-flex justify-content-center">
          <Col lg={12} sm={12}>
          <h2 className='text-center'>Update Profile</h2>
          </Col>
          <Col lg={4} sm={12} className='profile_sidebar'>
          <img src="assets/images/login_img.png" alt="" />
        <h4>Lorem Ipsum</h4>
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>


          </Col>
          <Col lg={8} sm={12} className="form_col">
            <form onSubmit={handleSubmit} className="login_form">
              <div className='info_box'>               
                 <div className='change_img'>
                  {/* <a href='javascript:;'><i class="fa-solid fa-pencil"></i></a> */}
                 <img src="assets/images/user_prof.png" alt="" />
                 </div>
                  <h4 className='user_name'>{formData.name}</h4>
              </div>
              {/* Populate form fields with initial values */}
              <div className="input-div">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                  readOnly
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
                  readOnly
                  placeholder="Email"
                />
              </div>


              <div className="input-div">
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                />
              </div>


              <div className="input-div">
                <input
                  type="text"
                  id="phone_no"
                  name="phone_no"
                  className="form-control"
                  value={formData.phone_no}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                />
              </div>


              <div className="input-div">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-control"
                  value={formData.subject}
                  onChange={handleInputChange}                  
                  placeholder="Subject"
                />
              </div>
              <div className="input-div">
                <textarea
                  type="textarea"
                  id="description"
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleInputChange}                  
                  placeholder="Description"
                />
              </div>


              <button className="register-btn btn_form" type="submit">
                Update
              </button>


              {successMessage && <div className="success-message">{successMessage}</div>}
            </form>
          </Col>
          {/* <Col lg={7} sm={12}>
            <img src="assets/images/login_img.png" alt="" />
          </Col> */}
        </Row>
      </Container>
    </section>
  );
};


export default Profile;