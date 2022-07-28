import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ArticleDTO } from '../../dto/article.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Article } from '@models/article.model';
import { ArticleSection } from '@models/article-section.model';
import { User } from '@models/user.model';
import { Sequelize } from 'sequelize-typescript';
import { Tag } from '@models/tag';
import { ArticlesTags } from '@models/article-tag.model';

@Injectable()
export class ArticleService {

  constructor(
    @InjectModel(Article) private articleModel: typeof Article,
    @InjectModel(ArticleSection) private articleSectionModel: typeof ArticleSection,
    @InjectModel(ArticlesTags) private articlesTags: typeof ArticlesTags,
    private sequelize: Sequelize
  ) {}

  async findAll() {
    const result = await this.articleModel.findAll({
      include: [ArticleSection, User, Tag]
    });
    return result || [];
  }

  async findById(id: string) {
    const article = await this.articleModel.findByPk(id, {
      include: [ArticleSection, User, {
        model: Tag,
        attributes: ['name']

      }],
    });
    if (!article) throw new NotFoundException('Article with provided id not found');
    return article;
  }

  async delete(id: string, currentUserId: string) {
    const article = await this.findById(id);
    if (article.author.id !== currentUserId) throw new ForbiddenException('Delete is forbidden, only author could do it');

    return this.articleModel.destroy({
      where: { id },
    });
  }

  async create(article: ArticleDTO, userId: string): Promise<Article> {
    const transaction = await this.sequelize.transaction();
    try {
      const createdArticle = await this.articleModel.create({
        ...article,
        authorId: userId
      }, {
        include: [ArticleSection],
        transaction
      });

      const tags = article.tags.map(tagId => ({
        tagId,
        articleId: createdArticle.id
      }));

      await this.articlesTags.bulkCreate(tags, { transaction })
      await transaction.commit();
      return this.findById(createdArticle.id)
    } catch (err) {
      await transaction.rollback();
      throw new InternalServerErrorException(err);
    }
  }

  async update(articleId: string, currentUserId: string, newArticle: ArticleDTO) {
    const transaction = await this.sequelize.transaction();
    const article = await this.findById(articleId);
    if (article.author.id !== currentUserId) throw new ForbiddenException('Delete is forbidden, only author could do it');

    const updateArticle = article.update({
      title: newArticle.title
    }, { transaction });

    const removeArticleSections = this.articleSectionModel.destroy({
      where: { articleId },
      transaction
    });

    const newSections = newArticle.sections.map(section => ({
      articleId,
      ...section
    }));
    const createNewArticleSections = this.articleSectionModel.bulkCreate(
      newSections,
      { transaction }
    );

    const deleteTagsAssociations = this.articlesTags.destroy({
      where: { articleId },
      transaction
    })

    const newTagsAssociations = newArticle.tags.map(tagId => ({
      tagId,
      articleId
    }))
    const createNewTagsAssociations = this.articlesTags.bulkCreate(newTagsAssociations, { transaction })
    try {
      await Promise.all([
        updateArticle,
        removeArticleSections,
        createNewArticleSections,
        deleteTagsAssociations,
        createNewTagsAssociations
      ])
      await transaction.commit();
      return await this.findById(articleId);
    } catch(err) {
      await transaction.rollback();
      throw new InternalServerErrorException();
    }
  }
}
