import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from '@models/tag';
import { TagDTO } from '../../dto/tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag) private tagModel: typeof Tag
  ) {}

  searchTags(search: string = undefined) {
    return this.tagModel.findAll()
  }

  createTag(tag: TagDTO) {
    return this.tagModel.create({
      name: tag.name
    })
  }
}
