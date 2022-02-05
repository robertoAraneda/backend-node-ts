import UserService from '../user.service';

import { prismaMock } from '../../config/singleton';

describe('listFilesInDirectorySync', () => {
  const userService: UserService = new UserService();

  test('should create new user  ', async () => {
    const user = {
      id: 1,
      name: 'Rich',
      email: 'hi@gmai.io',
      password: 'password',
    };

    prismaMock.user.create.mockResolvedValue(user);

    await expect(userService.createUser(user)).resolves.toEqual({
      id: 1,
      name: 'Rich',
      email: 'hi@gmai.io',
      password: 'password',
    });
  });

  test('should get all users ', async () => {
    const user = [
      {
        id: 1,
        name: 'Rich',
        email: 'hello@prisma.io',
        password: 'dqsda',
      },
    ];

    prismaMock.user.findMany.mockResolvedValue(user);

    await expect(userService.findAllUser()).resolves.toEqual([
      {
        id: 1,
        name: 'Rich',
        email: 'hello@prisma.io',
        password: 'dqsda',
      },
    ]);
  });
});
