import React, { Component } from "react";
import "./App.css";

import { helper } from "./algolia";

class App extends Component {
  constructor() {
    super();
    this.state = {
      hits: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.applyLocation = this.applyLocation.bind(this);
    this.defaultLocation = this.defaultLocation.bind(this);
  }

  applyLocation(position) {
    const location = `${position.coords.longitude}, ${
      position.coords.latitude
    }`;
    // console.log(location);
    helper.setQueryParameter("aroundLatLng", location).search();
    helper.on("result", content => this.setState({ hits: content.hits }));
  }
  defaultLocation() {
    console.log("Defaulting location to NYC");
    const nycCoords = "40.7128, 74.0060";
    helper.setQueryParameter("aroundLatLng", nycCoords).search();
    helper.on("result", content => this.setState({ hits: content.hits }));
  }

  componentDidMount() {
    if (navigator.geolocation) {
      //take a sucess handler and an error handler
      navigator.geolocation.getCurrentPosition(
        this.applyLocation,
        this.defaultLocation
      );
    }
  }

  handleChange(evt) {
    evt.preventDefault();
    helper.setQuery(evt.target.value).search();

    helper.on("result", hits => this.setState({ hits: hits.hits }));
  }

  render() {
    const hits = this.state.hits;
    console.log('type as you search');
    return (
      <div className="App">
        <div>
          <input
          className="search-box"
            onChange={this.handleChange}
            placeholder={"Search for Restaurants by Name, Cuisine, Location"}
          />
        </div>

        {hits && hits.map(hit => <h2 key={Math.random()}>{hit.name}</h2>)}
      </div>
    );
  }
}

export default App;

//notes
//figure out on submit

