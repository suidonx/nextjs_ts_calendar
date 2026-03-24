import Header from "@/components/Header";
import MonthCalendar from "@/components/MonthlyCalendar";
import Sidebar from "@/components/Sidebar";
import {
  getMonthlyCalendar,
  getMonthNextURL,
  getMonthPrevURL,
  getToday,
} from "@/utils/calendar";

export default function Home() {
  const calendar = getMonthlyCalendar();
  const today = getToday();

  const prevURL = getMonthPrevURL(today);
  const nextURL = getMonthNextURL(today);

  return (
    <div>
      <Header paramsDate={today} prevURL={prevURL} nextURL={nextURL} />

      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar
          calendar={calendar}
          paramsDate={today}
          prevURL={prevURL}
          nextURL={nextURL}
        />
        <MonthCalendar calendar={calendar} />
      </div>
    </div>
  );
}
