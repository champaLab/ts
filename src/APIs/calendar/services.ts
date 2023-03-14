import { tbl_calendars, tbl_provinces, tbl_festival, tbl_cities } from '@prisma/client'
import { IReqCalendar } from '../../types'
import prisma from '../../prisma'
import dayjs from 'dayjs'

export const getCalendarService = async () => {
    try {
        console.log("get Calendar service")
        let date_now = dayjs(new Date).format('YYYY-MM-DD');

        let Calendar = await prisma.$queryRaw`
            SELECT
            DATE_FORMAT(CA.created_at,'%d-%m-%Y') created_at, festival_type_id,
            CA.ca_id, CA.temple_name, B.province_name, B.province_name, C.city_name, D.festival_name,
            CA.village, DATE_FORMAT(CA.date_festival,'%d-%m-%Y') date_festival, date_festival AS date_festival_old,
            DATE_FORMAT(CA.date_festival, '%T') time_festival, CA.city_id, CA.province_id, CA.tel, CA.whatsapp
            FROM tbl_calendars AS CA
            LEFT JOIN tbl_provinces AS B ON CA.province_id = B.pro_id
            LEFT JOIN tbl_cities AS C ON CA.city_id = C.ci_id
            LEFT JOIN tbl_festival AS D ON CA.festival_type_id = D.fe_id
            WHERE DATE(CA.date_festival) > ${date_now}
        `
        await prisma.$disconnect()
        return Calendar
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    }
}

export const createCalendarService = async (data: IReqCalendar) => {
    try {
        console.log("==================== create Calendar  ============================")

        const prefix = "856"

        const created_at = new Date(data.created_at);
        const date_festival = new Date(data.date_festival);

        const city_id = data.city_id;
        const created_by = data.created_by;
        const province_id = data.province_id;
        const temple_name = data.temple_name.trim();
        const festival_type_id = data.festival_type_id;
        const village = data.village.trim();
        const tel = data.tel.toString();;
        const whatsapp = prefix + data.whatsapp;

        const check: tbl_calendars[] = await prisma.$queryRaw`SELECT ca_id FROM tbl_calendars 
        WHERE temple_name = ${temple_name} AND city_id = ${city_id} AND province_id = ${province_id}
        `

        console.log("==================== check tbl_calendars ============================")
        console.log("check ", check)

        if (check.length > 0) {
            await prisma.tbl_calendars.update({
                where: { ca_id: check[0].ca_id },
                data: {
                    city_id,
                    updated_by: created_by,
                    date_festival,
                    province_id,
                    temple_name,
                    updated_at: created_at,
                    festival_type_id,
                    village,
                    tel,
                    whatsapp,
                },
            })

            await prisma.$disconnect()
            return { message: "ອັບເດດຂໍ້ມູນ ສຳເລັດແລ້ວ ", status: "success", }
        }

        const calendar = await prisma.tbl_calendars.create({
            data: {
                city_id,
                created_by,
                date_festival,
                province_id,
                temple_name,
                created_at,
                festival_type_id,
                village,
                tel,
                whatsapp,
            }
        })

        console.log("Calendar create ", calendar)

        await prisma.$disconnect()
        return { message: "ເພີ່ມຂໍ້ມູນ ສຳເລັດແລ້ວ", status: "success", }
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    }
}

export const updateCalendarService = async (data: IReqCalendar) => {
    try {
        console.log("==================== update Calendar  ============================")

        const prefix = "856"

        const created_at = new Date(data.created_at);
        const date_festival = new Date(data.date_festival);

        const city_id = data.city_id;
        const created_by = data.created_by;
        const province_id = data.province_id;
        const temple_name = data.temple_name.trim();
        const festival_type_id = data.festival_type_id;
        const village = data.village.trim();
        const tel = data.tel.toString();
        const whatsapp = prefix + data.whatsapp;

        const check: tbl_calendars[] = await prisma.$queryRaw`SELECT ca_id FROM tbl_calendars 
        WHERE temple_name = ${temple_name} AND city_id = ${city_id} AND province_id = ${province_id}
        `

        console.log("==================== check tbl_calendars ============================")
        console.log("check ", check)

        if (check.length < 1) {
            await prisma.$disconnect()
            return { message: "ອັບເດດຂໍ້ມູນ ຜິດພາດ ", status: "error" }
        }

        await prisma.tbl_calendars.update({
            where: { ca_id: check[0].ca_id },
            data: {
                city_id,
                updated_by: created_by,
                date_festival,
                province_id,
                temple_name,
                updated_at: created_at,
                festival_type_id,
                village,
                tel,
                whatsapp,
            },
        })

        await prisma.$disconnect()
        return { message: "ອັບເດດຂໍ້ມູນ ສຳເລັດແລ້ວ ", status: "success", }
    } catch (e) {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    }
}

export const removeCalendarService = async (ca_id: number) => {
    try {
        console.log("==================== remove Calendar  ============================")
        console.log("ca_id ", ca_id)
        const calendar = await prisma.tbl_calendars.delete({ where: { ca_id: ca_id }, })

        console.log(calendar)
        console.log("==================== remove City  ============================")


        await prisma.$disconnect()
        return { message: "ລົບຂໍ້ມູນ ສຳເລັດແລ້ວ", status: "success" }
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        return { message: "ບໍ່ສາມາດລົບຂໍ້ມູນທີ່ທ່ານຮ້ອງຂໍໄດ້", status: "error" }

    }
}

export const getDataForAddCalendarService = async () => {
    try {
        console.log("====================  data  Calendar  ============================")

        let tbl_provinces: tbl_provinces[] = await prisma.$queryRaw`SELECT pro_id, province_name FROM tbl_provinces`
        let tbl_cities: tbl_cities[] = await prisma.$queryRaw`SELECT ci_id, city_name, province_id FROM tbl_cities`
        const tbl_festival: tbl_festival[] = await prisma.tbl_festival.findMany({})


        if (tbl_provinces.length > 0) {
            tbl_provinces = tbl_provinces.map((item) => {
                let items = tbl_cities.filter(
                    (cityItem) => cityItem.province_id == item.pro_id
                );
                return {
                    ...item,
                    cities: items,
                }
            });

            await prisma.$disconnect()
            return { tbl_provinces, tbl_festival }
        }
    } catch (e) {
        console.log(e)
        await prisma.$disconnect()
        return { message: "ບໍ່ສາມາດລົບຂໍ້ມູນທີ່ທ່ານຮ້ອງຂໍໄດ້", status: "error" }

    }
}