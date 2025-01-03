import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { uploadCloudinary } from './cloudinary.config'

const storage = new CloudinaryStorage({
  cloudinary: uploadCloudinary,
})

export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
})
