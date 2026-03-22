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
      .min(1, { message: "西暦の下限を超えています" })
      .max(12, { message: "西暦の上限を超えています" }),
  );
