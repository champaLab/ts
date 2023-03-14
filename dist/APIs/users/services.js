"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerifyEmailService = exports.updateEmailService = exports.checkUserService = exports.generateCodeService = exports.userLoginService = exports.userVerifyService = exports.deleteCodeService = exports.deleteUserService = exports.updateUserStatus = exports.updateUserProfileService = exports.updateUserService = exports.getUsersService = exports.userCreateService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const monpity_crypt_1 = require("../../utils/monpity-crypt");
const nodemailer_1 = __importDefault(require("nodemailer"));
const mail_config_1 = __importDefault(require("../../utils/mail-config"));
const userCreateService = async (user) => {
    try {
        const check = await prisma_1.default.tbl_users.findFirst({
            where: { email: user.email },
        });
        console.log('check user :', check);
        if (check) {
            return { message: 'ຜູ້ໃຊ້ງານນີ້ ມີໃນລະບົບແລ້ວ', status: "error" };
        }
        const _user = await prisma_1.default.tbl_users.create({
            data: user
        });
        return _user;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.userCreateService = userCreateService;
const getUsersService = async () => {
    try {
        let users = await prisma_1.default.$queryRaw `
            SELECT u_id, username, email, DATE_FORMAT(created_at,'%d-%m-%Y') created_at, role,
            DATE_FORMAT(updated_at, '%d-%m-%Y%T') updated_at, status, DATE_FORMAT(last_login, '%d-%m-%Y %T') last_login
            FROM tbl_users ORDER BY created_at DESC`;
        return users;
    }
    catch (error) {
        throw error;
    }
};
exports.getUsersService = getUsersService;
const updateUserService = async (user) => {
    try {
        const result = await prisma_1.default.tbl_users.update({
            where: { u_id: user.u_id },
            data: user,
        });
        return result;
    }
    catch (error) {
        throw error;
    }
};
exports.updateUserService = updateUserService;
const updateUserProfileService = async (user) => {
    try {
        let username = user.username.trim();
        let password = user.password;
        let u_id = user.u_id;
        if (username.length < 1) {
            return null;
        }
        let _user = { username };
        // @ts-ignore
        if (password)
            _user = { username, password: (0, monpity_crypt_1.encrypt)(password) };
        const result = await prisma_1.default.tbl_users.update({
            where: { u_id: u_id },
            data: _user
        });
        return result;
    }
    catch (error) {
        throw error;
    }
};
exports.updateUserProfileService = updateUserProfileService;
const updateUserStatus = async (u_id, status, updated_at) => {
    try {
        const result = await prisma_1.default.tbl_users.update({
            where: { u_id: u_id },
            data: { status: status, updated_at },
        });
        return result;
    }
    catch (error) {
        throw error;
    }
};
exports.updateUserStatus = updateUserStatus;
const deleteUserService = async (id) => {
    try {
        const result = await prisma_1.default.tbl_users.delete({
            where: { u_id: id },
        });
        return result;
    }
    catch (error) {
        throw error;
    }
};
exports.deleteUserService = deleteUserService;
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
    const transport = nodemailer_1.default.createTransport(mail_config_1.default);
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
            console.log(`> Mail verify is sent to  -------------> ${email}`);
            console.log(res);
            console.log("\n<-------------------------------------------------------------------->\n");
        }
    }
    catch (error) {
        throw error;
    }
};
exports.sendVerifyEmailService = sendVerifyEmailService;
