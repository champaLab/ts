import prisma from '../../prisma'

export const getContactService = async () => {
    try {
        let content = await prisma.$queryRaw` SELECT * FROM tbl_contact order by id DESC limit 1 `
        await prisma.$disconnect()
        return content
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    }
}
