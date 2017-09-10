import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Hidden from 'material-ui/Hidden';

import ProjectContributors from '../components/ProjectContributors.jsx';
import VideoComponent from '../components/VideoComponent.jsx';
import AudioComponent from '../components/AudioComponent.jsx';
import PhotoComponent from '../components/PhotoComponent.jsx';
import TextComponent from '../components/TextComponent.jsx';

class Project extends Component {
  render() {
    const { currentProject } = this.props;

    const groupingPreCheck = (componentArray) => {
      let lastType = componentArray[0].type;
      let groups = [];
      let count = 1;

      for (var i = 1; i < componentArray.length; i++) {
        let currentType = componentArray[i].type;
        if (lastType === currentType) {
          count++;
          if (i === componentArray.length - 1) {
            for (var j = 0; j < count; j++) {
              groups.push(count);
            }
          }
        } else {
          for (var j = 0; j < count; j++) {
            groups.push(count);
          }
          count = 1;
        }
        lastType = currentType;
      }
      console.log(groups);
      return groups;
    };
    
    const generateFeaturedComponent = (component) => {
      if (component.type === 'video') {
        return (
          <VideoComponent component={component} />
        );
      } if (component.type === 'photo') {
        return (
          <PhotoComponent component={component} />
        );
      } if (component.type === 'audio') {
        return (
          <AudioComponent component={component} />
        );
      } if (component.type === 'text') {
        return (
          <TextComponent component={component} />
        );
      }
    };

    let groups = groupingPreCheck(currentProject.project.projectComponents);

    return (
      <div>
        <Grid container spacing={24} style={{
          padding: '2%',
          margin: 0,
          width: '100%',
          paddingBottom: '0px'
        }}>
          <Hidden only={['md']}>
            <Grid item sm lg/>
          </Hidden>
          <Grid item xs={12} sm={12} md={8} lg={6}>
            {generateFeaturedComponent(currentProject.project.featuredComponent)}
            <Divider style={{}}/>
          </Grid>
          
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <ProjectContributors
              owner={currentProject.owner}
              contributors={currentProject.contributors}
            />
          </Grid>
          <Hidden only={['md']}>
            <Grid item sm lg/>
          </Hidden>
        </Grid>
        <Grid container spacing={0} style={{
          padding: '2%',
          margin: 0,
          width: '100%',
          paddingTop: '0px'
        }}>
          <Grid item lg />
          <Grid item xs={12} lg={6} md={8}>
            <Grid container direction="row" spacing={24} style={{
              margin: 0,
              width: '100%'
            }}>
              {currentProject.project.projectComponents.map((component, key) => {

                if (component.type === 'video') {
                  return (
                    <VideoComponent key={key} component={component} group={groups[key]}/>
                  );
                } if (component.type === 'photo') {
                  return (
                    <PhotoComponent key={key} component={component} group={groups[key]} />
                  );
                } if (component.type === 'audio') {
                  return (
                    <AudioComponent key={key} component={component} />
                  );
                } if (component.type === 'text') {
                  return (
                    <TextComponent key={key} component={component} />
                  );
                }
              })}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={3} />
          <Grid item lg />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => state.data;

export default connect(mapStateToProps)(Project);