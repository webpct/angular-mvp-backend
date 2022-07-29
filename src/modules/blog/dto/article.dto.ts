import {
  ArrayNotEmpty, ArrayUnique,
  IsArray,
  IsObject,
  IsString,
  MinLength, Validate, ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { validate as validateUUID} from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

interface Section {
  title?: string,
  text: string
}

@ValidatorConstraint({ name: 'Sections', async: false })
export class SectionsLength implements ValidatorConstraintInterface {
  validate(value: Section, args: ValidationArguments) {
    if (value.title) {
      if (typeof value.title !== 'string' || value.title.length < 3) return false;
    }
    return !(!value.text || typeof value.text !== 'string' || value.text.length < 3);
  }

  defaultMessage(args: ValidationArguments) {
    return ` Wrong sections structure. Interface is { title?: string, text: string }. title and text should be more than 3 characters`;
  }
}

@ValidatorConstraint({ name: 'isUUID', async: false })
export class IsUUID implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    return validateUUID(value)
  }

  defaultMessage(args: ValidationArguments) {
    return `tags is not UUID`;
  }
}

const nameErrorContext = (message) => ({
  message,
  context: {
    errorCode: 400,
    developerNote: 'The validated string must contain 3 or more characters, and letters only',
  },
})

export class ArticleDTO {

  @ApiProperty({
    required: true,
    example: "Article title",
    description: 'The title of an article'
  })

  @MinLength(3, nameErrorContext('Tag name should be more than 3 characters'))
  @IsString(nameErrorContext('Tag name should be string'))
  title: string;


  @ApiProperty({
    isArray: true,
    example: [{
      title: 'Subtitle',
      text: 'text'
    }, {
      text: 'text'
    }],
    required: true,
    description: 'Article sections'
  })

  @Validate(SectionsLength, [],{
    each: true,
  })
  @IsObject({
    each: true
  })
  @ArrayNotEmpty()
  @IsArray()
  sections: Section[]

  @ApiProperty({
    isArray: true,
    example: ['id1'],
    required: true,
    description: 'Array of tag\'s id for article'
  })

  @Validate(IsUUID, {
    each: true
  })
  @ArrayUnique()
  tags: string[]
}
