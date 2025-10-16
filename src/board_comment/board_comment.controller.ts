import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { BoardCommentService } from './board_comment.service';
import { BoardComment } from './board_comment.schema';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  BoardCommentBaseDTO,
  CreateBoardCommentDTO,
  UpdateBoardCommentDTO,
} from './board_comment.dto';

@Controller('board_comment')
@ApiTags('Board_Comment_CRUD_Service')
export class BoardCommentController {
  constructor(private readonly boardCommentService: BoardCommentService) {}

  @Post()
  @ApiOperation({ summary: 'create a new BoardComment' })
  @ApiBody({
    description: 'The data required id to create a BoardComment.',
    examples: {
      a: {
        summary: 'Example BoardComment Creation',
        value: {
          comment: 'string',
          board_num: 'number',
          create_by: 'string',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'BoardComment successfully created',
    type: CreateBoardCommentDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (e.g., validation failed)',
  })
  //request.id 대신 입력 유저 Id
  //고유하게 사용할 board_num정보를 입력받기에 기존 PUT으로 사용. -> 생성 목적에 맞는 POST로 교체.
  //새로운 리소스 추가형식으로 개선.
  create(
    @Body() createBoardCommentDto: CreateBoardCommentDTO,
  ): Promise<CreateBoardCommentDTO> {
    return this.boardCommentService.createBoardComments(
      createBoardCommentDto,
      createBoardCommentDto.create_by,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a new BoardComment' })
  @ApiBody({
    description: 'The data required id to update a BoardComment.',
    examples: {
      a: {
        summary: 'Example BoardComment Creation',
        value: {
          comment: 'string',
          boardNum: 'number',
          modify_by: 'string',
        },
      },
    },
  })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the BoardComment to update',
    type: String,
    example: '60c72b49c0c9b40015b6d573',
  })
  @ApiResponse({
    status: 201,
    description: 'BoardComment successfully update',
    type: UpdateBoardCommentDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (e.g., validation failed)',
  })
  update(
    @Param('id') id: string,
    @Body() updateBoardCommentDto: UpdateBoardCommentDTO,
  ): Promise<UpdateBoardCommentDTO> {
    return this.boardCommentService.updateBoardComments(
      id,
      updateBoardCommentDto,
      updateBoardCommentDto.modify_by,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete a BoardComment' })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the BoardComment to delete',
    type: String,
    example: '60c72b49c0c9b40015b6d573',
  })
  @ApiResponse({
    status: 201,
    description: 'BoardComment successfully delete',
    type: BoardComment,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (e.g., validation failed)',
  })
  delete(@Param('id') id: string): Promise<BoardComment> {
    return this.boardCommentService.deleteBoardComments(id);
  }

  @Get()
  @ApiOperation({ summary: 'find All BoardComment' })
  @ApiResponse({
    status: 201,
    description: 'BoardComment find successfully',
    type: BoardCommentBaseDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (e.g., validation failed)',
  })
  findAll(): Promise<BoardCommentBaseDTO[]> {
    return this.boardCommentService.getAllBoardComments();
  }

  @Get(':boardNum')
  @ApiOperation({ summary: 'find BoardComment by BoardNum' })
  @ApiResponse({
    status: 201,
    description: 'BoardComment find by BoardNum successfully',
    type: BoardCommentBaseDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (e.g., validation failed)',
  })
  //보드 조회시 해당 함수를 같이 요청하여 해당 boardnumber에 해당하는 댓글들을 확인.
  findcommentByBoard(
    @Param('boardnum') boardNum: number,
  ): Promise<BoardCommentBaseDTO[]> {
    return this.boardCommentService.getBoardComments(boardNum);
  }
}
