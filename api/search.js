module.exports = (req, pool) => {
    let path = req.route.path;
    const customPromise = new Promise((resolve, reject) => {
        if (path.includes("series") && path.includes("display")) {
            pool.getConnection((err, connection) => {
                if(err) throw err;
                connection.query('SELECT * from series', (err, rows) => {
                    connection.release() // return the connection to pool
                    if (!err) {
                        resolve(rows);
                    } else {
                        reject(err)
                    }
                })
            })
        } else if (path.includes("series") && path.includes("search")) {
            pool.getConnection((err, connection) => {
                if(err) throw err
                connection.query('SELECT * FROM series WHERE title LIKE ?', [`%${req.params.name}%`], (err, rows) => {
                    connection.release();
                    if (!err) {
                        resolve(rows);
                    } else {
                        reject(err)
                    }
                })
            })
        }
    })
    return customPromise;
}