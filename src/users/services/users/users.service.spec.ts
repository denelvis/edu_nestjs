import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcryptUtils from '../../../utils/bcrypt';
import { UsersService } from './users.service';
import { User } from '../../../typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userRepository shoild be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('createUser', () => {
    it('should encode password correctly', async () => {
      jest.spyOn(bcryptUtils, 'encodePassword').mockReturnValue('hashed123');
      await service.createUser({
        username: 'alex',
        email: 'alex@example.com',
        password: '123',
      });
      expect(bcryptUtils.encodePassword).toHaveBeenCalledWith('123');
    });
    it('should be userRepository.create with correct params', async () => {
      await service.createUser({
        username: 'alex',
        email: 'alex@example.com',
        password: '123',
      });
      expect(userRepository.create).toHaveBeenCalledWith({
        username: 'alex',
        email: 'alex@example.com',
        password: 'hashed123',
      });
      expect(userRepository.create);
    });
    it('should be userRepository.save with correct params', async () => {
      jest.spyOn(userRepository, 'create').mockReturnValueOnce({
        id: 1,
        username: 'alex',
        email: 'alex@example.com',
        password: 'hashed123',
      });
      await service.createUser({
        username: 'alex',
        email: 'alex@example.com',
        password: '123',
      });
      expect(userRepository.save).toHaveBeenCalledWith({
        id: 1,
        username: 'alex',
        email: 'alex@example.com',
        password: 'hashed123',
      });
    });
  });
});
