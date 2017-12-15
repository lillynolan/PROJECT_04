import React, { Component } from 'react';
import Auth from '../modules/Auth';
import Nav from './Nav'


class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      myEventList: null,
      myEventListLoaded: false,
    }
    this.deleteEvent = this.deleteEvent.bind(this)
  }

//calling getuserEvents function on page load
  componentDidMount() {
  this.getUserEvents()
  }


//fetching events from events table
  getUserEvents() {
  fetch('/events/')
  .then(res => res.json())
  .then(res => {
    console.log(res)
    this.setState({
      myEventList: res.events,
      myEventListLoaded: true,
    })
  }).catch(err => console.log(err))
}

//deleting event by event id from events table
deleteEvent(id) {
  fetch(`/events/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${Auth.getToken()}`,
      token: Auth.getToken(),
    },
  }).then(() => {
    this.getUserEvents()
  }).catch(err => console.log(err))
}


render() {
  if (!this.state.myEventListLoaded) {
    return (
      <div className="usercontainer">
        <Nav handleLogout={this.props.handleLogout}/>
        <div className="userdashboard">
          <h1>Add Events to your Dashboard</h1>
        </div>
      </div>
      )
  } else {
  return (
    <div className="usercontainer">
      <Nav handleLogout={this.props.handleLogout}/>
      <div className="userresults">
          <h1>My Events</h1>
          {this.state.myEventList.map((event, index) => {
        return(
            <div className="userevents" key={index}>
             <h2 className="result">{event.name}</h2>
              <p className="result">{event.venue}</p>
              <p className="result">{event.date}</p>
              <p className="result">{event.time}</p>
              <p className="result">{event.city} {event.stateCode}</p>
              <p className="result">{event.classification}: {event.genre}</p>
              <button onClick={() => {this.deleteEvent(event.id)}}>Delete</button>
            </div>
        )}
        )}
      </div>
      </div>
      )}
    }
  }


export default UserProfile;

//referenced react-rails-monsters app/lesson
