import React, { Component } from 'react';
import Auth from '../modules/Auth';
import Nav from './Nav'
import Moment from 'react-moment';


class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      dataLoaded: false,
      events: [],
      searchedEvents: null,
    }
    this.searchEvent = this.searchEvent.bind(this);
    this.postEvent = this.postEvent.bind(this);
  }


searchEvent (e) {
  e.preventDefault();
  let spaceCity = e.target.city.value.replace(' ', '+')
  fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=${spaceCity}&apikey=5OXqsHRBAmlbfo0yWC7GGGbLA4ZfqJio`, {
    method: 'GET',
    headers: {},
  })
  .then(res => res.json())
  .then(res => {
    console.log(res)
    console.log(res._embedded.events[7])
    console.log(res._embedded.events[7].classifications[0].genre.name)
    console.log(res._embedded.events[7].classifications[0].segment.name)
    let events = res._embedded.events.map(event => {
      return (
        {
          name: event.name,
          url: event.images[0].url,
          date: event.dates.start.localDate,
          localtime: event.dates.start.localTime,
          city: event._embedded.venues[0].city.name,
          state: (typeof event._embedded.venues[0].state != "undefined")? event._embedded.venues[0].state.name : " ",
          stateCode: (typeof event._embedded.venues[0].state != "undefined")? event._embedded.venues[0].state.stateCode : " ",
          country: event._embedded.venues[0].country.name,
          venue: (typeof event._embedded.venues[0] != "undefined")? event._embedded.venues[0].name : "not found",
          address: event._embedded.venues[0].address.line1,
          classification: (typeof event.classifications != "undefined")? event.classifications[0].segment.name : " ",
          genre: (typeof event.classifications != "undefined")? event.classifications[0].genre.name : " ",
        }
        )
        // https://stackoverflow.com/questions/4186906/check-if-object-exists-in-javascript
        // this helped me not try to access properties undefined objects when bad data from api
      })
      console.log(events)
      this.setState({
      dataLoaded: true,
      searchedEvents: events,
      })
  }).then(() => {
    document.querySelector('.input').reset()
  })
}

postEvent(index) {
    console.log(this.state.searchedEvents[index])
    fetch('/events/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
      body: JSON.stringify({
        event: {
        name: this.state.searchedEvents[index].name,
        url: this.state.searchedEvents[index].url,
        date: this.state.searchedEvents[index].date,
        localtime: this.state.searchedEvents[index].time,
        city: this.state.searchedEvents[index].city,
        state: this.state.searchedEvents[index].state,
        stateCode: this.state.searchedEvents[index].stateCode,
        country: this.state.searchedEvents[index].country,
        venue: this.state.searchedEvents[index].venue,
        address: this.state.searchedEvents[index].address,
        classification: this.state.searchedEvents[index].classification,
        genre: this.state.searchedEvents[index].genre,
        }
      })
    }).then(res => res.json())
        .then(res => {
          this.setState({
          shouldFireRedirect: true,
        })
      }).catch(err => {
        console.log(err);
      })
    }

// singleEvent(e) {
//   fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=${e.target.city.value}&apikey=5OXqsHRBAmlbfo0yWC7GGGbLA4ZfqJio`,
//     method: 'GET',
//     headers: {},
//   })
//   .then(res => res.json())
//   .then(res => {
//     this.setState({

//     })
//   })
// }

render() {
  if (!this.state.dataLoaded) {
  return (
    <div className="searchevent">
    <Nav handleLogout={this.props.handleLogout} />
      <div className="searchcontainer">
      <h1>Search Events by City</h1>
        <div className="searchbar">
          <form className="input" onSubmit={this.searchEvent}>
            <input type="text" name="city" placeholder="Search a City"/>
            <input type="submit" value="search"/>
          </form>
        </div>
      </div>
    </div>
    )
    } else {
      return (
    <div className="searchevent">
    <Nav handleLogout={this.props.handleLogout} />
      <div className="searchcontainer">
      <h1>Search Another City</h1>
            <div className="searchbar">
              <form className="input" onSubmit={this.searchEvent}>
                <input type="text" name="city" placeholder="Search a City"/>
                <input type="submit" value="search"/>
              </form>
            </div>
            <div className="eventresults" >
            <h2>{this.state.searchedEvents[0].city}'s Upcoming Events</h2>
            {this.state.searchedEvents.map((event, index) => {
            return (
            <div className="results" key={index}>
              <h2 className="result">{event.name}</h2>
              <p className="result">{event.venue}</p>
              <p className="result"><Moment format="MMMM DD YYYY, h:mm a">{event.date + 'T' + event.time}</Moment></p>
              <p className="result">{event.city} {event.stateCode}</p>
              <p className="result">{event.classification}: {event.genre}</p>
              <button className="resultbutton" onClick={() => this.postEvent(index)}>Add Event</button>
              {/*<img className="result" src={event.url}/>*/}
            </div>
            )}
            )}

          </div>
      </div>
    </div>
    )
    }
  }

}

export default AddEvent;


//references:
//https://www.w3schools.com/jsref/jsref_obj_date.asp
//https://stackoverflow.com/questions/4186906/check-if-object-exists-in-javascript
//referenced moment docs for time and date https://momentjs.com/
