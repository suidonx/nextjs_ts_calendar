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
  const { year, month, day } = await params;
  const parsedDate = pathParamsDateSchema.safeParse({ year, month, day });

  if (!parsedDate.success) {
    console.error(parsedDate.error);
    throw new Error();
  }

  const paramsDate = parsedDate.data;

  const monthlyCalendar = getMonthlyCalendar(
    paramsDate.getFullYear(),
    paramsDate.getMonth(),
  );
  const weeklyCalendar = getWeeklyCalendar(
    paramsDate.getFullYear(),
    paramsDate.getMonth() + 1,
    paramsDate.getDate(),
  );

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
