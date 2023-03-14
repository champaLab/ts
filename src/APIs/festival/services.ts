import { tbl_festival } from '@prisma/client'
import { IReqFestival } from "../../types"
import prisma from '../../prisma'

export const getFestivalService = async () => {
    try {
        console.log("get Festival service")
        let Festival = await prisma.$queryRaw`
            SELECT  DATE_FORMAT(created_at,'%d-%m-%Y') created_at,  fe_id, festival_name
            FROM tbl_festival 
        `
        await prisma.$disconnect()
        return Festival
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    }
}

export const createFestivalService = async (data: IReqFestival) => {
    try {
        console.log("==================== create Festival  ============================")

        const created_at = new Date(data.created_at);
        const festival_name = data.festival_name;
        const created_by = Number(data.created_by);

        const checkFestival = await prisma.tbl_festival.findFirst({ where: { festival_name: festival_name } })
        console.log(checkFestival)
        console.log("======================= check Festival =====================================")

        if (checkFestival) {
            await prisma.$disconnect()
            return { message: "ລາຍການນີ້ມີໃນລະບົບແລ້ວ", status: "error", }
        }

        const festival = await prisma.tbl_festival.create({
            data: {
                festival_name,
                created_by,
                created_at,
            }
        })

        console.log("festival create ", festival)

        await prisma.$disconnect()
        return { message: "ເພີ່ມຂໍ້ມູນ ສຳເລັດແລ້ວ", status: "success", }
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    }
}

export const removeFestivalService = async (id: number) => {
    try {
        console.log("==================== remove festival  ============================")
        const festival = await prisma.tbl_festival.delete({ where: { fe_id: id }, })

        console.log(festival)
        console.log("==================== remove festival  ============================")

        await prisma.$disconnect()
        return { message: "ລົບຂໍ້ມູນ ສຳເລັດແລ້ວ", status: "success" }
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        return { message: "ບໍ່ສາມາດລົບຂໍ້ມູນທີ່ທ່ານຮ້ອງຂໍໄດ້", status: "error" }

    }
}