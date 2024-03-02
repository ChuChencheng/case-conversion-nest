import request from 'supertest'
import { INestApplication } from '@nestjs/common'

import { getApp } from './dist/test/e2e/src/main'
import { catList, newCat } from './src/mock'
import { caseConverter } from './utils/converter'

const convertedCatList = caseConverter(catList)
const convertedNewCat = caseConverter(newCat)

describe('e2e test request', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await getApp()
    await app.init()
  })

  it('GET /cats 200', async () => {
    return request(app.getHttpServer())
      .get('/cats')
      .query({ page_number: 1, page_size: 10 })
      .expect(200)
      .expect(convertedCatList as object)
  })

  it('GET /cats 400', async () => {
    return request(app.getHttpServer())
      .get('/cats')
      .query({ pageNumber: 1, pageSize: 10 })
      .expect(400)
  })

  it('POST /cat 200', async () => {
    return request(app.getHttpServer())
      .post('/cat')
      .send({ cat_name: 'xxx', cat_age: 1, cat_desc: 'desc' })
      .expect(201)
      .expect(convertedNewCat as object)
  })

  it('POST /cat 400', async () => {
    return request(app.getHttpServer())
      .post('/cat')
      .send({ catName: 'xxx', catAge: 1, catDesc: 'desc' })
      .expect(400)
  })

  afterAll(async () => {
    await app.close()
  })
})
