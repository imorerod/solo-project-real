const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    if(req.isAuthenticated()) {
        console.log('req.user:', req.user);
        let queryString = `SELECT * FROM "approved";`;
        pool.query(queryString)
        .then((response) => {
            res.send(response.rows);
        })
        .catch((err) => {
            console.log(`Err: ${err}`);
            res.sendStatus(500);
        });
    }
});

module.exports = router;