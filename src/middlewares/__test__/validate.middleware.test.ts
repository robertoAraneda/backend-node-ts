/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateUserDto } from '../../dtos/create-user.dto';
import { NextFunction, Request, Response } from 'express';
import validateParamsMiddleware from '../validate.middleware';

describe('Validate params middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {
      body: {
        name: 'Roberto',
        email: 'email@gmail.com',
      },
    };
    mockResponse = {
      status: jest.fn(),
      json: jest.fn((value) => value),
    };
  });
  test('Should return Unprocessable Entity error if missing params', async () => {
    const expectedJsonResponse: object = {
      message: '"password" is required',
    };
    const expectedStatusResponse = 422;
    validateParamsMiddleware(CreateUserDto)(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith(expectedJsonResponse);
    expect(mockResponse.status).toBeCalledWith(expectedStatusResponse);
  });

  test('Should continue if all parameters are ok', async () => {
    mockRequest = {
      headers: {
        authorization: 'Bearer abc',
      },
    };
    validateParamsMiddleware(CreateUserDto)(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toBeCalledTimes(1);
  });
});
