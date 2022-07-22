import { Column, ForeignKey, IsUUID, Length, Model, Table } from 'sequelize-typescript';
import { Article } from './article.model';

@Table({
  timestamps: false
})
export class ArticleSection extends Model {

  @IsUUID(4)
  @ForeignKey(() => Article)
  @Column
  articleId: string;

  @Length({ min: 3 })
  @Column
  title: string;

  @Length({ min: 3 })
  @Column
  text: string;
}
