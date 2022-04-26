import { Inject, Injectable } from '@nestjs/common';
import { comparePasswords } from '../../../utils/bcrypt';
import { UsersService } from './../../../users/services/users/users.service';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private readonly userService: UsersService) {}
  async validateUser(username: string, password: string) {
    const userDB = await this.userService.findUserByUsername(username);
    if (userDB) {
      const matched = comparePasswords(password, userDB.password);
      if (matched) {
        return userDB;
      } else {
        return null;
      }
    }
    return null;
  }
}
