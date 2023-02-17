const express = require("express");
const router = express.Router();

const { TaskController } = require("../controllers/index");

const isValidUser = require("../middlewares/auth");

router.get("/task", isValidUser, TaskController.getAllTasks);
router.get("/task/:id", isValidUser, TaskController.getTask);
router.post("/task", isValidUser, TaskController.createTask);
router.patch("/task/:id", isValidUser, TaskController.updateTask);
router.delete("/task/:id", isValidUser, TaskController.deleteTask);

module.exports = router;