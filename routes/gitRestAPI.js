const express = require("express");
const router = express.Router();
const { fetch_data, listRepos } = require("../controller/main");

router.route("/").get(fetch_data);
router.route("/language/:lng_name").get(listRepos);
module.exports = router;
