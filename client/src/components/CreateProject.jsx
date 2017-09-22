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
import Divider from 'material-ui/Divider';

import { setUploadedFileUrl } from '../actions/controlActions.js';

const CreateProject = ({ createProject, toggleEditUser, setUploadedFileUrl, uploadedFileUrl }) => (
  <Grid container spacing={0} style={{
    margin: 0,
    width: '100%'
  }}>
    <Grid item md/>
    <Grid item xs={12} sm={12} md={8} lg={6}>
      <Paper>
        <Typography type='title' style={{padding: 10}}> Create Project </Typography>
        <Divider style={{width: '90%', marginLeft: 'auto', marginRight: 'auto'}} />
        <Typography style={{paddingTop: 10, marginBottom: 5}}>
          Upload a thumbnail:
        </Typography>
        <Upload
          style="thumbnail"
          allowedType="image"
          setUploadedFileUrl={setUploadedFileUrl}
        />
        <form style={{textAlign: 'left', padding: 10}} onSubmit={e => {
          let form = e.target;
          e.preventDefault();
          toggleEditUser();
          createProject({
            thumbnailUrl: uploadedFileUrl || '',
            name: form.name.value,
            description: form.description.value,
            tagline: form.tagline.value
          })
        }}>
          <TextField
            required
            label="Name"
            id="name"
            placeholder="My Awesome Project!"
            style={{width: '100%'}}
          />
          <TextField
            required
            label="Description"
            id="description"
            placeholder="This project is a super cool movie about..."
            style={{width: '100%'}}
            multiline
          />
          <TextField
            required
            label="Tagline"
            id="tagline"
            placeholder="The best movie ever. 10/10"
            style={{width: '100%'}}
            multiline
          />
          <Button
            raised
            color='primary'
            type="submit"
            style={{marginBottom: 10, marginTop: 10, width:'100%'}}
          >
            Submit
          </Button>
          <Button
            raised
            color='default'
            type="cancel"
            style={{width:'100%'}}
            onClick={toggleEditUser}
          >
            Cancel
          </Button>
        </form>
      </Paper>
    </Grid>
    <Grid item md />
  </Grid>
);

const createProject = gql`
  mutation createProject(
    $thumbnailUrl: String!
    $name: String!
    $tagline: String!
    $description: String!
  ) {
    createProject(
      thumbnailUrl: $thumbnailUrl
      name: $name
      tagline: $tagline
      description: $description
    ) {
      id
      thumbnailUrl
      name
      description
      tagline
    }
  }
`;

const CreateProjectWithData = graphql(createProject, {
  props: ({ ownProps, mutate }) => ({
    createProject(formdata) {
      mutate({variables: {...formdata}, optimisticResponse: {
        __typename: 'Mutation',
        createProject: {
          __typename: 'project',
          ...formdata
        }
      }})
    }
  })
})(CreateProject);

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
)(CreateProjectWithData);
