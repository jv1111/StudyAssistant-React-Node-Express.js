const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img");
  },

  filename: (req, file, cb) => {
    const userId = req.user._id;

    const filename = userId + Date.now() + path.extname(file.originalname);

    cb(null, filename);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
