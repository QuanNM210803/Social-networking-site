const cloudinary = require('cloudinary').v2;
const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/auto/upload`

async function uploadFile(file){
   try {
      const result = await cloudinary.uploader.upload(file, {
        resource_type: 'video'
      })
      return result
    } catch (error) {
      console.error('Error uploading file to Cloudinary:', error)
      throw error
    }
}

module.exports=uploadFile