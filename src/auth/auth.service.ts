import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersDTO } from 'src/users/dto/create-user.dto';
import { validate } from 'class-validator';
import { LoggerService } from 'src/logger/logger.service';
import { UsersService } from 'src/users/users.service';
// import { MailService } from 'src/mail/mail.service';
// import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  code: any;
  constructor(
    private readonly logger: LoggerService = new Logger(AuthService.name),
    // private sendConfirmationEmail: MailService,
    private jwtService: JwtService,
    private userservice: UsersService,
  ) {}

  async login(user: any): Promise<Record<string, any>> {
    // Validation Flag
    let isOk = false;

    // Transform body into DTO
    const userDTO = new UsersDTO();
    userDTO.email = user.email;
    userDTO.password = user.password;

    // TODO: Refactor this section with try catch block and return error message in the catch block
    // Validate DTO against validate function from class-validator
    await validate(userDTO).then((errors) => {
      if (errors.length > 0) {
        this.logger.debug(`${errors}`);
      } else {
        isOk = true;
      }
    });

    if (isOk) {
      // Get user information
      const userDetails = await this.userservice.findbyEmail(user.email);

      // Check if user exists
      if (userDetails == null) {
        return { status: 401, msg: { msg: 'Invalid credentials' } };
      }

      // Check if the given password match with saved password
      const isValid = bcrypt.compareSync(user.password, userDetails.password);
      if (isValid) {
        // Generate JWT token
        return {
          status: 200,
          msg: {
            email: user.email,
            access_token: this.jwtService.sign({ email: user.email }),
          },
        };
      } else {
        // Password or email does not match
        return { status: 401, msg: { msg: 'Invalid credentials' } };
      }
    } else {
      return { status: 400, msg: { msg: 'Invalid fields.' } };
    }
  }

  // async signup(user: User): Promise<any> {
  //   try {
  //     const salt = await bcrypt.genSalt();
  //     const hash = await bcrypt.hash(user.password, salt);
  //     const reqBody = {
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //       email: user.email,
  //       password: hash,
  //       // authConfirmToken: this.code,
  //     }
  //     const newUser = this.userservice.create(reqBody);
  //     await this.sendConfirmationEmail;
  //     return true;
  //   } catch (e) {
  //     return new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  async register(body: any): Promise<Record<string, any>> {
    // Validation Flag
    let isOk = false;

    // Transform body into DTO
    // const authConfirmToken = '';
    const userDTO = new UsersDTO();
    userDTO.email = body.email;
    userDTO.firstName = body.firstName;
    userDTO.lastName = body.lastName;
    userDTO.password = bcrypt.hashSync(body.password, 10);
    userDTO.authConfirmToken = this.code;

    // Validate DTO against validate function from class-validator
    await validate(userDTO).then((errors) => {
      if (errors.length > 0) {
        this.logger.debug(`${errors}`);
      } else {
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
      } else {
        return { status: 400, content: { msg: 'User already exists' } };
      }
    } else {
      return { status: 400, content: { msg: 'Invalid content' } };
    }
  }
}
