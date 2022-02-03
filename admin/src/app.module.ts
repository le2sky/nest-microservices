import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'admin-db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'admin',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
