import React, { Component } from 'react';


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
    console.log(res._embedded.events[1])
    console.log(res._embedded.events[1].name)
    console.log(res._embedded.events[1]._embedded.venues[0].name)
    this.setState({
    dataLoaded: true,
    searchedEvents: res,
    name: res._embedded.events[1].name,
    // url: res.Images,
    // date: res.localDate,
    // time: res.localTime,
    // city: res.City.Name,
    // state: res.State.Name,
    // stateCode: res.Venues.State.StateCode,
    // country: res.Venues.Country.Name,
    // venue: res.Venues.Name,
    // address: res.Venues.Address.Line1,
    // classification: res.Classifications.Segment.Name,
    // genre: res.Classifications.Genre.Name,
    })
  })
}

render() {
  if (!this.dataLoaded || !this.searchedEvent.City) {
  return (
    <div className="searchevent">
    <h1>Search Event</h1>
      <div className="searchcontainer">
        <div className="searchbar">
          <form className="input" onSubmit={this.searchEvent}>
            <input type="text" name="city" placeholder="city"/>
            <input type="submit" value="search"/>
          </form>
        </div>
      </div>
    </div>
    )
    } else {
      return (
    <div className="searchevent">
    <h1>Search Event</h1>
      <div className="searchcontainer">
        <div className="searchbar">
          <form className="input" onSubmit={this.searchEvent}>
            <input type="text" name="city" placeholder="city"/>
            <input type="submit" value="search"/>
          </form>
        </div>
        <div className="eventresults">
          <p className="result">{this.searchEvent.name}</p>
          <p className="result">{this.searchedEvent}</p>
        </div>
      </div>
    </div>
    )
    }
  }
}

export default AddEvent;
