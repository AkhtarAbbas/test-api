import { Role } from '../enums/role.enum';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    country: string;
    province: string;
    city: string;
    postalCode: number;
    isActive: boolean;
    roles: Role[];
}
