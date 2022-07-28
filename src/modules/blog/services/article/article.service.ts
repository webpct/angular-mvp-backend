import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ArticleDTO } from '../../dto/article.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Article } from '@models/article.model';
import { ArticleSection } from '@models/article-section.model';
import { User } from '@models/user.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ArticleService {

  constructor(
    @InjectModel(Article) private articleModel: typeof Article,
    @InjectModel(ArticleSection) private articleSectionModel: typeof ArticleSection,
    private sequelize: Sequelize
  ) {}


  async findAll() {
    const result = await this.articleModel.findAll({
      include: [ArticleSection, User]
    });

    return result || [];
  }

  async findById(id: string) {
    const article = await this.articleModel.findByPk(id, {
      include: [ArticleSection, User],
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
    const createdArticle = await this.articleModel.create({
      ...article,
      authorId: userId
    }, {
      include: ArticleSection,
    })
    return this.findById(createdArticle.id)
  }

  async update(articleId: string, currentUserId: string, newArticle: ArticleDTO) {
    const transaction = await this.sequelize.transaction();
    const article = await this.findById(articleId);
    if (article.author.id !== currentUserId) throw new ForbiddenException('Delete is forbidden, only author could do it');

    try {
      await Promise.all([
        article.update({
          title: newArticle.title
        }, { transaction }),
        this.articleSectionModel.destroy({
          where: { articleId: articleId },
          transaction
        }),
        this.articleSectionModel.bulkCreate(newArticle.sections.map(el => ({
          articleId,
          ...el
        })), {transaction})
      ])
      await await transaction.commit();
      return article;
    } catch(err) {
      await await transaction.rollback();
    }
  }
}
