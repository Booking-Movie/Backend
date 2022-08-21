const multer = require("multer")
const { getExtensionFile } = require("../utils/get-extension-file");

const uploadImageSingle = (typeImage) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            //Đường dẫn thư mục để lưu file
            cb(null, `./public/images/${typeImage}`);
        },
        //Date.now tránh trùng tên hình
        //Tên file gửi lên
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
                // Nếu đúng thì true để tấm hình đc loading lên
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