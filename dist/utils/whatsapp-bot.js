"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.whatsappBotVerifySender = exports.whatsappBotSender = exports.whatsappBot = void 0;
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const whatsapp_web_js_1 = require("whatsapp-web.js");
const services_1 = require("../APIs/book/services");
const environment_1 = __importDefault(require("../environment"));
const line_notice_1 = require("./line-notice");
const node_cron_1 = __importDefault(require("node-cron"));
const dayjs_1 = __importDefault(require("dayjs"));
const client = new whatsapp_web_js_1.Client({
    puppeteer: {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ],
        // @ts-ignore
        authStrategy: new whatsapp_web_js_1.LocalAuth(),
    }
});
client.on('qr', qr => {
    qrcode_terminal_1.default.generate(qr, { small: true });
    const message = `ກະລຸນາເຂົ້າສູ່ລະບົບ WhatsApp`;
    (0, line_notice_1.lineNotify)(message);
});
client.on('ready', () => {
    console.log('WhatsApp Client Ready');
});
client.on('message', (message) => {
    console.log(message);
});
const whatsappBot = async () => {
    node_cron_1.default.schedule('0 2 * * *', async () => {
        const result = await (0, services_1.getBookNotApproveService)();
        const chatId = '8562091116465@c.us';
        const groupId = environment_1.default.WHATSAPP_GROUP_ID || chatId;
        client.sendMessage(groupId, result);
    });
};
exports.whatsappBot = whatsappBot;
const whatsappBotSender = async (messages) => {
    console.log("Client ready! to send message alerts new book");
    const chatId = '8562091116465@c.us';
    const groupId = environment_1.default.WHATSAPP_GROUP_ID || chatId;
    return client.sendMessage(chatId, messages);
};
exports.whatsappBotSender = whatsappBotSender;
const whatsappBotVerifySender = async (whatsapp, code) => {
    const date = (0, dayjs_1.default)().format("MMMM DD, HH:mm");
    const message = "ມົນພິທີ: " + code + ". Validate: " + date + "\nLink: www.monpity.com";
    const chatId = whatsapp.slice(-13) + "@c.us";
    console.log("message ", message);
    console.log("chatId ", chatId);
    return client.sendMessage(chatId, message);
};
exports.whatsappBotVerifySender = whatsappBotVerifySender;
client.initialize();
