import React from 'react';
import { Route } from 'react-router-dom';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemText, ListItemAvatar } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';

import MediaIcon from './MediaIcon.jsx';
import SocialButtons from './SocialButtons.jsx';

const ListingItem = ({ content }) => {

  let smallIcon = {
    height: 25,
    width: 25,
    margin: 0
  };

  const randomCount = () => {
    return Math.floor(Math.random() * 1000);
  };
  return (
    <div>
      <Route render={({history}) => (
        <ListItem
          button
          onClick={() => {
            let path = '/search';
            if (content.username) {
              path = `/user/${content.username}`;
            } else if (content.owner) {
              path = `/project/${content.owner.username}/${content.name}`;
            } else if (content.author) {
              console.log('no such path yet');
            }
            history.push(path);
          }}
          style={{width: '100%', padding: 0, overflow: 'hidden'}}
        >
          <Grid container wrap='nowrap'>
            <Grid item style={{
              margin: 0,
              align: 'right',
              overflow: 'hidden',
              display: 'relative',
              textAlign: 'left'
            }}>
              {content.hasOwnProperty('thumbnailUrl') ?
                <img 
                  src = {content.thumbnailUrl || 'https://cdn2.lobster.media/assets/default_avatar-afa14913913cc117c73f1ac69496d74e.png'}
                  style={{
                    height: 75,
                    width: 75
                  }}
                />
                :
                <img 
                  src = {content.avatarUrl || 'https://cdn2.lobster.media/assets/default_avatar-afa14913913cc117c73f1ac69496d74e.png'}
                  style={{
                    height: 75,
                    width: 75
                  }}
                />
              }
            </Grid>
            <Grid item style={{textAlign: 'left', marginRight: 0, marginTop: 5}}>
              <Typography>{content.name}</Typography>
              <Typography>{content.tagline}</Typography>
              {!content.username &&
                <Grid
                  container
                  align='center'
                  spacing={0}
                  style={{
                    marginTop: 0,
                    marginBottom: 'auto'
                  }}
                >
                  <Grid item>
                    <Avatar
                      src={content.author ? content.author.avatarUrl : content.owner.avatarUrl}
                      style={smallIcon}
                    />
                  </Grid>
                  <Grid item>
                    <Typography style={{fontSize: '.75em'}} color='secondary'>
                      {content.author ? content.author.name : content.owner.name}
                    </Typography>
                  </Grid>
                </Grid>
              }
            </Grid>
            <SocialButtons likeCount={content.likeCount || 0}/>
          </Grid>
        </ListItem> 
      )} />
      <Divider/>
    </div>
  );
};

export default ListingItem;