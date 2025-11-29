const multer = require("multer");

// Use memory storage to store files in buffer
// Files will be stored directly in MongoDB as base64 encoded strings
// Supports: PDF, DOC, DOCX, XLS, XLSX, and common image formats
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Allowed file types for policy attachments
  const allowedTypes = [
    // Documents
    "application/pdf",
    "application/msword", // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/vnd.ms-excel", // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    // Images
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Allowed: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG."
      ),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

module.exports = upload;
