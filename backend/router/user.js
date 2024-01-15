const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUserById);
router.patch("/:id", userController.updateUserById);

module.exports = router;
