const express = require("express");
const router = express.Router();
const { fetch_data, listRepos } = require("../controller/main");

router.route("/repositories/:date").get(fetch_data);
router.route("/repositories/:date/language/:lng").get(listRepos);
module.exports = router;
