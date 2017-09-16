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

const CreateProject = () => (
  <Paper>
    <Typography style={{paddingTop: 10, marginBottom: 5}}>Upload a thumbnail:</Typography>
    <Upload style="thumbnail" allowedType="image" />
    <div style={{textAlign: 'left', padding: 10}}>
      <TextField label="Name" placeholder="My Awesome Project!" style={{width: '100%'}} />
      <TextField label="Description" placeholder="This project is a super cool movie about..." multiline style={{width: '100%'}} />
      <TextField label="Tagline" placeholder="The best movie ever. 10/10" multiline style={{width: '100%'}} />
    </div>
    <Button color='primary' raised onClick={() => console.log('close')} style={{marginBottom: 10}}>
      Submit
    </Button>
  </Paper>
);


export default CreateProject;