import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';

export class BoardBaseDTO {
  @IsString({ message: '제목은 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '제목을 입력해야 합니다.' })
  @MaxLength(100)
  title: string;

  @IsString({ message: '내용은 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '내용을 입력해야 합니다.' })
  content: string;

  @IsNumber(
    {},
    { message: '게시글 번호는 유효한 숫자여야 합니다. auto increment' },
  )
  @IsNotEmpty({ message: '게시글 번호를 입력해야 합니다.' })
  board_num: number;
}

export class CreateBoardDTO extends BoardBaseDTO {
  @IsString({ message: '내용은 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '현재는 내용을 입력해야 합니다.' })
  create_by: string;
}

export class UpdateBoardDTO extends BoardBaseDTO {
  @IsString({ message: '내용은 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '현재는 내용을 입력해야 합니다.' })
  modify_by: string;
}
