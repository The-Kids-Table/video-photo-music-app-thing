import React, { Component } from 'react';
import SearchResults from '../containers/SearchResults.jsx';

class Search extends Component {
  render() {
    return (
      <div style={{padding: '2%'}}>
        <SearchResults />   
      </div>
    );
  }
}

export default Search;