module.exports = (sequelize, Sequelize) => {
  // model in Sequelize is an abstraction that represents table in DB
  // It is a class that extends Model
  const Tutorial = sequelize.define("tutorial", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Tutorial;
};

// Sequelize comes with full CRUD for the database:
// create a new Tutorial: create(object)
// find a Tutorial by id: findByPk(id)
// get all Tutorials: findAll()
// update a Tutorial by id: update(data, where: { id: id })
// remove a Tutorial: destroy(where: { id: id })
// remove all Tutorials: destroy(where: {})
// find all Tutorials by title: findAll({ where: { title: ... } })