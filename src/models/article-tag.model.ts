import {
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Tag } from '@models/tag';
import { Article } from '@models/article.model';

@Table({
  timestamps: false
})
export class ArticlesTags extends Model {

  @ForeignKey(() => Article)
  @Column
  articleId: string;

  @ForeignKey(() => Tag)
  @Column
  tagId: string;
}
