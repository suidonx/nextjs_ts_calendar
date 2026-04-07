import {
  MAX_DATE_STRING,
  MAX_LENGTH_TITLE,
  MIN_DATE_STRING,
} from "@/constants/scheduleForm";
import { isValid, parseISO } from "date-fns";
import z from "zod";

export const scheduleTitleSchema = z
  .string()
  .trim()
  .min(1, { message: "タイトルを入力してください" })
  .max(MAX_LENGTH_TITLE, { message: "30文字以内で入力してください" });

export const createScheduleSchema = z.object({
  title: scheduleTitleSchema,
  scheduledAt: z
    .string()
    .min(1, { message: "日付を入力してください" })
    .refine((val) => !isNaN(Date.parse(val)), { message: "日付が不正な値です" })
    .refine((val) => val >= MIN_DATE_STRING && val <= MAX_DATE_STRING, {
      message: "この年月日は予定を追加できません",
    })

    // Date型の仕様で2026-2-30を指定してインスタンスを生成すると、2026-3-2が返却されるため生成された値と入力値が同じか確認する
    .refine(
      (dateString) => {
        const [year, month, day] = dateString
          .split("-")
          .map((val) => Number(val));

        const date = parseISO(dateString);

        return (
          date.getFullYear() === year &&
          date.getMonth() === month - 1 &&
          date.getDate() === day
        );
      },
      { message: "存在しない日付が入力されています" },
    )

    // 日付文字列をDate型に変換する
    .transform((dateString) => {
      const date = parseISO(dateString);
      return date;
    })

    // 意図しないエラーを検知
    .refine((date) => isValid(date), {
      message: "正しく日付に変換できませんでした",
    }),
});

export const updateScheduleTitleSchema = z.object({
  title: scheduleTitleSchema,
});
