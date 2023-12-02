const express = require("express");
const viewController = require("../controllers/viewsController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const router = express.Router();

router.route("/overview").get(viewController.getOverview);
router.route("/login").get(viewController.getLogin);
router.route("/signup").get(viewController.getSignup);
router.route("/activate/:token").get(userController.activateUser, viewController.getAccountActivationPage);

module.exports = router;
