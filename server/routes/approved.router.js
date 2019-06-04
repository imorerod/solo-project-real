const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req,res) => {
    const queryString = `SELECT * FROM "approved";`;

    pool.query(queryString)
        .then((response) => {
            res.send(response.rows);
        })
        .catch((err) => {
            res.sendStatus(500);
        })
});


// /**
//  * Add an item for the logged in user to the shelf
//  */
// router.post('/', (req, res) => {

// });


// /**
//  * Delete an item if it's something the logged in user added
//  */
// router.delete('/:id', (req, res) => {

// });


// /**
//  * Update an item if it's something the logged in user added
//  */
// router.put('/:id', (req, res) => {

// });


// /**
//  * Return all users along with the total number of items 
//  * they have added to the shelf
//  */
// router.get('/count', (req, res) => {

// });


// /**
//  * Return a specific item by id
//  */
// router.get('/:id', (req, res) => {

// });

module.exports = router;