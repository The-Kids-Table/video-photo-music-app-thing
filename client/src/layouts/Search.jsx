import React, { Component } from 'react';
import SearchResults from '../containers/SearchResults.jsx';
import Grid from 'material-ui/Grid';

const Search = () => (
  <Grid container spacing={24} style={{
      padding: '2%',
      margin: 0,
      width: '100%'
    }}>
    <Grid md/>
    <Grid item xs={12} sm={12} md={8} lg={6}>
      <SearchResults /> 
    </Grid>
    <Grid md />
  </Grid>
);

export default Search;