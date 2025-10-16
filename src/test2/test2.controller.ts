import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { Test2Service } from './test2.service';
import { Test2 } from './test2.schema';

@Controller('test2')
export class Test2Controller {
  constructor(private readonly test2Service: Test2Service) {}

  @Post()
  create(@Body() createTest2Dto: Test2): Promise<Test2> {
    return this.test2Service.createTest2(createTest2Dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Test2> {
    return this.test2Service.deleteTest2(id);
  }

  @Get()
  findAll(): Promise<Test2[]> {
    return this.test2Service.getAllTest2();
  }
}
