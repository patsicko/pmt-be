
import { Provider } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

export const AdminSeederProvider: Provider = {
  provide: 'SEED_ADMIN',
  useFactory: async (userService: UserService) => {
    const adminUser = await userService.findByEmail('admin@gmail.com');

    if (!adminUser) {
      
      const adminUserDto = {
        firstName: 'Admin',
        lastName: 'Admin',
        phone:'+2507',
        email: 'admin@gmail.com',
        role:'admin',
        password: '123',

      };

      const user = new User();
      user.firstName = adminUserDto.firstName;
      user.lastName = adminUserDto.lastName;
      user.phone=adminUserDto.phone;
      user.email = adminUserDto.email;
      user.role=adminUserDto.role;

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(adminUserDto.password, saltRounds);
      user.password = hashedPassword;

      await userService.createUser(user);
    }
  },
  inject: [UserService],
};
