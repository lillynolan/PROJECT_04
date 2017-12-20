import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  return (
    <div className="navcontainer">
      <h1>Eventry</h1>
        <ul>
        {/*{if (props.userList) {
          <div>
            {props.userList.map((user) => {
             return (
                <div className="userdrop">
                  <a href="#">{user.firstname}</a>
                  </div>)}
               )}
            </div>
            }
          }*/}
          <button><Link to="/profile">My Events</Link></button>
          <button><Link to="/home">Add City Event</Link></button>
          <button><Link to="/createevent">Add Personal Event</Link></button>
          <button onClick={props.handleLogout}>Logout</button>
        </ul>
    </div>
    )
}

export default Nav;
