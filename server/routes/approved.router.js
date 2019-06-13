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

router.post('/', (req, res) => {
    const newApproved = req.body;
    let queryText = `INSERT INTO "approved" ("name", "number")
                      VALUES ($1, $2)
                      RETURNING "id";`;
    const queryValues = [
        newApproved.name,
        newApproved.number
    ];
    if (newApproved.name === '' || newApproved.number === ''){
        res.sendStatus(500);
        return false;
    }

    pool.query(queryText, queryValues)
      .then((response) => {
          const approvedId = response.rows[0].id;
          queryText = `INSERT INTO "child_approved" ("child_id", "approved_id")
                        VALUES ($1, $2);`;

            pool.query(queryText, [newApproved.childId, approvedId])
                .then(() => res.sendStatus(201))
                .catch((err) => {
                    console.log('Err saving to parent child table: ', err);
                    res.sendStatus(500);
                })
       })
      .catch((err) => {
        console.log('Error completing select APPROVED query', err);
        res.sendStatus(500);
      });
  });

// DELETE APPROVED PERSON FROM SPECIFIC CHILD LIST
router.delete('/:id', (req, res) => {
    const queryStringTwo = `DELETE FROM "approved" WHERE id=$1;`;
    const queryStringOne = `DELETE FROM "child_approved" WHERE approved_id=$1;`;

    pool.query(queryStringOne,  [req.params.id])
    .then((result) => {
        pool.query(queryStringTwo, [req.params.id])
            .then((result) => {
                res.sendStatus(200)
            })
            .catch((error) => {
                console.log('Error deleting approved person from DB', error);
                res.sendStatus(500);
            })
    })
    .catch((error) => {
        console.log('Error deleting approved join person from DB', error);
        res.sendStatus(500);
    })
});

module.exports = router;