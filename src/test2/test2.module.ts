import { Module } from '@nestjs/common';
import { Test2Controller } from './test2.controller';
import { Test2Service } from './test2.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Test2, Test2Schema } from './test2.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Test2.name,
          schema: Test2Schema,
        },
      ],
      'test_mac_2',
    ),
  ],
  controllers: [Test2Controller],
  providers: [Test2Service],
})
export class Test2Module {}
