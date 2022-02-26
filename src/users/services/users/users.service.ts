import { Injectable } from '@nestjs/common';
import { SerializedUser, User } from 'src/users/types/User';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      username: 'Bryan',
      password: 'Bryan',
    },
    {
      username: 'Clark',
      password: 'Clark',
    },
    {
      username: 'Flash',
      password: 'Flash',
    },
    {
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
}
