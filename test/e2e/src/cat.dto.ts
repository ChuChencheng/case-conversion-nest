import { Transform, Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class ListCatsRequestDTO {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  pageNumber: number

  @IsNumber()
  @Transform(({ value }) => Number(value))
  pageSize: number
}

class CatDTO {
  catName: string
}

export class ListCatsResponseDTO {
  @Type(() => CatDTO)
  catsData: CatDTO[]

  totalSize: number
}

export class CreateCatRequestDTO {
  @IsString()
  catName: string

  @IsNumber()
  catAge: number

  @IsOptional()
  @IsString()
  catDesc?: string
}

export class CreateCatResponseDTO {
  catId: string

  catName: string

  catAge: number

  catDesc?: string
}
