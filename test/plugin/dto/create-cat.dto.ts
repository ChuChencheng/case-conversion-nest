export const createCatDTOText = `
import { IsString } from 'class-validator'
import { ApiHideProperty } from '@nestjs/swagger'

class CatOwnerDTO {
  @IsString()
  ownerName: string
}

export class CreateCatDTO {
  catName: string

  catAge: number

  catSkills: string[]

  catHTTP: boolean

  catOwner: CatOwnerDTO

  @ApiHideProperty()
  hideProperty: boolean
}
`
