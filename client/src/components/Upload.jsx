import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import { CircularProgress } from 'material-ui/Progress';

const Upload = ({ allowedType }) => {
  const dropzoneStyles = { 
    border: 'dashed', 
    borderColor: 'grey', 
    borderRadius: 10, 
    width: '100%', 
    height: 250, 
    overflow: 'hidden',
    maxWidth: '100%',
    boxSizing: 'border-box'
  };
  let dropzoneFileTypes = [];

  if (allowedType === 'image') {
    dropzoneFileTypes = [
      'image/png',
      'image/jpeg',
      'image/gif',
      'image/bmp',
      'image/svg+xml'
    ];
  } else {
    dropzoneFileTypes = [
      //IMAGE FILE TYPES
      'image/png',
      'image/jpg',
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

  const imageComponent = (({ uploadedFile }) => <img src={uploadedFile.fileUrl} style={{objectFit: 'cover', width: 'auto', height: '100%', align: 'center'}}/>);
  const progressComponent = (({progress}) => (progress ? (<div style={{margin: 50}}><CircularProgress size={150} mode="determinate" value={progress} min={0} max={25} /></div>) : null));

  dropzoneFileTypes = dropzoneFileTypes.join(',');

  const handleFinishedUpload = info => {
    console.log('file ' + info.filename + 'successfully uploaded!');
    console.log('the file link is ' + info.fileUrl);
  };


  const uploadOptions = {
    server: 'http://' + window.location.host
  };
  const s3Url = 'https://qraft-uploads.s3.amazonaws.com';

  console.log(dropzoneStyles);
  console.log(dropzoneFileTypes);
  console.log(handleFinishedUpload);
  console.log(s3Url);
  console.log(uploadOptions);

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
          progressComponent={progressComponent} />
      </Grid>
      <Grid item xs={12}>
        <Typography style={{width: '100%', margin: 5}}>Drag files from desktop or click to upload.</Typography>
      </Grid>
    </Grid>
  );
};

export default Upload;