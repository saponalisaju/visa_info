const cloudinary = require("../config/cloudinary");

const publicIdFromUrl = (secureUrl) => {
  const pathSegments = secureUrl.split("visaInfo/");
  const lastSegment = pathSegments[pathSegments.length - 1];
  const [publicId] = lastSegment.split(".");
  return "visaInfo/" + publicId;
};

const deleteFileFromCloudinary = async (publicId) => {
  try {
    const response = await cloudinary.uploader.destroy(publicId);
    console.log("File deleted successfully from Cloudinary");
    return response;
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    throw error;
  }
};

module.exports = { deleteFileFromCloudinary, publicIdFromUrl };
