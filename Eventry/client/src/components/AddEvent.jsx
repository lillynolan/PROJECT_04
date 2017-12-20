import React, { Component } from 'react';
import Auth from '../modules/Auth';
import Nav from './Nav'
import Moment from 'react-moment';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaceCity: '',
      dataLoaded: false,
      singleEvent: [],
      searchedEvents: null,
      singleLoaded: false,
    }
    this.searchEvent = this.searchEvent.bind(this);
    this.postEvent = this.postEvent.bind(this);
    this.singleEvent = this.singleEvent.bind(this);
    this.backtoResults = this.backtoResults.bind(this);
    this.postSingleEvent = this.postSingleEvent.bind(this)
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
    console.log(res._embedded.events[8].id)
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
          id: event.id,
        }
        )
        // https://stackoverflow.com/questions/4186906/check-if-object-exists-in-javascript
        // this helped me not try to access properties undefined objects when bad data from api
      })
      console.log(events)
      this.setState({
      dataLoaded: true,
      searchedEvents: events,
      spaceCity: spaceCity,
      })
  }).then(() => {
    document.querySelector('.input').reset()
  }).catch(err => {
        console.log(err);
      })
    }

//fetching event by api id for more info button to display more abt the event from api data
singleEvent(id) {
  fetch(`https://app.ticketmaster.com/discovery/v2/events.json?id=${id}&apikey=5OXqsHRBAmlbfo0yWC7GGGbLA4ZfqJio`, {
    method: 'GET',
    headers: {
    }
  })
  .then(res => res.json())
  .then(res => {
    console.log("data", res)
    this.setState({
    singleEvent: res._embedded.events[0],
    singleLoaded: true,
    dataLoaded: false,
    })
  })
}


postSingleEvent(id) {
    console.log(this.state.singleEvent)
    fetch('/events/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
      body: JSON.stringify({
        event: {
        name: this.state.singleEvent.name,
        url: this.state.singleEvent.images[0].url,
        date: this.state.singleEvent.dates.start.localDate,
        localtime: this.state.singleEvent.dates.start.localTime,
        city: this.state.singleEvent._embedded.venues[0].city.name,
        state: this.state.singleEvent._embedded.venues[0].state.name,
        stateCode: this.state.singleEvent._embedded.venues[0].state.stateCode,
        country: this.state.singleEvent._embedded.venues[0].state,
        venue: this.state.singleEvent._embedded.venues[0].name,
        address: this.state.singleEvent._embedded.venues[0].address.line1,
        classification: this.state.singleEvent.classifications[0].segment.name,
        genre: this.state.singleEvent.classifications[0].genre.name,
        }
      })
    }).then(res => res.json())
        .then(res => {
          console.log(this.props)
          this.props.add()
        }).catch(err => {
        console.log(err);
      })
    }

backtoResults() {
    this.setState({
    singleEvent: null,
    singleLoaded: false,
    dataLoaded: true,
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
        localtime: this.state.searchedEvents[index].localtime,
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
          console.log(this.props)
          this.props.add()
      }).catch(err => {
        console.log(err);
      })
    }


render() {
  if (!this.state.dataLoaded && !this.state.singleLoaded) {
  return (
    <div className="searchevent">
    <Nav handleLogout={this.props.handleLogout}/>
    <header>Welcome to Eventry</header>
      <div className="searchcontainer">
      <h1>Search for an Event</h1>
        <div className="searchbar">
          <form className="input" onSubmit={this.searchEvent}>
            <input type="text" name="city" placeholder="Search a City"/>
            <button><i className="fa fa-search" type="submit" value="cities"></i></button>
          </form>
        </div>
    {/*     <h1>or</h1>
        <h1><Link to="/createevent">Create an Event</Link></h1>*/}
      </div>
    </div>
    )
    } else if (!this.state.dataLoaded && this.state.singleLoaded) {
      return (
        <div className="singleeventpage">
          <Nav handleLogout={this.props.handleLogout} />
            <div className="singleevent" onClick={this.backtoResults}>
            <button><i className="fa fa-close" onClick={this.backtoResults} value="close"></i></button>
              <h3 className="result">Upcoming event in {this.state.singleEvent._embedded.venues[0].city.name}</h3>
              <h4 className="result">{this.state.singleEvent.name}</h4>
              <img className="result" src={this.state.singleEvent.images[0].url}/>
              <h4 className="result"><Moment format="MMMM DD YYYY, h:mm a">{this.state.singleEvent.dates.start.localDate + 'T' + this.state.singleEvent.dates.start.localTime}</Moment></h4>
              <p className="result">{this.state.singleEvent._embedded.venues[0].name}</p>
              <p className="result">{this.state.singleEvent._embedded.venues[0].address.line1}</p>
              <p className="result">{this.state.singleEvent._embedded.venues[0].state.name} {this.state.singleEvent._embedded.venues[0].state.stateCode}</p>
              <p className="result">{this.state.singleEvent.classifications[0].segment.name}</p>
              {/*<a href={this.state.singleEvent.url}>Buy Tickets on TicketMaser</a>*/}
              <button className="resultbutton" onClick={this.backtoResults}>Back to {this.state.singleEvent._embedded.venues[0].city.name} Results</button>
              <button className="resultbutton" onClick={() => this.postSingleEvent(this.state.singleEvent.id)}>(+)Add Event</button>
            </div>
        </div>
        )
    }
    else {
      return (
    <div className="searchevent">
    <Nav handleLogout={this.props.handleLogout} />
      <div className="searchcontainer">
      <h1>Search Another City</h1>
            <div className="searchbar">
              <form className="input" onSubmit={this.searchEvent}>
                <input type="text" name="city" placeholder="Search a City"/>
                <button><i class="fa fa-search" type="submit" value="cities"></i></button>
              </form>
            </div>
            <div className="eventresults" >
              <h2>{this.state.searchedEvents[0].city}'s Upcoming Events</h2>
              {this.state.searchedEvents.map((event, index) => {
              return (
              <div className="results" key={index}>
                <div className="resultscontainer" onClick={() => this.singleEvent(event.id)}>
                    <h3 className="result">{event.name}</h3>
                    <p className="result">{event.venue}</p>
                    <p className="result"><Moment format="MMMM DD YYYY, h:mm a">{event.date + 'T' + event.localtime}</Moment></p>
                    <p className="result">{event.classification}: {event.genre}</p>
                </div>
                  <div className="resultbutton">
                  <button className="resultbutton" name="id" onClick={() => this.singleEvent(event.id)}>(<FontAwesome name='info'/>)More Info</button>
                  <button className="resultbutton" onClick={() => this.postEvent(index)}>(+)Add Event</button>
                </div>
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
//https://stackoverflow.com/questions/46883381/fontawesome-in-search-bar
