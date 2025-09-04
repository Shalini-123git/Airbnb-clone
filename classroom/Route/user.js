const express = require("express");
const router = express.Router();

//Index - user
router.get("/", (req, res) => {
    res.send("root for user");
});

//show -user
router.get("/:id", (req, res) => {
    res.send("GET for user");
});

//edit - user
router.post("/", (req, res) => {
    res.send("POST for user");
});

//delete - user
router.delete("/:id", (req, res) => {
    res.send("DELETE for user");
});

module.exports = router;