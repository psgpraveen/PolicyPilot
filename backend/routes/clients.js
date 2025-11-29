const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const clientController = require("../controllers/clientController");

router.use(authMiddleware);

router.get("/", clientController.getAllClients);

router.post(
  "/",
  clientController.clientValidation,
  clientController.createClient
);

router.put(
  "/:id",
  clientController.clientValidation,
  clientController.updateClient
);

router.delete("/:id", clientController.deleteClient);

module.exports = router;
