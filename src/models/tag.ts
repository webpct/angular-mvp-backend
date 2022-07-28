import { Column, Default, IsUUID, Length, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table({
  timestamps: false
})
export class Tag extends Model {

  @IsUUID(4)
  @Default(uuidv4)
  @PrimaryKey
  @Unique
  @Column
  id: string;

  @Length({ min: 3 })
  @Column
  name: string;
}
