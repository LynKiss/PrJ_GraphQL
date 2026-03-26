import User from "../models/user.model";
import { generateMD5, generateToken } from "../helpers/generate";

interface RegisterUserInput {
  fullName?: string;
  email?: string;
  password?: string;
}

interface RegisterUserArgs {
  user: RegisterUserInput;
}

interface LoginUserInput {
  email?: string;
  password?: string;
}

interface LoginUserArgs {
  user: LoginUserInput;
}

export const userResolvers = {
  Mutation: {
    registerUser: async (_: unknown, args: RegisterUserArgs) => {
      const { user } = args;
      const { fullName, email, password } = user;

      // Kiem tra thong tin dau vao co day du khong
      if (!fullName || !email || !password) {
        return {
          code: 400,
          message: "Vui long nhap day du thong tin",
        };
      }

      // Kiem tra email da ton tai hay chua
      const emailExist = await User.findOne({
        email,
        deleted: false,
      });

      if (emailExist) {
        return {
          code: 400,
          message: "Email da ton tai",
        };
      }

      // Bam md5 mat khau truoc khi luu vao database
      const hashedPassword = generateMD5(password);

      // Tao token ngau nhien de co the dung cho xac thuc
      const token = generateToken();

      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
        token,
      });

      const data = await newUser.save();

      return {
        code: 200,
        message: "Thanh cong",
        id: data.id,
        fullName: data.fullName,
        email: data.email,
        token: data.token,
      };
    },
    loginUser: async (_: unknown, args: LoginUserArgs) => {
      const { user } = args;
      const { email, password } = user;

      // Kiem tra du lieu dau vao
      if (!email || !password) {
        return {
          code: 400,
          message: "Vui long nhap email va password",
        };
      }

      // Bam md5 password de doi chieu voi password da luu
      const hashedPassword = generateMD5(password);

      const userExist = await User.findOne({
        email,
        password: hashedPassword,
        deleted: false,
      });

      if (!userExist) {
        return {
          code: 400,
          message: "Email hoac password khong dung",
        };
      }

      // Neu user chua co token thi tao moi va cap nhat lai database
      let token = userExist.token;

      if (!token) {
        token = generateToken();

        await User.updateOne(
          {
            _id: userExist.id,
          },
          {
            token,
          }
        );
      }

      return {
        code: 200,
        message: "Thanh cong",
        id: userExist.id,
        fullName: userExist.fullName,
        email: userExist.email,
        token,
      };
    },
  },
};
