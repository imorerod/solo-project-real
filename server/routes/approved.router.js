const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET ALL APPROVED FOR SPECIFIC CHILD
router.get('/:id', (req,res) => {
    const queryString = `SELECT * FROM "approved"
                            JOIN "child_approved" ON "approved".id = "child_approved"."approved_id"
                            WHERE "child_approved".child_id = $1;`;

    pool.query(queryString, [req.params.id])
        .then((response) => {
            res.send(response.rows);
        })
        .catch((err) => {
            console.log(`Err: ${err}`);
            res.sendStatus(500);
        });
});

module.exports = router;