import React from 'react';
import Header from './Header';

const App = React.createClass({
  render() {
    const path = this.props.location.pathname;
    if (path === '/' || path === '/signin' || path === '/signup') {
      return (
        <div>
          {this.props.children}
        </div>
      );
    } else if (!this.props.location.query.user) {
      return (
        <div>
          <Header user={this.props.params.id} />
          {this.props.children}
        </div>
      );
    } else {
      return (
      <div>
        <Header user={this.props.location.query.user} />
        {this.props.children}
      </div>
      );
    }
  }
});

export default App;
