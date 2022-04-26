import {
  Controller,
  Get,
  Post,
  Inject,
  Param,
  HttpException,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
  UseFilters,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { SerializedUser } from '../../../users/types/User';
import { UsersService } from './../../services/users/users.service';
import { UserNotFoundException } from './../../exceptions/UserNotFound.exception';
import { HttpExceptionFilter } from './../../filters/HttpException.filter';
import { CreateUserDto } from './../../dtos/CreateUser.dto';
import { AuthenticateGuard } from '../../../auth/utils/LocalGuard';

@Controller('users')
export class UsersController {
  constructor(@Inject('USER_SERVICE') private readonly usersService: UsersService) {}

  @UseGuards(AuthenticateGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  getUsers() {
    return this.usersService.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/username/:username')
  getUserByUsername(@Param('username') username: string) {
    const user = this.usersService.getUserByUsername(username);
    if (user) return new SerializedUser(user);
    else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(HttpExceptionFilter)
  @Get('/id/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.usersService.getUserById(id);
    if (user) return new SerializedUser(user);
    else throw new UserNotFoundException();
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
