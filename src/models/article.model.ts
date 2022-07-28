import {
  BelongsTo, BelongsToMany,
  Column,
  Default, ForeignKey,
  HasMany,
  IsUUID,
  Length,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { ArticleSection } from './article-section.model';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@models/user.model';
import { Tag } from '@models/tag';
import { ArticlesTags } from '@models/article-tag.model';

@Table({
  timestamps: false
})
export class Article extends Model {

  @IsUUID(4)
  @Default(uuidv4)
  @PrimaryKey
  @Unique
  @Column
  id: string;

  @Length({ min: 3 })
  @Column
  title: string;

  @Column
  @ForeignKey(() => User)
  get authorId(): string {
    return undefined;
  }

  @BelongsTo(() => User, 'authorId')
  author: User;

  @Column
  createdAt: Date;

  @HasMany(() => ArticleSection)
  sections: ArticleSection[]

  @BelongsToMany(() => Tag, () => ArticlesTags)
  tags: Tag[]
}
