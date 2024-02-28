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
