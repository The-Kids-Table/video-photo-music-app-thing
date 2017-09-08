import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia } from 'material-ui/Card';

import ProjectContributors from '../components/ProjectContributors.jsx';

class Project extends Component {
  render() {
    const { currentProject } = this.props;
    
    return (
      <div>
        <Grid container spacing={24} style={{
          padding: '2%',
          margin: 0,
          width: '100%'
        }}>
          <Grid sm lg/>
          <Grid item xs={12} sm={12} md={8} lg={6}>
            <Paper style={{height: 400}} />
          </Grid>
          
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <ProjectContributors
              owner={currentProject.owner}
              contributors={currentProject.contributors}
            />
          </Grid>
          <Grid sm lg/>
        </Grid>
        <Grid container spacing={8} style={{
          padding: '2%',
          margin: 0,
          width: '100%'
        }}>
          <Grid item lg />
          <Grid item xs={12} lg={10}>
            <Paper style={{height: 100}} />
          </Grid>
          <Grid item lg />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => state.data;

export default connect(mapStateToProps)(Project);