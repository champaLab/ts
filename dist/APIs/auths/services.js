"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerifyEmailService = exports.updateEmailService = exports.deleteCodeService = exports.checkUserService = exports.userVerifyService = exports.generateCodeService = exports.userLoginService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const mail_config_1 = __importDefault(require("../../utils/mail-config"));
const transport = nodemailer_1.default.createTransport(mail_config_1.default);
const userLoginService = async (email) => {
    try {
        const last_login = new Date();
        let user = await (0, exports.checkUserService)(email);
        const id = user === null || user === void 0 ? void 0 : user.u_id;
        if (user) {
            await prisma_1.default.$queryRaw `UPDATE tbl_users SET last_login = ${last_login} WHERE id = ${id}`;
        }
        console.log("find use: ", user);
        if (!user)
            return null;
        return user;
    }
    catch (error) {
        console.error(error);
    }
};
exports.userLoginService = userLoginService;
const generateCodeService = async (username) => {
    try {
        const created_at = new Date();
        const min = 100000;
        const max = 999999;
        const code = Math.floor(Math.random() * (max - min + 1)) + min;
        await prisma_1.default.tbl_verify_login.upsert({
            where: { username },
            create: { username, code, created_at },
            update: { code, created_at },
        });
        return code;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};
exports.generateCodeService = generateCodeService;
const userVerifyService = async (code, username) => {
    try {
        const rs = await prisma_1.default.$queryRaw `SELECT * FROM tbl_verify_login WHERE code = ${code} AND username = ${username}`;
        return rs;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};
exports.userVerifyService = userVerifyService;
const checkUserService = async (receive) => {
    try {
        let user = await prisma_1.default.tbl_users.findFirst({ where: { OR: [{ whatsapp: receive }, { email: receive }] } });
        console.log("check user: ", user);
        let check_user = false;
        if (user)
            check_user = true;
        return { ...user, check_user };
    }
    catch (error) {
        console.error(error);
        return { check_user: false };
    }
};
exports.checkUserService = checkUserService;
const deleteCodeService = async (username) => {
    try {
        let user = await prisma_1.default.$queryRaw `DELETE  FROM tbl_verify_login WHERE username = ${username}`;
        return user;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};
exports.deleteCodeService = deleteCodeService;
const updateEmailService = async (u_id, email, updated_at) => {
    try {
        let user = await prisma_1.default.tbl_users.update({
            where: { u_id },
            data: { email, updated_at }
        });
        return user;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};
exports.updateEmailService = updateEmailService;
const sendVerifyEmailService = async (email, pinCode) => {
    const html = `<div className="">
        <h1 style="text-align: center;">ຢືນຢັນການເຂົ້າສູ່ລະບົບ</h1>
        <div style="margin-bottom: .8rem; font-size: 1.3rem;">ສະບາຍດີ KOB DEV,</div>
        <div class=""> ການຮ້ອງຂໍເຂົ້າໃຊ້ງານລະບົບ ມົນພິທີດ້ວຍບັນຊີ ${email}. ເພື່ອສືບຕໍ່ການຮ້ອງຂໍນີ້,
            ກະລຸນາໃສ່ລະຫັດຂ້າງລຸ່ມນີ້ໃນຫນ້າການຢັ້ງຢັນຕົວຕົນ:</div>
        <div style="font-size: 2rem; font-weight: 800;margin-bottom: 1rem;">${pinCode}</div>
        <div class="">ຫາກບໍ່ແມ່ນທ່ານເຄື່ອນໄຫວ ກະລຸນາຢ່ານຳລະຫັດດັ່ງກ່າວໃຫ້ບຸກຄົນອື່ນ ເພື່ອຄວາມປອດໄພ. </div>
        <div style="margin-top: 1rem;">ດ້ວຍຄວາມນັບຖື,</div>
        <div class="">ສະຫນັບສະຫນູນໂດຍ ມົນພິທີ</div>
    </div>
        `;
    const mailOption = {
        from: '"Monpity"<nopreply@monpity.la>',
        to: email,
        subject: 'Verify your email address',
        text: 'Verify your email address',
        html: html
    };
    try {
        const res = await transport.sendMail(mailOption);
        if (res) {
            console.log("<-------------------------------------------------------------------->\n");
            console.log(`> Mail verify is sent to      ------------->        ${email}`);
            console.log(res);
            console.log("\n<-------------------------------------------------------------------->\n");
        }
    }
    catch (error) {
        throw error;
    }
};
exports.sendVerifyEmailService = sendVerifyEmailService;
