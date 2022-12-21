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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const class_validator_1 = require("class-validator");
const logger_service_1 = require("../logger/logger.service");
const users_service_1 = require("../users/users.service");
let AuthService = AuthService_1 = class AuthService {
    constructor(logger = new common_1.Logger(AuthService_1.name), jwtService, userservice) {
        this.logger = logger;
        this.jwtService = jwtService;
        this.userservice = userservice;
    }
    async login(user) {
        let isOk = false;
        const userDTO = new create_user_dto_1.UsersDTO();
        userDTO.email = user.email;
        userDTO.password = user.password;
        await (0, class_validator_1.validate)(userDTO).then((errors) => {
            if (errors.length > 0) {
                this.logger.debug(`${errors}`);
            }
            else {
                isOk = true;
            }
        });
        if (isOk) {
            const userDetails = await this.userservice.findbyEmail(user.email);
            if (userDetails == null) {
                return { status: 401, msg: { msg: 'Invalid credentials' } };
            }
            const isValid = bcrypt.compareSync(user.password, userDetails.password);
            if (isValid) {
                return {
                    status: 200,
                    msg: {
                        email: user.email,
                        access_token: this.jwtService.sign({ email: user.email }),
                    },
                };
            }
            else {
                return { status: 401, msg: { msg: 'Invalid credentials' } };
            }
        }
        else {
            return { status: 400, msg: { msg: 'Invalid fields.' } };
        }
    }
    async register(body) {
        let isOk = false;
        const userDTO = new create_user_dto_1.UsersDTO();
        userDTO.email = body.email;
        userDTO.firstName = body.firstName;
        userDTO.lastName = body.lastName;
        userDTO.password = bcrypt.hashSync(body.password, 10);
        userDTO.authConfirmToken = this.code;
        await (0, class_validator_1.validate)(userDTO).then((errors) => {
            if (errors.length > 0) {
                this.logger.debug(`${errors}`);
            }
            else {
                isOk = true;
            }
        });
        if (isOk) {
            await this.userservice.create(userDTO).catch((error) => {
                this.logger.debug(error.message);
                isOk = false;
            });
            if (isOk) {
                return { status: 201, content: { msg: 'User created with success' } };
            }
            else {
                return { status: 400, content: { msg: 'User already exists' } };
            }
        }
        else {
            return { status: 400, content: { msg: 'Invalid content' } };
        }
    }
};
AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService,
        jwt_1.JwtService,
        users_service_1.UsersService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map