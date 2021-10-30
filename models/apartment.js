const { DataTypes } = require('sequelize');
const db = require('../db');

const Apt = db.define('apartment', {
    // - Unit Number: STRING, Bedrooms: INTEGER, Rent: INTEGER, Occupied: BOOLEAN
    unit: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    beds: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rent: {
        type: DataTypes.INTEGER,
    },
    occupied: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

});

module.exports = Apt;

