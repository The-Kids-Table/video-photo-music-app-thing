import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia, CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import SocialButtons from '../SocialButtons.jsx';

import AudioPlayer from './AudioPlayer.jsx';
// import videojsWavesurfer from 'videojs-wavesurfer';

const AudioComponent = ({component, elevation, editingProject, likeCount, id, isFeatured}) => (
  <Grid item xs={12}>
    <Paper elevation={elevation}>
      <AudioPlayer aspectRatio="8:1" fluid={true} controls={true} sources={[{src: component.resourceUrl, type: 'audio/mp3'}]} />
      <Grid container justify="space-between" align="center">
        <Grid item>
          <CardHeader
            avatar={
              <Avatar src={component.author.avatarUrl} style={{width: 50, height: 50}} />
            }
            title={component.name}
            subheader={component.author.name}
            style={{textAlign: 'left', paddingBottom: 12}}
          />
        </Grid>
        <Grid item>
          <SocialButtons editingProject={editingProject} likeCount={likeCount} id={component.id} isFeatured={isFeatured} />
        </Grid>
      </Grid>
      <Typography type="body1" component="p" style={{textAlign: 'left', padding: '15px'}}>
        {component.description}
      </Typography>
    </Paper>
  </Grid>
);

AudioComponent.propTypes = {
  component: PropTypes.object.isRequired,
  elevation: PropTypes.number.isRequired
};

export default AudioComponent;