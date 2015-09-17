var express    = require('express');
var cityModel  = require('../models/city');
var bodyParser = require('body-parser');
var urlencode  = bodyParser.urlencoded({ extended: false });

var router = express.Router();

var errorHandler = function(error) {
  if(error) throw error;
};


router.route('/')
  .get(function(request, response) {
    cityModel.index().then(function(names) {
      response.json(names);
    }, errorHandler);
  })

  .post(urlencode, function(request, response){
    var newCity = request.body;
    if(!newCity.name || !newCity.description){
      response.sendStatus(400);
      return false;
    }
    cityModel.create(newCity).then(function() {
      response.status(201).json(newCity.name);
    }, errorHandler);
  });


router.route('/:name')
  .delete(function(request, response) {
    cityModel.deleteByName(request.params.name).then(function() {
      response.sendStatus(204);
    }, errorHandler);
  })

  .get(function(request, response) {
    cityModel.getByName(request.params.name).then(function(description) {
      response.render('../views/show.ejs',
        {
          city: {
            name: request.params.name,
            description: description
          }
        }
      );
    }, errorHandler);
  });

module.exports = router;
