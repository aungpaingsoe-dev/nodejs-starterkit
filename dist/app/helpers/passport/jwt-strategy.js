"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = __importDefault(require("../../../prisma/client"));
dotenv_1.default.config();
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};
passport_1.default.use(new passport_jwt_1.Strategy(opts, async (payload, done) => {
    try {
        const user = await client_1.default.user.findUnique({ where: { id: payload.id } });
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
}));
