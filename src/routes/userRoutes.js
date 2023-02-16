const express = require("express");
const router = express.Router();

const { userController } = require("../controllers/index");

const isValidUser = require("../middlewares/auth");

router.get("/user/me", isValidUser, userController.getUser);
router.post("/resetpassword", userController.resetPasswordRequest);
router.post("/changepassword", userController.resetPassword);
router.post("/user", userController.signUp);
router.post("/signin", userController.signIn);
router.patch("/user/me", isValidUser, userController.updateUser);
router.delete("/user/me", isValidUser, userController.deleteUser);

module.exports = router;