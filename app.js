const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./config/database");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

require("./api/router")(app, pool);

// app.get('/getAll', (req, res) => {
//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         console.log('connected as id ' + connection.threadId)
//         connection.query('SELECT * from series', (err, rows) => {
//             connection.release() // return the connection to pool

//             if (!err) {
//                 res.send(rows)
//             } else {
//                 console.log(err)
//             }

//             // if(err) throw err
//             console.log('The data from series table are: \n', rows)
//         })
//     })
// })

// app.get('/series/search/:name', (req, res) => {
//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         connection.query('SELECT * FROM series WHERE title LIKE ?', [`%${req.params.name}%`], (err, rows) => {
//             connection.release() // return the connection to pool
//             if (!err) {
//                 res.send(rows)
//             } else {
//                 console.log(err)
//             }
            
//             console.log('The data from series table are: \n', rows)
//         })
//     })
// });

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

