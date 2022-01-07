/**
 * 
 * Check TODO before db.sequelize.sync({ force: true })...
 * This method drops and re-syncs the database for development
 * @TODO delete ({ force: true })...!!!
 */

// Import dependencies
// Express --> building the API
const express = require("express");
// body-parser --> parse the request and create req.body object
const bodyParser = require("body-parser");
// cors --> provides Express some middleware to enable CORS w/ different options
const cors = require("cors");

// create Express app
const app = express();

// configure cors options to take localhost:8081 as an origin
var corsOptions = {
  origin: "http://localhost:8081"
};

// add cors w/ .use() method from Express
app.use(cors(corsOptions));

// parse requests of content-type --> application/json
app.use(bodyParser.json());

// add body-parser w/ .use() method from Express
// parse requests of content-type --> application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const { application } = require("express");
// setting force attribute to 'true' is only for development
// TODO@ delete before deployment: 
// { force: true }).then(() => {console.log("Drop and re-sync happened successfully in DB object.");}
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync happened successfully in DB object.");
});


// require in routes for app
require("./app/routes/tutorial.routes")(app);

// GET route for testing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// listen on PORT for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
