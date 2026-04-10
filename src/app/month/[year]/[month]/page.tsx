import Header from "@/components/Header";
import MonthlyCalendar from "@/components/MonthlyCalendar";
import Sidebar from "@/components/Sidebar";
import { pathParamsMonthViewSchema } from "@/schemas/calendarSchemas";
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
  const paramsData = await params;

  const parsedDate = pathParamsMonthViewSchema.safeParse({
    year: paramsData.year,
    month: paramsData.month,
  });

  if (!parsedDate.success) {
    console.error(parsedDate.error);
    throw new Error();
  }

  const { year, month } = parsedDate.data;

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
