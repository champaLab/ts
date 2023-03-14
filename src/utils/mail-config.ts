import env from '../environment'

const mail_config = {
    host: env.MAIL_HOST,
    port: env.MAIL_PORT,
    secure: true,
    auth: {
        user: env.AUTH_USER,
        pass: env.AUTH_PASS
    }
}

export default mail_config