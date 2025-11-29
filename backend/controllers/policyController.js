const { body, validationResult } = require("express-validator");
const { policyModel } = require("../models");

exports.policyValidation = [
  body("clientId").notEmpty().withMessage("Client is required"),
  body("categoryId").notEmpty().withMessage("Category is required"),
  body("policyName")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Policy name must be at least 3 characters"),
  body("issueDate").isISO8601().withMessage("Valid issue date is required"),
  body("expiryDate").isISO8601().withMessage("Valid expiry date is required"),
  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a positive number"),
];

// Get all policies
exports.getAllPolicies = async (req, res) => {
  try {
    const policies = await policyModel.findByUserId(req.user.userId);

    res.json({
      success: true,
      policies: policies.map((policy) => ({
        id: policy._id.toString(),
        clientId: policy.clientId,
        categoryId: policy.categoryId,
        policyName: policy.policyName,
        issueDate: policy.issueDate,
        expiryDate: policy.expiryDate,
        amount: policy.amount,
        attachmentUrl: policy.attachmentUrl,
      })),
    });
  } catch (error) {
    console.error("Get policies error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create policy
exports.createPolicy = async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors.array(),
      });
    }

    const { clientId, categoryId, policyName, issueDate, expiryDate, amount } =
      req.body;

    // Validate dates
    const issueDateObj = new Date(issueDate);
    const expiryDateObj = new Date(expiryDate);

    if (expiryDateObj <= issueDateObj) {
      return res.status(400).json({
        error: "Expiry date must be after issue date",
      });
    }

    // Handle file upload
    let attachmentUrl;
    if (req.file) {
      attachmentUrl = `/uploads/${req.file.filename}`;
    }

    // Create policy
    const policyId = await policyModel.create({
      clientId,
      categoryId,
      policyName,
      issueDate: issueDateObj,
      expiryDate: expiryDateObj,
      amount: parseFloat(amount),
      attachmentUrl,
      userId: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Policy created successfully",
      policyId: policyId.toString(),
    });
  } catch (error) {
    console.error("Create policy error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update policy
exports.updatePolicy = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if policy exists
    const existingPolicy = await policyModel.findById(id);
    if (!existingPolicy) {
      return res.status(404).json({ error: "Policy not found" });
    }

    // Check ownership
    if (existingPolicy.userId !== req.user.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors.array(),
      });
    }

    const { clientId, categoryId, policyName, issueDate, expiryDate, amount } =
      req.body;

    // Validate dates
    const issueDateObj = new Date(issueDate);
    const expiryDateObj = new Date(expiryDate);

    if (expiryDateObj <= issueDateObj) {
      return res.status(400).json({
        error: "Expiry date must be after issue date",
      });
    }

    // Handle file upload
    let attachmentUrl = existingPolicy.attachmentUrl;
    if (req.file) {
      attachmentUrl = `/uploads/${req.file.filename}`;
    }

    // Update policy
    const updated = await policyModel.update(id, {
      clientId,
      categoryId,
      policyName,
      issueDate: issueDateObj,
      expiryDate: expiryDateObj,
      amount: parseFloat(amount),
      attachmentUrl,
    });

    if (!updated) {
      return res.status(500).json({ error: "Failed to update policy" });
    }

    res.json({
      success: true,
      message: "Policy updated successfully",
    });
  } catch (error) {
    console.error("Update policy error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete policy
exports.deletePolicy = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if policy exists
    const existingPolicy = await policyModel.findById(id);
    if (!existingPolicy) {
      return res.status(404).json({ error: "Policy not found" });
    }

    // Check ownership
    if (existingPolicy.userId !== req.user.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    // Delete policy
    const deleted = await policyModel.delete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Policy not found" });
    }

    res.json({
      success: true,
      message: "Policy deleted successfully",
    });
  } catch (error) {
    console.error("Delete policy error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
