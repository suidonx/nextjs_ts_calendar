import {
  add,
  addMonths,
  isSameWeek,
  lastDayOfMonth,
  nextDay,
  previousDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";

export const getToday = () => {
  const today = new Date();
  return today;
};

// 今月のカレンダーを初日から月末日まで出力する処理
// 日曜日から始まるカレンダーで、初日の曜日に応じて適宜、空白を入れる
export const getMonthlyCalendar = (
  year: number,
  month: number,
): (Date | null)[] => {
  // パラメータのmonthを-1してコンストラクタの引数に渡す
  const pathParamsDate = new Date(year, month - 1);

  // 1日の曜日に合わせてemptyを入れる
  const firstDayOfMonth = startOfMonth(pathParamsDate);
  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  const calendar = Array(weekdayOfFirstDay).fill(null);

  const lastDayOfThisMonth = lastDayOfMonth(pathParamsDate).getDate();

  [...Array(lastDayOfThisMonth)].map((_, index) => {
    const newDate = add(firstDayOfMonth, { days: index });
    calendar.push(newDate);
  });

  return calendar;
};

export const getWeeklyCalendar = (
  year: number,
  month: number,
  day: number,
): Date[] => {
  // パラメータのmonthを-1してコンストラクタの引数に渡す
  const pathParamsDate = new Date(year, month - 1, day);

  // 週始めの日曜日のDate型を取得する
  const startOfWeekDate = startOfWeek(pathParamsDate);

  const calendar: Date[] = [];
  const weekLength = 7;
  [...Array(weekLength)].map((_, index) => {
    const newDate = add(startOfWeekDate, { days: index });
    calendar.push(newDate);
  });

  return calendar;
};

export const getWeekPrevURL = (curWeek: Date) => {
  let prevWeek = previousDay(curWeek, 0);

  if (isSameWeek(prevWeek, curWeek)) {
    prevWeek = previousDay(prevWeek, 0);
  }

  const prevYear = prevWeek.getFullYear();
  const prevMonth = prevWeek.getMonth() + 1;
  const prevDay = prevWeek.getDate();

  const prevWeekURL = `/week/${prevYear}/${prevMonth}/${prevDay}`;

  return prevWeekURL;
};

export const getWeeKNextURL = (curWeek: Date) => {
  const next = nextDay(curWeek, 0);

  const nextYear = next.getFullYear();
  const nextMonth = next.getMonth() + 1;
  const nextDate = next.getDate();

  const nextWeekURL = `/week/${nextYear}/${nextMonth}/${nextDate}`;

  return nextWeekURL;
};

export const getMonthPrevURL = (curMonth: Date) => {
  const prev = subMonths(curMonth, 1);

  const prevYear = prev.getFullYear();
  const prevMonth = prev.getMonth() + 1;

  const prevMonthURL = `/month/${prevYear}/${prevMonth}`;

  return prevMonthURL;
};

export const getMonthNextURL = (curMonth: Date) => {
  const next = addMonths(curMonth, 1);

  const nextYear = next.getFullYear();
  const nextMonth = next.getMonth() + 1;

  const nextMonthURL = `/month/${nextYear}/${nextMonth}`;

  return nextMonthURL;
};
