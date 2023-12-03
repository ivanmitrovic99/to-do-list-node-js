const express = require("express");
const viewController = require("../controllers/viewsController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const router = express.Router();

router.route("/login").get(viewController.getLogin);
router.route("/signup").get(viewController.getSignup);
router.route("/activate/:token").get(userController.activateUser, viewController.getAccountActivationPage);
router.use(authController.protect);
router.route("/overview").get(viewController.getOverview);
router.route("/delete/:id").get(viewController.deleteTodo);
router.route("/complete/:id").get(viewController.completeTodo);
router.route("/user").get(viewController.getUser);
module.exports = router;
