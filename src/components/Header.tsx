import React from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { addMonths, subMonths } from "date-fns";

type PropsType = {
  paramsDate: Date;
};
const Header = (props: PropsType) => {
  const { paramsDate } = props;

  const year = paramsDate.getFullYear();
  const month = paramsDate.getMonth() + 1;

  const prevParamsDate = subMonths(paramsDate, 1);
  const nextParamsDate = addMonths(paramsDate, 1);

  const prevYear = prevParamsDate.getFullYear();
  const prevMonth = prevParamsDate.getMonth() + 1;

  const nextYear = nextParamsDate.getFullYear();
  const nextMonth = nextParamsDate.getMonth() + 1;

  return (
    <div>
      <header className="flex h-20 justify-between">
        <div className="flex items-center gap-10">
          <span className="ml-10 hidden text-2xl sm:block">
            Next.jsカレンダー
          </span>
          <Link
            href={"/"}
            className="ml-10 rounded-full border border-gray-500 bg-white px-5 py-3 text-sm hover:bg-inherit sm:ml-0"
          >
            今日
          </Link>

          <div>
            <Link
              href={`/month/${prevYear}/${prevMonth}`}
              className="rounded-full px-3 py-2 text-xl font-bold hover:bg-blue-100"
            >
              &lt;
            </Link>
            <Link
              href={`/month/${nextYear}/${nextMonth}`}
              className="rounded-full px-3 py-2 text-xl font-bold hover:bg-blue-100"
            >
              &gt;
            </Link>
          </div>
          <span className="text-xl">
            {year}年 {month}月
          </span>
        </div>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="mr-5 rounded-full border-gray-500 p-5"
              >
                月
                <span className="ml-1 h-1 w-2 bg-gray-900 [clip-path:polygon(0_0,100%_0%,50%_100%)]"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>週</DropdownMenuItem>
                <DropdownMenuItem>月</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
};

export default Header;
