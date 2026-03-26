import { createHash } from "crypto";

export const generateRandomString = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

export const generateRandomNumber = (length: number): string => {
  const characters = "0123456789";

  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

// Bam chuoi bang md5, thuong dung cho password/token don gian
export const generateMD5 = (value: string): string => {
  return createHash("md5").update(value).digest("hex");
};

// Tao token ngau nhien roi bam md5 de ra chuoi co do dai co dinh
export const generateToken = (): string => {
  const rawToken = `${generateRandomString(20)}${Date.now()}`;
  return generateMD5(rawToken);
};
