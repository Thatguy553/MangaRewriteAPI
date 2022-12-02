const { Router } = require("express");
const sRouter = Router();

sRouter.get("/display", async (req, res) => {
    req.pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * from series", (err, rows) => {
        connection.release(); // return the connection to pool
        if (!err) {
            res.send(rows);
        } else {
            res.status(404).send(err);
        }
    });
  });
});
sRouter.get("/search/:name", async (req, res) => {
    req.pool.getConnection((err, connection) => {
        if(err) throw err;
        connection.query('SELECT * FROM series WHERE title LIKE ?', [`%${req.params.name}%`], (err, rows) => {
            connection.release();
            if (!err) {
                res.send(rows);
            } else {
                res.status(404).send(err);
            }
        })
    })
});

module.exports = sRouter;