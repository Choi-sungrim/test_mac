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
import { BoardBaseDTO } from './board.dto';

@Controller('board')
@ApiTags('Board_CRUD_Service')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Put()
  @ApiOperation({ summary: 'create a new Board' })
  @ApiBody({
    description: 'The data required id to create a Board',
    examples: {
      a: {
        summary: 'Example Board Creation',
        value: {
          title: 'string',
          content: 'string',
          board_num: 'number',
          userId: 'string',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: '게시글이 성공적으로 생성됨',
    type: Board,
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 (유효성 검사 실패 등)',
  })
  //request.id 대신 입력 유저 Id
  create(@Body() createBoardDto: BoardBaseDTO): Promise<Board> {
    return this.boardService.createBoard(createBoardDto, createBoardDto.userId);
  }

  @Patch(':board_num')
  @ApiOperation({ summary: 'Update a new Board' })
  @ApiBody({
    description: 'The data required id to update a Board.',
    examples: {
      a: {
        summary: 'Example Board Creation',
        value: {
          content: 'string',
          title: 'string',
          userId: 'string',
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
    @Param('boardNum') boardNum: string,
    @Body() updateBoardDto: BoardBaseDTO,
  ): Promise<Board> {
    return this.boardService.updateBoard(
      boardNum,
      updateBoardDto,
      updateBoardDto.userId,
    );
  }

  @Delete(':board_num')
  @ApiOperation({ summary: 'delete a Board' })
  @ApiParam({
    name: 'board_num',
    description: 'The unique board_num of the Board to delete',
    type: String,
    example: '0',
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
  delete(@Param('board_num') boardNum: number): Promise<Board> {
    return this.boardService.deleteBoard(boardNum);
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
