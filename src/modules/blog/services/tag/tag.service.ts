import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from '@models/tag';
import { TagDTO } from '../../dto/tag.dto';
import { Op } from 'sequelize';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag) private tagModel: typeof Tag
  ) {}

  searchTags(search: string = '') {
    return this.tagModel.findAll({
      where: {
        name: {
          [Op.iLike]: `%${search}%`
        }
      }
    })
  }

  createTag(tag: TagDTO) {
    return this.tagModel.create({
      name: tag.name
    })
  }
}
