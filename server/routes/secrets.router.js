const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    if(req.isAuthenticated()) {
        console.log('req.user:', req.user);
        let queryString = `SELECT * FROM "secret" WHERE "secrecy_level" <= $1;`;
        pool.query(queryString,[req.user.clearance_level])
            .then(results => res.send(results.rows))
            .catch(error => {
                console.log('Error making SELECT for secrets:', error);
                res.sendStatus(500);
            });
    }
    else {
        res.sendStatus(403)
    }
});

module.exports = router;