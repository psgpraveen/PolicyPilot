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
        attachmentUrl: policy.attachment
          ? `/api/policies/${policy._id.toString()}/attachment`
          : null,
        hasAttachment: !!policy.attachment,
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

    // Handle file upload - store in MongoDB
    let fileData = null;
    if (req.file) {
      fileData = {
        data: req.file.buffer.toString("base64"),
        contentType: req.file.mimetype,
        filename: req.file.originalname,
        size: req.file.size,
      };
    }

    // Create policy
    const policyId = await policyModel.create({
      clientId,
      categoryId,
      policyName,
      issueDate: issueDateObj,
      expiryDate: expiryDateObj,
      amount: parseFloat(amount),
      attachment: fileData,
      userId: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Policy created successfully",
      policyId: policyId.toString(),
      fileUrl: fileData
        ? `/api/policies/${policyId.toString()}/attachment`
        : null,
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

    // Handle file upload - store in MongoDB
    let fileData = existingPolicy.attachment;
    if (req.file) {
      fileData = {
        data: req.file.buffer.toString("base64"),
        contentType: req.file.mimetype,
        filename: req.file.originalname,
        size: req.file.size,
      };
    }

    // Update policy
    const updated = await policyModel.update(id, {
      clientId,
      categoryId,
      policyName,
      issueDate: issueDateObj,
      expiryDate: expiryDateObj,
      amount: parseFloat(amount),
      attachment: fileData,
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

// Get policy attachment
exports.getPolicyAttachment = async (req, res) => {
  try {
    const { id } = req.params;

    // Get policy
    const policy = await policyModel.findById(id);
    if (!policy) {
      return res.status(404).json({ error: "Policy not found" });
    }

    // Check ownership
    if (policy.userId !== req.user.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    // Check if attachment exists
    if (!policy.attachment || !policy.attachment.data) {
      return res.status(404).json({ error: "No attachment found" });
    }

    // Convert base64 to buffer
    const fileBuffer = Buffer.from(policy.attachment.data, "base64");

    // Set appropriate headers
    res.setHeader("Content-Type", policy.attachment.contentType);
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${policy.attachment.filename}"`
    );
    res.setHeader("Content-Length", fileBuffer.length);

    // Send file
    res.send(fileBuffer);
  } catch (error) {
    console.error("Get attachment error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
