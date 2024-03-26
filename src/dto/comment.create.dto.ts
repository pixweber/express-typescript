import { IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
  @IsString()
  content!: string;

  @IsNumber()
  userId!: number;

  @IsNumber()
  postId!: number;
}
