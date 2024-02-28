export const createCatDTOText = `
class CatOwnerDTO {
  ownerName: string
}

export class CreateCatDTO {
  catName: string

  catAge: number

  catOwner: CatOwnerDTO
}
`
