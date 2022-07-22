import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Article } from './models/article.model';
import { ArticleSection } from './models/article-section.model';
import { Tag } from './models/tag';
import { User } from './models/user.model';
import { TagsController } from './controllers/tags/tags.controller';
import { TagService } from './services/tag/tag.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      models: [Article, ArticleSection, Tag, User],
    }),
    SequelizeModule.forFeature([Article, ArticleSection, Tag, User])
  ],
  controllers: [TagsController],
  providers: [TagService],
})
export class AppModule {}
