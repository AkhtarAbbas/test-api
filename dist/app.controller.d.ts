import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
export declare class AppController {
    private readonly appService;
    private authService;
    constructor(appService: AppService, authService: AuthService);
    getHello(): string;
    healthCheck(): string;
    getEcho(req: any, res: any, body: any): void;
    getPremiumEcho(req: any, res: any, body: any): void;
}
