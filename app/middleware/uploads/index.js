const multer = require("multer")
const { getExtensionFile } = require("../../utils/get-extension-file");

const uploadImageSingle = (typeImage) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `./public/images/${typeImage}`);
        },//Đường dẫn thư mục để lưu file
        filename: (req, file, cb) => {
            //Date.now tránh trùng tên hình
            cb(null, Date.now() + "_" + file.originalname);
        }, //Tên file gửi lên
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
                cb(new Error("Extenstion không hợp lệ"));
            }
        }
    });
    return upload.single(typeImage);
};

module.exports = {
    uploadImageSingle,
}