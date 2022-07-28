import { Column, Default, IsEmail, IsUUID, Length, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table({
  timestamps: false
})
export class User extends Model {
  @IsUUID(4)
  @Default(uuidv4)
  @PrimaryKey
  @Unique
  @Column
  id: string;

  @Length({ min: 3 })
  @Column
  firstName: string;

  @Length({ min: 3 })
  @Column
  lastName: string;

  @IsEmail
  @Unique
  @Column
  email: string;

  @Column
  picture: string;

  @Column
  get accessToken() : string {
    return undefined;
  }
}
