const express = require("express");
const router = express.Router();

const { userController, taskController } = require("../controllers/index");

const isValidUser = require("../middlewares/userRequest");

//User routes 
router.get("/user/me", isValidUser, userController.getUser);
router.post("/user", userController.createUser);
router.post("/signin", userController.signIn);
router.patch("/user/me", isValidUser, userController.updateUser);
router.delete("/user/me", isValidUser, userController.deleteUser);


//Task routes 
router.get("/task/:id", isValidUser, taskController.getTask);
router.post("/task", isValidUser, taskController.createTask);
router.patch("/task/:id", isValidUser, taskController.updateTask);
router.delete("/task/:id", isValidUser, taskController.deleteTask);



module.exports = router;