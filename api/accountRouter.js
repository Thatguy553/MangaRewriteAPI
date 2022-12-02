const { Router } = require("express");
const aRouter = Router();

aRouter.get("/", async (req, res) => {
    res.send("Accounting Endpoint In Progress")
});

module.exports = aRouter;