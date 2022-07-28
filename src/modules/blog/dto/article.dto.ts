import {
  ArrayNotEmpty,
  IsArray,
  IsObject,
  IsString,
  MinLength, Validate, ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

interface Section {
  title?: string,
  text: string
}

@ValidatorConstraint({ name: 'customText', async: false })
export class CustomTextLength implements ValidatorConstraintInterface {
  validate(value: Section, args: ValidationArguments) {
    if (value.title) {
      if (typeof value.title !== 'string' || value.title.length < 3) return false;
    }
    if (!value.text || typeof value.text !== 'string' || value.text.length < 3) return false;
    return true
  }

  defaultMessage(args: ValidationArguments) {
    return ` Wrong sections structure. Interface is { title?: string, text: string }. title and text should be more than 3 characters`;
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
  @MinLength(3, nameErrorContext('Tag name should be more than 3 characters'))
  @IsString(nameErrorContext('Tag name should be string'))
  title: string;

  @Validate(CustomTextLength, [],{
    each: true,
  })
  @IsObject({
    each: true
  })
  @ArrayNotEmpty()
  @IsArray()
  sections: Section[]
}
