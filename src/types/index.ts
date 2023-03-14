import { Query } from "express-serve-static-core";
export interface TypeRequestQuery<T> extends Express.Request {
    body: T;
}

export type IRequestBookType = {
    tokenPayload: ITokenPayload;
    name: string;
};

export type ITokenPayload = {
    u_id: number;
    username: string;
    email: string;
    role: string;
    status: string;
};

export type IBookType = {
    name: string;
};

export interface IReqProvince {
    province_name: string;
    created_by: number;
}

export interface IReqCalendar {
    city_id: number;
    created_by: number;
    date_festival: Date;
    created_at: Date;
    province_id: number;
    festival_type_id: number;
    temple_name: string;
    village: string;
    ca_id: number;
    tel: number;
    whatsapp: number;
}

export type IReqBook = {
    b_id: number | null
    title: string
    content: string
    book_type_id: number
    created_by: number
    created_at: Date
    editor_approved: number | null
    editor_approved_date: Date | null
    admin_approved: number | null
    admin_approved_date: Date | null
    b_index: number
}

export interface ReqBookType {
    title: string;
    subtitle: string;
    created_by: number;
    index: number;
    created_at: string;
    bt_index: number;
}

export type User = {
    username: string;
    email: string;
    password: string;
    role: string;
    status: string;
    created_at: Date;
};

export type IUserProfile = {
    u_id: number
    password: string | null
    username: string
}

export type IReqFestival = {
    created_by: number
    festival_name: string
    created_at: string
}

