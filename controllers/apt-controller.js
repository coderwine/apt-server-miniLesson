const express = require('express');
const router = express.Router();
const { Apt } = require('../models');

// CREATE
router.post('/create', async(req,res) => {

    const {unit,beds,rent,occupied} = req.body;

    try {
        const newApt = await Apt.create({
            unit,
            beds,
            rent,
            occupied
        })

        res.status(201).json({
            msg: "Create!",
            apt: newApt,
        })

    } catch (err) {
        res.status(500).json({
            msg: `Error: ${err}`,
        })
    }
});

module.exports = router