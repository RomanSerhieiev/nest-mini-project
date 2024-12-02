import { Test } from '@nestjs/testing';

import { UserRepository } from '../../repository/services/user.repository';
import { UserMock } from '../mocks/user.mock';
import { userProvidersMock } from '../mocks/user.module.mock';
import { UserService } from './user.service';

describe(UserService.name, () => {
  const userEntity = UserMock.entity();
  const userUpdateReqDto = UserMock.updateReqDto();
  const userResDto = UserMock.resDto();
  const userData = UserMock.data();
  const userAfterUpdate = UserMock.entity(userUpdateReqDto);

  let service: UserService;

  let userRepository: UserRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [...userProvidersMock, UserService],
    }).compile();
    service = module.get<UserService>(UserService);

    userRepository = module.get<UserRepository>(UserRepository);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMe', () => {
    it('should return user', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(userEntity);

      const result = await service.findMe(userData.userId);

      expect(userRepository.findOneBy).toHaveBeenNthCalledWith(1, {
        id: userData.userId,
      });
      expect(result).toEqual(userResDto);
      expect(result.email).toBe(userResDto.email);
    });
  });

  describe('updateMe', () => {
    it('should return updated user', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(userEntity);
      jest.spyOn(userRepository, 'merge').mockImplementation(() => userAfterUpdate);
      jest.spyOn(userRepository, 'save').mockResolvedValue(userAfterUpdate);

      const result = await service.updateMe(userData.userId, userUpdateReqDto);

      expect(userRepository.findOneBy).toHaveBeenNthCalledWith(1, { id: userData.userId });
      expect(userRepository.merge).toHaveBeenCalledWith(userEntity, userUpdateReqDto);
      expect(userRepository.save).toHaveBeenCalledWith(userAfterUpdate);
      expect(result).toEqual(userResDto);
      expect(result.name).toBe(userResDto.name);
    });
  });
});
