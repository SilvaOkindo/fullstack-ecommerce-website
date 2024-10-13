import { v2 as cloudinary } from 'cloudinary';
import multer from "multer"

cloudinary.config({
    cloud_name: "dgf918fxg",
    api_key: "845669253889618",
    api_secret: "_x5N1JK2ZUgR1aIlcvRT1Sbh03c"

})


const storage = new multer.memoryStorage()

export const handleImage = async(file) =>{
    const result =  await cloudinary.uploader.upload(file, {
        resource_type: "auto"
    })

    return result
}

 export const upload = multer({storage})