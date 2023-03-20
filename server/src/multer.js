const path = require("path");

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destination = "public/img";
        cb(null, destination);
    },
    filename: (req, file, cb) => {
        const userId = req.session.passport.user;
        const filename = userId + Date.now() + path.extname(file.originalname);//date now + .png/etc...
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;