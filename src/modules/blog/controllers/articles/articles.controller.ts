import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ArticleDTO } from '../../dto/article.dto';
import { ArticleService } from '../../services/article/article.service';
import { UserId } from '@decorators/user-id.decorator';
import { Article } from '@models/article.model';
import { Public } from '@decorators/public.decorator';

@Controller('articles')
export class ArticlesController {
  constructor(public articleService: ArticleService) {
  }

  @Get()
  @Public()
  async get() {
    return this.articleService.findAll();
  }

  @Get(':id')
  @Public()
  async getById(@Param('id') id: string) {
    return this.articleService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') articleId: string, @Body() body: ArticleDTO, @UserId() authorId: string) {
    return this.articleService.update(articleId, authorId, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @UserId() userId: string) {
    await this.articleService.delete(id, userId);
    return;
  }

  @Post()
  async create(@Body() body: ArticleDTO, @UserId() userId: string): Promise<Article> {
    return this.articleService.create(body, userId)
  }
}
