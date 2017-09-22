import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia, CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import SocialButtons from '../SocialButtons.jsx';

import VideoPlayer from './VideoPlayer.jsx';

const VideoComponent = ({component, group, elevation, editingProject, likeCount, id, isFeatured}) => {
  let size = 12;
  let headerSize = 0;
  group = group || 1;
  
  if (group > 1) {
    size = 6;
    headerSize = 12; //you can set this to 6, but it will cause the buttons to turn into a triangle format on small formats
  }

  return (
    <Grid item xs={12} md={size}>
      <Paper elevation={elevation}>
        <VideoPlayer fluid={true} controls={true} sources={[{src: component.resourceUrl}]} />
        <Grid container spacing={0} justify="space-between" align="center">
          <Grid item xs={headerSize}>
            <CardHeader
              avatar={
                <Avatar src={component.author.avatarUrl} style={{width: 50, height: 50}} />
              }
              title={component.name}
              subheader={component.author.name}
              style={{textAlign: 'left', paddingBottom: 12}}
            />
          </Grid>
          <Grid item xs={headerSize}>
            <SocialButtons editingProject={editingProject} likeCount={likeCount} id={component.id} isFeatured={isFeatured} />
          </Grid>
        </Grid>
        <Typography type="body1" component="p" style={{textAlign: 'left', padding: '15px'}}>
          {component.description}
        </Typography>
      </Paper>
    </Grid>
  );
};

VideoComponent.propTypes = {
  component: PropTypes.object.isRequired,
  group: PropTypes.number,
  elevation: PropTypes.number.isRequired
};

VideoComponent.defaultProps = {
  group: 1,
};

export default VideoComponent;