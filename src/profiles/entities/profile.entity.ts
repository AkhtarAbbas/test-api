import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
// import { Role } from '../enums/role.enum';
import { User } from '../../users/entities/user.entity';

@Entity()
@Unique(['id'])
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  // @Column({
  //   type: 'enum',
  //   enum: Role,
  //   default: Role.standard,
  // })
  users: User[];
}
