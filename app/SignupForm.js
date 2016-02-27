import React from 'react';
import request from 'superagent';
import { browserHistory } from 'react-router';

import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

const buttonStyle = {
  margin: 12,
};


const SignupForm = React.createClass({
  getInitialState() {
    return {
      username: '',
      password: '',
    };
  },

  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <form 
          className="signupForm"
          onSubmit={(event) => event.preventDefault()}
        >
          <TextField
            hintText="Username"
            value={this.state.username}
            onChange={(event) => this.setState({username: event.target.value})}
          /><br />

          <TextField
            hintText="Password"
            type="password"
            value={this.state.password}
            onChange={(event) => this.setState({password: event.target.value})}
          /><br />

          <RaisedButton
            label="Sign Up"
            style={buttonStyle}
            onClick={this.onSignupSubmit}
          />
        </form>
      </div>
    );
  },

  onSignupSubmit() {
    
    //format data
    var user = {
      username: this.state.username,
      password: this.state.password,
    };

    //send post request with data
    request
      .post('auth/signup')
      .send(user)
      .end((err, res) => {
        if (err || !res.ok) {
          console.log(err);
        } else if (res.text === 'user already exists') {
          console.log(res.text);
        } else {
          console.log('Success!');
          browserHistory.push('/signin');
        }});

    //clear forms
    this.setState({username: '', password: ''});
  }
});

export default SignupForm;
