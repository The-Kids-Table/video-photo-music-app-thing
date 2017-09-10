import React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import TheatersIcon from 'material-ui-icons/Theaters';
import ImageIcon from 'material-ui-icons/Image';
import AudiotrackIcon from 'material-ui-icons/Audiotrack';
import TextFieldsIcon from 'material-ui-icons/TextFields';
import Avatar from 'material-ui/Avatar';


const ListingItem = ({ content, type }) => {
  let title = 0;
  let person = 0;
  let image = 0;

  const setIcon = (type, content) => {
    let large = {
      height: 120,
      width: 120,
      color: 'grey'
    };

    if (type === 'text') {
      return (<TextFieldsIcon style={large} />);
    } else if (type === 'audio') {
      return (<AudiotrackIcon style={large} />);
    } else if (type === 'photo') {
      return (<ImageIcon style={large} />);
    } else if (type === 'video') {
      return (<TheatersIcon style={large} />);
    }
  };

  if (content.contentType === 'project') {
    title = content.name;
    person = 'Owner: ' + content.owner.name;
    image = setIcon(content.featuredComponent.type, content);
  } else if (content.contentType === 'component') {
    title = content.name;
    person = 'Author: ' + content.author.name;
    image = setIcon(content.type, content);
  } else if (content.contentType === 'user') {
    title = content.name;
    person = content.jobTitle;
    image = (<Avatar src={content.avatarUrl} style={{width: 100, height: 100, margin: 10}} />);
  }

  return (
    <Grid container spacing={24}>
      <Grid item sm />
      <Grid item xs={12} sm={10} md={8}>
        <Card style={{display: 'flex'}}>
          {image}
          <CardContent>
            <Typography style={{textAlign: 'left'}}>
              <h2>{title}</h2>
              <h3>{person}</h3>
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
};

export default ListingItem;