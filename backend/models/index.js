const { ObjectId } = require("mongodb");
const { getDB } = require("../config/database");

const COLLECTIONS = {
  USERS: "users",
  CLIENTS: "clients",
  CATEGORIES: "categories",
  POLICIES: "policies",
};

const userModel = {
  async create(userData) {
    const db = getDB();
    const result = await db.collection(COLLECTIONS.USERS).insertOne({
      ...userData,
      createdAt: new Date(),
    });
    return result.insertedId;
  },

  async findByEmail(email) {
    const db = getDB();
    return db.collection(COLLECTIONS.USERS).findOne({ email });
  },

  async findById(id) {
    const db = getDB();
    return db.collection(COLLECTIONS.USERS).findOne({ _id: new ObjectId(id) });
  },
};

const clientModel = {
  async create(clientData) {
    const db = getDB();
    const result = await db.collection(COLLECTIONS.CLIENTS).insertOne({
      ...clientData,
      createdAt: new Date(),
    });
    return result.insertedId;
  },

  async findAll() {
    const db = getDB();
    return db.collection(COLLECTIONS.CLIENTS).find().toArray();
  },

  async findByUserId(userId) {
    const db = getDB();
    return db.collection(COLLECTIONS.CLIENTS).find({ userId }).toArray();
  },

  async findById(id) {
    const db = getDB();
    return db
      .collection(COLLECTIONS.CLIENTS)
      .findOne({ _id: new ObjectId(id) });
  },

  async update(id, clientData) {
    const db = getDB();
    const result = await db.collection(COLLECTIONS.CLIENTS).updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...clientData,
          updatedAt: new Date(),
        },
      }
    );
    return result.modifiedCount > 0;
  },

  async delete(id) {
    const db = getDB();
    const result = await db
      .collection(COLLECTIONS.CLIENTS)
      .deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  },
};

const categoryModel = {
  async create(categoryData) {
    const db = getDB();
    const result = await db.collection(COLLECTIONS.CATEGORIES).insertOne({
      ...categoryData,
      createdAt: new Date(),
    });
    return result.insertedId;
  },

  async findAll() {
    const db = getDB();
    return db.collection(COLLECTIONS.CATEGORIES).find().toArray();
  },

  async findByUserId(userId) {
    const db = getDB();
    return db.collection(COLLECTIONS.CATEGORIES).find({ userId }).toArray();
  },

  async findById(id) {
    const db = getDB();
    return db
      .collection(COLLECTIONS.CATEGORIES)
      .findOne({ _id: new ObjectId(id) });
  },

  async update(id, categoryData) {
    const db = getDB();
    const result = await db.collection(COLLECTIONS.CATEGORIES).updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...categoryData,
          updatedAt: new Date(),
        },
      }
    );
    return result.modifiedCount > 0;
  },

  async delete(id) {
    const db = getDB();
    const result = await db
      .collection(COLLECTIONS.CATEGORIES)
      .deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  },
};

const policyModel = {
  async create(policyData) {
    const db = getDB();
    const result = await db.collection(COLLECTIONS.POLICIES).insertOne({
      ...policyData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return result.insertedId;
  },

  async findAll() {
    const db = getDB();
    return db.collection(COLLECTIONS.POLICIES).find().toArray();
  },

  async findByUserId(userId) {
    const db = getDB();
    return db.collection(COLLECTIONS.POLICIES).find({ userId }).toArray();
  },

  async findById(id) {
    const db = getDB();
    return db
      .collection(COLLECTIONS.POLICIES)
      .findOne({ _id: new ObjectId(id) });
  },

  async update(id, policyData) {
    const db = getDB();
    const result = await db.collection(COLLECTIONS.POLICIES).updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...policyData,
          updatedAt: new Date(),
        },
      }
    );
    return result.modifiedCount > 0;
  },

  async delete(id) {
    const db = getDB();
    const result = await db
      .collection(COLLECTIONS.POLICIES)
      .deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  },
};

module.exports = {
  userModel,
  clientModel,
  categoryModel,
  policyModel,
};
