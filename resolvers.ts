import Article from "./models/article.model";

interface GetArticleArgs {
    id: string;
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
    }
};
