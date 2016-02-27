var Resource = require('./resourceModel.js');
var Project = require('../projects/projectModel.js');

module.exports = {
  // Get all the resources
  getResources: function(req, res) {
    Resource.find()
    .then(function(resources) {
      res.json(resources);
    });
  },

  // Get all resources for a specific project
  getResourcesByProject: function(req, res) {
    var projectId = req.params.projectId;
    Project.findOne({_id: projectId})
    .then(function(project) {
      if (!project) {
        return res.end('project not found');
      }
      Resource.find({project: project._id})
      .then(function(resources) {
        res.json(resources);
      })
    })
    .catch(function(err) {
      console.log(err);
      res.end(err);
    })
  },

  addResource: function(req, res) {
    var projectId = req.body.projectId;
    if (!projectId) {
      return res.end('ProjectId required');
    }
    Resource.create({
      project: projectId,
      url: req.body.url
    }).then(function(resource) {
      res.json(resource);
    })
    .catch(function(err) {
      console.log(err);
      res.end('Error adding resource.');
    })
  },

  updateResource: function(req, res) {
    var resourceId = req.params.resourceId;
    if (!resourceId) {
      return res.end('ResourceId required');
    }
    Resource.findByIdAndUpdate(resourceId, req.body)
    .then(function(resource) {
      if (!resource) {
        return res.end('resource not found');
      }
      res.json(resource)
    })
    .catch(function(err) {
      console.log(err)
      res.end(err)
    })
  },

  deleteResource: function(req, res) {
    Resource.remove({
      _id: req.params.resourceId
    })
    .then(function(){
      res.end('Resource deleted.');
    })
    .catch(function(err) {
      res.end(err);
    })
  }
}





