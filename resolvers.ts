import Article from "./models/article.model";

interface GetArticleArgs {
    id: string;
}

interface DeleteArticleArgs {
    id: string;
}

interface ArticleInput {
    title?: string;
    avatar?: string;
    description?: string;
}
interface UpdateArticleArgs {
    id: string;
    article: ArticleInput;
}

interface CreateArticleArgs {
    article: ArticleInput;
}

export const resolvers = {
    Query: {
        hello: () => {
            return "Hello World!";
        },
        getListArticle: async () => {
            const article = await Article.find({
                deleted: false
            });
            return article;
        },
        getArticle: async (_: unknown, args: GetArticleArgs) => {
            const { id } = args;
            const article = await Article.findOne({
                _id: id,
                deleted: false
            });
            return article;
        }
    },
    Mutation: {
        createArticle: async (_: unknown, args: CreateArticleArgs) => {
            const { article } = args;
            const record = new Article(article);
            await record.save();
            return record;
        },
        deleteArticle: async (_: unknown, args: DeleteArticleArgs) => {
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
        updateArticle: async (_: unknown, args: UpdateArticleArgs) => {
            const { id, article } = args;
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
        }
    }
};
