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

// GET ALL
router.get('/', async(req,res) => {

    try {
        
        const getApts = await Apt.findAll();

        res.status(201).json({
            apts: getApts,
        })

    } catch (err) {
        res.status(500).json({
            msg: `Error: ${err}`,
        })
    }
})

// GET ONE
router.get('/:unit', async(req,res) => {

    try {
        
        const getApt = await Apt.findOne({
            where: { unit: req.params.unit }
        })

        res.status(201).json({
            msg: 'Found!',
            apt: getApt,
        })

    } catch (err) {
        res.status(500).json({
            msg: `Error: ${err}`,
        })
        
    }

})

// UPDATE
router.put('/:unit', async(req,res) => {
    const {unit,beds,rent,occupied} = req.body;

    try {
        
        await Apt.update(
            {unit,beds,rent,occupied},
            {where: {
                unit: req.params.unit
            }}
        ).then(results => {
            res.status(200).json({
                msg: `Apartment updated!`,
                apt: results
            })
        })

    } catch (err) {
        res.status(500).json({
            msg: `Error: ${err}`,
        })
    }
})

// DELETE
router.delete('/:id', async(req,res) => {

    try {
        
        await Apt.destroy({
            where: {id: req.params.id}
        })

        res.status(200).json({
            msg: `Unit delete`
        })

    } catch (err) {
        res.status(500).json({
            msg: `Error: ${err}`,
        })
    }
})

module.exports = router