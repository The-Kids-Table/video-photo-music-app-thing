import React from 'react';
import { Route } from 'react-router-dom';
import { gql, graphql } from 'react-apollo';
import { compose } from 'react-apollo';

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

const ListingItem = ({ content, likeProject, type }) => {

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
              {!content.hasOwnProperty('thumbnailUrl') &&
                <img 
                  src={content.avatarUrl}
                  style={{
                    height: 75,
                    width: 75
                  }}
                />

                ||

                content.hasOwnProperty('thumbnailUrl') && thumbnailUrl &&
                <img
                  src={content.thumbnailUrl}
                  style={{
                    height: 75,
                    width: 75,
                    objectFit: 'cover'
                  }}
                />

                ||

                !content.hasOwnProperty('thumbnailUrl') && type &&
                <MediaIcon type={type} />
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
            <SocialButtons
              likeCount={content.likeCount || 0}
              likeProject={likeProject}
              unlikeProject={unlikeProject}
              likeProjectComponent={likeProjectComponent}
              unlikeProjectComponent={unlikeProjectComponent}
              followUser={followUser}
              unfollowUser={unfollowUser}
            />
          </Grid>
        </ListItem> 
      )} />
      <Divider/>
    </div>
  );
};

const likeProject = gql`
  mutation likeProject($id: Int!) {
    likeProject(projectId: $id)
  }
`;

const unlikeProject = gql`
  mutation unlikeProject($id: Int!) {
    unlikeProject(projectId: $id)
  }
`;

const likeProjectComponent = gql`
  mutation likeProjectComponent($id: Int!) {
    likeProjectComponent(projectComponentId: $id)
  }
`;

const unlikeProjectComponent = gql`
  mutation unlikeProjectComponent($id: Int!) {
    unlikeProjectComponent(projectComponentId: $id)
  }
`;

const followUser = gql`
  mutation followUser($id: Int!) {
    followUser(projectId: $id)
  }
`;

const unfollowUser = gql`
  mutation unfollowUser($id: Int!) {
    unfollowUser(projectId: $id)
  }
`;

export default compose(
  graphql(likeProject, {props: ({ mutate }) => ({
    likeProject: (id) => mutate({ variables: id})
  })}),
  graphql(unlikeProject, {props: ({ mutate }) => ({
    unlikeProject: (id) => mutate({ variables: id})
  })}),
  graphql(likeProjectComponent, {props: ({ mutate }) => ({
    likeProjectComponent: (id) => mutate({ variables: id})
  })}),
  graphql(unlikeProjectComponent, {props: ({ mutate }) => ({
    unlikeProjectComponent: (id) => mutate({ variables: id})
  })}),
  graphql(followUser, {props: ({ mutate }) => ({
    followUser: (id) => mutate({ variables: id})
  })}),
  graphql(unfollowUser, {props: ({ mutate }) => ({
    unfollowUser: (id) => mutate({ variables: id})
  })})
)(ListingItem);

// export default compose(
//   graphql(likeProject, { name: 'likeProject' }),
//   graphql(unlikeProject, { name: 'unLikeProject' }),
//   graphql(likeProjectComponent, { name: 'likeProjectComponent' }),
//   graphql(unlikeProjectComponent, { name: 'unlikeProjectComponent' }),
//   graphql(followUser, { name: 'followUser' }),
//   graphql(unfollowUser, { name: 'unfollowUser' })
// )(ListingItem);