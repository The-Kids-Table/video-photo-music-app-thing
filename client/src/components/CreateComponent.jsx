import React, { Component } from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { gql, graphql } from 'react-apollo';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import Loading from './Loading.jsx';
import Upload from './Upload.jsx';
import TextField from 'material-ui/TextField';
import Switch from 'material-ui/Switch';

const CreateComponent = () => (
  <Paper>
    <Typography style={{paddingTop: 10, marginBottom: 5}}>Upload file:</Typography>
    <Upload />
    <div style={{textAlign: 'left', padding: 10}}>
      <TextField label="Name" placeholder="My Awesome Component!" style={{width: '100%'}} />
      <TextField label="Description" placeholder="This component is part of what helps make the project so cool..." multiline style={{width: '100%'}} />
      <Typography style={{marginTop: '16px'}}>Should it be downloadable?</Typography>
      <Switch label="Download" />
    </div>
    <Button color='primary' raised onClick={() => console.log('close')} style={{marginBottom: 10}}>
      Submit
    </Button>
  </Paper>
);

export default CreateComponent;