import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UsersService);
    login(req: any, res: any, body: any): Promise<void>;
    register(req: any, res: any, body: any): Promise<void>;
    findAll(): Promise<import("../users/entities/user.entity").User[]>;
    findOne(id: string): Promise<import("../users/entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<void>;
}
