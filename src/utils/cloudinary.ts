import cloudinary from "cloudinary"
import environment from "../environment"

cloudinary.v2.config({
    // cloud_name: environment.CLOUDINARY_NAME,
    // api_key: environment.CLOUDINARY_API_KEY,
    // api_secret: environment.CLOUDINARY_API_SECRET
    cloud_name: 'dud3zvxvh',
    api_key: '452234855618922',
    api_secret: 'ETU3A4UkIcMJislKjosGw35bbGA',
})

export default cloudinary