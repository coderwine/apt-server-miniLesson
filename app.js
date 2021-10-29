// NOTE: Connect to Port #1
require('dotenv').config(); //! #2
const express = require('express');
const log = console.log 

const app = express(); 

app.use(express.json()); 

// app.listen(3000, () => { //! #1
// log(`[SERVER]: Running on 3000`);
// })  

//NOTE: DotEnv #2
app.listen(process.env.PORT, () => { //! #2
    log(`[SERVER]: Running on ${process.env.PORT}`);
})  

//NOTE: db.js #3
