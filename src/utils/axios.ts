


import https from 'https'
import axios from 'axios'
import environment from "../environment"


const url = environment.LINE_NOTIFY_URL || "https://notify-api.line.me/api/notify"
const token = environment.LINE_NOTIFY_TOKEN || "ReIUNk11L875WmEb4MIANGjYfpUHlNxOfCstC3XkQV1"


if (environment.NODE_ENV === 'development') {
    const http = new https.Agent({
        rejectUnauthorized: false,
    })
    // @ts-ignore
    axios.defaults.http = http
}

const instance = axios.create({
    baseURL: url
})

instance.interceptors.request.use(async (config) => {

    // @ts-ignore
    config.headers = {
        "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${token}`
    }
    return config
})


instance.interceptors.response.use((response) => {
    return response
}, (error) => {
    console.log('axios error: ', error)
    return Promise.reject(error)
})

export default instance