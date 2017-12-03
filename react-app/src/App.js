import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper'
//algolia helper-search

const appId = 'BYAMNN0H16';
const apiKey = '75a10d692eba6953c2c798c1c63df046';
const indexName = 'test';

const client = algoliasearch(appId, apiKey);
const helper = algoliasearchHelper(
  client, indexName, {
    disjunctiveFacets: ['category'],
    hitsPerPage: 7,
    maxValuesPerFacet: 3
  }
);

const Provider = reactAlgoliaSearchHelper.Provider;
const connect = reactAlgoliaSearchHelper.connect;

class App extends Component {
  render() {
    return (
      <Provider helper={helper}>
      <div className="app">
        {'something in here'}
      </div>
    </Provider>
    );
  }
}

helper.search();

export default App;


