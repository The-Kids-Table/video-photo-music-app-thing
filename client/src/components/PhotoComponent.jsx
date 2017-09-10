import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card, { CardContent, CardMedia, CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import CommentIcon from 'material-ui-icons/Comment';

const PhotoComponent = ({component, group}) => {
  let size = 12;
  let set = 1;
  let cover = {
    'object-fit': 'cover',
    'max-height': '400px'
  };
  
  if (group === 2) {
    size = 6;
    set = 2;
    cover = {
      'object-fit': 'cover',
      'min-height': '300px',
      'max-height': '400px'
    };
  } else if (group > 2) {
    size = 4;
    set = 3;
    cover = {
      'object-fit': 'cover',
      'height': '250px',
      // 'min-height': '200px',
      // 'max-height': '250px'
    };
  }

  return (
    <Grid item xs={12} sm={size}>
      <Paper elevation={4}>
        <img src={component.resourceUrl} width="100%" style={cover}/>
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
      </Paper>
    </Grid>
  );
};

export default PhotoComponent;