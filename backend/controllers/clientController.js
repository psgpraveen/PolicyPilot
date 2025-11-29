const { body, validationResult } = require("express-validator");
const { clientModel } = require("../models");

exports.clientValidation = [
  body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Invalid email address"),
  body("phone")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Phone number must be at least 10 characters"),
];

exports.getAllClients = async (req, res) => {
  try {
    const clients = await clientModel.findByUserId(req.user.userId);

    res.json({
      success: true,
      clients: clients.map((client) => ({
        id: client._id.toString(),
        name: client.name,
        email: client.email,
        phone: client.phone,
      })),
    });
  } catch (error) {
    console.error("Get clients error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createClient = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors.array(),
      });
    }

    const { name, email, phone } = req.body;

    // Create client
    const clientId = await clientModel.create({
      name,
      email,
      phone,
      userId: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Client created successfully",
      clientId: clientId.toString(),
    });
  } catch (error) {
    console.error("Create client error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update client
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if client exists
    const existingClient = await clientModel.findById(id);
    if (!existingClient) {
      return res.status(404).json({ error: "Client not found" });
    }

    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors.array(),
      });
    }

    const { name, email, phone } = req.body;

    // Update client
    const updated = await clientModel.update(id, { name, email, phone });

    if (!updated) {
      return res.status(500).json({ error: "Failed to update client" });
    }

    res.json({
      success: true,
      message: "Client updated successfully",
    });
  } catch (error) {
    console.error("Update client error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete client
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if client exists
    const existingClient = await clientModel.findById(id);
    if (!existingClient) {
      return res.status(404).json({ error: "Client not found" });
    }

    // Check ownership
    if (existingClient.userId !== req.user.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    // Delete client
    const deleted = await clientModel.delete(id);

    if (!deleted) {
      return res.status(500).json({ error: "Failed to delete client" });
    }

    res.json({
      success: true,
      message: "Client deleted successfully",
    });
  } catch (error) {
    console.error("Delete client error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
