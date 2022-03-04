import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SerializedUser, User } from 'src/users/types/User';
import { CreateUserDTO } from './../../dtos/CreateUser.dto';
import { User as UserEntity } from './../../../typeorm/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  private users: User[] = [
    {
      id: 1,
      username: 'Bryan',
      password: 'Bryan',
    },
    {
      id: 2,
      username: 'Clark',
      password: 'Clark',
    },
    {
      id: 3,
      username: 'Flash',
      password: 'Flash',
    },
    {
      id: 4,
      username: 'Zoe',
      password: 'Zoe',
    },
  ];

  getUsers() {
    return this.users.map((user) => new SerializedUser(user));
  }
  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(createUserDto: CreateUserDTO) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }
}
