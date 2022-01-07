const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save new Tutorial
exports.create = (req, res) => {
  // Sanity check: check for content in Tutorial
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty."
    });
    return;
  }

  // Create tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Tutorial to DB
  Tutorial.create(tutorial)
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message: 
        err.message || "An error occured while creating Tutorial."
    });
  });
};

// Retrieve all Tutorials from DB, find Tutorial by Title
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: 
          err.message || "An error occured while retrieving tutorials."
      })
    })
};

// Find single Tutorial by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
  .then(data =>{
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Could not find Tutorial with given id: ${id}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `An error occured while trying to retrieve the Tutorial with id: ${id}.`
    })
  })
};

// Update single Tutorial by ID from request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Tutorial updated successfully."
      });
    } else {
      res.send({
        message: `Could not update Tutorial with id: ${id}. Either Tutorial was not found, or req.body was empty.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `An error occured while updating tutorial with id: ${id}`
    });
  });
};

// Delete single Tutorial by ID from request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Tutorial deleted successfully."
      });
    } else {
      res.send({
        message: `Could not delete Tutorial with id: ${id}. Tutorial may not have been found.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Could not delete Tutorial with id: ${id}.`
    });
  });
};

// Delete all Tutorials in DB!
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
  .then(nums => {
    res.send({ message: `${nums} Tutorials have been successfully deleted.`})
  })
  .catch(err => {
    res.status(500).send({
      message: 
        err.message || "An error occured while deleting all Tutorials."
    })
  })
};

// Find all Published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: {published: true} })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: 
        err.message || "An error occured while retrieving all tutorials."
    })
  })
};