import React from 'react';
import { Link } from 'react-router';

// Header renders Home and Sign Out links
// Space rendered between Home and SignOut until CSS applied
const Header = React.createClass({
  render() {
    return (
      <nav className="app-header">
        <Home user={this.props.user} /> {'  '}
        <SignOut />
      </nav>
    );
  }
});

// Home renders link to return to projects page
const Home = React.createClass({
  render() {
    return (
      <Link to={`/projects/${this.props.user}`}>Home</Link>
      );
  }
});

// SignOut links to '/' until sign in page implemented
// handleSignOut will be updated to remove token
const SignOut = React.createClass({
  handleSignOut() {
    console.log('You are now signed out');
    localStorage.clear();
  },
  render() {
    return (
      <Link to="/" onClick={this.handleSignOut}>Sign Out</Link>
    );
  }
});

export default Header;
