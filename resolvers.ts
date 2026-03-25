import Article from "./models/article.model";

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
        }
    }
};