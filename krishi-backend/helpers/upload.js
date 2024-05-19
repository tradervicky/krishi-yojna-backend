const cloudinary = require("cloudinary").v2;
require('dotenv').config();         
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_UPLOAD,
  api_secret: process.env.SECRET_KEY_UPLOAD
});

exports.uploadFile = async (filePath) => {
    try {
      const result = await cloudinary.uploader.upload(filePath);
    return result;
    } catch (error) {
      console.error(error);
    }
  };

  exports.deleteFile = async (publicId) =>{
    try {
      const result = await cloudinary.uploader.destroy(publicId);
    return result;
    } catch (error) {
      console.error(error);
    }
  }