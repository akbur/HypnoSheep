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

const SignupForm = React.createClass({
  getInitialState() {
    return {
      username: '',
      password: '',
      usernameError: null,
      passwordError: null,
      containsError: false
    };
  },

  onUsernameChange(event) {
    this.setState({ username: event.target.value });
    this.validateUsername(event);
  },

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
    this.validatePassword(event);
  },

  onSignupSubmit() {
    // format data
    const user = {
      username: this.state.username,
      password: this.state.password,
    };

    // send post request with data
    request
      .post('auth/signup')
      .send(user)
      .end((err, res) => {
        if (err || !res.ok) {
          console.log(err);
          return;
        }
        if (res.text === 'Username already exists.') {
          this.setState({ usernameError: res.text });
          return;
        }
        browserHistory.push('/signin');
      });

    // clear forms
    this.setState({ username: '', password: '' });
  },

  validateUsername(event) {
    const username = event.target.value;
    const alphanumeric = /^[a-z0-9]+$/i;
    const isValid = alphanumeric.test(username);
    // test to see if a valid username
    const usernameError = isValid ? null : 'Username must be composed of only letters and numbers';
    const containsError = (!!usernameError || !!this.state.passwordError);
    // set errors
    this.setState({ usernameError, containsError });
  },

  validatePassword(event) {
    const password = event.target.value;
    const minNumberChars = 6;
    // test to see if a valid password
    const isValid = password.length >= minNumberChars;
    const passwordError = isValid ? null : `Password must be at least ${minNumberChars} characters`;
    const containsError = (!!passwordError || !!this.state.usernameError);
    // set errors
    this.setState({ passwordError, containsError });
  },

  linkToSignIn() {
    browserHistory.push('/signin');
  },

  render() {
    const buttonStyle = {
      margin: 12
    };
    const backgroundStyle = {
      textAlign: 'center'
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
        <h1 style={textStyle}>Sign Up</h1>
        <form
          className="signupForm"
          onSubmit={(event) => event.preventDefault()}
        >
          <TextField
            hintText="Username"
            value={this.state.username}
            errorText={this.state.usernameError}
            onChange={this.onUsernameChange}
          /><br />
          <TextField
            hintText="Password"
            type="password"
            value={this.state.password}
            errorText={this.state.passwordError}
            onChange={this.onPasswordChange}
          /><br />
          <RaisedButton
            label="Sign In"
            secondary={true}
            style={buttonStyle}
            type="submit"
            onClick={this.linkToSignIn}
          />
          <RaisedButton
            type="submit"
            label="Sign Up"
            secondary={true}
            disabled={this.state.containsError}
            onClick={this.onSignupSubmit}
            style={buttonStyle}
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

export default SignupForm;
