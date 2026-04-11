"use client";

import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import { MAX_LENGTH_TITLE } from "@/constants/scheduleForm";
import { updateScheduleTitleSchema } from "@/schemas/scheduleSchemas";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Field, FieldError, FieldGroup } from "./ui/field";
import { useSchedule } from "@/hooks/useSchedule";
import { Schedule } from "@/types/schedule";

type PropsType = {
  schedule: Schedule;
  setIsEdit: (isEdit: boolean) => void;
};

const UpdateScheduleTitleForm = (props: PropsType) => {
  const { schedule, setIsEdit } = props;

  const { updateScheduleTitle } = useSchedule();

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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
  );
};

export default UpdateScheduleTitleForm;
