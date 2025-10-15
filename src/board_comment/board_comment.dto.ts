import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class BoardCommentBaseDTO {
  @IsString({ message: '내용은 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '내용을 입력해야 합니다.' })
  comment: string;

  @IsNumber({}, { message: '게시글 번호는 유효한 숫자여야 합니다. increment' })
  @IsNotEmpty({ message: '게시글 번호를 입력해야 합니다.' })
  board_num: number;
}

export class CreateBoardCommentDTO extends BoardCommentBaseDTO {
  @IsString({ message: '내용은 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '현재는 내용을 입력해야 합니다.' })
  create_by: string;
}

export class UpdateBoardCommentDTO extends BoardCommentBaseDTO {
  @IsString({ message: '내용은 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '현재는 내용을 입력해야 합니다.' })
  modify_by: string;
}
