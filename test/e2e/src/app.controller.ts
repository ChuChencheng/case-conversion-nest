import { Body, Controller, Get, Post, Query } from '@nestjs/common'

import {
  CreateCatRequestDTO,
  CreateCatResponseDTO,
  ListCatsRequestDTO,
  ListCatsResponseDTO,
} from './cat.dto'
import { catList, newCat } from './mock'
import { CaseConversionResponse } from '../../../lib'

@Controller()
export class AppController {
  @Get('cats')
  @CaseConversionResponse(ListCatsResponseDTO)
  async listCats(@Query() dto: ListCatsRequestDTO): Promise<ListCatsResponseDTO> {
    dto
    return catList
  }

  @Post('cat')
  @CaseConversionResponse(CreateCatResponseDTO)
  async createCat(@Body() dto: CreateCatRequestDTO): Promise<CreateCatResponseDTO> {
    dto
    return newCat
  }
}
