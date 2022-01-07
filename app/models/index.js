// Require Local Dependencies
const dbConfig = require("../config/db.config.js");
// Require Sequelize
// Sequelize refers to the library itself
const Sequelize = require("sequelize");
// Sequelize constructor --> creates new instance of sequelize
// sequelize refers to an instance of Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  // operatorsAliases: false,
  logging: (...msg) => console.log(msg),

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// create DB object for export
const db = {};

// add Sequelize library to DB object
db.Sequelize = Sequelize;
// add configured instance of sequelize to DB object
db.sequelize = sequelize;

// what are the second set of parantheses doing...?
db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

// export DB object
module.exports = db;