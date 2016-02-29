import React from 'react';
import request from 'superagent';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Roboto:400,700:latin']
  }
});

const SignIn = React.createClass({
  getInitialState() {
    return {
      username: '',
      password: '',
      usernameError: null,
      passwordError: null
    };
  },

  onUserChange(e) {
    this.setState({ username: e.target.value });
  },

  onPassChange(e) {
    this.setState({ password: e.target.value });
  },

  auth(username, password) {
    const user = {
      username,
      password
    };
    request
      .post('/auth/signin')
      .send(user)
      .end((err, res) => {
        if (err || !res.ok) {
          console.log(err);
          return;
        }
        if (res.text === 'Incorrect username.') {
          this.setState({ usernameError: res.text });
          return;
        }
        if (res.text === 'Incorrect password.') {
          this.setState({ passwordError: res.text });
          return;
        }
        const userName = res.body.user.username;
        const jwt = JSON.parse(res.text);
        this.loginUser(userName, jwt.token);
        return true;
      });
  },

  loginUser(userId, jwt) {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('userId', userId);
    browserHistory.push(`/app/projects/${userId}`);
  },

  linkToSignUp() {
    browserHistory.push('/signup');
  },

  handleUserSubmit(e) {
    e.preventDefault();
    this.auth(this.state.username, this.state.password);
    this.setState({ username: '', password: '' });
  },

  render() {
    const buttonStyle = {
      margin: 12,
    };
    const backgroundStyle = {
      'textAlign': 'center',
    };
    const textStyle = {
      fontFamily: 'Roboto'
    };
    const paperStyle = {
      height: '100%',
      width: '15%',
      margin: 20,
      padding: 20,
      textAlign: 'center',
      display: 'inline-block',
      float: 'center'
    };
    return (
      <div style={backgroundStyle}>
        <h1 style={textStyle}>Sign In</h1>
        <form className="userForm">
          <TextField
            hintText="Username"
            type="username"
            value={this.state.username}
            errorText={this.state.usernameError}
            onChange={this.onUserChange}
          /><br />
          <TextField
            hintText="Password"
            type="password"
            value={this.state.password}
            errorText={this.state.passwordError}
            onChange={this.onPassChange}
          />
          <br />
          <RaisedButton
            label="Sign In"
            secondary={true}
            style={buttonStyle}
            type="submit"
            onClick={this.handleUserSubmit}
          />
        <RaisedButton
          label="Sign Up"
          secondary={true}
          style={buttonStyle}
          type="submit"
          onClick={this.linkToSignUp}
        />
        </form>
        <Paper style={paperStyle} zDepth={2}>
          <h2 style={{ fontSize: 40 }}>Where</h2>
          <h2 style={{ fontSize: 40 }}>Was</h2>
          <h2 style={{ fontSize: 40 }}>I</h2>
          <h2 style={{ fontSize: 40 }}>?</h2>
        </Paper>
        </div>
    );
  }
});

export default SignIn;
