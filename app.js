// NOTE: Connect to Port #1
require('dotenv').config(); //! #2
const express = require('express');
const log = console.log 
const db = require('./db'); //! #3
const controllers = require('./controllers'); //! #5 

const app = express(); 

app.use(express.json()); 

// app.listen(3000, () => { //! #1
// log(`[SERVER]: Running on 3000`);
// })  

//NOTE: DotEnv #2
// app.listen(process.env.PORT, () => { //! #2
//     log(`[SERVER]: Running on ${process.env.PORT}`);
// }) 

app.use('/apt', controllers.AptController) //! #5
// const models = require('./models'); //! #4

//NOTE: db.js #3
db.authenticate()  //! #3
    .then(() => db.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            log(`App is running on ${process.env.PORT}`);
        })
    })
    .catch(err => {
        log(`[CRASHED]: ${err}`);
    })


