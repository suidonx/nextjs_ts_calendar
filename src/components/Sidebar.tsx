"use client";

import { DAY_OF_THE_WEEK } from "@/constants/dayOfTheWeek";
import clsx from "clsx";
import { isToday } from "date-fns";
import Link from "next/link";
import CreateScheduleForm from "./CreateScheduleForm";

type PropsType = {
  calendar: (Date | undefined)[];
  paramsDate: Date;
  prevURL: string;
  nextURL: string;
};

const Sidebar = (props: PropsType) => {
  const { calendar, paramsDate, prevURL, nextURL } = props;

  const year = paramsDate.getFullYear();
  const month = paramsDate.getMonth() + 1;

  return (
    <aside className="w-70">
      <CreateScheduleForm />

      <div className="mx-8 mt-5">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">
            {year}年 {month}月
          </span>
          <div>
            <Link
              href={prevURL}
              className="rounded-full px-3 py-2 font-semibold hover:bg-blue-100"
            >
              &lt;
            </Link>
            <Link
              href={nextURL}
              className="rounded-full px-3 py-2 font-semibold hover:bg-blue-100"
            >
              &gt;
            </Link>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-7 gap-3 text-center text-[10px]">
          {DAY_OF_THE_WEEK.map((dayOfWeek, index) => (
            <div key={index}>
              <div className="mx-auto size-7 text-center text-[10px] leading-7 text-gray-700">
                {dayOfWeek}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-3 text-center text-[10px]">
          {calendar.map((day, index) => (
            <div key={index}>
              <div
                className={clsx(
                  "mx-auto size-7 text-center text-[9px] leading-7 font-semibold text-gray-700",
                  day instanceof Date && "hover:rounded-full hover:bg-blue-100",
                  isToday(day ?? "") &&
                    "rounded-full bg-blue-800 text-white hover:bg-blue-800",
                )}
              >
                <div>{day?.getDate()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
