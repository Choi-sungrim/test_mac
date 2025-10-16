import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('user')
@ApiTags('User_CRUD_Service')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    description: 'The data required to create a new user.',
    examples: {
      a: {
        summary: 'Example User Creation',
        value: {
          name: 'string',
          password: 'string',
          roleNumber: 'number',
          class: 'number',
          gender: 'string',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (e.g., validation failed)',
  })
  create(@Body() createUserDto: User): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a new user' })
  @ApiBody({
    description: 'The data required id to update a user.',
    examples: {
      a: {
        summary: 'Example User Creation',
        value: {
          name: 'string',
          password: 'string',
          roleNumber: 'number',
          class: 'number',
          gender: 'string',
        },
      },
    },
  })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the user to update',
    type: String,
    example: '60c72b49c0c9b40015b6d573',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully update',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (e.g., validation failed)',
  })
  update(@Param('id') id: string, @Body() updateUserDto: User): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete a new user' })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the user to delete',
    type: String,
    example: '60c72b49c0c9b40015b6d573',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully delete',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (e.g., validation failed)',
  })
  delete(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }

  @Get()
  @ApiOperation({ summary: 'find All user' })
  @ApiResponse({
    status: 201,
    description: 'User findAll successfully',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (e.g., validation failed)',
  })
  findAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}
