import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  return (
    <div className="navcontainer">
        <ul>
          <button><Link to="/profile">My Events</Link></button>
          <button><Link to="/home">Add Event</Link></button>
          <button onClick={props.handleLogout}>Logout</button>
        </ul>
    </div>
    )
}

export default Nav;
