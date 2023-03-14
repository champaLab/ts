"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = __importDefault(require("../environment"));
const i = 'Monpity'; // Issuer (Software organization who issues the token)
const s = 'monpity@gmail.com'; // Subject (intended user of the token)
const a = 'https://monpity.la'; // Audience (Domain within which this token will live and function)
const sign = async (payload) => {
    var _a;
    const privateKEY = (_a = environment_1.default.PRIVATE_KEY) !== null && _a !== void 0 ? _a : '';
    // Token signing options
    const signOptions = {
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: "24h",
        algorithm: "RS256"
    };
    return jsonwebtoken_1.default.sign(payload, privateKEY, signOptions);
};
exports.sign = sign;
const verify = async (req, res, next) => {
    var _a;
    let token = req.headers['Authorization'];
    if (req.headers.authorization) {
        token = `${req.headers.authorization}`.replace('Bearer ', '');
    }
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    const verifyOptions = {
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: "24h",
        algorithm: ["RS256"]
    };
    const publicKEY = (_a = environment_1.default.PUBLIC_KEY) !== null && _a !== void 0 ? _a : '';
    ;
    jsonwebtoken_1.default.verify(token, publicKEY, verifyOptions, function (err, decoded) {
        if (err) {
            console.error(err);
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        // if everything good, save to request for use in other routes
        if (decoded) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            req.body.user = decoded;
            console.log("verify token: ", decoded);
        }
        next();
    });
};
exports.verify = verify;
