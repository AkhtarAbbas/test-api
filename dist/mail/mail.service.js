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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mailer_1 = require("@nestjs-modules/mailer");
let MailService = class MailService {
    constructor(userRepository, mailerService) {
        this.userRepository = userRepository;
        this.mailerService = mailerService;
        this.code = Math.floor(10000 + Math.random() * 90000);
    }
    async sendConfirmedEmail(user) {
        const { email, firstName, lastName } = user;
        await this.mailerService.sendMail({
            to: email,
            subject: 'Welcome to Pet App! Email Confirmed',
            template: 'confirmed',
            context: {
                fullname: firstName + lastName,
                email,
            },
        });
    }
    async sendConfirmationEmail(user) {
        const { email, fullname } = await user;
        await this.mailerService.sendMail({
            to: email,
            subject: 'Welcome to Pet App! Confirm Email',
            template: 'confirm',
            context: {
                fullname,
                code: this.code,
            },
        });
        return this.sendConfirmationEmail;
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository, mailer_1.MailerService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map