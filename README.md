# Case Conversion Nest

Tool & CLI Plugin for Nest.js DTO case conversion.

This lib helps you to use snake_case in DTO and camelCase in code.

# Usage

1. Set up the global `CaseConversionInterceptor` in `AppModule`

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

2. Use `CaseConversionResponse` in route handlers to indicate response DTO class

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

3. Use CLI plugin in `nest-cli.json`

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
