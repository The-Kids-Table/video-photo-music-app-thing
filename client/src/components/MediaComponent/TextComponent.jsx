import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia, CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import SocialButtons from '../SocialButtons.jsx';


const TextComponent = ({component, elevation, editingProject, likeCount, id, isFeatured}) => (
  <Grid item xs={12}>
    <Paper elevation={elevation}>
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
      <div style={{padding: 10}}>
        <iframe src={component.resourceUrl} width="100%" height="200px" style={{border: 0}}/>
      </div>
    </Paper>
  </Grid>
);

TextComponent.propTypes = {
  component: PropTypes.object.isRequired,
  elevation: PropTypes.number.isRequired
};

export default TextComponent;