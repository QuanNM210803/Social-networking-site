// const Post=require('../../models/PostModel')

// async function createPost(request,response){
//    try{
//       const user=request?.user
//       if(!user){
//          return response.status(404).json({
//             message:'User not found',
//             error:true
//          })
//       }

//       const content=request?.body
//       const text=content?.text || ''
//       const image=content?.image || []
//       const video=content?.video || []
//       const userId=user?._id.toString()
      
//       if(!text && !image?.length && !video?.length){
//          return response.status(400).json({
//             message:'Post requires content',
//             error:true
//          })
//       }
//       const newPost=new Post({
//          poster:userId,
//          content:{
//             text,
//             image,
//             video
//          }
//       })
//       await newPost.save()
//       return response.status(201).json({
//          data:newPost,
//          message:'Post created successfully',
//          success:true
//       })
//    }catch(error){
//       return response.status(500).json({
//          message:error.message || error,
//          error:true
//       })
//    }
// }

// module.exports=createPost

const express = require('express');
const createAPost = express.Router();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
const path = require('path');
const Post = require('../../models/PostModel');
const protectRouter = require('../../routes/ProtectRouter');

// Cấu hình Multer để lưu trữ các file tạm thời
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const upload = multer({ dest: uploadDir });

const createPost = async (request, response) => {
  try {
      const user = request.user
      if (!user) {
         return response.status(404).json({
            message: 'User not found',
            error: true
         })
      }

      const { text } = request.body || ''
      let images = request.files['image'] ||[]
      let videos = request.files['video'] || []
      const userId = user._id.toString()
      console.log('images', images)
      console.log('videos', videos)
      if (!text && !images?.length && !videos?.length) {
         return response.status(400).json({
            message: 'Post requires content',
            error: true
         })
      }

      const uploadImagesPromises = images.map(image => {
         return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(image.path, (error, result) => {
               if (error) {
                  reject(error)
               } else {
                  resolve(result.secure_url)
               }
            })
         })
      })
      const uploadedImages = await Promise.all(uploadImagesPromises)

      const uploadVideosPromises = videos.map(video => {
         return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(video.path,{resource_type:'video'}, (error, result) => {
               if (error) {
                  reject(error)
               } else {
                  resolve(result.secure_url)
               }
            })
         })
      })
      const uploadedVideos = await Promise.all(uploadVideosPromises)

      // xóa sau khi upload
      const allFiles = [...images, ...videos]
      allFiles.forEach(file => {
         fs.unlinkSync(file.path)
      })

      const newPost = new Post({
      poster: userId,
         content: {
            text,
            image: uploadedImages,
            video: uploadedVideos
         }
      })

      await newPost.save()
      return response.status(201).json({
         data: newPost,
         message: 'Post created successfully',
         success: true
      })
   } catch (error) {
      return response.status(500).json({
         message: error.message || error,
         error: true
      })
   }
}

createAPost.post('/create', protectRouter, upload.fields([{ name: 'image', maxCount: 20 }, { name: 'video', maxCount: 10 }]), createPost)
module.exports = createAPost

