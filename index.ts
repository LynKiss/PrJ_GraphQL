import express from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./typeDefs/index.typeDefs";
import { resolvers } from "./resolvers/index";

const startServer = async () => {
  const app = express();
  const port: number | string = 3000;

  dotenv.config(); // load biến môi trường từ file .env

  database.connect(); // kết nối database

  // GraphQl


  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app: app as any,
    path: "/graphql"
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};

startServer();
