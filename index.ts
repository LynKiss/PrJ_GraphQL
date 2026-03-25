import express, { Express, Request, Response } from "express";
import * as database from "./config/database"
import dotenv from "dotenv"
import Article from "./models/article.model";

const app: Express = express();
const port: number | string = 3000;

dotenv.config(); // load biến môi trường từ file .env

database.connect(); // kết nối database

// Rest API
app.get("/articles", async (req: Request, res: Response) => {
  const article = await Article.find({
    deleted: false

  })
  res.json({
    articles: article,
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
