import React from 'react';
import PropTypes from 'prop-types';
 
import ImageIcon from 'material-ui-icons/Image';
import AudiotrackIcon from 'material-ui-icons/Audiotrack';
import TextFieldsIcon from 'material-ui-icons/TextFields';
import TheatersIcon from 'material-ui-icons/Theaters';
import List, { ListItem, ListItemText, ListItemAvatar } from 'material-ui/List';

const MediaIcon = ({ type, size }) => {
  let style;
  size = size || 'small';

  if (size === 'large') {
    style = {
      height: 70,
      width: 70,
      margin: 0,
      color: '#3F51B5'
    };
  } else if (size === 'small') {
    style = {
      height: 30,
      width: 30,
      margin: 0,
      color: '#3F51B5'
    };
  }

  return (
    type === 'text' && 
      <TextFieldsIcon style={style} />
    ||

    type === 'audio' &&
      <AudiotrackIcon style={style} />
    ||

    type === 'image' &&
      <ImageIcon style={style} />
    ||

    type === 'video' &&
      <TheatersIcon style={style} />
  );
};

MediaIcon.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.string
};

MediaIcon.defaultProps = {
  size: 'small'
};

export default MediaIcon;