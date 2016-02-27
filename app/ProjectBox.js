import React from 'react';
import Project from './Project';
import request from 'superagent';

// Container for /projects view and functionality
const ProjectBox = React.createClass({
  getInitialState() {
    // sets this.state.data to blank
    return { projectId: 0, data: [] };
  },

  componentDidMount() {
    // initiates get request to set this.state.data with any projects created
    // with this user id
    this.loadProjectsFromServer();
  },

  loadProjectsFromServer() {
    request
      .get(`/api/projects/${this.props.params.id}`)
      .end((err, resp) => {
        if (!err) {
          this.setState({ data: (resp.body) });
        } else {
          console.error(err);
        }
      });
  },

  // When user adds a new project, a POST request is sent, and the new project
  // is added to the list after confirmation from the server that it
  // was successfully created.
  handleProjectSubmit(project) {
    project.userId = this.props.params.id;
    request
      .post('/api/projects')
      .send(project)
      .end((err, resp) => {
        if (!err) {
          this.setState({ data: this.state.data.concat(resp.body) });
        } else {
          console.error(err);
        }
      });
  },

  render() {
    // by having onCommentSubmit={this.handleProjectSubmit} in the ProjectForm tag, we are
    // able to pass ProjectBox's handleProjectSubmit method to ProjectForm on the this.props
    // object. ProjectBox i.e. this.props.handleProjectSubmit
    return (
      <div className="projectBox">
        <h1>Projects</h1>
        <ProjectForm onProjectSubmit={this.handleProjectSubmit} />
        <ProjectList data={this.state.data} loadProjectsFromServer={this.loadProjectsFromServer} />
      </div>
    );
  }
});

const ProjectForm = React.createClass({
  getInitialState() {
    return { name: '' };
  },
  handleProjectChange(e) {
    this.setState({ name: e.target.value });
  },
  handleSubmit(e) {
    e.preventDefault();
    const projectName = this.state.name.trim();
    if (!projectName) {
      return;
    }
    this.props.onProjectSubmit({ name: projectName });
    this.setState({ name: '' });
  },
  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="project"
          placeholder="Say something..."
          value={this.state.name}
          onChange={this.handleProjectChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

const ProjectList = React.createClass({
  render() {
    // render returns an array of Project components by mapping the project objects
    // stored in this.props.data
    if (!this.props.data || !this.props.data.length) {
      return <div>You haven't added any projects yet.</div>;
    }
    const { data, loadProjectsFromServer } = this.props;
    const projectNodes = data.map((project) => {
      const deleteProject = () => {
        request
          .delete(`/api/projects/${project._id}`)
          .end((err, res) => {
            if (err || !res.ok) {
              console.log(err);
            } else {
              loadProjectsFromServer();
            }
          });
      };

      return (
        <Project project={project} key={project._id} deleteProject={deleteProject}>
          {project.name}
        </Project>
      );
    });

    return (
      <div className="projectList">
        {projectNodes}
      </div>
    );
  }
});

export default ProjectBox;
