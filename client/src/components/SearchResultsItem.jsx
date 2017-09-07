import React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';


const SearchResultsItem = ({ project }) => (
  <Grid container spacing={8}>
    <Grid item sm></Grid>
    <Grid item xs={12} sm={10} md={8}>
      <Card style={{display: 'flex'}}>
        <CardMedia
          image={project.thumbnailUrl}
          style={{height: 125, width: 125}}
        />
        <CardContent>
          <Typography style={{textAlign: 'left'}}>
            <h2>{project.name}</h2>
            <h5>Owner: {project.owner.name}</h5>
          </Typography>
        </CardContent>
        <CardContent>
          <Icon>
            
          </Icon>
        </CardContent>
      </Card>
    </Grid>
    <Grid item sm></Grid>
  </Grid>
);

export default SearchResultsItem;