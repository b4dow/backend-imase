const cloudinary = require('cloudinary').v2;
const config = require('../config/config');

cloudinary.config({
 cloud_name: config.cloudName,
 api_key: config.cloudApiKey,
 api_secret: config.cloudApiSecret,
});

const uploadImage = async (file) => {
 try {
  const uploadResponse = await cloudinary.uploader.upload(file, {
   upload_preset: 'dev_setups',
  });
  return uploadResponse;
 } catch (error) {
  console.error(error);
 }
};

module.exports = { uploadImage };
