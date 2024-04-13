// cloudinary.js
const cloudinaryUpload = async (file) => {
    // Cloudinary configurations (replace with your Cloudinary details)
    const cloudinaryCloudName = 'dhpyyn3tq';
    const cloudinaryUploadPreset = 'moral3x4';

    const cloudinaryData = new FormData();
    cloudinaryData.append('file', file);
    cloudinaryData.append('upload_preset', cloudinaryUploadPreset);

    const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/upload`, {
        method: "post",
        body: cloudinaryData
    });

    const cloudinaryJson = await cloudinaryResponse.json();
    return cloudinaryJson.secure_url;
};

export default cloudinaryUpload;
