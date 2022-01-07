module.exports = {
  // HOST, USER, PASSWORD, DB, dialect --> PostgreSQL connection
  HOST: "localhost",
  USER: "admin",
  PASSWORD: "45z@!34*9H",
  DB: "tutorial",
  dialect: "postgres",
  // pool is an optional param; used for Sequelize connection pool configuration
  pool: {
    // maximum number of connections in pool
    max: 5,
    // minimum number of connections in pool
    min: 0,
    // max time in milliseconds (30 seconds) that pool tries for connection before throwing an error
    acquire: 30000,
    // max time in milliseconds (10 seconds) that pool can idle before being released
    idle: 10000
  }
};