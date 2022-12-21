import { User } from '../../users/entities/user.entity';
export declare class Profile {
    id: number;
    name: string;
    email: string;
    password: string;
    isActive: boolean;
    users: User[];
}
