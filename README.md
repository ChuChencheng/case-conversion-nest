# Case Conversion Nest

[![Node.js Package](https://github.com/ChuChencheng/case-conversion-nest/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/ChuChencheng/case-conversion-nest/actions/workflows/npm-publish.yml)

Tool & CLI Plugin for Nest.js DTO case conversion.

This lib helps you to use snake_case in DTO and camelCase in code.

Request body:

```json
{
  "cat_name": "xxx"
}
```

DTO definition:

```typescript
export class CatRequestDTO {
  @IsString()
  catName: string
}

export class CatResponseDTO {
  catId: string
}
```

Response:

```json
{
  "cat_id": "xxx"
}
```

# Install

```bash
yarn add case-conversion-nest

# or

npm install case-conversion-nest
```

# Usage

1. Set up the global interceptor `CaseConversionInterceptor` in `AppModule`

```typescript
import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { CaseConversionInterceptor } from 'case-conversion-nest'

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CaseConversionInterceptor,
    },
  ],
})
export class AppModule {}
```

2. Use `ValidationPipe` globally with `transform` option set to `true`

```typescript
app.useGlobalPipes(new ValidationPipe({ transform: true }))
```

3. Use `CaseConversionResponse` in route handlers to indicate response DTO class

```typescript
import { Controller, Get } from '@nestjs/common'
import { ListCatsResponseDTO } from './list-cats.dto'
import { CaseConversionResponse } from 'case-conversion-nest'

@Controller('cats')
export class CatsController {
  @Get()
  @CaseConversionResponse(ListCatsResponseDTO)
  findAll() {
    return { /** ... */ }
  }
}
```

4. Use CLI plugin in `nest-cli.json`

```json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "plugins": [
      "@nestjs/swagger",
      {
        "name": "case-conversion-nest",
        "options": {
          "dtoFileNameSuffix": ["dto.ts", "entity.ts"]
        }
      }
    ]
  }
}
```

# Caveats

1. All of your DTO classes must be inside the files you specify in `dtoFileNameSuffix` (Defaults to `dto.ts`, `entity.ts`)

```typescript
// create-cat.dto.ts
export class CreateCatDTO {
  catName: string

  nestedObject: OtherDTO
}

// other.ts
export class OtherDTO {
  /**
   * This field will not be converted as the class is not inside a dto.ts file
   * 
   * In addition, this field will not be displayed in Swagger UI
  */
  otherField: string
}
```

2. Nested object must be annotated with `Type` decorator, or else nested object will not be converted

```typescript
import { Type } from 'class-transformer'

export class CreateCatDTO {
  catName: string

  @Type(() => A)
  converted: A

  notConverted: B
}

class A {
  /**
   * Converted
  */
  aName: string
}

class B {
  /**
   * This field will not be converted
  */
  bName: string
}
```

# How it works

## When is the case conversion done

The DTO case conversion is done by `class-transformer`. When a request comes in, the query/payload will be transformed by `ValidationPipe`. Based on that, by adding `@Expose({ name: 'snake_case_field' })` to DTO fields, the conversion will be done automatically.

In terms of response body, Nest.js does not have a similar "`ValidationPipe`" to transform it, so `CaseConversionInterceptor` is provided to handle it. The decorator `CaseConversionResponse` is also needed to indicate the response body type, because the type is not available in the interceptor internally.

## Why do I need to use the cli plugin

The conversion is done by adding `@Expose` decorator, but it's tedious to add it to every fields manually, so the cli plugin is provided to do this work automatically.

**Note that extra `@Expose` added manually will not be effective.**

## How is the fields in Swagger document converted

It's also done by the cli plugin, by adding `@ApiProperty({ name: 'snake_case_field' })` to the field.

It's OK to add extra `@ApiProperty` because the metadata is merged by `@nestjs/swagger`.
