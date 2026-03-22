import Header from "@/components/Header";
import MonthCalendar from "@/components/MonthCalendar";
import Sidebar from "@/components/Sidebar";
import { getMonthCalendar, getToday } from "@/utils/calendar";

export default function Home() {
  const calendar = getMonthCalendar();
  const today = getToday();
  const paramsDate = new Date(today.getFullYear(), today.getMonth(), 1);

  return (
    <div>
      <Header paramsDate={paramsDate} />

      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar calendar={calendar} paramsDate={paramsDate} />
        <MonthCalendar calendar={calendar} />
      </div>
    </div>
  );
}
