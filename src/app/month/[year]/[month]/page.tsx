import Header from "@/components/Header";
import MonthlyCalendar from "@/components/MonthlyCalendar";
import Sidebar from "@/components/Sidebar";
import {
  pathParamsMonthSchema,
  pathParamsYearSchema,
} from "@/schemas/calendarSchemas";
import {
  getMonthlyCalendar,
  getMonthNextURL,
  getMonthPrevURL,
} from "@/utils/calendar";

type PropsType = {
  params: Promise<{ year: string; month: string }>;
};

const MonthPage = async ({ params }: PropsType) => {
  // パスパラメータのバリデーション処理
  const { year, month } = await params;
  const parsedYear = pathParamsYearSchema.safeParse(year);

  if (!parsedYear.success) {
    console.error(parsedYear.error);
    throw new Error();
  }

  const parsedMonth = pathParamsMonthSchema.safeParse(month);

  if (!parsedMonth.success) {
    console.error(parsedMonth.error);
    throw new Error();
  }

  const calendar = getMonthlyCalendar(parsedYear.data, parsedMonth.data);

  const paramsDate = new Date(parsedYear.data, parsedMonth.data - 1, 1);

  const prevURL = getMonthPrevURL(paramsDate);
  const nextURL = getMonthNextURL(paramsDate);

  return (
    <div>
      <Header paramsDate={paramsDate} prevURL={prevURL} nextURL={nextURL} />

      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar
          calendar={calendar}
          paramsDate={paramsDate}
          prevURL={prevURL}
          nextURL={nextURL}
        />
        <MonthlyCalendar calendar={calendar} />
      </div>
    </div>
  );
};

export default MonthPage;
