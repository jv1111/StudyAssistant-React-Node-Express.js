const fs = require("fs");
const path = require("path");

const generateFilename = require("./generateFilename");

const uploadDir = path.join(__dirname, "../uploads/profile");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const saveGoogleProfileImage = async (imageUrl) => {
  if (!imageUrl) {
    return null;
  }

  const response = await fetch(imageUrl);

  if (!response.ok) {
    throw new Error("Failed to download Google profile image");
  }

  const contentType = response.headers.get("content-type");

  if (!contentType?.startsWith("image/")) {
    throw new Error("Google profile image is not a valid image");
  }

  const extensionMap = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
  };

  const extension = extensionMap[contentType] || ".jpg";

  const buffer = Buffer.from(await response.arrayBuffer());

  const filename = generateFilename(extension);
  const filePath = path.join(uploadDir, filename);

  fs.writeFileSync(filePath, buffer);

  return {
    url: `/uploads/profile/${filename}`,
    filePath,
  };
};

module.exports = {
  saveGoogleProfileImage,
};
