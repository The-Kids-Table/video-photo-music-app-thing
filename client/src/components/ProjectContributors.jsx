import React from 'react';

import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia, CardHeader } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText, ListItemAvatar } from 'material-ui/List';
import Typography from 'material-ui/Typography';

const ProjectContributors = ({ owner, contributors }) => {
  
  return (
    <Card>
      <CardHeader
        style={{backgroundColor: '#3F51B5', fontColor: 'white'}}
        title={<Typography style={{color: 'white'}}>Contributors</Typography>}
      />
      <CardHeader
        avatar={
          <Avatar src={owner.avatarUrl} style={{width: 50, height: 50}}>
            
          </Avatar>
        }
        title={owner.name}
        subheader='Project Owner'
        style={{textAlign: 'left'}}
      />
      <Divider />

      <List dense>
        {contributors.map(contributor => {
          return (
            <ListItem button>
              <ListItemAvatar>
                <Avatar src={contributor.avatarUrl}></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={contributor.name}
                secondary={contributor.jobTitle}
                style={{textAlign: 'left'}}
              />
              <Divider inset />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

export default ProjectContributors;