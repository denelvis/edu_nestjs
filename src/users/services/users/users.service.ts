import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SerializedUser, User } from '../../types/User';
import { CreateUserDto } from './../../dtos/CreateUser.dto';
import { User as UserEntity } from './../../../typeorm/User';
import { encodePassword } from '../../../utils/bcrypt';

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

  createUser(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    const newUser = this.userRepository.create({ ...createUserDto, password });
    return this.userRepository.save(newUser);
  }

  findUserByUsername(username: string) {
    return this.userRepository.findOne({ username });
  }

  findUserById(id: number) {
    return this.userRepository.findOne({ id });
  }
}
