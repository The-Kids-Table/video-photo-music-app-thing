import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia, CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import CommentIcon from 'material-ui-icons/Comment';

import VideoPlayer from './VideoPlayer.jsx';

const VideoComponent = ({component, group, elevation}) => {
  let size = 12;
  let headerSize = 0;
  
  if (group > 1) {
    size = 6;
    headerSize = 12; //you can set this to 6, but it will cause the buttons to turn into a triangle format on small formats
  }

  return (
    <Grid item xs={12} md={size}>
      <Paper elevation={elevation}>
        <VideoPlayer fluid="true" controls="true" sources={[{src: component.resourceUrl}]} />
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
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Comments">
              <CommentIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
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
  group: PropTypes.number.isRequired,
  elevation: PropTypes.number.isRequired
};

export default VideoComponent;