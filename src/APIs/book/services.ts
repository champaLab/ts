import dayjs from 'dayjs'
import { IReqBook, ITokenPayload } from '../../types'
import prisma from '../../prisma'



import "../../utils/extensions"
import { lineNotify } from '../../utils/line-notice'
import { whatsappBotSender } from '../../utils/whatsapp-bot';
import { getKhamkhomService } from '../khamkhom/services'


export const editorGetNewBookService = async (user: ITokenPayload) => {
    try {
        let book = await prisma.$queryRaw`
            SELECT B.b_id, B.b_index, B.title, B.content, DATE_FORMAT(B.created_at,'%d-%m-%Y') created_at, B.book_type_id,
            U.name as editor_checking_by_name, B.created_by, B.editor_checking_by, DATE_FORMAT(B.editor_checking_date,'%d-%m-%Y') editor_checking_date
            FROM tbl_books AS B
            LEFT JOIN tbl_users AS U ON B.editor_checking_by = U.u_id
            WHERE B.editor_approved_by IS NULL
            ORDER BY B.created_at DESC`

        console.log(book)

        await prisma.$disconnect()
        return book
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    }
}

export const adminGetNewBookService = async () => {
    try {

        let books = await prisma.$queryRaw`
            SELECT B.b_id, B.b_index, B.title, B.content, DATE_FORMAT(B.created_at,'%d-%m-%Y') created_at, B.book_type_id,
            U.name as admin_checking_by_name, B.created_by, B.admin_checking_by,DATE_FORMAT(B.admin_checking_date,'%d-%m-%Y') admin_checking_date
            FROM tbl_books AS B
            LEFT JOIN tbl_users AS U ON B.admin_checking_by = U.u_id
            WHERE B.editor_approved_by IS NOT NULL AND B.admin_approved_by IS NULL
            ORDER BY B.created_at DESC`;

        await prisma.$disconnect()
        return books
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    }
}

export const getMyBookService = async (user: ITokenPayload) => {
    try {

        let book = await prisma.$queryRaw`
            SELECT b_id, title, content, DATE_FORMAT(created_at,'%d-%m-%Y') created_at,
            book_type_id, editor_approved_by, editor_checking_by, admin_approved_by
            FROM tbl_books 
            WHERE created_by = ${user.u_id}
            ORDER BY created_at DESC`

        console.log(book)
        await prisma.$disconnect()
        return book
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    }
}

export const adminGetBookService = async (book_type_id: number) => {
    try {
        let book = await prisma.$queryRaw`
        SELECT b_id, title, content, DATE_FORMAT(created_at,'%d-%m-%Y') created_at, book_type_id
        FROM tbl_books 
        WHERE book_type_id = ${book_type_id}
        ORDER BY title `
        await prisma.$disconnect()
        return book
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    }
}

export const createBookService = async (data: IReqBook) => {
    try {
        console.log("==================== create book  ============================")

        let { title, content, book_type_id, created_by, created_at } = data

        const message = "🤗🫣 ມີໜັງສືໃໝ່ 🫣🤗\n===== ຫົວຂໍ້ =====\n" + title
        whatsappBotSender(message)

        const check = await prisma.tbl_books.findFirst({ where: { title, book_type_id }, })
        console.log(check)

        if (check) {
            await prisma.$disconnect()
            return { message: "ຫົວຂໍ້ໜັງສືນີ້ ມີໃນລະບົບແລ້ວ", status: "error" }
        }

        const book = await prisma.tbl_books.create({
            data: {
                title,
                content,
                book_type_id,
                created_at,
                created_by,
            }
        })

        console.log("book create ", book)

        await prisma.$disconnect()
        return { message: "ເພີ່ມໜັງສື ສຳເລັດແລ້ວ", status: "success" }
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        return { message: "ເຊເວີ ຂັດຂ້ອງ", status: "error" }
    }
}

export const updateBookService = async (data: IReqBook) => {
    try {
        console.log("==================== update book  ============================")

        let { title, content, book_type_id, b_id, b_index, created_at, created_by } = data
        console.log("data ", data)

        if (!b_id) {
            return { message: "ກະລຸນາປ້ອນ ID", status: "error" }
        }

        const upsert = await prisma.tbl_books.update({
            where: { b_id: b_id! },
            data: {
                title,
                content,
                b_index: Number(b_index),
                book_type_id: Number(book_type_id),
                updated_at: created_at,
                updated_by: created_by,
            }
        })

        console.log("update  book success ", upsert)
        await prisma.$disconnect()

        console.log("==================== remove book  ============================")
        await prisma.$disconnect()
        return { message: "ອັບເດດໜັງສື ສຳເລັດແລ້ວ", status: "success" }
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        return { message: "ບໍ່ສາມາດ ອັບເດດໜັງສືໄດ້", status: "error" }

    }
}

export const adminApproveBookService = async (data: IReqBook) => {
    try {
        console.log("==================== admin update book  ============================")

        let title = data.title
        let content = data.content
        let book_type_id = Number(data.book_type_id)
        let b_index = Number(data.b_index)
        let b_id = Number(data.b_id)
        let admin_approved = Number(data.admin_approved)
        let admin_approved_date = dayjs(data.admin_approved_date).format("YYYY-MM-DD HH:mm:ss")


        console.log("admin approved: " + data)

        if (!b_id) {
            return { message: "ກະລຸນາປ້ອນ ID", status: "error" }
        }

        var check = await prisma.tbl_books.findUnique({ where: { b_id: b_id } },)

        let message = "ບັນທຶກການກວດສອບ ຜິດພາດ"
        let status = 'error';
        console.log("check permission: ", check?.admin_checking_by === admin_approved)
        if (check?.admin_checking_by && check?.admin_checking_by === admin_approved) {
            await prisma.$queryRaw`UPDATE tbl_books SET
            title = ${title},
            content = ${content},
            b_index = ${b_index},
            book_type_id = ${book_type_id},
            admin_approved_by = ${admin_approved},
            admin_approved_date = ${admin_approved_date}
            WHERE  b_id = ${b_id} AND admin_checking_by = ${admin_approved} `;

            message = "ບັນທຶກການກວດສອບບ ສຳເລັດແລ້ວ"
            status = 'success';
        }

        console.log("==================== admin approve book  ============================")
        await prisma.$disconnect()
        return { message, status }
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        return { message: "ບໍ່ສາມາດ ອັບເດດໜັງສືໄດ້", status: "error" }

    }
}

export const editorApproveBookService = async (data: IReqBook) => {
    try {
        console.log("==================== editor update book  ============================")

        let title = data.title
        let content = data.content
        let book_type_id = Number(data.book_type_id)
        let b_id = Number(data.b_id)
        let b_index = Number(data.b_index)
        let editor_approved = Number(data.editor_approved)
        let editor_approved_date = dayjs(data.editor_approved_date).format("YYYY-MM-DD HH:mm:ss")


        console.log(data)

        if (!b_id) {
            return { message: "ກະລຸນາປ້ອນ ID", status: "error" }
        }

        var check = await prisma.tbl_books.findUnique({ where: { b_id: b_id } },)

        let message = "ທ່ານບໍ່ໄດ້ຈ່ອງລາຍການນີ້"
        let status = 'error';

        console.log(check)

        if (check?.editor_checking_by === editor_approved) {
            await prisma.$queryRaw`UPDATE tbl_books SET
            title = ${title},
            b_index = ${b_index},
            content = ${content},
            book_type_id = ${book_type_id},
            editor_approved_by = ${editor_approved},
            editor_approved_date = ${editor_approved_date}
            WHERE  b_id = ${b_id} AND editor_checking_by = ${editor_approved} `;

            message = "ບັນທຶກການກວດສອບ ສຳເລັດແລ້ວ"
            status = 'success';
        }

        console.log("==================== editor approve book  ============================")
        await prisma.$disconnect()
        return { message, status }
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        return { message: "ບໍ່ສາມາດ ອັບເດດໜັງສືໄດ້", status: "error" }

    }
}

export const removeBookService = async (b_id: number) => {
    try {
        console.log("==================== remove book  ============================")

        const bookType = await prisma.tbl_books.delete({
            where: { b_id },
        })

        console.log(bookType)
        console.log("==================== remove book  ============================")

        await prisma.$disconnect()
        return { message: "ລົບໜັງສື ສຳເລັດແລ້ວ", status: "success" }
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        return { message: "ບໍ່ສາມາດລົບຂໍ້ມູນທີ່ທ່ານຮ້ອງຂໍໄດ້", status: "error" }

    }
}

export const getBookByTypeBookService = async (type_id: number) => {
    try {
        console.log("==================== get book by type  ============================")

        const books = await prisma.$queryRaw`
        SELECT b_index, b_id, title, content, DATE_FORMAT(created_at, '%d-%m-%Y') created_at, book_type_id
        FROM tbl_books 
        WHERE book_type_id = ${type_id} AND editor_approved_by IS NOT NULL AND admin_approved_by IS NOT NULL ORDER BY b_index`


        console.log("==================== get book by type  ============================")

        await prisma.$disconnect()
        return books
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        return { message: "ບໍ່ສາມາດລົບຂໍ້ມູນທີ່ທ່ານຮ້ອງຂໍໄດ້", status: "error" }

    }
}

export const getBookNotApproveService = async () => {
    try {

        const booksEditor: any[] = await prisma.$queryRaw`SELECT count(*) AS amount  FROM tbl_books WHERE editor_approved_by IS NULL `
        const booksAdmin: any[] = await prisma.$queryRaw`SELECT count(*) AS amount  FROM tbl_books WHERE editor_approved_by IS NOT NULL AND admin_approved_by IS NULL`

        console.log("==================== get book not approve 22 ============================")
        const day = dayjs(new Date()).format("DD")
        const khamkhom = await getKhamkhomService()

        const max = khamkhom.length; // day of month
        const indexDay = Math.floor(Math.random() * max)
        console.log('indexDay', indexDay)
        let title = khamkhom[Number(indexDay)]['title']

        let Editor = Number(booksEditor[0]['amount']) > 0 ? "\n ເອກະສານທີ່ລໍຖ້າການກວດສອບຈາກ Editor: " + Number(booksEditor[0]['amount']) : ""
        const Admin = Number(booksAdmin[0]['amount']) > 0 ? "\nເອກະສານທີ່ລໍຖ້າການກວດສອບຈາກ Admin: " + Number(booksAdmin[0]['amount']) : ""
        const date = dayjs(new Date()).format("DD/MM/YYYY HH:mm:ss")
        const report = Editor != "" || Admin ? "\n\nລາຍງານປະຈຳວັນທີ:\n" + date + Editor + Admin : ""
        const message = "❗️ " + title + " ❗️" + report

        await prisma.$disconnect()
        return message
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        return "❗️❗️❗️ ຜິດພາດ ❗️❗️❗️"

    }
}

export const getBookSearchService = async (key: string, column: string) => {
    try {
        if (column === 'book-type') {
            console.log(key)
            console.log(column)
            const result = await prisma.$queryRaw`SELECT * FROM tbl_books WHERE book_type_id = ${Number(key)} ORDER BY b_index`
            await prisma.$disconnect()
            return result
        } else {
            const q = "%" + key + "%"
            const result = await prisma.$queryRaw`SELECT * FROM tbl_books WHERE content LIKE ${q} ORDER BY b_index`
            await prisma.$disconnect()
            return result
        }
    }
    catch (e) {
        console.log(e)
        await prisma.$disconnect()
        return null

    }
}