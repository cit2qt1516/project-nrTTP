var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost/nrb', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models     = require('./models/nrMessage')(app, mongoose);
var NrBController = require('./controllers/nrTTPs');

// Example Route
var router = express.Router();
router.get('/', function(req, res) {
  res.send("Hello world!");
});

app.use(router);

//app.use('/api', nrBs);


// Start server
app.listen(3002, function() {
  console.log("Node server running on http://localhost:3002");
});

// Define API routes
var nrTTPs = express.Router();
app.use(nrTTPs);

nrTTPs.route('/nrttp')
    .get(NrBController.findAllnrTTP)
    .post(NrBController.addNrTTP);

nrTTPs.route('/nrttp/:id')
    .get(NrBController.findById)
    .put(NrBController.updateNrTTP)
    .delete(NrBController.deleteNrTTP);