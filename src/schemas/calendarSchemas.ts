import { isValid } from "date-fns";
import z from "zod";

const MIN_YEAR = 1000;
const MAX_YEAR = 9999;

export const pathParamsYearSchema = z
  .string()
  .refine((val) => !isNaN(parseInt(val)), {
    error: "入力形式が異なります",
  })
  .transform(Number)
  .pipe(
    z
      .number()
      .min(MIN_YEAR, { message: "西暦の下限を下回っています" })
      .max(MAX_YEAR, { message: "西暦の上限を超えています" }),
  );

export const pathParamsMonthSchema = z
  .string()
  .refine((val) => !isNaN(parseInt(val)), { message: "入力形式が異なります" })
  .transform(Number)
  .pipe(
    z
      .number()
      .refine((val) => val >= 1 && val <= 12, { message: "月が不正な値です" }),
  );

export const pathParamsDaySchema = z
  .string()
  .refine((val) => !isNaN(parseInt(val)), { message: "入力形式が異なります" })
  .transform(Number)
  .pipe(
    z
      .number()
      .refine((val) => val >= 1 && val <= 31, { message: "日が不正な値です" }),
  );

// 2月30日のような存在しない日付か確認する
export const pathParamsDateSchema = z
  .object({
    year: pathParamsYearSchema,
    month: pathParamsMonthSchema,
    day: pathParamsDaySchema,
  })
  .refine(
    (pathParamsDate) => {
      const newDate = new Date(
        pathParamsDate.year,
        pathParamsDate.month - 1,
        pathParamsDate.day,
      );

      // Date型の仕様で2026-2-30を指定してインスタンスを生成すると、2026-3-2が返却されるため生成された値と入力値が同じか確認する
      return (
        newDate.getFullYear() === pathParamsDate.year &&
        newDate.getMonth() === pathParamsDate.month - 1 &&
        newDate.getDate() === pathParamsDate.day
      );
    },
    { message: "存在しない日付が入力されています" },
  )
  .transform((val) => new Date(val.year, val.month - 1, val.day))
  .refine((date) => isValid(date), {
    message: "正しく日付に変換できませんでした",
  });

export const pathParamsMonthViewSchema = z.object({
  year: pathParamsYearSchema,
  month: pathParamsMonthSchema,
});
