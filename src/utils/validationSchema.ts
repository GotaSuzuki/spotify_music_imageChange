import { z } from "zod";

export const sinUpvalidationSchema = z
  .object({
    email: z
      .string()
      .min(1, "メールアドレスを入力してください")
      .email("正しいメールアドレスを入力してください"),
    password: z
      .string()
      .min(1, "パスワードを入力してください")
      .min(6, "6文字以上入力してください"),
    passwordConf: z
      .string()
      .min(1, "パスワードを入力してください")
      .min(6, "6文字以上入力してください"),
    firstName: z.string().min(1, "名前を入力してください"),
    lastName: z.string().min(1, "名前を入力してください")
  })
  .refine((data) => data.password === data.passwordConf, {
    path: ["passwordConf"],
    message: "パスワードが一致しません"
  });

export const loginValidationSchema = z
  .object({
    email: z
      .string()
      .min(1, "メールアドレスを入力してください")
      .email("正しいメールアドレスを入力してください"),
    password: z
      .string()
      .min(1, "パスワードを入力してください")
      .min(6, "6文字以上入力してください"),
    passwordConf: z
      .string()
      .min(1, "パスワードを入力してください")
      .min(6, "6文字以上入力してください")
  })
  .refine((data) => data.password === data.passwordConf, {
    path: ["passwordConf"],
    message: "パスワードが一致しません"
  });
