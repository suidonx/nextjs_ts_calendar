import { isValid } from "date-fns";
import z from "zod";

export const pathParamsYearSchema = z
  .string()
  .refine((val) => !isNaN(parseInt(val)), {
    error: "入力形式が異なります",
  })
  .transform(Number)
  .pipe(
    z
      .number()
      .min(1000, { message: "西暦の下限を超えています" })
      .max(9999, { message: "西暦の上限を超えています" }),
  );

export const pathParamsMonthSchema = z
  .string()
  .refine((val) => !isNaN(parseInt(val)), { message: "入力形式が異なります" })
  .transform(Number)
  .pipe(
    z
      .number()
      .min(1, { message: "月の下限を超えています" })
      .max(12, { message: "月の上限を超えています" }),
  );

export const pathParamsDaySchema = z
  .string()
  .refine((val) => !isNaN(parseInt(val)), { message: "入力形式が異なります" })
  .transform(Number)
  .pipe(
    z
      .number()
      .min(1, { message: "日の下限を超えています" })
      .max(31, { message: "日の上限を超えています" }),
  );

// 2月30日のような存在しない日付か確認する
export const pathParamsDateSchema = z
  .object({
    yyyy: pathParamsYearSchema,
    m: pathParamsMonthSchema,
    d: pathParamsDaySchema,
  })
  .refine(
    (pathParamsDate) => {
      const newDate = new Date(
        pathParamsDate.yyyy,
        pathParamsDate.m - 1,
        pathParamsDate.d,
      );

      // Date型の仕様で2026-2-30を指定してインスタンスを生成すると、2026-3-2が返却されるため生成された値と入力値が同じか確認する
      return (
        newDate.getFullYear() === pathParamsDate.yyyy &&
        newDate.getMonth() === pathParamsDate.m - 1 &&
        newDate.getDate() === pathParamsDate.d
      );
    },
    { message: "存在しない日付が入力されています" },
  )
  .transform((val) => new Date(val.yyyy, val.m - 1, val.d))
  .refine((date) => isValid(date), {
    message: "正しく日付に変換できませんでした",
  });
