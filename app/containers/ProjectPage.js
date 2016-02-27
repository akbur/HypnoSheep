import React from 'react';
import request from 'superagent';
import ResourceList from '../components/ResourceList';
import ResourceForm from '../components/ResourceForm';

// Container for resources associated with the selected project
const ProjectPage = React.createClass({
  getInitialState() {
    return {
      data: []
    };
  },

  componentDidMount() {
    // Sends get request when component is first rendered, loading any resources already
    // stored for the project
    this.getResources();
  },

  getResources() {
    request
      .get(`/api/resources/${this.props.params.id}`)
      .end((err, resp) => {
        if (!err) {
          this.setState({ data: (resp.body) });
        } else {
          console.error(err);
        }
      });
  },

  // When user adds a new resource, a POST request is submitted, and
  // the state is updated to add the new resource to the list
  handleResourceSubmit(resource) {
    resource.projectId = this.props.params.id;
    request
      .post('/api/resources')
      .send(resource)
      .end((err, resp) => {
        if (!err) {
          console.log('Success!');
          this.setState({ data: this.state.data.concat([resp.body]) });
        } else {
          console.error(err);
        }
      });
  },

  // ResourceBox's handleResourceSubmit method is passed to ResourceForm via this.props object
  // i.e. this.props.handleResourceSubmit
  render() {
    return (
      <div className="resourceBox">
        <h1>Resources</h1>
        <ResourceForm onResourceSubmit={this.handleResourceSubmit} />
        <ResourceList
          data={this.state.data}
          getResources={this.getResources}
        />
      </div>
    );
  }
});

export default ProjectPage;
