const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const categoryController = require("../controllers/categoryController");

router.use(authMiddleware);

router.get("/", categoryController.getAllCategories);

router.post(
  "/",
  categoryController.categoryValidation,
  categoryController.createCategory
);

router.put(
  "/:id",
  categoryController.categoryValidation,
  categoryController.updateCategory
);

router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
