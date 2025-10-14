import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './board.schema';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('board')
@ApiTags('Board_CRUD_Service')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Put()
  @ApiOperation({ summary: 'Create a new Board' })
  @ApiBody({
    description: 'The data required id to create a Board.',
    examples: {
      a: {
        summary: 'Example Board Creation',
        value: {
          boardNum: 'number',
          content: 'string',
          title: 'string',
          create_by: 'string',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Board successfully created',
    type: Board,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (e.g., validation failed)',
  })
  create(@Body() createBoardDto: Board): Promise<Board> {
    return this.boardService.createBoard(
      createBoardDto,
      createBoardDto.create_by,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a new Board' })
  @ApiBody({
    description: 'The data required id to update a Board.',
    examples: {
      a: {
        summary: 'Example Board Creation',
        value: {
          boardNum: 'number',
          content: 'string',
          title: 'string',
          modify_by: 'string',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Board successfully update',
    type: Board,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (e.g., validation failed)',
  })
  update(
    @Param('id') id: string,
    @Body() updateBoardDto: Board,
  ): Promise<Board> {
    return this.boardService.updateBoard(
      id,
      updateBoardDto,
      updateBoardDto.modify_by as string,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete a Board' })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the Board to delete',
    type: String,
    example: '60c72b49c0c9b40015b6d573',
  })
  @ApiResponse({
    status: 201,
    description: 'Board successfully Delete',
    type: Board,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (e.g., validation failed)',
  })
  delete(@Param('id') id: string): Promise<Board> {
    return this.boardService.deleteBoard(id);
  }

  @Get()
  @ApiOperation({ summary: 'find All Board' })
  @ApiResponse({
    status: 201,
    description: 'Board Find successfully ',
    type: Board,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (e.g., validation failed)',
  })
  findAll(): Promise<Board[]> {
    return this.boardService.getAllBoards();
  }
}
