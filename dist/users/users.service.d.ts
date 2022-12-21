import { Repository } from 'typeorm';
import { UsersDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: UsersDTO): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findbyEmail(email: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<void>;
}
