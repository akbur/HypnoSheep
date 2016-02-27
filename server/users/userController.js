var User = require('./userModel.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = require('../utils/envDefaults.js').jwtSecret;

module.exports = {
  signin: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username: username})
    .then(function(user) {
      // if the user exists...
      if (!user) {
        return res.end('user not found');
      }
      // ...check their password...
      return user.comparePassword(password)
      .then(function(isMatch) {
        if (!isMatch) {
          return res.status(401).end('passwords dont match');
        }
        // if the password is correct, create a jwt Token for the user
        var expires = moment().add(2, 'days').valueOf();
        var token = jwt.encode({
          iss: user._id,
          exp: expires
        }, secret);

        res.json({
          token: token,
          expires: expires,
          user: user.toJSON()
        });
      })
      .catch(function(err) {
        console.log(err);
        res.end(err);
      })
    })
  },

  signup: function(req, res) {
    User.findOne({username: req.body.username})
    .then(function(user) {
      if (user) {
        return res.end('user already exists');
      } else {
        User.create({
          username: req.body.username,
          password: req.body.password
        })
        .then(function(user) {
          console.log('user created', user);
          res.json(user);
        })
      }
    })
  },

  signout: function(req, res) {
    res.end('sign out');
  },

  getUsers: function(req, res) {
    User.find()
    .then(function(users) {
      res.json(users);
    })
  }, 

  deleteUser: function(req, res) {
    User.remove({
      _id: req.params.userId
    })
    .then(function(){
      return res.end('User deleted.');
    })
    .catch(function(){
      return console.log('Error deleting user.');
    })
  }

};
