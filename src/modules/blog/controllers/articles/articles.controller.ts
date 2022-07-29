import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ArticleDTO } from '../../dto/article.dto';
import { ArticleService } from '../../services/article/article.service';
import { UserId } from '@decorators/user-id.decorator';
import { Article } from '@models/article.model';
import { Public } from '@decorators/public.decorator';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';

@ApiTags('Article')
@Controller('articles')
export class ArticlesController {
  constructor(public articleService: ArticleService) {
  }

  @Get()
  @Public()
  async get(
    @Query('search') search: string,
    @Query('tags') tags: string[],
    @Query('page') page: string = '1',
    @Query('perPage') perPage: string = '10'
  ) {
    return this.articleService.findAll({
      search,
      tags,
        page: +page,
      perPage: +perPage
    });
  }

  @Get(':id')
  @Public()
  async getById(@Param('id') id: string) {
    return this.articleService.findById(id);
  }

  @ApiOAuth2([], 'google')
  @Put(':id')
  async update(@Param('id') articleId: string, @Body() body: ArticleDTO, @UserId() authorId: string) {
    return this.articleService.update(articleId, authorId, body);
  }

  @ApiOAuth2([], 'google')
  @Delete(':id')
  async delete(@Param('id') id: string, @UserId() userId: string) {
    await this.articleService.delete(id, userId);
    return;
  }

  @ApiOAuth2([], 'google')
  @Post()
  async create(@Body() body: ArticleDTO, @UserId() userId: string): Promise<Article> {
    return this.articleService.create(body, userId)
  }
}
