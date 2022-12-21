import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private userRepository;
    private mailerService;
    private code;
    constructor(userRepository: Repository<User>, mailerService: MailerService);
    sendConfirmedEmail(user: User): Promise<void>;
    sendConfirmationEmail(user: any): Promise<(user: any) => Promise<any>>;
}
