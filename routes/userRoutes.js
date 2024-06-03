const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);

// CRUD operations
const verifyToken = require("../middleware/auth");

router.get("/", verifyToken, userController.findAll);
router.get("/:id", verifyToken, userController.findOne);
router.put("/:id", verifyToken, userController.update);
router.delete("/:id", verifyToken, userController.delete);
router.delete("/", verifyToken, userController.deleteAll);

module.exports = router;
