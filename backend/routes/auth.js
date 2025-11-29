const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// POST /api/auth/signup
router.post("/signup", authController.signupValidation, authController.signup);

// POST /api/auth/login
router.post("/login", authController.loginValidation, authController.login);

// POST /api/auth/logout
router.post("/logout", authController.logout);

module.exports = router;
