import Category from "../models/category.model";
import {
  CreateCategoryArgs,
  IdArgs,
  UpdateCategoryArgs,
} from "./types";

export const categoryResolvers = {
  Query: {
    getListCategory: async () => {
      const categories = await Category.find({
        deleted: false,
      });
      return categories;
    },
    getCategory: async (_: unknown, args: IdArgs) => {
      const { id } = args;
      const category = await Category.findOne({
        _id: id,
        deleted: false,
      });
      return category;
    },
  },
  Mutation: {
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
          deleted: false,
        },
        category,
        {
          new: true,
        }
      );
      return record;
    },
    deleteCategory: async (_: unknown, args: IdArgs) => {
      const { id } = args;
      await Category.updateOne(
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
