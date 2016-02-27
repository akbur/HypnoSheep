//import React from 'react';
// import request from 'superagent';
// import Auth from './AuthService';
import { browserHistory } from 'react-router'
var React = require('react');
var request = require('superagent');
//var LoginAction = require('./LoginActions');
//var Auth = require('./AuthService');
//var path = require('./index');

import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

const buttonStyle = {
  margin: 12,
};

var SignIn = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: ''
    }
  },

  componentDidMount: function() {
    //check local storage for jwt
    //window.sessionStorage.token
  },

  auth: function(username, password) {
    var user = {
      username: username,
      password: password
    };
    request.post('auth/signin').send(user).end((err, res) => {
      if (err || !res.ok) {
        console.log(err);
      } else if ( res.text === 'user not found' || res.text === 'passwords dont match'){
        console.log(res.text);
      } else {
        var userId = res.body.user._id;
        var jwt = JSON.parse(res.text);
        console.log(res);
        console.log(Date.now());
        this.loginUser(userId, jwt.token);
        return true;
      }
    });
  },

  loginUser: function(userId, jwt) {
    browserHistory.push('/projects/' + userId);
    localStorage.setItem('jwt', jwt);
    console.log(window);
  },

  handleUserSubmit: function(e) {
    e.preventDefault();

    this.auth(this.state.username, this.state.password)
      .catch(err => {
          console.log('error! ', err);
        });
    this.setState({username: '', password: ''});
  },

  onUserChange: function(e) {
    this.setState({username: e.target.value});
  },

  onPassChange: function(e) {
    this.setState({password: e.target.value});
  },

  render: function() {
    return (
      <div>
        <h3>Sign in</h3>
        <form className="userForm">
          {/*<Link to="/projects"></Link>*/}
          
          <TextField
            hintText="Username"
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
            style={buttonStyle}
            onClick={this.handleUserSubmit}
          />
        </form>
      </div>
    )
  }
});

module.exports = SignIn;