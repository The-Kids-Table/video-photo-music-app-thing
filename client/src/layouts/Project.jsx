import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';

import ProjectContributors from '../components/ProjectContributors.jsx';
import MediaComponent from '../components/MediaComponent';
import Spacer from '../components/Spacer.jsx';
import DisplayProjectCard from '../components/DisplayProjectCard.jsx';
import CreateComponent from '../components/CreateComponent.jsx';

import { toggleEditProject } from '../actions/controlActions';
import { toggleCreateComponentExpanded } from '../actions/controlActions';


////////////////////////////////////////
//---RUN THESE COMMANDS IN TERMINAL---//
////////////////////////////////////////
// mysql -u root;
// use thesis;
// update components set isFeatured=true where name="Tear's of Steel";
//
// To see if the command worked run the following command:
// select * from components where isFeatured=true;

const Project = ({ currentUser, editingProject, toggleEditProject, toggleCreateComponentExpanded, createComponentExpanded, data }) => {

  if (data.loading) {
    return (
      <Paper style={{padding: 25}}>
        <CircularProgress />
      </Paper>
    );
  }

  const COMPONENT_ELEVATION = 4;
  const FEATURED_ELEVATION = 8;

  let likeCount = 137;

  let {
    components,
    featuredComponent,
    owner,
    contributors,
    id
  } = data.user.project;

  let orderedComponents = [];

  for (var i = components.length - 1; i > 0; i--) {
    orderedComponents.push(components[i]);
  }

  const groupingPreCheck = (componentArray) => {
    const MAX_PHOTO_GRID = 3;
    const MAX_VIDEO_GRID = 2;
    const FIRST_OF_NEW_TYPE = 1;
    let lastType = componentArray[0].type;
    let groups = [];
    let count = FIRST_OF_NEW_TYPE;

    for (var i = 1; i < componentArray.length; i++) {
      let currentType = componentArray[i].type;
      if (lastType === currentType) {
        count++;
        if (count === MAX_PHOTO_GRID && currentType === 'image') {
          for (var j = 0; j < MAX_PHOTO_GRID; j++) {
            groups.push(count);
          }
          count = 0;
        }
        if (count === MAX_VIDEO_GRID && currentType === 'video') {
          for (var j = 0; j < MAX_VIDEO_GRID; j++) {
            groups.push(count);
          }
          count = 0;
        }
        if (i === componentArray.length - 1) {
          for (var j = 0; j < count; j++) {
            groups.push(count);
          }
        }
      } else {
        for (var j = 0; j < count; j++) {
          groups.push(count);
        }
        count = FIRST_OF_NEW_TYPE;
      }
      lastType = currentType;
    }
    return groups;
  };

  let groups;

  if (orderedComponents.length > 0) {
    groups = groupingPreCheck(orderedComponents);
  }

  return (
    <Grid container >
      <Grid item xs={12} hidden={{ smDown: true }}>
        <Grid container spacing={24} style={{
          padding: '2%',
          margin: 0,
          width: '100%',
        }}>
          <Spacer hidden={['md']} />
          <Grid item xs={12} md={8} lg={6}>
            <Grid container>
              <Grid item xs={12}>
                {
                  featuredComponent &&
                  <MediaComponent 
                    content={featuredComponent} 
                    elevation={FEATURED_ELEVATION} 
                    editingProject={editingProject} 
                    likeCount={likeCount}
                    isFeatured={true}
                    id='featured'
                  />  
                }
              </Grid>
              <Grid item xs={12} style={{padding: 0}}>
                <Grid container direction="row" spacing={24} style={{
                  padding: 0,
                  margin: 0,
                  width: '100%'
                }}>
                  {
                    currentUser && (contributors.includes(currentUser)) &&
                    <CreateComponent toggleEditProject={() => console.log('click')} toggleCreateComponentExpanded={toggleCreateComponentExpanded} createComponentExpanded={createComponentExpanded} projectId={id} />
                  }
                  {
                    editingProject &&
                    <Grid item xs={12}>
                      <CreateComponent toggleEditProject={toggleEditProject} toggleCreateComponentExpanded={toggleCreateComponentExpanded} createComponentExpanded={createComponentExpanded} projectId={id} />
                    </Grid>
                  }
                  {
                    (orderedComponents.length > 0) &&
                    orderedComponents.map((content, key) => ( 
                      <MediaComponent 
                        content={content} 
                        key={key} 
                        group={groups[key]} 
                        elevation={COMPONENT_ELEVATION} 
                        editingProject={editingProject} 
                        likeCount={likeCount}
                        isFeatured={false}
                        id={key}
                      />
                    ))

                    ||

                    orderedComponents.length === 0 && !editingProject && contributors.includes(currentUser) &&
                    <div style={{width: '100%'}}>
                      <Paper style={{width: '100%', marginBottom: 15}}>
                        <Typography type='title' style={{padding: 10}}>This project doesn't have any components yet. You should add one!</Typography>
                      </Paper>
                      <CreateComponent toggleEditProject={toggleCreateComponentExpanded} toggleCreateComponentExpanded={toggleCreateComponentExpanded} createComponentExpanded={createComponentExpanded} projectId={id} />
                    </div>
                  }
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Grid container>
              <Grid item xs={12}>
                <DisplayProjectCard
                  editingProject={editingProject}
                  currentUser={currentUser}
                  error={data.error}
                  loading={data.loading}
                  project={data.user.project}
                  toggleEditProject={toggleEditProject}
                />
              </Grid>
              <Grid item xs={12}>
                <ProjectContributors owner={owner} contributors={contributors} editingProject={editingProject} />
              </Grid>
            </Grid>
          </Grid>
          <Spacer hidden={['md']} />
        </Grid>
      </Grid>

      <Grid item xs={12} hidden={{ mdUp: true }}>
        <Grid container spacing={24} style={{
          padding: '2%',
          margin: 0,
          width: '100%',
        }}>
          <Grid item xs={12} md={8} lg={6}>
            <Grid container>
              <Grid item xs={12}>
                {
                  featuredComponent &&
                  <MediaComponent 
                    content={featuredComponent} 
                    elevation={FEATURED_ELEVATION} 
                    editingProject={editingProject} 
                    likeCount={likeCount}
                    isFeatured={true}
                    id='featured'
                  />  
                }
              </Grid>
              <Grid item xs={12}>
                <DisplayProjectCard
                  editingProject={editingProject}
                  currentUser={currentUser}
                  error={data.error}
                  loading={data.loading}
                  project={data.user.project}
                  toggleEditProject={toggleEditProject}
                />
              </Grid>
              <Grid item xs={12}>
                <ProjectContributors owner={owner} contributors={contributors} editingProject={editingProject} />
              </Grid>
              <Grid item xs={12} style={{padding: 0}}>
                <Grid container direction="row" spacing={24} style={{
                  padding: 0,
                  margin: 0,
                  width: '100%'
                }}>
                  {
                    currentUser && (contributors.includes(currentUser)) &&
                    <CreateComponent toggleEditProject={() => console.log('click')} toggleCreateComponentExpanded={toggleCreateComponentExpanded} createComponentExpanded={createComponentExpanded} projectId={id} />
                  }
                  {
                    editingProject &&
                    <Grid item xs={12}>
                      <CreateComponent toggleEditProject={toggleEditProject} toggleCreateComponentExpanded={toggleCreateComponentExpanded} createComponentExpanded={createComponentExpanded} projectId={id} />
                    </Grid>
                  }
                  {
                    (orderedComponents.length > 0) &&
                    orderedComponents.map((content, key) => ( 
                      <MediaComponent 
                        content={content} 
                        key={key} 
                        group={groups[key]} 
                        elevation={COMPONENT_ELEVATION} 
                        editingProject={editingProject} 
                        likeCount={likeCount}
                        isFeatured={false}
                        id={key}
                      />
                    ))

                    ||

                    orderedComponents.length === 0 && !editingProject &&
                    <div style={{width: '100%'}}>
                      <Paper style={{width: '100%', marginBottom: 15}}>
                        <Typography type='title' style={{padding: 10}}>This project doesn't have any components yet. You should add one!</Typography>
                      </Paper>
                      <CreateComponent toggleEditProject={() => console.log('no no')} toggleCreateComponentExpanded={toggleCreateComponentExpanded} createComponentExpanded={createComponentExpanded} projectId={id} />
                    </div>
                  }
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};


const projectQuery = gql`
  query projectQuery($projectName: String! $username: String!) {
    user(username: $username) {
      id
      project(name: $projectName) {
        id
        name
        description
        tagline
        thumbnailUrl
        featuredComponent {
          id
          name
          resourceUrl
          description
          type
          author {
            id
            name
            username
            avatarUrl
          }
        }
        contributors {
          id
          name
          avatarUrl
          username
          role
        }
        owner {
          id
          name
          username
          avatarUrl
        }
        components(includeFeatured: false) {
          id
          name
          resourceUrl
          description
          type
          author {
            id
            name
            username
            avatarUrl
          }
        }
      }
    }
  }
`;

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  editingProject: state.control.editingProject,
  createComponentExpanded: state.control.createComponentExpanded
});

const mapDispatchToProps = dispatch => ({
  toggleCreateComponentExpanded() {
    dispatch(toggleCreateComponentExpanded());
  },
  toggleEditProject() {
    dispatch(toggleEditProject());
  }
});


const projectWithData = graphql(projectQuery, {
  options: ({ match }) => {
    return {variables: {
      projectName: match.params.projectName,
      username: match.params.username
    }
    };
  }})(Project);

export default connect(mapStateToProps, mapDispatchToProps)(projectWithData);