import { Column, Default, ForeignKey, IsUUID, Length, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { Article } from './article.model';
import { v4 as uuidv4 } from 'uuid';

@Table({
  timestamps: false
})
export class ArticleSection extends Model {

  @IsUUID(4)
  @Default(uuidv4)
  @PrimaryKey
  @Unique
  @Column
  id: string;

  @IsUUID(4)
  @ForeignKey(() => Article)
  @Column
  get articleId(): string {
    return undefined;
  }

  @Length({ min: 3 })
  @Column
  title: string;

  @Length({ min: 3 })
  @Column
  text: string;
}
