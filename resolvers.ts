import Article from "./models/article.model";
import Category from "./models/category.model";

interface IdArgs {
    id: string;
}

interface ArticleInput {
    title?: string;
    avatar?: string;
    description?: string;
    categoryId?: string;
}

interface CreateArticleArgs {
    article: ArticleInput;
}

interface UpdateArticleArgs {
    id: string;
    article: ArticleInput;
}

interface CategoryInput {
    title?: string;
    avatar?: string;
}

interface CreateCategoryArgs {
    category: CategoryInput;
}

interface UpdateCategoryArgs {
    id: string;
    category: CategoryInput;
}

interface ArticleParent {
    categoryId?: string;
}

export const resolvers = {
    Query: {
        hello: () => {
            return "Hello World!";
        },
        getListArticle: async () => {
            const articles = await Article.find({
                deleted: false
            });
            return articles;
        },
        getArticle: async (_: unknown, args: IdArgs) => {
            const { id } = args;
            const article = await Article.findOne({
                _id: id,
                deleted: false
            });
            return article;
        },
        getListCategory: async () => {
            const categories = await Category.find({
                deleted: false
            });
            return categories;
        },
        getCategory: async (_: unknown, args: IdArgs) => {
            const { id } = args;
            const category = await Category.findOne({
                _id: id,
                deleted: false
            });
            return category;
        }
    },
    Article: {
        category: async (article: ArticleParent) => {
            const { categoryId } = article;

            if (!categoryId) {
                return null;
            }

            const category = await Category.findOne({
                _id: categoryId,
                deleted: false
            });
            return category;
        }
    },
    Mutation: {
        createArticle: async (_: unknown, args: CreateArticleArgs) => {
            const { article } = args;
            const record = new Article(article);
            await record.save();
            return record;
        },
        updateArticle: async (_: unknown, args: UpdateArticleArgs) => {
            const { id } = args;
            const { article } = args;
            const record = await Article.findOneAndUpdate(
                {
                    _id: id,
                    deleted: false
                },
                article,
                {
                    new: true
                }
            );
            return record;
        },
        deleteArticle: async (_: unknown, args: IdArgs) => {
            const { id } = args;
            await Article.updateOne(
                {
                    _id: id
                },
                {
                    deleted: true,
                    deletedAt: new Date()
                }
            );
            return "Da xoa";
        },
        createCategory: async (_: unknown, args: CreateCategoryArgs) => {
            const { category } = args;
            const record = new Category(category);
            await record.save();
            return record;
        },
        updateCategory: async (_: unknown, args: UpdateCategoryArgs) => {
            const { id, category } = args;
            const record = await Category.findOneAndUpdate(
                {
                    _id: id,
                    deleted: false
                },
                category,
                {
                    new: true
                }
            );
            return record;
        },
        deleteCategory: async (_: unknown, args: IdArgs) => {
            const { id } = args;
            await Category.updateOne(
                {
                    _id: id
                },
                {
                    deleted: true,
                    deletedAt: new Date()
                }
            );
            return "Da xoa";
        }
    }
};
