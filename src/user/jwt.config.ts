// // jwt.config.ts
// import { JwtModuleOptions } from '@nestjs/jwt';

// export const jwtConfig: JwtModuleOptions = {
//   secret: process.env.JWT_SECRET, 
//   signOptions: {
//     expiresIn: '1h', 
//   },
// };


import { JwtModule } from '@nestjs/jwt';

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your_default_secret',
  signOptions: { expiresIn: '1h' },
};