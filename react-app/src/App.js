import React, { Component } from "react";
import "./App.css";

import { helper } from "./algolia";

class App extends Component {
  constructor() {
    super();
    this.state = {
      hits: [], 
      facets: []
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
    helper.on("result", content => {
      console.log('content', content.facets);
      this.setState({ hits: content.hits, facets: content.facets })
    });
  }

  defaultLocation() {
    console.log("Defaulting location to NYC");
    const nycCoords = "40.7128, 74.0060";
    helper.setQueryParameter("aroundLatLng", nycCoords).search();
    helper.on("result", content => {
      this.setState({ hits: content.hits, facets: content.facets  })
    });
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
    const facets = this.state.facets;
    const facetList = Object.keys(`facets.${facets.name}.data`)

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


//to get the list of facets

//content.facets.name => name 
//content.facets.data => {key:id}
// {facets && facets.map(facet => (<div> <h3>{facet.name}</h3> {facetList.map(type => <input type='checkbox'></input> )} </div>)
// ) }

// {facets && facets.map(facet => (<div> <h3>{facet.name}</h3> {facetList.map(type =>  <div>  <input type='checkbox'/> <label> {facetList[type]} </label> </div> )} 
// </div>)
//  )}
