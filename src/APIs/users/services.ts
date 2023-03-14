import prisma from "../../prisma";
import { IUserProfile, User } from "../../types";
import { tbl_users } from "@prisma/client";
import { encrypt } from "../../utils/monpity-crypt";


export type ReqUser = {
    name: string,
    role: string,
    whatsapp: string,
    email: string,
    created_at: Date,
    last_login: Date,
}

export const userCreateService = async (user: ReqUser) => {
    try {

        const check = await prisma.tbl_users.findFirst({
            where: { email: user.email },
        })

        console.log('check user :', check)

        if (check) {
            return { message: 'ຜູ້ໃຊ້ງານນີ້ ມີໃນລະບົບແລ້ວ', status: "error" }
        }

        const _user = await prisma.tbl_users.create({
            data: user
        });
        return _user
    } catch (error) {
        console.log(error);
        return null
    }
};



export const getUsersService = async () => {

    try {
        let users = await prisma.$queryRaw`
            SELECT u_id, username, email, DATE_FORMAT(created_at,'%d-%m-%Y') created_at, role,
            DATE_FORMAT(updated_at, '%d-%m-%Y%T') updated_at, status, DATE_FORMAT(last_login, '%d-%m-%Y %T') last_login
            FROM tbl_users ORDER BY created_at DESC`
        return users;
    } catch (error) {
        throw error;
    }
};

export const updateUserService = async (user: any) => {
    try {
        const result = await prisma.tbl_users.update({
            where: { u_id: user.u_id },
            data: user,
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const updateUserProfileService = async (user: IUserProfile) => {
    try {

        let username = user.username.trim();
        let password = user.password;
        let u_id = user.u_id;

        if (username.length < 1) {
            return null
        }

        let _user = { username }

        // @ts-ignore
        if (password) _user = { username, password: encrypt(password) }

        const result = await prisma.tbl_users.update({
            where: { u_id: u_id },
            data: _user
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const updateUserStatus = async (u_id: number, status: string, updated_at: Date) => {
    try {
        const result = await prisma.tbl_users.update({
            where: { u_id: u_id },
            data: { status: status, updated_at },
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const deleteUserService = async (id: number) => {
    try {
        const result = await prisma.tbl_users.delete({
            where: { u_id: id },
        });
        return result;
    } catch (error) {
        throw error;
    }
};
