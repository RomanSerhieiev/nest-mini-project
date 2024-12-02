import { Test } from '@nestjs/testing';

import { UserMock } from './mocks/user.mock';
import { userProvidersMock } from './mocks/user.module.mock';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

describe(UserController.name, () => {
  const userResDto = UserMock.resDto();
  const userData = UserMock.data();
  const userUpdateReqDto = UserMock.updateReqDto();
  const userAvatar = UserMock.avatar();

  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [...userProvidersMock],
    }).compile();
    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findMe', () => {
    it('should return user', async () => {
      jest.spyOn(userService, 'findMe').mockResolvedValue(userResDto);

      const result = await controller.findMe(userData);

      expect(userService.findMe).toHaveBeenCalledWith(userData.userId);
      expect(result).toEqual(userResDto);
    });
  });

  describe('updateMe', () => {
    it('should update and return updated user data', async () => {
      jest.spyOn(userService, 'updateMe').mockResolvedValue(userResDto);

      const result = await controller.updateMe(userData, userUpdateReqDto);

      expect(userService.updateMe).toHaveBeenCalledWith(userData.userId, userUpdateReqDto);
      expect(result).toEqual(userResDto);
    });
  });

  describe('removeMe', () => {
    it('should call removeMe in the service', async () => {
      const spy = jest.spyOn(userService, 'removeMe').mockResolvedValue(undefined);

      await controller.removeMe(userData);

      expect(spy).toHaveBeenCalledWith(userData.userId);
    });
  });

  describe('findOne', () => {
    it('should return user data by ID', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(userResDto);

      const result = await controller.findOne(userData.userId);

      expect(userService.findOne).toHaveBeenCalledWith(userData.userId);
      expect(result).toEqual(userResDto);
    });
  });

  describe('uploadAvatar', () => {
    it('should call uploadAvatar in the service', async () => {
      const spy = jest.spyOn(userService, 'uploadAvatar').mockResolvedValue(undefined);

      await controller.uploadAvatar(userData, userAvatar);

      expect(spy).toHaveBeenCalledWith(userData.userId, userAvatar);
    });
  });

  describe('deleteAvatar', () => {
    it('should call deleteAvatar in the service', async () => {
      const spy = jest.spyOn(userService, 'deleteAvatar').mockResolvedValue(undefined);

      await controller.deleteAvatar(userData);

      expect(spy).toHaveBeenCalledWith(userData.userId);
    });
  });
});
