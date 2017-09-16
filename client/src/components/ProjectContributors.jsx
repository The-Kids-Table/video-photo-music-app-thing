import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia, CardHeader } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText, ListItemAvatar } from 'material-ui/List';
import Typography from 'material-ui/Typography';
 
const ProjectContributors = ({ owner, contributors }) => (
  <Card>
    <CardHeader
      style={{backgroundColor: '#3F51B5', fontColor: 'white'}}
      title={<Typography style={{color: 'white'}}>Contributors</Typography>}
    />
    <CardHeader
      avatar={
        <Avatar src={owner.avatarUrl} style={{width: 50, height: 50}} />
      }
      title={owner.name}
      subheader='Project Owner'
      style={{textAlign: 'left'}}
    />
    <Divider />

    <List dense>
      {contributors.map((contributor, key) => {
        var key = key++ || 0;
        return (
          <ListItem button key={key}>
            <ListItemAvatar>
              <Avatar src={contributor.avatarUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={contributor.name}
              style={{textAlign: 'left'}}
            />
            <Divider inset />
          </ListItem>
        );
      })}
    </List>
  </Card>
);

ProjectContributors.propTypes = {};
 
export default ProjectContributors; 