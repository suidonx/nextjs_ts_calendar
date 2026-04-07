import { DAY_OF_THE_WEEK } from "@/constants/dayOfTheWeek";
import clsx from "clsx";
import { isToday } from "date-fns";
import ScheduleList from "./ScheduleList";

type PropsType = {
  calendar: (Date | null)[];
};
const MonthlyCalendar = (props: PropsType) => {
  const { calendar } = props;

  return (
    <main className="mb-5 grid flex-1 auto-rows-fr grid-cols-7 rounded-full">
      {calendar.map((day, index) => (
        <div key={index} className="overflow-y-auto border bg-white pt-1">
          {index < 7 && (
            <div className="text-center text-[12px]">
              {DAY_OF_THE_WEEK[index]}
            </div>
          )}
          <div
            className={clsx(
              "mx-auto size-7 text-center text-[11px] leading-7 font-bold",
              day instanceof Date && "hover:rounded-full hover:bg-blue-100",
              isToday(day ?? "") &&
                "rounded-full bg-blue-800 text-white hover:bg-blue-800",
            )}
          >
            {day?.getDate()}
          </div>

          {day !== null && <ScheduleList day={day} />}
        </div>
      ))}
    </main>
  );
};

export default MonthlyCalendar;
