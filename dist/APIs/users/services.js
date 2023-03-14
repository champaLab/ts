"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userVerifyService = exports.deleteCodeService = exports.deleteUserService = exports.updateUserStatus = exports.updateUserProfileService = exports.updateUserService = exports.getUsersService = exports.userCreateService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const monpity_crypt_1 = require("../../utils/monpity-crypt");
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
