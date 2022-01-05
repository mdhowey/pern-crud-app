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

// add body-parser w/ .use() method from Express
// parse requests of content-type --> application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// GET route for testing
app.get("/", (req,res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// listen on PORT for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
