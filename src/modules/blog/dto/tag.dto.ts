import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const nameErrorContext = (message) => ({
  message,
  context: {
    errorCode: 400,
    developerNote: 'The validated string must contain 3 or more characters, and letters only',
  },
})

export class TagDTO {
  @ApiProperty({
    example: 'Name of the tag',
    required: true,
    description: 'Tag name'
  })
  @MinLength(3, nameErrorContext('Tag name should be more than 3 characters'))
  @IsString(nameErrorContext('Tag name should be string'))
  name: string;
}
