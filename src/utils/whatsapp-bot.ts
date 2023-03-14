import qrCode from 'qrcode-terminal'
import { Client, LocalAuth } from 'whatsapp-web.js'
import { getBookNotApproveService } from '../APIs/book/services';
import environment from './environment';
import { lineNotify } from './line-notice';
import nodeCron from 'node-cron'
import dayjs from 'dayjs';

const client = new Client({
    puppeteer: {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ],
        // @ts-ignore
        authStrategy: new LocalAuth(),
    }
});

client.on('qr', qr => {
    qrCode.generate(qr, { small: true });
    const message = `ກະລຸນາເຂົ້າສູ່ລະບົບ WhatsApp`
    lineNotify(message)
});

client.on('ready', () => {
    console.log('WhatsApp Client Ready')
});

client.on('message', (message) => {
    console.log(message)
});

export const whatsappBot = async () => {

    nodeCron.schedule('0 2 * * *', async () => {
        const result = await getBookNotApproveService()
        const chatId = '8562091116465@c.us'
        const groupId = environment.WHATSAPP_GROUP_ID || chatId
        client.sendMessage(groupId, result)
    });
}

export const whatsappBotSender = async (messages: string) => {
    console.log("Client ready! to send message alerts new book");
    const chatId = '8562091116465@c.us'
    const groupId = environment.WHATSAPP_GROUP_ID || chatId
    return client.sendMessage(chatId, messages)
}

export const whatsappBotVerifySender = async (whatsapp: string, code: number) => {
    const date = dayjs().format("MMMM DD, HH:mm")
    const message = "ມົນພິທີ: " + code + ". Validate: " + date + "\nLink: www.monpity.com"
    const chatId = whatsapp.slice(-13) + "@c.us"
    console.log("message ", message)
    console.log("chatId ", chatId)
    return client.sendMessage(chatId, message)
}

client.initialize();

