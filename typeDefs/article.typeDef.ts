import { gql } from "apollo-server-express";

export const typeDefsArticle = gql`
  type Article {
    id: ID
    title: String
    avatar: String
    description: String
    category: Category
  }



  type Query {
    hello: String
    getListArticle: [Article]
    getArticle(id: ID): Article
    
  }

  input ArticleInput {
    title: String
    avatar: String
    description: String
    categoryId: ID
  }


  type Mutation {
    createArticle(article: ArticleInput): Article
    updateArticle(id: ID, article: ArticleInput): Article
    deleteArticle(id: ID): String
  
  }
`;
