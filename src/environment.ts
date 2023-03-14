import { config } from "dotenv";
import { join } from "path";

try {
    if (process.env.NODE_ENV == "production") {
        config({ path: join(__dirname, "..", ".env.production") });
    } else {
        config({ path: join(__dirname, "..", ".env") });
    }
} catch (e) {
    console.log("Unable to load .env* file, using host's env instead");
}

export default {
    NODE_ENV: process.env.NODE_ENV,
    LINE_NOTIFY_URL: process.env.LINE_NOTIFY_URL,
    LINE_NOTIFY_TOKEN: process.env.LINE_NOTIFY_TOKEN,
    DOMAIN_SOCKET_FONT_END: process.env.DOMAIN_SOCKET_FONT_END,
    SOCKET_TOPIC_SERVER: process.env.SOCKET_TOPIC_SERVER,
    SOCKET_TOPIC_CLIENT: process.env.SOCKET_TOPIC_CLIENT,
    PORT: parseInt(`${process.env.PORT}`) || 7733,
    BASE_PATH: process.env.BASE_PATH || "",
    HOST: process.env.HOST || "localhost",
    NODE_PORT: process.env.NODE_PORT,
    PWD: process.env.PWD || process.cwd(),
    DOMAIN_IMG: process.env.DOMAIN_IMG,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    WHATSAPP_GROUP_ID: process.env.WHATSAPP_GROUP_ID,
    DB_PORT: parseInt(`${process.env.DB_PORT}`) || 3306,
    DB_SCHEMA: process.env.DB_SCHEMA,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    PASSWORD_KEY: process.env.PASSWORD_KEY,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    PUBLIC_KEY: process.env.PUBLIC_KEY,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    NODE_CRON_TAB_TIME: process.env.NODE_CRON_TAB_TIME || '* * * * *',
    MAIL_HOST: `${process.env.MAIL_HOST}`,
    MAIL_PORT: parseInt(`${process.env.MAIL_PORT}`),
    AUTH_USER: `${process.env.AUTH_USER}`,
    AUTH_PASS: `${process.env.AUTH_PASS}`
};
