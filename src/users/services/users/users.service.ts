import { Injectable } from '@nestjs/common';
import { SerializedUser, User } from 'src/users/types/User';

@Injectable()
export class UsersService {
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
}
