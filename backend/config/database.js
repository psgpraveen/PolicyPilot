const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/admin_panel";
const client = new MongoClient(uri);

let db;
let isConnected = false;

async function connectDB() {
  if (isConnected) {
    return db;
  }

  try {
    await client.connect();
    db = client.db("admin_panel");
    isConnected = true;
    console.log("✅ Connected to MongoDB");
    return db;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}

function getDB() {
  if (!db || !isConnected) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
}

// Graceful shutdown
process.on("SIGINT", async () => {
  try {
    await client.close();
    console.log("\n✅ MongoDB connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    process.exit(1);
  }
});

module.exports = { connectDB, getDB };
