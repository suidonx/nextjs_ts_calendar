import { add, lastDayOfMonth, startOfMonth } from "date-fns";

export const getToday = () => {
  const today = new Date();
  return today;
};

// 今月のカレンダーを初日から月末日まで出力する処理
// 日曜日から始まるカレンダーで、初日の曜日に応じて適宜、空白を入れる
export const getMonthCalendar = (
  year?: number,
  month?: number,
): (Date | undefined)[] => {
  const today = getToday();

  if (year === undefined) {
    year = today.getFullYear();
  }

  if (month === undefined) {
    // getMonthは0-11でreturnされるため+1する
    month = today.getMonth() + 1;
  }

  // パラメータのmonthを-1してコンストラクタの引数に渡す
  const pathParamsDate = new Date(year, month - 1);

  // 1日の曜日に合わせてemptyを入れる
  const firstDayOfMonth = startOfMonth(pathParamsDate);
  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  const calendar = [...Array(weekdayOfFirstDay)];

  const lastDayOfThisMonth = lastDayOfMonth(pathParamsDate).getDate();

  [...Array(lastDayOfThisMonth)].map((_, index) => {
    const newDate = add(firstDayOfMonth, { days: index });
    calendar.push(newDate);
  });

  return calendar;
};
