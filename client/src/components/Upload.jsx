import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import { CircularProgress } from 'material-ui/Progress';

import MediaIcon from './MediaIcon.jsx';

const Upload = ({ allowedType, style }) => {
  let dropzoneStyles = {};
  style = style || 'fullWidth';
  allowedType = allowedType || 'any';
  
  if (style === 'thumbnail') {
    dropzoneStyles = { 
      border: 'dashed', 
      borderColor: 'grey', 
      borderRadius: 10, 
      width: 250, 
      height: 250, 
      overflow: 'hidden',
      maxWidth: '100%',
      boxSizing: 'border-box',
      marginLeft: 'auto',
      marginRight: 'auto'
    };
  } else if (style === 'fullWidth') {
    dropzoneStyles = { 
      border: 'dashed', 
      borderColor: 'grey', 
      borderRadius: 10, 
      width: '100%', 
      height: 250, 
      overflow: 'hidden',
      maxWidth: '100%',
      boxSizing: 'border-box'
    };
  }

  let dropzoneFileTypes = [];

  if (allowedType === 'image') {
    dropzoneFileTypes = [
      'image/png',
      'image/jpeg',
      'image/gif',
      'image/bmp',
      'image/svg+xml'
    ];
  } else if (allowedType = 'any') {
    dropzoneFileTypes = [
      //IMAGE FILE TYPES
      'image/png',
      'image/jpeg',
      'image/gif',
      'image/bmp',
      'image/svg+xml',
      //VIDEO FILE TYPES
      'video/mp4',
      'video/webm',
      //TEXT FILE TYPES
      'text/plain',
      //AUDIO FILE TYPES
      'audio/mp3',
      'audio/wav',
      'audio/ogg',
      'audio/webm',
      'audio/aac'
    ];
  }

  //Defining custom rendering components
  const imageComponent = (({ uploadedFile }) => <img src={uploadedFile.fileUrl} style={{objectFit: 'cover', width: 'auto', height: '100%', align: 'center'}}/>);
  const progressComponent = (({progress}) => (progress ? (<div style={{margin: 50}}><CircularProgress size={150} mode="determinate" value={progress} min={0} max={100} /></div>) : null));
  const fileComponent = (({ uploadedFile }) => {
    let type = 'text';                                                                      // Assume it's a text file, then:

    if (uploadedFile.filename && uploadedFile.filename.match(/\.(mp4|m4v)/i)) {                 // Check if it's a video file...
      type = 'video';
    } else if (uploadedFile.filename && uploadedFile.filename.match(/\.(mp3|wav|ogg|aac)/i)) {  // ...or if it's an audio file.
      type = 'audio';
    }

    return (
      <div>
        <MediaIcon type={type} size="large" />
        <Typography>{uploadedFile.file.name}</Typography>
      </div>
    );
  }

  );

  dropzoneFileTypes = dropzoneFileTypes.join(',');

  const handleFinishedUpload = info => {
    //URL=info.fileUrl
  };


  const uploadOptions = {
    server: 'http://' + window.location.host
  };
  const s3Url = 'https://qraft-uploads.s3.amazonaws.com';

  return (
    <Grid container spacing={0} justify="center">
      <Grid item xs={11}>
        <DropzoneS3Uploader 
          style={dropzoneStyles} 
          accept={dropzoneFileTypes} 
          onFinish={handleFinishedUpload} 
          s3Url={s3Url} 
          upload={uploadOptions} 
          imageComponent={imageComponent}
          progressComponent={progressComponent}
          fileComponent={fileComponent} />
      </Grid>
      <Grid item xs={12}>
        <Typography style={{width: '100%', margin: 5}}>Drag files from desktop or click to upload.</Typography>
      </Grid>
    </Grid>
  );
};

Upload.propTypes = {
  allowedType: PropTypes.string,
  style: PropTypes.string
};

Upload.defaultProps = {
  allowedType: 'any',
  style: 'fullWidth'
};

export default Upload;