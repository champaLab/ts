

import instance from './axios'

export const lineNotify = async (message: any) => {
    try {

        const res = await instance.post('/', { message })
    } catch (error) {
        console.log("=================================================", error)
    }
}



