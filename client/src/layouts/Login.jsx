import React from 'react';
import axios from 'axios';
import GoogleButton from '../components/buttons/GoogleButton/index.jsx';
import FacebookButton from '../components/buttons/FacebookButton/index.jsx';
import { NavLink } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { alert } from '../actions/controlActions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.sendLoginRequest = this.sendLoginRequest.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleInputChange (property, e) {
    let stateChange = {};
    stateChange[property] = e.target.value;
    this.setState(stateChange);
  }

  handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.sendLoginRequest();
    }
  }

  sendLoginRequest () {
    if (this.state.username && this.state.password) {
      axios.post('/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then((res) => {
        window.location.replace(res.request.responseURL); // Performs redirect to proper page
        return res;
      })
      .catch((err) => {
        this.props.alert('Incorrect username or password');
      });
    } else {
      let missingVals = [];
      if (!this.state.username) {
        missingVals.push('username');
      }
      if (!this.state.password) {
        missingVals.push('password');
      }
      let errorString = `Incomplete! You're missing`;
      for (let i = 0; i < missingVals.length; i++) {
        if (i === missingVals.length - 1 && missingVals.length > 1) {
          errorString += ', and ' + missingVals[i];
        } else if (i === 0) {
          errorString += ' ' + missingVals[i];
        } else {
          errorString += ', ' + missingVals[i];
        }
      }
      this.props.alert(errorString);
    }
  }

  render() {
    const navItemStyle = {textDecoration: 'none'};
    return (
      <div>
        <h1>Login</h1>
        <TextField onKeyPress={this.handleKeyPress} label='Username' type='text' value={this.state.username} onChange={this.handleInputChange.bind(this, 'username')} /><br/>
        <TextField onKeyPress={this.handleKeyPress} label='Password' type='password' value={this.state.password} onChange={this.handleInputChange.bind(this, 'password')} /><br/>
        <Button raised className={'btn'} onClick={this.sendLoginRequest}>Login</Button>
        <NavLink
          to='/signup'
          style={navItemStyle}
        >
          <Button className={'btn'}>Sign Up</Button><br/>
        </NavLink>
        <GoogleButton className={'btn'} onClick={() => {window.location.href = '/auth/google'}} />
      </div>
    ) 
  }
}

const mapDispatchToProps = dispatch => ({
  alert(msg) {
    dispatch(alert(msg));
  }
});

export default connect(null, mapDispatchToProps)(Login);