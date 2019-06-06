const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET ALL NON-APPROVED FOR SPECIFIC CHILD
router.get('/:id', (req,res) => {
    const queryString = `SELECT * FROM "non_approved"
                            JOIN "child_non_approved" ON "non_approved".id = "child_non_approved"."non_approved_id"
                            WHERE "child_non_approved".child_id = $1;`;

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