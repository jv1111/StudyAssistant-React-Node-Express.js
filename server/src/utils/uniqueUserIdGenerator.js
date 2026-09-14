const mongoose = require("mongoose");

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
