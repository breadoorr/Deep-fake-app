const request = require('supertest');
const server = require('../index'); 

describe('API Server Tests', function() {

  after(function(done) {
    server.close(done); 
  });

  it('GET / should return welcome message', function(done) {
    request(server)
      .get('/')
      .expect(200)
      .expect('Content-Type', /text/)
      .end(function(err, res) {
        if (err) return done(err);
        if (res.text !== 'Welcome to root URL of Server') {
          return done(new Error('Response text did not match'));
        }
        done();
      });
  });

  

  it('GET /unknown should return 404 for unknown routes', function(done) {
    request(server)
      .get('/unknown')
      .expect(404, done);
  });

});
