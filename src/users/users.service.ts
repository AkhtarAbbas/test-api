import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  create(createUserDto: UsersDTO): Promise<User> {
    const user = new User();

    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.country = createUserDto.country;
    user.province = createUserDto.province;
    user.city = createUserDto.city;
    user.postalCode = createUserDto.postalCode;
    user.roles = createUserDto.roles;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      id,
    });
  }

  findbyEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      email,
    });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return this.usersRepository.save(
  //     this.usersRepository.create({
  //       id,
  //       ...updateUserDto,
  //     }),
  //   );
  // }

  // @Mutation(() => User)
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  // remove(id: number) {
  //   return this.usersRepository.remove(id);
  //   // return `This action removes a #${id} task`;
  // }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
