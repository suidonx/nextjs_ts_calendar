import Header from "@/components/Header";
import MonthCalendar from "@/components/MonthCalendar";
import Sidebar from "@/components/Sidebar";
import {
  pathParamsMonthSchema,
  pathParamsYearSchema,
} from "@/schemas/calendarSchemas";
import { getMonthCalendar } from "@/utils/calendar";

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

  const paramsDate = new Date(year, month - 1, 1);
  const calendar = getMonthCalendar(year, month);

  return (
    <div>
      <Header paramsDate={paramsDate} />

      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar calendar={calendar} paramsDate={paramsDate} />
        <MonthCalendar calendar={calendar} />
      </div>
    </div>
  );
};

export default MonthPage;
