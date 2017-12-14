import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  return (
    <div className="navcontainer">
      <nav>
        <ul>
          <li><Link to="/profile">My Events</Link></li>
          <li><button onClick={props.handleLogout}>Logout</button></li>
        </ul>
      </nav>
    </div>
    )
}

export default Nav;
