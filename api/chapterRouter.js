const { Router } = require("express");
const cRouter = Router();

cRouter.get("/", async (req, res) => {
    res.send("Chapter Endpoint In Progress")
});

module.exports = cRouter;