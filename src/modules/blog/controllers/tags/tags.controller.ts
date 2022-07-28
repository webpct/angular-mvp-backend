import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Tag } from '@models/tag';
import { TagService } from '../../services/tag/tag.service';
import { TagDTO } from '../../dto/tag.dto';
import { Public } from '@decorators/public.decorator';

@Controller('tags')
export class TagsController {

  constructor(private tagService: TagService) { }

  @Get()
  @Public()
  async findAll(@Query('search') search): Promise<Tag[]> {
    return this.tagService.searchTags(search)
  }

  @Post()
  async create(@Body() body: TagDTO): Promise<Tag> {
    return this.tagService.createTag(body)
  }
}