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

sRouter.delete('/delete/:id', (req, res) => {
    req.pool.getConnection((err, connection) => {
        
        if(err) throw err
        connection.query('DELETE FROM series WHERE uid = ?', [req.params.id], (err, rows) => {
            // connection.release() // return the connection to pool
            if (!err) {
                res.send(`Series with the record ID ${[req.params.id]} has been removed.`)
            } else {
                res.status(404).send(err);
            }
        })
        connection.query('SET @count = 0;UPDATE `series` SET `series`.`uid` = @count := @count + 1;', (err, rows) => {
            connection.release()
            if (!err) {
                console.log("Reordered")
            } else {
                console.log(err)
            }
        })
    })
});

sRouter.post('/create/', (req, res) => {
    const {title, description, cover, folder} = req.body;
    req.pool.getConnection((err, connection) => {
        connection.query({
            sql: 'INSERT INTO `series` (title, description, cover, folder) VALUES (?, ?, ?, ?)',
            timeout: 40000, // 40s
            values: [title, description, cover, folder]
        }, function (error, results, fields) {
            if (!error) {
                res.send(`Series with the title ${title} has been added.`)
            } else {
                res.status(404).send(error);
            }
        });
    })
});

module.exports = sRouter;