const { body, validationResult } = require("express-validator");
const { categoryModel } = require("../models");

exports.categoryValidation = [
  body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Category name must be at least 2 characters"),
];

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.findByUserId(req.user.userId);

    res.json({
      success: true,
      categories: categories.map((category) => ({
        id: category._id.toString(),
        name: category.name,
      })),
    });
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create category
exports.createCategory = async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors.array(),
      });
    }

    const { name } = req.body;

    // Create category
    const categoryId = await categoryModel.create({
      name,
      userId: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      categoryId: categoryId.toString(),
    });
  } catch (error) {
    console.error("Create category error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category exists
    const existingCategory = await categoryModel.findById(id);
    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors.array(),
      });
    }

    const { name } = req.body;

    // Update category
    const updated = await categoryModel.update(id, { name });

    if (!updated) {
      return res.status(500).json({ error: "Failed to update category" });
    }

    res.json({
      success: true,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.error("Update category error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category exists
    const existingCategory = await categoryModel.findById(id);
    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Check ownership
    if (existingCategory.userId !== req.user.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    // Delete category
    const deleted = await categoryModel.delete(id);

    if (!deleted) {
      return res.status(500).json({ error: "Failed to delete category" });
    }

    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Delete category error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
