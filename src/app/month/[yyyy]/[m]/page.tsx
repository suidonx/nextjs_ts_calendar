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
  params: Promise<{ yyyy: string; m: string }>;
};

const MonthPage = async ({ params }: PropsType) => {
  // パスパラメータのバリデーション処理
  const { yyyy, m } = await params;
  const parsedYear = pathParamsYearSchema.safeParse(yyyy);

  if (!parsedYear.success) {
    console.error(parsedYear.error);
    throw new Error();
  }

  const parsedMonth = pathParamsMonthSchema.safeParse(m);

  if (!parsedMonth.success) {
    console.error(parsedMonth.error);
    throw new Error();
  }

  const year = parsedYear.data;
  const month = parsedMonth.data;
  const calendar = getMonthlyCalendar(year, month);

  const paramsDate = new Date(year, month - 1, 1);

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
