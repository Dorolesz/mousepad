import { IsInt, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsInt()
  price: number;

  @IsInt()
  delivery_days: number;

  @IsString()
  img: string;
}
