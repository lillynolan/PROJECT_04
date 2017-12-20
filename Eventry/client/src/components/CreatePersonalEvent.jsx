import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth';
import Nav from './Nav';

class CreatePersonalEvent extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      url: '',
      date: '',
      localtime: '',
      city: '',
      state: '',
      stateCode: '',
      country: '',
      venue: '',
      address: '',
      classification: '',
      genre: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

handleInputChange(e) {
  const name = e.target.name;
  const value = e.target.value;
  this.setState({
    [name]: value,
  });
}

postPersonalEvent(e, data) {
  fetch('/events/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${Auth.getToken()}`,
      token: Auth.getToken(),
    },
    body: JSON.stringify({
      event: data,
    })
  }).then(res => res.json())
    .then(res => {
    console.log(res);
  }).catch(err => console.log(err))
}


render() {
  return (
    <div className="personalform">
      <Nav handleLogout={this.props.handleLogout}/>
      <h2>Add Personal Event</h2>
      <form onSubmit={(e) => this.postPersonalEvent(e, this.state)}>
        <input type="text" name="name" value={this.state.name} placeholder="Title" onChange={this.handleInputChange} />
        <input type="text" name="url" value={this.state.url} placeholder="Event Picture" onChange={this.handleInputChange} />
        <input type="date" name="date" value={this.state.date} placeholder="Date of Event" onChange={this.handleInputChange} />
        <input type="time" name="time" value={this.state.localtime} placeholder="Time of Event" onChange={this.handleInputChange} />
        <input type="text" name="venue" value={this.state.venue} placeholder="Location Name" onChange={this.handleInputChange} />
        <input type="text" name="address" value={this.state.address} placeholder="Address" onChange={this.handleInputChange} /><input type="text" name="city" value={this.state.city} placeholder="City" onChange={this.handleInputChange} />
        <input type="text" name="state" value={this.state.state} placeholder="State" onChange={this.handleInputChange} />
        <input type="text" name="stateCode" value={this.state.stateCode} placeholder="State Code" onChange={this.handleInputChange} />
        <input type="text" name="country" value={this.state.country} placeholder="Country" onChange={this.handleInputChange} />
        <input type="text" name="classification" value={this.state.classification} placeholder="Type of Occasion" onChange={this.handleInputChange} />
        <input type="text" name="genre" value={this.state.genre} placeholder="Genre" onChange={this.handleInputChange} />
        <input type="submit" value="(+)Add Personal Event" />
      </form>
    </div>
  )}
}

export default CreatePersonalEvent;

// referenced react-rails-monsters-lesson
