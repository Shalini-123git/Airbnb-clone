const express = require("express");
const router = express.Router();

//Index - posts
router.get("/", (req, res) => {
    req.flash("done", "successful");
    res.send("this is root route");
});

//show - posts
router.get("/:id", (req, res) => {
    res.send("this is show route");
});

//edit - posts
router.post("/", (req, res) => {
    res.send("this is edit route");
});

//delete - posts
router.delete("/:id", (req, res) => {
    res.send("this is deleted");
});

module.exports = router;