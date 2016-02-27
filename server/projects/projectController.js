var Project = require('./projectModel.js');
var User = require('../users/userModel.js');

module.exports = {
  getProjects: function(req, res) {
    Project.find()
    .then(function(projects) {
      res.json(projects);
    })
    .catch(function(err){
      console.log(err);
      return res.end("Error getting projects.");
    });
  },

  getProjectsByUser: function(req, res) {
    var userId = req.params.userId;
    User.findOne({_id: userId})
    .then(function(user) {
      if(!user) {
        return res.end("You haven't added any projects yet.");
      }
      Project.find({user: user._id})
      .then(function(projects) {
        res.json(projects);
      })
     }) 
    .catch(function(err){
      console.log(err);
      return res.end("Error getting projects");
    });
  },

  addProject: function(req, res) {
    var userId = req.body.userId;
    if(!userId) {
      return res.send('UserId required');
    }
    Project.create({
      user: userId,
      name: req.body.name
    })
    .then(function(project){
      res.json(project);
    })
    .catch(function(err){
      console.log(err);
      return res.end('Error adding project');
    });
  },

  deleteProject: function(req, res) {
    Project.remove({
      _id: req.params.project_id
    })
    .then(function(){
      res.end("Project deleted.");
      console.log("Project deleted");
    })
    .catch(function(err){
      console.log(err);
      res.end("Error deleting object.");
    });
  }

}