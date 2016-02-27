import React from 'react';

const ResourceForm = React.createClass({
  getInitialState() {
    return { url: '' };
  },
  handleResourceChange(e) {
    this.setState({ url: e.target.value });
  },
  handleSubmit(e) {
    e.preventDefault();
    const resource = this.state.url.trim();
    if (!resource) {
      return;
    }
    this.props.onResourceSubmit({ url: resource });
    this.setState({ url: '' });
  },
  render() {
    return (
      <form className="resourceForm" onSubmit={this.handleSubmit}>
        <input
          type="resource"
          placeholder="Say something..."
          value={this.state.url}
          onChange={this.handleResourceChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

export default ResourceForm;
