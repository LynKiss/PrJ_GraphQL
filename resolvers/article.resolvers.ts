import Article from "../models/article.model";
import Category from "../models/category.model";
import {
  ArticleParent,
  CreateArticleArgs,
  IdArgs,
  SortArgs,
  UpdateArticleArgs,
} from "./types";

export const articleResolvers = {
  Query: {
    getListArticle: async (_: unknown, args: SortArgs) => {
      const {
        filterKey,
        filterValue,
        sortKey,
        sortValue,
        page = 1,
        limit = 4,
        keyword,
      } = args;
      const sort: Record<string, 1 | -1> = {};
      const find: Record<string, unknown> = {
        deleted: false,
      };
      const currentPage = page > 0 ? page : 1;
      const currentLimit = limit > 0 ? limit : 4;
      const skip = (currentPage - 1) * currentLimit;

      // Bo loc dong, vi du: find["categoryId"] = "abc123"
      if (filterKey && filterValue) {
        find[filterKey] = filterValue;
      }

      // Tao object sort dong, vi du: { title: 1 } hoac { createdAt: -1 }
      if (sortKey && sortValue) {
        const normalizedValue =
          sortValue.toLowerCase() === "desc" || sortValue === "-1" ? -1 : 1;
        sort[sortKey] = normalizedValue;
      }

      // Tim kiem gan dung theo title
      if (keyword) {
        const keywordRegex = new RegExp(keyword, "i");
        find.title = keywordRegex;
      }

      // Phan trang bang skip va limit
      const articles = await Article.find(find)
        .sort(sort)
        .skip(skip)
        .limit(currentLimit);

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
