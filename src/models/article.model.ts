import { Column, Default, HasMany, IsUUID, Length, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { ArticleSection } from './article-section.model';
import { v4 as uuidv4 } from 'uuid';

@Table({
  timestamps: false
})
export class Article extends Model {

  @IsUUID(4)
  @Default(uuidv4)
  @PrimaryKey
  @Column
  id: string;

  @Length({ min: 3 })
  @Column
  title: string;

  @Column
  createdAt: Date;

  @HasMany(() => ArticleSection)
  sections: ArticleSection[]
}
