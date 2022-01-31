import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { TokenService } from './token.service';
import { User } from './user';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserToken } from './userToken';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserToken]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, TokenService],
})
export class UserModule {}
