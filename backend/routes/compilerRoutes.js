const express = require("express");
const router = express.Router();
const { compileCode } = require("../controllers/compilerController");

router.post("/run", compileCode); // POST /api/compiler/run

module.exports = router;
