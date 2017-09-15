import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Loading from './Loading.jsx';
import Upload from './Upload.jsx';
import TextField from 'material-ui/TextField';

const EditUserCard = ({ session, data: { user, loading, error } }) => (

  loading &&
  <Loading /> 
  ||

  error &&
  <Paper style={{padding: 25}}>
    <h2>User info not found</h2>
  </Paper>
  ||

  user &&
  <Paper>
    <Typography style={{paddingTop: 10, marginBottom: 5}}>Upload a new profile image:</Typography>
    <Upload allowedType="image" />
    <div style={{textAlign: 'left', padding: 10}}>
      <TextField label="Name" placeholder={user.name} style={{width: '100%'}} />
      <TextField label="Username" placeholder={user.username} style={{width: '100%'}} />
      <TextField label="Email" placeholder={user.email} style={{width: '100%'}} />
      <TextField label="Bio" placeholder={user.description} multiline style={{width: '100%'}} />
    </div>
    <Button color='primary' raised onClick={() => console.log('close')} style={{marginBottom: 10}}>
      Submit
    </Button>
  </Paper>
);

const userQuery = gql`
  query userQuery($username: String!) {
    user(username: $username) {
      name
      username
      description
      email
      avatarUrl
    }
  }
`;

const EditUserProfileCardWithData = graphql(userQuery, {
  options: ({ username }) => ({variables: { username }})
})(EditUserCard);

export default connect(
  ({ data, session }) => ({ data, session })
)(EditUserProfileCardWithData);