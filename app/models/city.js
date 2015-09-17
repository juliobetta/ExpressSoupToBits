var redis   = require('../utils/redis');
var Promise = require('promise');

var tableName = 'cities';


module.exports = {
  index: function() {
    return new Promise(function(resolve, reject) {
      redis.hkeys(tableName, function(error, names) {
        if(error) reject(error);
        else resolve(names);
      });
    });
  },

  create: function(data) {
    return new Promise(function(resolve, reject) {
      redis.hset(tableName, data.name, data.description, function(error) {
        if(error) reject(error);
        else resolve();
      });
    });
  },

  getByName: function(name) {
    return new Promise(function(resolve, reject) {
      redis.hget(tableName, name, function(error, description) {
        if(error) reject(error);
        else resolve(description);
      });
    });
  },

  deleteByName: function(name, callback) {
    return new Promise(function(resolve, reject) {
      redis.hdel(tableName, name, function(error) {
        if(error) reject(error);
        else resolve();
      });
    });
  }
};

