import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { BoardCommentModule } from './board_comment/board_comment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test2Module } from './test2/test2.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('MONGODB_DBNAME'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      connectionName: 'test_mac_2',
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('TEST_DBNAME'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    BoardModule,
    BoardCommentModule,
    Test2Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
