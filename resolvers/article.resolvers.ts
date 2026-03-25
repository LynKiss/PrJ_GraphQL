import Article from "../models/article.model";
import Category from "../models/category.model";
import {
  ArticleParent,
  CreateArticleArgs,
  IdArgs,
  UpdateArticleArgs,
} from "./types";

export const articleResolvers = {
  Query: {
    getListArticle: async () => {
      const articles = await Article.find({
        deleted: false,
      });
      return articles;
    },
    getArticle: async (_: unknown, args: IdArgs) => {
      const { id } = args;
      const article = await Article.findOne({
        _id: id,
        deleted: false,
      });
      return article;
    },
  },
  Article: {
    category: async (article: ArticleParent) => {
      const { categoryId } = article;

      if (!categoryId) {
        return null;
      }

      const category = await Category.findOne({
        _id: categoryId,
        deleted: false,
      });
      return category;
    },
  },
  Mutation: {
    createArticle: async (_: unknown, args: CreateArticleArgs) => {
      const { article } = args;
      const record = new Article(article);
      await record.save();
      return record;
    },
    updateArticle: async (_: unknown, args: UpdateArticleArgs) => {
      const { id, article } = args;
      const record = await Article.findOneAndUpdate(
        {
          _id: id,
          deleted: false,
        },
        article,
        {
          new: true,
        }
      );
      return record;
    },
    deleteArticle: async (_: unknown, args: IdArgs) => {
      const { id } = args;
      await Article.updateOne(
        {
          _id: id,
        },
        {
          deleted: true,
          deletedAt: new Date(),
        }
      );
      return "Da xoa";
    },
  },
};
