import { User } from '@prisma/client';
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import { NextFunction, Request, Response } from 'express';
import UserController from '../user.controller';

describe('Users controllers', () => {
  const userController: UserController = new UserController();

  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn(),
      json: jest.fn((value) => value),
    };
  });

  test('Should return list of users', async () => {
    const users = [
      {
        id: 1,
        name: 'Roberto',
        email: 'robaraneda@gmail.com',
        password: 'password',
      },
    ];

    const expectedJsonResponse: object = {
      message: 'findAll',
      data: users,
    };

    jest.spyOn(userController.userService, 'findAllUser').mockImplementation(async () => users);
    await userController.getUsers(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.json).toBeCalledWith(expectedJsonResponse);
  });

  test('Should return a exception get users', async () => {
    const errorFunction = () => {
      throw new Error();
    };

    jest.spyOn(userController.userService, 'findAllUser').mockImplementation(errorFunction);

    await userController.getUsers(mockRequest as Request, mockResponse as Response);

    expect(errorFunction).toThrow(Error);
  });

  test('Should create create a user', async () => {
    mockRequest = {
      body: {
        name: 'Roberto',
        email: 'email@gmail.com',
        password: 'password',
      },
    };
    const user = {
      name: 'Roberto',
      email: 'robaraneda@gmail.com',
      password: 'password',
    };

    const expectedJsonResponse: object = {
      message: 'createUser',
      data: user,
    };

    jest.spyOn(userController.userService, 'createUser').mockImplementation(async () => user as User);
    await userController.createUser(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.json).toBeCalledWith(expectedJsonResponse);
  });

  test('Should return a exception if email exist', async () => {
    const errorFunction = () => {
      const error: Partial<PrismaClientKnownRequestError> = {
        code: 'P2002',
      };

      throw error;
    };

    jest.spyOn(userController.userService, 'createUser').mockImplementation(errorFunction);
    await userController.createUser(mockRequest as Request, mockResponse as Response);

    const expectedJsonResponse: object = {
      message: 'There is a unique constraint violation, a new user cannot be created with this email',
    };
    expect(mockResponse.json).toBeCalledWith(expectedJsonResponse);
  });

  test('Should return a exception', async () => {
    const errorFunction = () => {
      throw new Error();
    };

    jest.spyOn(userController.userService, 'createUser').mockImplementation(errorFunction);

    await userController.createUser(mockRequest as Request, mockResponse as Response);

    expect(errorFunction).toThrow(Error);
  });
});
