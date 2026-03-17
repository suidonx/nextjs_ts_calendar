import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DAY_OF_THE_WEEK } from "@/constants/calendar";
import { Plus } from "lucide-react";
export default function Home() {
  return (
    <div>
      <header className="flex h-20 justify-between">
        <div className="flex items-center gap-10">
          <span className="ml-10 hidden text-2xl sm:block">
            Next.jsカレンダー
          </span>
          <Button
            variant="outline"
            className="ml-10 rounded-full border-gray-500 p-5 sm:ml-0"
          >
            今日
          </Button>

          <div>
            <Button
              variant="ghost"
              className="rounded-full text-xl font-bold hover:bg-blue-100"
            >
              &lt;
            </Button>
            <Button
              variant="ghost"
              className="rounded-full text-xl font-bold hover:bg-blue-100"
            >
              &gt;
            </Button>
          </div>
          <span className="text-xl">2026年 3月</span>
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
      <div className="flex h-[calc(100vh-80px)]">
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
              <span className="font-medium">2026年 3月</span>
              <div>
                <Button
                  variant="ghost"
                  className="rounded-full font-semibold hover:bg-blue-100"
                >
                  &lt;
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-full font-semibold hover:bg-blue-100"
                >
                  &gt;
                </Button>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-7 gap-3 text-center text-[10px]">
              {DAY_OF_THE_WEEK.map((value, index) => (
                <div key={index}>
                  <div className="mx-auto size-7 text-center text-[10px] leading-7 text-gray-700">
                    {value}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-3 text-center text-[10px]">
              {[...Array(35)].map((value, index) => (
                <div key={index}>
                  <div className="mx-auto size-7 text-center text-[9px] leading-7 font-semibold text-gray-700 hover:rounded-full hover:bg-blue-100">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
        <main className="mb-5 grid flex-1 grid-cols-7 rounded-full">
          {[...Array(35)].map((value, index) => (
            <div key={index} className="border bg-white pt-1">
              {index <= 7 && (
                <div className="text-center text-[12px]">
                  {DAY_OF_THE_WEEK[index]}
                </div>
              )}
              <div className="mx-auto size-7 text-center text-[11px] leading-7 hover:rounded-full hover:bg-blue-100">
                {index + 1}
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
