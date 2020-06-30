const path = require('path');

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get('/quiz', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/quiz.html"));
  });

  app.get('/scores', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/scores.html"));
  });
}
