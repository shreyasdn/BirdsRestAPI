/**
 * Birds API Tests
 *
 * Tests the connectivity & responses of 
 * Discovery API for the Birds Object
 */

var request = require('supertest');
var should  = require('chai').should();

describe('Birds API', function() {
  var sessionCookie;
  var createdModel;

  before(function(done) {
    request(sails.hooks.http.app)
      .post('/auth/local')
      .send({
        identifier : 'user1@account1.com',
        password   : "password1234"
      })
      .end(function(err, res){
        sessionCookie = res.headers['set-cookie'];
        done();
      });
  });

  
  it('should create a model', function(done) {
    request(sails.hooks.http.app)
      .post('/birds')
      .send({"name":"Sparrow-3","family":"small-bird","continents":["Asia","Europe","North America"]})
      .expect(201)
      .end(function(err, res) {
        var reply = res.body;
        createdModel = reply;
        should.not.exist(err);
        // reply.birds.name.should.equal('Test Name');

        Birds.findOne(createdModel.id, function(err, result) {
          should.not.exist(err);
          should.exist(result);
          // result.name.should.equal('Test Name');
          done();
        });
      });
  });
  
  it('should find all models', function(done) {
    request(sails.hooks.http.app)
      .get('/birds')
      .expect(200)
      .end(function(err, res) {
        var reply = res.body;
        should.not.exist(err);
        reply.length.should.be.above(0);
        done();
      });
  });
  
  it('should find a model', function(done) {
    request(sails.hooks.http.app)
      .get('/birds/'+createdModel.id)
      .expect(200)
      .end(function(err, res) {
        var reply = res.body;
        should.not.exist(err);
        reply.id.should.equal(createdModel.id);
        done();
      });
  });
  
  
  
  it('should delete a model', function(done) {
    request(sails.hooks.http.app)
      .delete('/birds/'+createdModel.id)
      .set('cookie', sessionCookie)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        (res.body || {}).should.be.empty;

        Birds.findOne(createdModel.id, function(err, result) {
          should.not.exist(err);
          should.not.exist(result);
          done();
        });
      });
  });

});

