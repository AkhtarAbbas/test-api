import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  private code;

  constructor(@InjectRepository(User) private userRepository: Repository<User>, private mailerService: MailerService) {
    this.code = Math.floor(10000 + Math.random() * 90000);
  }

  async sendConfirmedEmail(user: User) {
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

  async sendConfirmationEmail(user: any) {
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
}
