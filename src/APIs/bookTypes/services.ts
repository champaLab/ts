import fs from 'fs';
import prisma from '../../prisma'
import environment from '../../environment';
import { ReqBookType } from '../../types';
import cloudinary from '../../utils/cloudinary';

export const getBookTypesService = async () => {
    try {
        console.log("==================== get book type ============================")

        let bookType = await prisma.$queryRaw`SELECT bt_index, bt_id, icon, subtitle, title,  DATE_FORMAT(created_at, '%d-%m-%Y%T') created_at  
        FROM tbl_book_types ORDER BY bt_index`

        return bookType
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        return null
    }
}

export const createBookTypesService = async (data: ReqBookType, file: any) => {
    try {
        console.log("==================== create book type ============================")
        let { title, subtitle, created_at, created_by, bt_index } = data
        created_by = Number(created_by)
        bt_index = Number(bt_index)

        console.log(bt_index, " 999 =========================== ",)

        const iconPath = await uploadIconToCloudinary(file);

        if (!iconPath) return { message: "ບໍ່ສາມາອັບໂຫຼດຮູບໄດ້", status: "error" }
        const upsert = await prisma.tbl_book_types.upsert({
            where: { title },
            update: { title, subtitle, updated_by: created_by, updated_at: created_at, icon: iconPath, bt_index },
            create: { title, subtitle, created_by, created_at, icon: iconPath, bt_index }
        })

        fs.unlink(file, (result) => console.log(result))

        console.log("upsert  book type ", upsert)
        await prisma.$disconnect()

        let message = "ເພີ່ມໝວດໝູ່ໜັງສື ສຳເລັດແລ້ວ"
        if (upsert.updated_at) {
            message = "ອັບເດດໝວດໝູ່ໜັງສື ສຳເລັດແລ້ວ"
        }
        return { message, status: "success" }
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    }
}

export const uploadIconToCloudinary = async (file: string) => {
    try {
        // @ts-ignore
        const uploadResponse = await cloudinary.uploader.upload(file);
        console.log(uploadResponse);
        return uploadResponse.secure_url
    } catch (error) {
        console.log(error)
        return null
    }
}

export const removeBookTypesService = async (bt_id: number) => {
    try {
        console.log("==================== remove book type ============================")

        const bookType = await prisma.tbl_book_types.delete({
            where: { bt_id },
        })

        if (bookType.icon) {
            try {
                const path = environment.PWD + "/" + bookType.icon
                console.log('=========================== remove file icon success =====================================')
                console.log(path)
                fs.unlinkSync(path)
            } catch (error) {
                console.log('=========================== remove file icon error =====================================')
                console.log(error)
            }
        }

        console.log(bookType)
        console.log("==================== remove book type ============================")

        await prisma.$disconnect()
        return { message: "ລົບໝວດໝູ່ໜັງສື ສຳເລັດແລ້ວ", status: "success" }

    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        return { message: "ບໍ່ສາມາດລົບຂໍ້ມູນທີ່ທ່ານຮ້ອງຂໍໄດ້", status: "error" }

    }
}

