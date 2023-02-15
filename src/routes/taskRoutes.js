const express = require("express");
const router = express.Router();

const { taskController } = require("../controllers/index");

const isValidUser = require("../middlewares/auth");

router.get("/task/:id", isValidUser, taskController.getTask);
router.post("/task", isValidUser, taskController.createTask);
router.patch("/task/:id", isValidUser, taskController.updateTask);
router.delete("/task/:id", isValidUser, taskController.deleteTask);

module.exports = router;