"use client";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

type PropsType = {
  paramsDate: Date;
  prevURL: string;
  nextURL: string;
};

const Header = (props: PropsType) => {
  const pathname = usePathname();

  const { paramsDate, prevURL, nextURL } = props;

  const year = paramsDate.getFullYear();
  const month = paramsDate.getMonth() + 1;
  const day = paramsDate.getDate();

  return (
    <div>
      <header className="flex h-20 justify-between">
        <div className="flex items-center gap-10">
          <span className="ml-10 hidden text-2xl sm:block">
            Next.js カレンダー
          </span>
          <Link
            href={"/"}
            className="ml-10 rounded-full border border-gray-500 bg-white px-5 py-3 text-sm hover:bg-inherit sm:ml-0"
          >
            今日
          </Link>

          <div>
            <Link
              href={prevURL}
              className="rounded-full px-3 py-2 text-xl font-bold hover:bg-blue-100"
            >
              &lt;
            </Link>
            <Link
              href={nextURL}
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
                {pathname === "/" && "月"}
                {pathname.includes("/month") && "月"}
                {pathname.includes("/week") && "週"}
                <span className="ml-1 h-1 w-2 bg-gray-900 [clip-path:polygon(0_0,100%_0%,50%_100%)]"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <Link href={`/week/${year}/${month}/${day}`}>
                  <DropdownMenuItem className="cursor-pointer">
                    週
                  </DropdownMenuItem>
                </Link>
                <Link href={`/month/${year}/${month}/`}>
                  <DropdownMenuItem className="cursor-pointer">
                    月
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
};

export default Header;
