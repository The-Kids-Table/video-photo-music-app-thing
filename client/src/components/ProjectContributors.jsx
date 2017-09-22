import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia, CardHeader } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText, ListItemAvatar } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import AddIcon from 'material-ui-icons/Add';
import { withTheme } from 'material-ui/styles';

const propTypes = {
  owner: PropTypes.object.isRequired,
  contributors: PropTypes.array
};
 
const ProjectContributors = ({ owner, contributors, editingProject, theme }) => (
  
  editingProject &&
  <Card>
    <CardHeader
      style={{backgroundColor: theme.palette.primary[500], fontColor: theme.palette.text.primary}}
      title={<Typography>Contributors</Typography>}
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
      {contributors.map((contributor, key) => (
        <Route render={({ history }) => (
          <ListItem button key={key} onClick={() => {
            history.push(`/user/${contributor.username}`);
          }}>
            <ListItemAvatar>
              <Avatar src={contributor.avatarUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={contributor.name}
              style={{textAlign: 'left'}}
            />
            <Divider inset />
          </ListItem>
        )}/>
      ))}
      {
        editingProject &&
        <ListItem button onClick={() => {
          console.log('add new contributor clicked');
        }}>
          <div style={{width: '100%', textAlign: 'center'}}>
            <AddIcon />
          </div>
        </ListItem>
      }
    </List>
  </Card>
  ||

  !editingProject &&
  <Card>
    <CardHeader
      style={{backgroundColor: theme.palette.primary[500], fontColor: theme.palette.text.primary}}
      title={<Typography>Contributors</Typography>}
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
      {
        console.log(contributors)
      }
      {contributors.map((contributor, key) => {
        var key = key++ || 0;
        return (
          <Route render={({ history }) => (
            <ListItem button key={key} onClick={() => {
              history.push(`/user/${contributor.username}`);
            }}>
              <ListItemAvatar>
                <Avatar src={contributor.avatarUrl} />
              </ListItemAvatar>
              <ListItemText
                primary={contributor.name}
                style={{textAlign: 'left'}}
              />
              <Divider inset />
            </ListItem>
          )}/>
        );
      })}
    </List>
  </Card>
);

ProjectContributors.propTypes = propTypes;
 
export default withTheme(ProjectContributors); 