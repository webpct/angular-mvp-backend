import { Module } from '@nestjs/common';
import { TagsController } from './controllers/tags/tags.controller';
import { TagService } from './services/tag/tag.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Article } from '@models/article.model';
import { ArticleSection } from '@models/article-section.model';
import { Tag } from '@models/tag';
import { User } from '@models/user.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    SequelizeModule,
    SequelizeModule.forFeature([Article, ArticleSection, Tag, User]),
  ],
  controllers: [TagsController],
  providers: [TagService],
})
export class BlogModule {}
