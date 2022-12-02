module.exports = (app, pool) => {
    app.get('/series/display', async (req, res) => {
        const rows = await require("./search")(pool, req.route.path);
        res.send(rows)
    })
    app.get('/series/search/:name', async (req, res) => {
        const rows = await require("./search")(req, pool);
        res.send(rows)
    })
}