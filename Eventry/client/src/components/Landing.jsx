import React from 'react';
import { Link } from 'react-router-dom';


const Landing = (props) => {
  return (
    <div className="loginregister">
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
    )
}

export default Landing;
