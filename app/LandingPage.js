import React from 'react';

const LandingPage = React.createClass({
  render() {
    return (
      <div>
        <HomeImage />
        <GetStarted />
      </div>
    );
  }
});

const HomeImage = React.createClass({
  render() {
    return (
      <div>
        <h1>Where Was I?</h1>
        Image pending...
      </div>
    );
  }
});

const GetStarted = React.createClass({
  render() {
    return (
      <div>
        <h3>Where Was I? turns your search results into a library of resources.</h3>
        <ul>
          <li>Create a project</li>
          <li>Start searching</li>
          <li>Save the links to your Project Resources page</li>
          <li>Add comments, tag the links that helped, remove the ones that didn't</li>
        </ul>
        <h3>Start searching more effectively today!</h3>
        <a href="/signup">Sign Up</a>
        <a href="/signin">Sign In</a>
      </div>
    );
  }
});

export default LandingPage;

