import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UsersService);
    findAll(): Promise<import("./entities/user.entity").User[]>;
}
