import React from 'react';
import PropTypes from 'prop-types';
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

const PhotoComponent = ({component, group, elevation}) => {
  const FULL_WIDTH = 12;
  const HALF_WIDTH = 6;
  const ONE_THIRD_WIDTH = 4;
  const DEFAULT_WIDTH = 0;

  let size = FULL_WIDTH;
  let headerSize = DEFAULT_WIDTH; //if this is DEFAULT_WIDTH, the social buttons are justified right, if it is FULL_WIDTH, they are justified center below the title.
  let cover = {
    objectFit: 'cover',
    maxHeight: '400px'
  };
  group = group || 1;

  if (group === 2) {
    size = HALF_WIDTH;
    headerSize = FULL_WIDTH;
    cover = {
      objectFit: 'cover',
      minHeight: '300px',
      maxHeight: '400px'
    };
  } else if (group > 2) {
    size = ONE_THIRD_WIDTH;
    headerSize = FULL_WIDTH;
    cover = {
      objectFit: 'cover',
      height: '250px'
      // 'min-height': '200px',
      // 'max-height': '250px'
    };
  }

  return (
    <Grid item xs={FULL_WIDTH} md={size}>
      <Paper elevation={elevation}>
        <img src={component.resourceUrl} width="100%" style={cover}/>
        <Grid container justify="space-between" align="center">
          <Grid item xs={headerSize}>
            <CardHeader
              avatar={
                <Avatar src={component.author.avatarUrl} style={{width: 50, height: 50}} />
              }
              title={component.name}
              subheader={component.author.name}
              style={{textAlign: 'left', paddingBottom: 12, 'maxWidth': '100%'}}
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
      </Paper>
    </Grid>
  );
};


PhotoComponent.propTypes = {
  component: PropTypes.object.isRequired,
  group: PropTypes.number,
  elevation: PropTypes.number.isRequired
};

PhotoComponent.defaultProps = {
  group: 1,
};

export default PhotoComponent;