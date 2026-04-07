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
import { updateScheduleTitleSchema } from "@/schemas/scheduleSchemas";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Field, FieldError, FieldGroup } from "./ui/field";

type PropsType = {
  schedule: Schedule;
};

const ScheduleItem = (props: PropsType) => {
  const { schedule } = props;

  const { updateScheduleTitle, deleteSchedule } = useSchedule();

  const [isEdit, setIsEdit] = useState(false);

  const form = useForm({
    resolver: zodResolver(updateScheduleTitleSchema),
    defaultValues: { title: schedule.title },
  });

  const onSubmit = (data: z.infer<typeof updateScheduleTitleSchema>) => {
    const { title } = data;
    updateScheduleTitle(schedule, title);
    setIsEdit(false);
  };

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
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-1 gap-1"
              >
                <FieldGroup>
                  <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Input
                          {...field}
                          id="title"
                          aria-invalid={fieldState.invalid}
                          placeholder="タイトルを追加"
                          autoComplete="off"
                          className="w-90"
                          maxLength={MAX_LENGTH_TITLE}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
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
                    onClick={() => {
                      deleteSchedule(schedule);
                    }}
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
