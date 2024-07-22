import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import { useAuth } from '../components/AuthContext';
import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;

function UserInfo() {
    const [userData, setUserData] = useState([]);
    const { authenticated, logout } = useAuth();

    useEffect(() => {
        
        const user_id = localStorage.getItem('user_id');        
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiURL}/api/resource?user_id=${user_id}`);
                
                setUserData(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData(); 
    }, []); 

    return (
        <>
        <li className="dropdown userinfo">
            {/* <Link className="dropbtn" to="/dashboard">Dashboard <FaChevronDown className="custom-chevron" /></Link> */}
            <Link className="dropbtn" to="/profile">Profile <FaChevronDown className="custom-chevron" /></Link>
            
            <div className="dropdown-content">                                      
                {/* <a href="javascript:void(0);" className="dropdown-item">{userData.name}</a>
                <a className="dropdown-item" href="javascript:void(0);">{userData.email}</a> */}
                <button className='logout' onClick={logout}>Logout</button>
            </div>
        </li>
        </>
    );
}

export default UserInfo;