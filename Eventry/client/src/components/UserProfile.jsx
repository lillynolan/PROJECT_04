import React, { Component } from 'react';
import Auth from '../modules/Auth';
import Nav from './Nav'
import Moment from 'react-moment';


class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myEventList: null,
      myEventListLoaded: false,
      singleUserLoaded: false,
      singleUserEvent: [],
      userList: [],
    }
    this.deleteEvent = this.deleteEvent.bind(this)
    this.backtoAllResults = this.backtoAllResults.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
  }

//calling getuserEvents function on page load
  componentDidMount() {
  this.getAllUsers()
  this.getUserEvents()
  }


//fetching events from events table
  getUserEvents() {
    console.log("here-->", this.props.userList)
  fetch('/events', {
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Token ${Auth.getToken()}`,
    token: Auth.getToken(),
   }
  })
  .then(res => res.json())
  .then(res => {
    this.setState({
      myEventList: res.events,
      myEventListLoaded: true,
      singleUserLoaded: false,
    })
  }).catch(err => console.log(err))
}

//   getOtherUserEvents(id) {
//     console.log("here-->", this.props.userList)
//   fetch(`/events/${id}`, {
//     headers: {
//     'Authorization': `Token ${Auth.getToken()}`,
//     token: Auth.getToken(),
//    }
//   })
//   .then(res => res.json())
//   .then(res => {
//     this.setState({
//       otherUserList: res.events,
//       otherUserListLoaded: true,
//     })
//   }).catch(err => console.log(err))
// }

getAllUsers() {
fetch('/users', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Token ${Auth.getToken()}`,
    token: Auth.getToken(),
  }
}).then(res => res.json())
  .then(res => {
    console.log("user", res.user)
  this.setState({
    userList: res,
    })
  }).catch(err => {
    console.log(err);
    })
}

singleUserEvent(id) {
  fetch(`/events/${id}`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Token ${Auth.getToken()}`,
    token: Auth.getToken(),
    },
  })
  .then(res => res.json())
  .then(res => {
    console.log("data", res.events.address)
    this.setState({
    singleUserEvent: res.events,
    singleUserLoaded: true,
    myEventListLoaded: false,
    })
  })
}

backtoAllResults() {
    this.setState({
    singleUserEvent: null,
    singleUserLoaded: false,
    myEventListLoaded: true,
    })
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
  if (!this.state.myEventListLoaded && !this.state.singleUserLoaded || this.state.myEventList.length === 0) {
    return (
      <div className="usercontainer">
        <Nav handleLogout={this.props.handleLogout} getAllUsers={this.props.getAllUsers} userList={this.props.userList}/>
        <div className="userdashboard">
          <h1>Add Events to your Dashboard</h1>
        </div>
      </div>
      )
  } else if (!this.state.myEventListLoaded && this.state.singleUserLoaded) {
  return (
    <div className="singleeventpage">
    <Nav handleLogout={this.props.handleLogout} backtoAllResults={this.props.backtoAllResults} getAllUsers={this.props.getAllUsers} userList={this.props.userList}/>
      <div className="singleevent" onClick={this.backtoAllResults}>
      <button><i className="fa fa-close" onClick={this.backtoAllResults} value="close"></i></button>
              <h3 className="result">Your Added Event in {this.state.singleUserEvent.city}</h3>
              <h4 className="result">{this.state.singleUserEvent.name}</h4>
              <img className="result" src={this.state.singleUserEvent.url}/>
              <h4 className="result"><Moment format="MMMM DD YYYY">{this.state.singleUserEvent.date}</Moment></h4>
              <p className="result">Where: {this.state.singleUserEvent.venue}</p>
              <p className="result">{this.state.singleUserEvent.address}</p>
              <p className="result">{this.state.singleUserEvent.state} {this.state.singleUserEvent.stateCode}</p>
              <p className="result">{this.state.singleUserEvent.classification}</p>
              <button onClick={this.backtoAllResults}>Back to Your Events</button>
      </div>
    </div>
    )
} else {
  return (
    <div className="usercontainer">
      <Nav handleLogout={this.props.handleLogout} getAllUsers={this.props.getAllUsers} userList={this.props.userList}/>
      <div className="userresults">
        <h1>My Events</h1>
   {/*   {this.props.userList.map((user, index) => {
        return(
          <div className="user" key={user.id}>
          <h1>{user.firstname} Events</h1>
          </div>)}
        )}*/}
          {this.state.myEventList.map((event, index) => {
            let time = new Date (event.localtime)
            let create = new Date (event.created_at)
        return(
            <div className="userevents" key={index}>
                <div className="usereventsresults" onClick={() => this.singleUserEvent(event.id)}>
                <span className="result">Added on: {create.toLocaleDateString()}</span>
                  <h2 className="result">{event.city}</h2>
                  <h3 className="result">{event.name}</h3>
                  <img className="result" src={event.url}/>
                  <p className="result">{event.venue}</p>
                  <p className="result"><Moment format="MMMM DD YYYY">{event.date}</Moment></p>
                  <p className="result">at {time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                 {/* referenced for converting time and only showing seconds, https://stackoverflow.com/questions/17913681/how-do-i-use-tolocaletimestring-without-displaying-seconds/20430558*/}
                  <p className="result">{event.city} {event.stateCode}</p>
                  <p className="result">{event.classification}: {event.genre}</p>
                </div>
                <div className="usereventbuttons">
                  <button><input type="checkbox"/>Attending</button>
                  <button onClick={() => {this.deleteEvent(event.id)}}>Delete</button>
                </div>
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
