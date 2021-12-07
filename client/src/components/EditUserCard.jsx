import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Loading from './Loading.jsx';
import Upload from './Upload.jsx';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import { setUploadedFileUrl } from '../actions/controlActions.js';

const propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  toggleEditUser: PropTypes.func.isRequired,
  submitChanges: PropTypes.func.isRequired,
  uploadedFileUrl: PropTypes.string,
  setUploadedFileUrl: PropTypes.func.isRequired
};

const EditUserCard = ({ user, loading, error, toggleEditUser, submitChanges, uploadedFileUrl, setUploadedFileUrl }) => (
  loading &&
  <Loading />

  ||

  error &&
  <Paper style={{padding: 25}}>
    <Typography style={{fontSize: 20}}>User info not found</Typography>
  </Paper>

  ||

  user &&
  <Paper>
    <Typography type='title' style={{padding: 10}}> Edit Profile </Typography>
    <Divider style={{width: '90%', marginLeft: 'auto', marginRight: 'auto'}} />
    <Typography style={{paddingTop: 10, marginBottom: 5}}>Upload a new profile image:</Typography>
    <Upload 
      allowedType="image"
      setUploadedFileUrl={setUploadedFileUrl}
    />
    <form style={{textAlign: 'left', padding: 10}} onSubmit={e => {
      let form = e.target
      e.preventDefault();
      toggleEditUser();
      submitChanges({
        id: user.id,
        name: form.name.value || user.name,
        username: form.username.value || user.username,
        email: form.email.value || user.email,
        profession: form.profession.value || user.profession,
        avatarUrl: uploadedFileUrl || user.avatarUrl || 'https://cdn2.lobster.media/assets/default_avatar-afa14913913cc117c73f1ac69496d74e.png',
        description: form.description.value || user.description || ''
      });
    }}>
      <TextField
        id="name"
        label="Name"
        placeholder={user.name}
        style={{width: '100%'}}
      />
      <TextField
        id="profession"
        label="profession"
        placeholder={user.profession}
        style={{width: '100%'}}
      />
      <TextField
        id="username"
        label="Username"
        placeholder={user.username}
        style={{width: '100%'}}
      />
      <TextField
        id="email"
        label="Email"
        placeholder={user.email}
        style={{width: '100%'}}
      />
      <TextField
        id="description"
        label="Bio"
        placeholder={user.description}
        multiline
        style={{width: '100%'}}
      />
      <Button color='primary' raised type="submit" style={{marginBottom: 10, marginTop: 10, width:'100%'}}>
        Submit
      </Button>
      <Button
        color='default'
        raised
        type="cancel"
        style={{width:'100%'}}
        onClick={toggleEditUser}
      >
        Cancel
      </Button>
    </form>
  </Paper>
);

EditUserCard.propTypes = propTypes;

const editUser = gql`
  mutation editUser(
    $id: Int!
    $email: String!
    $username: String!
    $name: String!
    $profession: String!
    $description: String!
    $avatarUrl: String!
  ) {
    editUser(
      id: $id
      email: $email
      username: $username
      name: $name
      profession: $profession
      description: $description
      avatarUrl: $avatarUrl
    ) {
      id
      email
      username
      name
      profession
      description
      avatarUrl
    }
  }
`;

const EditUserCardWithData = graphql(editUser, {
  props: ({ ownProps, mutate }) => ({
    submitChanges(formdata) {
      mutate({variables: {...formdata}, optimisticResponse: {
        __typename: 'Mutation',
        editUser: {
          __typename: 'user',
          id: ownProps.user.id,
          ...formdata
        }
      }});
    }
  })
})(EditUserCard);

const mapStateToProps = state => ({
  uploadedFileUrl: state.control.uploadedFileUrl
});

const mapDispatchToProps = dispatch => ({
  setUploadedFileUrl(fileUrl) {
    console.log(dispatch)
    dispatch(setUploadedFileUrl(fileUrl));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUserCardWithData);