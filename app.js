require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./config/database");

const app = express();
const port = process.env.APP_PORT || 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use((req, res, next) => {
    console.log('Time: ', Date.now())
    req.pool = pool;
    next()
})

app.use("/account", require("./api/accountRouter"));
app.use("/series", require("./api/seriesRouter"));
app.use("/chapter", require("./api/chapterRouter"));

// app.delete('/series/delete/:id', (req, res) => {

//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         connection.query('DELETE FROM series WHERE id = ?', [req.params.id], (err, rows) => {
//             connection.release() // return the connection to pool
//             if (!err) {
//                 res.send(`Series with the record ID ${[req.params.id]} has been removed.`)
//             } else {
//                 console.log(err)
//             }
            
//             console.log('The data from series table are: \n', rows)
//         })
//     })
// });

app.listen(port, () => console.log(`Listening on port ${port}`));

