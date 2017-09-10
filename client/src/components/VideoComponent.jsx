import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia, CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import CommentIcon from 'material-ui-icons/Comment';

import VideoPlayer from './video.jsx';

const VideoComponent = ({component, group}) => {
  let size = 12;
  
  if (group > 1) {
    size = 6;
  }

  return (
    <Grid item xs={12} sm={size}>
      <Paper elevation={4}>
        <VideoPlayer fluid="true" controls="true" sources={[{src: component.resourceUrl}]} />
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

export default VideoComponent;