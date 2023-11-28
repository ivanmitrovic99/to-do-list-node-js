const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/activate/:token").get(userController.activateUser);
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.use(authController.protect);

router.route("/logout").get(authController.logout);
router.route("/myTodos").get(userController.getUserTodos);
router.route("/createTodo").post(userController.createUserTodo);
router.route("/changePassword").patch(userController.changePassword);
router.route("/").get(userController.getAllUsers).post(userController.createUser);
router.route("/me").get(userController.getCurrentUser);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(authController.restrictTo("admin"), userController.deleteUser);

module.exports = router;
