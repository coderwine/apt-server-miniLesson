const {Sequelize} = require('sequelize');

const db = new Sequelize(`postgres://postgres:${process.env.PASS}@localhost:5432/${process.env.PGDB}`);

module.exports = db;