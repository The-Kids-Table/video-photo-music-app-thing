import React, { Component } from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { gql, graphql } from 'react-apollo';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Loading from './Loading.jsx';
import Upload from './Upload.jsx';
import TextField from 'material-ui/TextField';
import Switch from 'material-ui/Switch';
import Divider from 'material-ui/Divider';
import Collapse from 'material-ui/transitions/Collapse';

import { setUploadedFileUrl } from '../actions/controlActions.js';

const CreateComponent = ({createProjectComponent, toggleEditProject, toggleCreateComponentExpanded, createComponentExpanded, setUploadedFileUrl, uploadedFileUrl, projectId}) => {

  let type = (uploadedFileUrl) => {
    let parts = uploadedFileUrl.split('.');
    let extension = parts[parts.length - 1];
    if (extension === 'mp3' || extension === 'wav' || extension === 'wave' || extension === 'ogg' || extension === 'aac') {
      return 'audio';
    }
    if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'bmp' || extension === 'gif' || extension === 'svg') {
      return 'image';
    }
    if (extension === 'mp4') {
      return 'video';
    }
    if (extension === 'txt') {
      return 'text';
    }
    return 'unknown';
  };

  return (
    <Paper>
      <Typography type='title' style={{padding: 10}}> Create Component </Typography>
      <IconButton
        onClick={() => toggleCreateComponentExpanded()}
        aria-expanded={createComponentExpanded}
        aria-label="Show more"
      >
        <ExpandMoreIcon />
      </IconButton>
      <Collapse in={createComponentExpanded} transitionDuration="auto" unmountOnExit>
        <Divider style={{width: '90%', marginLeft: 'auto', marginRight: 'auto'}} />
        <Typography style={{margin: 5}}>Upload file:</Typography>
        <Upload setUploadedFileUrl={setUploadedFileUrl} />
        <form style={{textAlign: 'left', padding: 10}} onSubmit={e => {
          let form = e.target;
          e.preventDefault();
          toggleEditProject();
          createProjectComponent({
            name: form.name.value,
            description: form.description.value || '',
            projectId: projectId,
            resourceUrl: uploadedFileUrl,
            isDownloadable: false,
            thumbnailUrl: '',
            type: type(uploadedFileUrl)
          })
        }}>
          <TextField required id="name" label="Name" placeholder="My Awesome Component!" style={{width: '100%'}} />
          <TextField id="description" label="Description" placeholder="This component is part of what helps make the project so cool..." multiline style={{width: '100%'}} />
          <Typography style={{marginTop: '16px'}}>Should it be downloadable?</Typography>
          <Switch id="download" label="Download" />
          <Button color='primary' raised type="submit" style={{marginBottom: 10, marginTop: 10, width: '100%'}}>
            Submit
          </Button>
          <Button
            color='default'
            raised
            type="cancel"
            style={{width: '100%'}}
            onClick={toggleEditProject}
          >
            Cancel
          </Button>
        </form>
      </Collapse>
    </Paper>
  );
};

const createProjectComponent = gql`
  mutation createProjectComponent(
    $name: String!
    $projectId: Int!
    $type: String!
    $resourceUrl: String!
    $description: String!
    $isDownloadable: Boolean!
    $thumbnailUrl: String!
  ) {
    createProjectComponent(
      name: $name
      projectId: $projectId
      type: $type
      resourceUrl: $resourceUrl
      description: $description
      isDownloadable: $isDownloadable
      thumbnailUrl: $thumbnailUrl
    ) {
      id
      name
      type
      resourceUrl
      description
      isDownloadable
      thumbnailUrl
    }
  }
`;

const CreateComponentWithData = graphql(createProjectComponent, {
  props: ({ ownProps, mutate }) => ({
    createProjectComponent(formdata) {
      mutate({variables: {...formdata}, optimisticResponse: {
        __typename: 'Mutation',
        createProjectComponent: {
          __typename: 'projectComponent',
          ...formdata
        }
      }})
    }
  })
})(CreateComponent)

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
)(CreateComponentWithData);