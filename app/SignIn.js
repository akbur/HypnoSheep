// import React from 'react';
// import request from 'superagent';
// import Auth from './AuthService';
import { browserHistory } from 'react-router';
const React = require('react');
const request = require('superagent');
// const LoginAction = require('./LoginActions');
// const Auth = require('./AuthService');
// const path = require('./index');

import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

const buttonStyle = {
  margin: 12,
};

const SignIn = React.createClass({
  getInitialState() {
    return {
      username: '',
      password: ''
    };
  },

  componentDidMount() {
    // check local storage for jwt
    // window.sessionStorage.token
  },

  onUserChange(e) {
    this.setState({ username: e.target.value });
  },

  onPassChange(e) {
    this.setState({ password: e.target.value });
  },

  loginUser(userId, jwt) {
    browserHistory.push(`/projects/${userId}`);
    localStorage.setItem('jwt', jwt);
    console.log(window);
  },

  handleUserSubmit(e) {
    e.preventDefault();

    this.auth(this.state.username, this.state.password)
      .catch(err => {
        console.log('error! ', err);
      });
    this.setState({ username: '', password: '' });
  },

  auth(username, password) {
    const user = {
      username,
      password
    };
    request.post('auth/signin').send(user).end((err, res) => {
      if (err || !res.ok) {
        console.log(err);
      } else if (res.text === 'user not found' || res.text === 'passwords dont match') {
        console.log(res.text);
      } else {
        const userId = res.body.user._id;
        const jwt = JSON.parse(res.text);
        console.log(res);
        console.log(Date.now());
        this.loginUser(userId, jwt.token);
        return true;
      }
    });
  },

  render() {
    return (
      <div>
        <h3>Sign in</h3>
        <form
          className="userForm"
        >
          {/* <Link to="/projects"></Link> */}

          <TextField
            hintText="Username"
            type="username"
            value={this.state.username}
            onChange={this.onUserChange}
          /><br />

          <TextField
            hintText="Password"
            type="password"
            value={this.state.password}
            onChange={this.onPassChange}
          /><br />

          <RaisedButton
            label="Sign In"
            type="submit"
            style={buttonStyle}
            onClick={this.handleUserSubmit}
          />
        </form>
      </div>
    );
  }
});

module.exports = SignIn;
