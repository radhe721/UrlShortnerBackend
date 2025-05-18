const express = require("express");
const router = express.Router();
const {handelCreateShortUrl,redirectTooriginal,} = require("../controller/urlcontroller")
router.post("/",handelCreateShortUrl,)
router.get("/:shortId", redirectTooriginal);
module.exports = router;