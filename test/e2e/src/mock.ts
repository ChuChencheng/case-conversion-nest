import { CreateCatResponseDTO, ListCatsResponseDTO } from './cat.dto'

export const catList: ListCatsResponseDTO = {
  catsData: [
    {
      catName: 'a',
    },
    {
      catName: 'b',
    },
  ],

  totalSize: 2,
}

export const newCat: CreateCatResponseDTO = {
  catId: 'xxx',
  catName: 'xxx',
  catAge: 1,
  catDesc: 'xxx',
}
