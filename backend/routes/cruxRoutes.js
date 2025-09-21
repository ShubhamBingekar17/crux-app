const express = require("express");
const router = express.Router();
const { getCruxData } = require("../controllers/cruxController");

router.post("/crux", getCruxData);

module.exports = router;
