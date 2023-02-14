const express = require("express");
const router = express.Router();

const { userController, taskController } = require("../controllers/index");


//User routes 
router.get("/user/:id", userController.getUser);
router.post("/user", userController.createUser);
router.post("/signin", userController.signIn);
router.patch("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);


//Task routes 
router.get("/task/:id", taskController.getTask);
router.post("/task", taskController.createTask);
router.patch("/task/:id", taskController.updateTask);
router.delete("/task/:id", taskController.deleteTask);



module.exports = router;