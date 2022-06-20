"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ISessionStore_1 = __importDefault(require("./ISessionStore"));
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Session_1 = __importDefault(require("../../entities/Session"));
const AppType_1 = __importDefault(require("../../../entities/AppType"));
const Platform_1 = require("../../../entities/Platform");
const SpoonError_1 = __importDefault(require("../../../SpoonError"));
const Common_1 = require("../../../entities/Common");
let SessionStore = (() => {
    let SessionStore = class SessionStore extends ISessionStore_1.default {
        constructor(repository) {
            super();
            this.repository = repository;
        }
        async createSession(user, token, refreshToken, appType, platform) {
            const session = await this.repository.create({
                user,
                refreshToken,
                token,
                appType,
                platform,
            });
            await this.repository.insert(session);
            return session;
        }
        async getSession(session) {
            return this.repository.findOne(session.id, {
                relations: ['user'],
            });
        }
        async getSessionOrFail(sessionId) {
            const session = await this.getSession({ id: sessionId });
            if (!session)
                throw new SpoonError_1.default('Session not exists');
            return session;
        }
        async getSessionByToken(token) {
            return this.repository.findOne({ token }, {
                relations: ['user'],
            });
        }
        async getSessionByTokenOrThrow(token) {
            const session = await this.getSessionByToken(token);
            if (!session)
                throw new SpoonError_1.default('Session not found');
            return session;
        }
        async getSessionByRefreshToken(refreshToken) {
            return this.repository.findOne({ refreshToken }, {
                relations: ['user'],
            });
        }
        async updateSession(session, token, refreshToken) {
            await this.repository.update(session.id, { token, refreshToken });
            return this.getSessionOrFail(session.id);
        }
        async updateFirebaseToken(session, registrationId) {
            await this.repository.update(session.id, { firebaseRegistrationId: registrationId });
        }
        async getUserFirebaseTokens(userId, appTypes) {
            let where = {
                userId,
                firebaseRegistrationId: typeorm_2.Not(typeorm_2.IsNull()),
            };
            if (appTypes) {
                where = Object.assign(Object.assign({}, where), { appType: typeorm_2.In(appTypes) });
            }
            return (await this.repository.find({
                where,
                relations: ['user'],
                select: ['firebaseRegistrationId'],
            })).map((session) => session.firebaseRegistrationId);
        }
        async getUsersFirebaseTokens(userIds, appTypes) {
            let where = {
                userId: typeorm_2.In(userIds),
                firebaseRegistrationId: typeorm_2.Not(typeorm_2.IsNull()),
            };
            if (appTypes) {
                where = Object.assign(Object.assign({}, where), { appType: typeorm_2.In(appTypes) });
            }
            return (await this.repository.find({
                where,
                relations: ['user'],
                select: ['firebaseRegistrationId'],
            })).map((session) => session.firebaseRegistrationId);
        }
    };
    SessionStore = __decorate([
        __param(0, typeorm_1.InjectRepository(Session_1.default)),
        __metadata("design:paramtypes", [typeorm_2.Repository])
    ], SessionStore);
    return SessionStore;
})();
exports.default = SessionStore;
//# sourceMappingURL=SessionStore.js.map