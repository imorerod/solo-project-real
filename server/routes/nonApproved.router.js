const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET ALL NON_APPROVED FOR SPECIFIC CHILD
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

// UPDATING REVIEWED FOR A SPECIFIC NON_APPROVED NUMBER
router.put('/reviewed/:id', (req,res) => {
    const booleanString = `UPDATE non_approved SET "reviewed"=$1 WHERE id=$2;`;
    
    pool.query(booleanString, [req.body.reviewed, req.params.id])
    .then((response) => {
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log('Error updating reviewed: ', err);
        res.sendStatus(500);
    });
});

module.exports = router;