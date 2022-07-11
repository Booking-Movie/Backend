// Lấy đuôi file của tấm hình
const getExtensionFile = (filename) => {
    const arrayString = filename.split(".")
    return arrayString[arrayString.length - 1]
};

module.exports = {
    getExtensionFile
}