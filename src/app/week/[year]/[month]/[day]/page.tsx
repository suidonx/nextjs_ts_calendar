import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import WeeklyCalendar from "@/components/WeeklyCalendar";
import { pathParamsDateSchema } from "@/schemas/calendarSchemas";
import {
  getMonthlyCalendar,
  getWeeklyCalendar,
  getWeeKNextURL,
  getWeekPrevURL,
} from "@/utils/calendar";

type PropsType = {
  params: Promise<{ year: string; month: string; day: string }>;
};

const WeekPage = async ({ params }: PropsType) => {
  // パスパラメータのバリデーション処理
  const paramsData = await params;

  const parsedDate = pathParamsDateSchema.safeParse({
    year: paramsData.year,
    month: paramsData.month,
    day: paramsData.day,
  });

  if (!parsedDate.success) {
    console.error(parsedDate.error);
    throw new Error();
  }

  const { date: paramsDate, year, month, day } = parsedDate.data;

  const monthlyCalendar = getMonthlyCalendar(year, month);
  const weeklyCalendar = getWeeklyCalendar(year, month, day);

  const prevURL = getWeekPrevURL(paramsDate);
  const nextURL = getWeeKNextURL(paramsDate);

  return (
    <div>
      <Header paramsDate={paramsDate} prevURL={prevURL} nextURL={nextURL} />

      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar
          calendar={monthlyCalendar}
          paramsDate={paramsDate}
          prevURL={prevURL}
          nextURL={nextURL}
        />
        <WeeklyCalendar calendar={weeklyCalendar} />
      </div>
    </div>
  );
};

export default WeekPage;
