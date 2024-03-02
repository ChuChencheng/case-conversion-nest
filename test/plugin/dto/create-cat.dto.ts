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

export const createCatDTOTextTranspiled = `import * as case_conversion_nestjs_swagger from "@nestjs/swagger";
import * as case_conversion_class_transformer from "class-transformer";
import { IsString } from 'class-validator';
import { ApiHideProperty } from '@nestjs/swagger';
class CatOwnerDTO {
    ownerName;
}
__decorate([
    IsString(),
    case_conversion_class_transformer.Expose({ name: "owner_name" }),
    case_conversion_nestjs_swagger.ApiProperty({ name: "owner_name" })
], CatOwnerDTO.prototype, "ownerName", void 0);
export class CreateCatDTO {
    catName;
    catAge;
    catSkills;
    catHTTP;
    catOwner;
    hideProperty;
}
__decorate([
    case_conversion_class_transformer.Expose({ name: "cat_name" }),
    case_conversion_nestjs_swagger.ApiProperty({ name: "cat_name" })
], CreateCatDTO.prototype, "catName", void 0);
__decorate([
    case_conversion_class_transformer.Expose({ name: "cat_age" }),
    case_conversion_nestjs_swagger.ApiProperty({ name: "cat_age" })
], CreateCatDTO.prototype, "catAge", void 0);
__decorate([
    case_conversion_class_transformer.Expose({ name: "cat_skills" }),
    case_conversion_nestjs_swagger.ApiProperty({ name: "cat_skills" })
], CreateCatDTO.prototype, "catSkills", void 0);
__decorate([
    case_conversion_class_transformer.Expose({ name: "cat_http" }),
    case_conversion_nestjs_swagger.ApiProperty({ name: "cat_http" })
], CreateCatDTO.prototype, "catHTTP", void 0);
__decorate([
    case_conversion_class_transformer.Expose({ name: "cat_owner" }),
    case_conversion_nestjs_swagger.ApiProperty({ name: "cat_owner" })
], CreateCatDTO.prototype, "catOwner", void 0);
__decorate([
    ApiHideProperty(),
    case_conversion_class_transformer.Expose({ name: "hide_property" })
], CreateCatDTO.prototype, "hideProperty", void 0);
`
