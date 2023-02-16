const express = require("express");
const router = express.Router();

const taskRoutes = require("./taskRoutes");
const userRoutes = require("./userRoutes")

const addResponseFunctions = require("../middlewares/responses");

router.use('/', addResponseFunctions, taskRoutes);
router.use('/', addResponseFunctions, userRoutes);

module.exports = router;