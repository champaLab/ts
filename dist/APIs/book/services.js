"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookSearchService = exports.getBookNotApproveService = exports.getBookByTypeBookService = exports.removeBookService = exports.editorApproveBookService = exports.adminApproveBookService = exports.updateBookService = exports.createBookService = exports.adminGetBookService = exports.getMyBookService = exports.adminGetNewBookService = exports.editorGetNewBookService = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const prisma_1 = __importDefault(require("../../prisma"));
require("../../utils/extensions");
const whatsapp_bot_1 = require("../../utils/whatsapp-bot");
const services_1 = require("../khamkhom/services");
const editorGetNewBookService = async (user) => {
    try {
        let book = await prisma_1.default.$queryRaw `
            SELECT B.b_id, B.b_index, B.title, B.content, DATE_FORMAT(B.created_at,'%d-%m-%Y') created_at, B.book_type_id,
            U.name as editor_checking_by_name, B.created_by, B.editor_checking_by, DATE_FORMAT(B.editor_checking_date,'%d-%m-%Y') editor_checking_date
            FROM tbl_books AS B
            LEFT JOIN tbl_users AS U ON B.editor_checking_by = U.u_id
            WHERE B.editor_approved_by IS NULL
            ORDER BY B.created_at DESC`;
        console.log(book);
        await prisma_1.default.$disconnect();
        return book;
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        process.exit(1);
    }
};
exports.editorGetNewBookService = editorGetNewBookService;
const adminGetNewBookService = async () => {
    try {
        let books = await prisma_1.default.$queryRaw `
            SELECT B.b_id, B.b_index, B.title, B.content, DATE_FORMAT(B.created_at,'%d-%m-%Y') created_at, B.book_type_id,
            U.name as admin_checking_by_name, B.created_by, B.admin_checking_by,DATE_FORMAT(B.admin_checking_date,'%d-%m-%Y') admin_checking_date
            FROM tbl_books AS B
            LEFT JOIN tbl_users AS U ON B.admin_checking_by = U.u_id
            WHERE B.editor_approved_by IS NOT NULL AND B.admin_approved_by IS NULL
            ORDER BY B.created_at DESC`;
        await prisma_1.default.$disconnect();
        return books;
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        process.exit(1);
    }
};
exports.adminGetNewBookService = adminGetNewBookService;
const getMyBookService = async (user) => {
    try {
        let book = await prisma_1.default.$queryRaw `
            SELECT b_id, title, content, DATE_FORMAT(created_at,'%d-%m-%Y') created_at,
            book_type_id, editor_approved_by, editor_checking_by, admin_approved_by
            FROM tbl_books 
            WHERE created_by = ${user.u_id}
            ORDER BY created_at DESC`;
        console.log(book);
        await prisma_1.default.$disconnect();
        return book;
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        process.exit(1);
    }
};
exports.getMyBookService = getMyBookService;
const adminGetBookService = async (book_type_id) => {
    try {
        let book = await prisma_1.default.$queryRaw `
        SELECT b_id, title, content, DATE_FORMAT(created_at,'%d-%m-%Y') created_at, book_type_id
        FROM tbl_books 
        WHERE book_type_id = ${book_type_id}
        ORDER BY title `;
        await prisma_1.default.$disconnect();
        return book;
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        process.exit(1);
    }
};
exports.adminGetBookService = adminGetBookService;
const createBookService = async (data) => {
    try {
        console.log("==================== create book  ============================");
        let { title, content, book_type_id, created_by, created_at } = data;
        const message = "🤗🫣 ມີໜັງສືໃໝ່ 🫣🤗\n===== ຫົວຂໍ້ =====\n" + title;
        (0, whatsapp_bot_1.whatsappBotSender)(message);
        const check = await prisma_1.default.tbl_books.findFirst({ where: { title, book_type_id }, });
        console.log(check);
        if (check) {
            await prisma_1.default.$disconnect();
            return { message: "ຫົວຂໍ້ໜັງສືນີ້ ມີໃນລະບົບແລ້ວ", status: "error" };
        }
        const book = await prisma_1.default.tbl_books.create({
            data: {
                title,
                content,
                book_type_id,
                created_at,
                created_by,
            }
        });
        console.log("book create ", book);
        await prisma_1.default.$disconnect();
        return { message: "ເພີ່ມໜັງສື ສຳເລັດແລ້ວ", status: "success" };
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        return { message: "ເຊເວີ ຂັດຂ້ອງ", status: "error" };
    }
};
exports.createBookService = createBookService;
const updateBookService = async (data) => {
    try {
        console.log("==================== update book  ============================");
        let { title, content, book_type_id, b_id, b_index, created_at, created_by } = data;
        console.log("data ", data);
        if (!b_id) {
            return { message: "ກະລຸນາປ້ອນ ID", status: "error" };
        }
        const upsert = await prisma_1.default.tbl_books.update({
            where: { b_id: b_id },
            data: {
                title,
                content,
                b_index: Number(b_index),
                book_type_id: Number(book_type_id),
                updated_at: created_at,
                updated_by: created_by,
            }
        });
        console.log("update  book success ", upsert);
        await prisma_1.default.$disconnect();
        console.log("==================== remove book  ============================");
        await prisma_1.default.$disconnect();
        return { message: "ອັບເດດໜັງສື ສຳເລັດແລ້ວ", status: "success" };
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        return { message: "ບໍ່ສາມາດ ອັບເດດໜັງສືໄດ້", status: "error" };
    }
};
exports.updateBookService = updateBookService;
const adminApproveBookService = async (data) => {
    try {
        console.log("==================== admin update book  ============================");
        let title = data.title;
        let content = data.content;
        let book_type_id = Number(data.book_type_id);
        let b_index = Number(data.b_index);
        let b_id = Number(data.b_id);
        let admin_approved = Number(data.admin_approved);
        let admin_approved_date = (0, dayjs_1.default)(data.admin_approved_date).format("YYYY-MM-DD HH:mm:ss");
        console.log("admin approved: " + data);
        if (!b_id) {
            return { message: "ກະລຸນາປ້ອນ ID", status: "error" };
        }
        var check = await prisma_1.default.tbl_books.findUnique({ where: { b_id: b_id } });
        let message = "ບັນທຶກການກວດສອບ ຜິດພາດ";
        let status = 'error';
        console.log("check permission: ", (check === null || check === void 0 ? void 0 : check.admin_checking_by) === admin_approved);
        if ((check === null || check === void 0 ? void 0 : check.admin_checking_by) && (check === null || check === void 0 ? void 0 : check.admin_checking_by) === admin_approved) {
            await prisma_1.default.$queryRaw `UPDATE tbl_books SET
            title = ${title},
            content = ${content},
            b_index = ${b_index},
            book_type_id = ${book_type_id},
            admin_approved_by = ${admin_approved},
            admin_approved_date = ${admin_approved_date}
            WHERE  b_id = ${b_id} AND admin_checking_by = ${admin_approved} `;
            message = "ບັນທຶກການກວດສອບບ ສຳເລັດແລ້ວ";
            status = 'success';
        }
        console.log("==================== admin approve book  ============================");
        await prisma_1.default.$disconnect();
        return { message, status };
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        return { message: "ບໍ່ສາມາດ ອັບເດດໜັງສືໄດ້", status: "error" };
    }
};
exports.adminApproveBookService = adminApproveBookService;
const editorApproveBookService = async (data) => {
    try {
        console.log("==================== editor update book  ============================");
        let title = data.title;
        let content = data.content;
        let book_type_id = Number(data.book_type_id);
        let b_id = Number(data.b_id);
        let b_index = Number(data.b_index);
        let editor_approved = Number(data.editor_approved);
        let editor_approved_date = (0, dayjs_1.default)(data.editor_approved_date).format("YYYY-MM-DD HH:mm:ss");
        console.log(data);
        if (!b_id) {
            return { message: "ກະລຸນາປ້ອນ ID", status: "error" };
        }
        var check = await prisma_1.default.tbl_books.findUnique({ where: { b_id: b_id } });
        let message = "ທ່ານບໍ່ໄດ້ຈ່ອງລາຍການນີ້";
        let status = 'error';
        console.log(check);
        if ((check === null || check === void 0 ? void 0 : check.editor_checking_by) === editor_approved) {
            await prisma_1.default.$queryRaw `UPDATE tbl_books SET
            title = ${title},
            b_index = ${b_index},
            content = ${content},
            book_type_id = ${book_type_id},
            editor_approved_by = ${editor_approved},
            editor_approved_date = ${editor_approved_date}
            WHERE  b_id = ${b_id} AND editor_checking_by = ${editor_approved} `;
            message = "ບັນທຶກການກວດສອບ ສຳເລັດແລ້ວ";
            status = 'success';
        }
        console.log("==================== editor approve book  ============================");
        await prisma_1.default.$disconnect();
        return { message, status };
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        return { message: "ບໍ່ສາມາດ ອັບເດດໜັງສືໄດ້", status: "error" };
    }
};
exports.editorApproveBookService = editorApproveBookService;
const removeBookService = async (b_id) => {
    try {
        console.log("==================== remove book  ============================");
        const bookType = await prisma_1.default.tbl_books.delete({
            where: { b_id },
        });
        console.log(bookType);
        console.log("==================== remove book  ============================");
        await prisma_1.default.$disconnect();
        return { message: "ລົບໜັງສື ສຳເລັດແລ້ວ", status: "success" };
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        return { message: "ບໍ່ສາມາດລົບຂໍ້ມູນທີ່ທ່ານຮ້ອງຂໍໄດ້", status: "error" };
    }
};
exports.removeBookService = removeBookService;
const getBookByTypeBookService = async (type_id) => {
    try {
        console.log("==================== get book by type  ============================");
        const books = await prisma_1.default.$queryRaw `
        SELECT b_index, b_id, title, content, DATE_FORMAT(created_at, '%d-%m-%Y') created_at, book_type_id
        FROM tbl_books 
        WHERE book_type_id = ${type_id} AND editor_approved_by IS NOT NULL AND admin_approved_by IS NOT NULL ORDER BY b_index`;
        console.log("==================== get book by type  ============================");
        await prisma_1.default.$disconnect();
        return books;
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        return { message: "ບໍ່ສາມາດລົບຂໍ້ມູນທີ່ທ່ານຮ້ອງຂໍໄດ້", status: "error" };
    }
};
exports.getBookByTypeBookService = getBookByTypeBookService;
const getBookNotApproveService = async () => {
    try {
        const booksEditor = await prisma_1.default.$queryRaw `SELECT count(*) AS amount  FROM tbl_books WHERE editor_approved_by IS NULL `;
        const booksAdmin = await prisma_1.default.$queryRaw `SELECT count(*) AS amount  FROM tbl_books WHERE editor_approved_by IS NOT NULL AND admin_approved_by IS NULL`;
        console.log("==================== get book not approve 22 ============================");
        const day = (0, dayjs_1.default)(new Date()).format("DD");
        const khamkhom = await (0, services_1.getKhamkhomService)();
        const max = khamkhom.length; // day of month
        const indexDay = Math.floor(Math.random() * max);
        console.log('indexDay', indexDay);
        let title = khamkhom[Number(indexDay)]['title'];
        let Editor = Number(booksEditor[0]['amount']) > 0 ? "\n ເອກະສານທີ່ລໍຖ້າການກວດສອບຈາກ Editor: " + Number(booksEditor[0]['amount']) : "";
        const Admin = Number(booksAdmin[0]['amount']) > 0 ? "\nເອກະສານທີ່ລໍຖ້າການກວດສອບຈາກ Admin: " + Number(booksAdmin[0]['amount']) : "";
        const date = (0, dayjs_1.default)(new Date()).format("DD/MM/YYYY HH:mm:ss");
        const report = Editor != "" || Admin ? "\n\nລາຍງານປະຈຳວັນທີ:\n" + date + Editor + Admin : "";
        const message = "❗️ " + title + " ❗️" + report;
        await prisma_1.default.$disconnect();
        return message;
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        return "❗️❗️❗️ ຜິດພາດ ❗️❗️❗️";
    }
};
exports.getBookNotApproveService = getBookNotApproveService;
const getBookSearchService = async (key, column) => {
    try {
        if (column === 'book-type') {
            console.log(key);
            console.log(column);
            const result = await prisma_1.default.$queryRaw `SELECT * FROM tbl_books WHERE book_type_id = ${Number(key)} ORDER BY b_index`;
            await prisma_1.default.$disconnect();
            return result;
        }
        else {
            const q = "%" + key + "%";
            const result = await prisma_1.default.$queryRaw `SELECT * FROM tbl_books WHERE content LIKE ${q} ORDER BY b_index`;
            await prisma_1.default.$disconnect();
            return result;
        }
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        return null;
    }
};
exports.getBookSearchService = getBookSearchService;
