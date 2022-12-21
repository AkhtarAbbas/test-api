import { UsersDTO } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<UsersDTO>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    country: string;
    province: string;
    city: string;
    postalCode: number;
    isActive: boolean;
}
export {};
