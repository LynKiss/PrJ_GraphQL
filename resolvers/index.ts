import { articleResolvers } from "./article.resolvers";
import { categoryResolvers } from "./category.resolvers";
import { userResolvers } from "./user.resolvers";

export const resolvers = {
  Query: {
    hello: () => {
      return "Hello World!";
    },
    ...articleResolvers.Query,
    ...categoryResolvers.Query,
  },
  Article: {
    ...articleResolvers.Article,
  },
  Mutation: {
    ...articleResolvers.Mutation,
    ...categoryResolvers.Mutation,
    ...userResolvers.Mutation,
  },
};
