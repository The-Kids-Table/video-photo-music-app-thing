import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchResultsItem from '../components/SearchResultsItem.jsx';

const SearchResults = ({ searchResults }) => {
  const searchResultsItems = searchResults.map((project) => {
    return (
      <SearchResultsItem project={project}/>
    );
  });

  return (
    <div style={{width: '100%'}}>
      {searchResultsItems}
    </div>
  );
};

const mapStateToProps = (state) => state.data;

export default connect(mapStateToProps)(SearchResults);
