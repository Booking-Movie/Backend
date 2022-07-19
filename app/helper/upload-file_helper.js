const multer = require("multer")
const { getExtensionFile } = require("../utils/get-extension-file");

const uploadImageSingle = (typeImage) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `./public/images/${typeImage}`);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "_" + file.originalname);
        },
    })
    const upload = multer({
        storage, fileFilter: (req, file, cb) => {
            const extensionImageList = ["PNG", "png", "jpg", "jpeg", "gif", "webp"];
            const extensionFile = getExtensionFile(file.originalname);
            // Nếu có tồn tại cái đuôi hình
            if (extensionImageList.includes(extensionFile)) {
                cb(null, true);
            } else {
                cb(new Error("Extension không hợp lệ"));
            }
        }
    });
    return upload.single(typeImage);
};

module.exports = {
    uploadImageSingle,
}