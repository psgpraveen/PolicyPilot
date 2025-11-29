const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const upload = require("../middleware/upload");
const policyController = require("../controllers/policyController");

router.use(authMiddleware);

router.get("/", policyController.getAllPolicies);

router.get("/:id/attachment", policyController.getAttachment);

router.post(
  "/",
  upload.single("attachment"),
  policyController.policyValidation,
  policyController.createPolicy
);

router.put(
  "/:id",
  upload.single("attachment"),
  policyController.policyValidation,
  policyController.updatePolicy
);

router.delete("/:id", policyController.deletePolicy);

module.exports = router;
