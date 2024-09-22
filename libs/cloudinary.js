const cloudinary = require('cloudinary').v2;
const config = require('../config/config');

cloudinary.config({
 cloud_name: config.cloudName,
 api_key: config.cloudApiKey,
 api_secret: config.cloudApiSecret,
});

const uploadImage = async (file) => {
 const uploadResponse = await cloudinary.uploader.upload(file, {
  upload_preset: 'lernu6gr',
 });
 console.log(uploadResponse);
};

module.exports = { cloudinary };
