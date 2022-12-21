import { Role } from '../enums/role.enum';
export declare class UsersDTO {
    email: string;
    firstName?: string;
    lastName?: string;
    password: string;
    country: string;
    province: string;
    city: string;
    postalCode: number;
    isActive: boolean;
    authConfirmToken: number;
    roles: Role[];
}
