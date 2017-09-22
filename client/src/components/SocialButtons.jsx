import React from 'react';
import { gql, graphql, compose } from 'react-apollo';

import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import DeleteIcon from 'material-ui-icons/Delete';
import ArrowUpwardIcon from 'material-ui-icons/ArrowUpward';
import Typography from 'material-ui/Typography';

const SocialButtons = ({ likeCount, editingProject, editingUser, id, isFeatured, setFeaturedProjectComponent, deleteProjectComponent }) => (

  (editingProject && isFeatured) &&
  <Grid item style={{marginLeft: 'auto'}}>
    <Grid container spacing={0} align='center'>
      <Grid item style={{marginLeft: 'auto'}}>
        <IconButton
          onClick={() => deleteProjectComponent({id})}
          aria-label="Remove from project"
          style={{zIndex: 1000, align: 'left'}}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  </Grid>

  ||

  (editingProject && !isFeatured) &&
  <Grid item style={{marginLeft: 'auto'}}>
    <Grid container spacing={0} align='center'>
      <Grid item style={{marginLeft: 'auto'}}>
        <IconButton
          onClick={() => deleteProjectComponent({id})}
          aria-label="Remove from project"
          style={{zIndex: 1000, align: 'left'}}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
      <Grid item style={{marginRight: 'auto'}}>
        <IconButton 
          onClick={() => setFeaturedProjectComponent({id})}
          aria-label="Promote to featured"
        >
          <ArrowUpwardIcon />
        </IconButton>
      </Grid>
    </Grid>
  </Grid>

  ||

  editingUser &&
  <Grid item style={{marginLeft: 'auto'}}>
    <Grid container spacing={0} align='center'>
      <Grid item style={{marginLeft: 'auto'}}>
        <IconButton
          onClick={() => console.log('delete ' + id)}
          aria-label="Remove from project"
          style={{zIndex: 1000, align: 'left'}}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  </Grid>

  ||

  !editingProject && !editingUser &&
  <Grid item style={{marginLeft: 'auto'}}>
    <Grid container spacing={0} align='center'>
      <Grid item style={{marginLeft: 'auto'}}>
        <Typography style={{margin: 0, width: 50}} align='right' color='secondary'>
          {likeCount}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton
          onClick={() => console.log('Like ' + id)}
          aria-label="Add to favorites"
          style={{zIndex: 1000, align: 'left'}}
        >
          <FavoriteIcon />
        </IconButton>
      </Grid>
      <Grid item style={{marginRight: 'auto'}}>
        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
      </Grid>
    </Grid>
  </Grid>
);

const deleteProjectComponent = gql`
  mutation deleteProjectComponent($id: Int!) {
    deleteProjectComponent(id: $id) {
      id
      name
    }
  }
`;

const setFeaturedProjectComponent = gql`
  mutation setFeaturedProjectComponent($id: Int!) {
    setFeaturedProjectComponent(projectComponentId: $id)
  }
`;

export default compose(
  graphql(deleteProjectComponent, {props: ({ mutate }) => ({
    deleteProjectComponent: (id) => mutate({ variables: id })
  })}),
  graphql(setFeaturedProjectComponent, {props: ({ mutate }) => ({
    setFeaturedProjectComponent: (id) => mutate({ variables: id })
  })})
)(SocialButtons);