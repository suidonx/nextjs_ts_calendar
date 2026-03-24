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
  params: Promise<{ yyyy: string; m: string; d: string }>;
};

const WeekPage = async ({ params }: PropsType) => {
  // パスパラメータのバリデーション処理
  const { yyyy, m, d } = await params;
  const parsedDate = pathParamsDateSchema.safeParse({ yyyy, m, d });

  if (!parsedDate.success) {
    console.error(parsedDate.error);
    throw new Error();
  }

  const paramsDate = parsedDate.data;

  const year = paramsDate.getFullYear();
  const month = paramsDate.getMonth() + 1;
  const day = paramsDate.getDate();

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
