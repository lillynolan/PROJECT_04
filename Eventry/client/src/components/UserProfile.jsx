import React, { Component } from 'react';
import Auth from '../modules/Auth';
import Nav from './Nav'
import Moment from 'react-moment';


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
            let time = new Date (event.localtime)
        return(
            <div className="userevents" key={index}>
              <h2 className="result">{event.city}</h2>
              <h3 className="result">{event.name}</h3>
              <img className="result" src={event.url}/>
              <p className="result">{event.venue}</p>
              <p className="result"><Moment format="MMMM DD YYYY">{event.date}</Moment></p>
              <p className="result">at {time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
             {/* referenced for converting time and only showing seconds, https://stackoverflow.com/questions/17913681/how-do-i-use-tolocaletimestring-without-displaying-seconds/20430558*/}
              <p className="result">{event.city} {event.stateCode}</p>
              <p className="result">{event.classification}: {event.genre}</p>
              <button><input type="checkbox"/>Attending</button>
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
