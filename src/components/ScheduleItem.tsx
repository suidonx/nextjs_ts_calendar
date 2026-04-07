"use client";

import { Schedule } from "@/types/schedule";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ja } from "date-fns/locale/ja";
import { Pencil, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { MAX_LENGTH_TITLE } from "@/constants/scheduleForm";
import { useSchedule } from "@/hooks/useSchedule";

type PropsType = {
  schedule: Schedule;
};

const ScheduleItem = (props: PropsType) => {
  const { schedule } = props;

  const { updateScheduleTitle, deleteSchedule } = useSchedule();

  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(schedule.title);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="mr-2 h-4 cursor-pointer justify-start rounded-sm bg-sky-500 pl-2 text-[11px] leading-4 text-white hover:bg-sky-600 hover:text-white data-[state=open]:bg-sky-600 data-[state=open]:text-white"
        >
          {schedule.title}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-110 bg-gray-100" align="start" side="right">
        <PopoverHeader>
          <div className="flex justify-between text-xl">
            {!isEdit ? (
              <PopoverTitle>{schedule.title}</PopoverTitle>
            ) : (
              <form
                id="updateTitleForm"
                onSubmit={(e) => {
                  e.preventDefault();
                  updateScheduleTitle(schedule, title);
                  setIsEdit(false);
                }}
                className="flex gap-1"
              >
                <Input
                  placeholder="タイトルを追加"
                  className="w-90"
                  maxLength={MAX_LENGTH_TITLE}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <button
                  type="submit"
                  form="updateTitleForm"
                  className="ml-2 cursor-pointer"
                >
                  <Save size={18} className="text-teal-500" />
                </button>
              </form>
            )}
            <div className="flex gap-3">
              {!isEdit && (
                <>
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => {
                      setIsEdit(true);
                    }}
                  >
                    <Pencil size={18} className="text-blue-500" />
                  </button>
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => deleteSchedule(schedule)}
                  >
                    <Trash2 size={20} className="text-red-500" />
                  </button>
                </>
              )}
            </div>
          </div>
          <PopoverDescription className="mt-2">
            {format(schedule.scheduledAt, "PPPP", {
              locale: ja,
            })}
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
};

export default ScheduleItem;
