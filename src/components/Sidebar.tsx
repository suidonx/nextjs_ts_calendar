import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { DAY_OF_THE_WEEK } from "@/constants/dayOfTheWeek";
import clsx from "clsx";
import { addMonths, isToday, subMonths } from "date-fns";
import Link from "next/link";

type PropsType = {
  calendar: (Date | undefined)[];
  paramsDate: Date;
};

const Sidebar = (props: PropsType) => {
  const { calendar, paramsDate } = props;

  const year = paramsDate.getFullYear();
  const month = paramsDate.getMonth() + 1;

  const prevParamsDate = subMonths(paramsDate, 1);
  const nextParamsDate = addMonths(paramsDate, 1);

  const prevYear = prevParamsDate.getFullYear();
  const prevMonth = prevParamsDate.getMonth() + 1;

  const nextYear = nextParamsDate.getFullYear();
  const nextMonth = nextParamsDate.getMonth() + 1;

  return (
    <aside className="w-70">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="mt-2 ml-5 rounded-xl p-6 shadow-sm"
          >
            <Plus />
            作成
            <span className="ml-1 h-1 w-2 bg-gray-900 [clip-path:polygon(0_0,100%_0%,50%_100%)]"></span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>予定</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="mx-8 mt-5">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">
            {year}年 {month}月
          </span>
          <div>
            <Link
              href={`/month/${prevYear}/${prevMonth}`}
              className="rounded-full px-3 py-2 font-semibold hover:bg-blue-100"
            >
              &lt;
            </Link>
            <Link
              href={`/month/${nextYear}/${nextMonth}`}
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
