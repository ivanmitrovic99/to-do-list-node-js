const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/activate/:token").get(userController.activateUser);
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.use(authController.protect);

router.route("/").get(userController.getAllUsers).post(userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(authController.restrictTo("admin"), userController.deleteUser);

module.exports = router;
