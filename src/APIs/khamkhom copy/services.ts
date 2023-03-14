import prisma from "../../prisma"
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(tz)
const date = dayjs(new Date()).format()
// const date = dayjs(new Date()).tz('Asia/Bangkok').format()

export const createKhamkhomService = async (title: string, created_by: number) => {
    try {
        console.log("date ", date)
        let result = await prisma.tbl_khamkhom.create({
            data: { title: title, created_at: date, created_by }
        })
        await prisma.$disconnect()
        return result
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    }
}

export const getKhamkhomServiceByUserId = async (created_by: number) => {
    try {

        let result = await prisma.tbl_khamkhom.findMany({
            where: { created_by }
        })
        await prisma.$disconnect()
        return result
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    }
}

export const checkKhamkhomService = async (title: string) => {
    try {

        let check = await prisma.tbl_khamkhom.findUnique({
            where: { title }
        })

        await prisma.$disconnect()
        return check

    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    }
}

export const getKhamkhomService = async () => {
    try {

        let check = await prisma.tbl_khamkhom.findMany({})

        await prisma.$disconnect()
        return check

    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    }
}

export const updateKhamkhomService = async (id: number, title: string) => {
    try {

        let result = await prisma.tbl_khamkhom.update({
            where: { id },
            data: { title }
        })
        await prisma.$disconnect()
        return result
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        return null
    }
}


export const deleteKhamkhomService = async (id: number) => {
    try {
        console.log("delete khamkhom ", typeof id, id)
        let result = await prisma.tbl_khamkhom.delete({
            where: { id }
        })
        console.log(result)

        await prisma.$disconnect()
        return result
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        return null
    }
}


export const randomKhamkhomService = async () => {
    try {

        let result = await prisma.$queryRaw`
        SELECT K.title, U.name FROM tbl_khamkhom AS K
        LEFT JOIN tbl_users AS U 
        ON U.u_id = K.created_by 
        `
        await prisma.$disconnect()
        return result
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        return null
    }
}

