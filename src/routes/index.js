
const express = require("express");
const router = express.Router();

const { userController } = require("../controllers/index");

router.get("/user/:id", userController.getUser);
router.post("/user", userController.createUser);
router.patch("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;