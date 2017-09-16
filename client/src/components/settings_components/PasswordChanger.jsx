import React, { Component } from 'react';
import { Paper, Typography, Button, TextField } from 'material-ui';
import { gql, graphql } from 'react-apollo';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { connect } from 'react-redux';
import { setCurrentPassword, setNewPassword, openPasswordDialog, closePasswordDialog, resetPassword } from '../../actions/controlActions';

const styles = {
  button: {
    margin: 10
  },
  textField: {
    margin: 5
  }
};

const PasswordChanger = (props) => (
  <div>
    <Paper>
      <Typography type="headline" component="h3">
        Change Password
      </Typography>
      <div>
        <TextField
          style={styles.textField}
          label='Current Password'
          type='password'
          value={props.currentPassword}
          onChange={props.setCurrentPassword}
        />
        <TextField
          style={styles.textField}
          label='New Password'
          type='password'
          value={props.newPassword}
          onChange={props.setNewPassword}
        />
        <br/>
        <Button color='primary' disabled={!(props.currentPassword && props.newPassword)} raised onClick={props.openDialog} style={styles.button}>
          Submit
        </Button>
      </div>
    </Paper>
    <Dialog open={props.dialogOpen} onRequestClose={props.closeDialog}>
      <DialogTitle>{'Really???'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This action is not reversible. Are you absolutely sure you want to change your password?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeDialog} color='primary'>
          Cancel
        </Button>
        <Button onClick={
          () => {
            props.resetPassword(props.currentPassword, props.newPassword);
            props.mutate({
              variables: {currentPassword: props.currentPassword, newPassword: props.newPassword}
            });
          }
        } color='primary'>
          Yes, change it!
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

const mapStateToProps = state => {
  return {
    currentPassword: state.control.settings.password.current,
    newPassword: state.control.settings.password.new,
    dialogOpen: state.control.settings.password.dialogOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentPassword: (e) => dispatch(setCurrentPassword(e.target.value)),
    setNewPassword: (e) => dispatch(setNewPassword(e.target.value)),
    openDialog: () => dispatch(openPasswordDialog()),
    closeDialog: () => dispatch(closePasswordDialog()),
    resetPassword: (currentPassword, newPassword) => dispatch(resetPassword(currentPassword, newPassword))
  };
};

// TODO - Show error if something goes wrong
const changePassword = gql`
  mutation editUserPassword($currentPassword: String! $newPassword: String!) {
    editUserPassword(currentPassword: $currentPassword newPassword: $newPassword)
  }
`;

export default graphql(changePassword)(connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordChanger));