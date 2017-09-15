import React from 'react';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';

const Loading = () => (
  <Paper style={{padding: 25}}>
    <CircularProgress/> 
  </Paper>
);

export default Loading;