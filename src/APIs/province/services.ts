import { tbl_provinces } from '@prisma/client';
import prisma from '../../prisma'
import { IReqProvince } from '../../types';



export const getProvinceService = async () => {
    try {
        console.log("get province service")
        let provinces: tbl_provinces[] = await prisma.$queryRaw`SELECT pro_id, province_name,  DATE_FORMAT(created_at,'%d-%m-%Y') created_at  FROM tbl_provinces`
        await prisma.$disconnect()

        let provinceList: any = [];
        if (provinces.length > 0) {
            provinces.map((item) => {
                provinceList.push(
                    {
                        label: item.province_name,
                        value: Number(item.pro_id),
                        pro_id: Number(item.pro_id),
                        created_at: item.created_at,
                        province_name: item.province_name,
                    }
                )
            })
        }

        return provinceList
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    }
}

export const createProvinceService = async (data: IReqProvince) => {
    try {
        console.log("==================== create Province  ============================")

        let { created_by, province_name } = data
        let created_at = new Date()

        const check = await prisma.tbl_provinces.findFirst({ where: { province_name: province_name }, })
        if (check) {
            await prisma.$disconnect()
            return { message: "ຂໍ້ມູນແຂວງນີ້ ມີໃນລະບົບແລ້ວ", status: "error" }
        }

        const Province = await prisma.tbl_provinces.create({
            data: {
                province_name,
                created_at,
                created_by,
            }
        })

        console.log("Province create ", Province)

        await prisma.$disconnect()
        return { message: "ເພີ່ມຂໍ້ມູນແຂວງ ສຳເລັດແລ້ວ", status: "success" }
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    }
}

export const updateProvinceService = async (data: any) => {
    try {
        console.log("==================== update Province  ============================")

        let { province_name, pro_id, created_by } = data
        let updated_at = new Date()

        const check = await prisma.tbl_provinces.findFirst({
            where: { province_name: province_name, NOT: { pro_id: pro_id } },
        })
        console.log("============== check ==================")
        console.log("check ", check)

        if (check) {
            await prisma.$disconnect()
            return { message: "ຂໍ້ມູນແຂວງນີ້ ມີໃນລະບົບແລ້ວ", status: "error" }
        }

        if (typeof pro_id != "number") {
            await prisma.$disconnect()
            return { message: "ID ບໍ່ຖືກຕ້ອງ", status: "error" }
        }

        var upsert = await prisma.tbl_provinces.update({
            where: { pro_id: pro_id! },
            data: { province_name, updated_at, updated_by: created_by }
        })

        console.log("update  Province  ", upsert)

        await prisma.$disconnect()

        console.log("==================== remove Province  ============================")
        await prisma.$disconnect()
        return { message: "ອັບເດດຂໍ້ມູນແຂວງ ສຳເລັດແລ້ວ", status: "success" }
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        return { message: "ຜິດພາດ ລອງອີກຄັ້ງ", status: "error" }

    }
}

export const removeProvinceService = async (pro_id: number) => {
    try {
        console.log("==================== remove Province  ============================")

        const ProvinceType = await prisma.tbl_provinces.delete({
            where: { pro_id },
        })

        const city = await prisma.tbl_cities.deleteMany({
            where: { province_id: pro_id },
        })

        console.log(ProvinceType)
        console.log("==================== remove Province  ============================")

        await prisma.$disconnect()
        return { message: "ລົບແຂວງ ສຳເລັດແລ້ວ", status: "success" }
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        return { message: "ບໍ່ສາມາດລົບຂໍ້ມູນທີ່ທ່ານຮ້ອງຂໍໄດ້", status: "error" }

    }
}
