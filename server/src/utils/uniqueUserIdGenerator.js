const mongoose = require("mongoose");

// To ensure uniqueness, generate a new ID if the ID is already taken by another collection
const generateUniqueObjectId = async (defaultId, CollectionModel) => {
  let newId;
  let user = await CollectionModel.findById(defaultId);
  if (!user) return defaultId;
  while (user) {
    newId = new mongoose.Types.ObjectId();
    user = await CollectionModel.findById(newId);
  }
  return newId;
};

module.exports = {
  generateUniqueObjectId,
};
