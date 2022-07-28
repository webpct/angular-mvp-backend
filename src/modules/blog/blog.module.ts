import { Module } from '@nestjs/common';
import { TagsController } from './controllers/tags/tags.controller';
import { TagService } from './services/tag/tag.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Article } from '@models/article.model';
import { ArticleSection } from '@models/article-section.model';
import { Tag } from '@models/tag';
import { User } from '@models/user.model';
import { AuthModule } from '../auth/auth.module';
import { ArticlesController } from './controllers/articles/articles.controller';
import { ArticleService } from './services/article/article.service';
import { ArticlesTags } from '@models/article-tag.model';

@Module({
  imports: [
    AuthModule,
    SequelizeModule,
    SequelizeModule.forFeature([Article, ArticleSection, Tag, User, ArticlesTags]),
  ],
  controllers: [TagsController, ArticlesController],
  providers: [TagService, ArticleService],
})
export class BlogModule {}
