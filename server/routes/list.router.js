const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req,res) => {
    const queryString = `SELECT * FROM "child"
    JOIN "parent_child" ON "child".id = "parent_child"."child_id"
    WHERE "parent_child".parent_id = $1;`;

    pool.query(queryString, [req.user.id])
        .then((response) => {
            res.send(response.rows);
        })
        .catch((err) => {
            console.log(`Err: ${err}`);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    const newChild = req.body;
    let queryText = `INSERT INTO child ("name", "number")
                      VALUES ($1, $2)
                      RETURNING "id";`;
    const queryValues = [
      newChild.name,
      newChild.number
    ];

    pool.query(queryText, queryValues)
      .then((response) => {
          const childId = response.rows[0].id;
          queryText = `INSERT INTO "parent_child" ("parent_id", "child_id")
                        VALUES ($1, $2);`;

            pool.query(queryText, [req.user.id, childId])
                .then(() => res.sendStatus(201))
                .catch((err) => {

                    console.log('Err saving to parent child table: ', err);
                    res.sendStatus(500);
                })
       })
      .catch((err) => {
        console.log('Error completing SELECT child query', err);
        res.sendStatus(500);
      });
  });

module.exports = router;