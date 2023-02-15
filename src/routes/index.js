const express = require("express");
const router = express.Router();

const taskRoutes = require("./taskRoutes");
const userRoutes = require("./userRoutes");

router.use('/', taskRoutes);
router.use('/', userRoutes);


module.exports = router;