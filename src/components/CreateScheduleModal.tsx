import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MAX_DATE_STRING,
  MAX_LENGTH_TITLE,
  MIN_DATE_STRING,
} from "@/constants/scheduleForm";
import { useSchedule } from "@/hooks/useSchedule";
import { zodResolver } from "@hookform/resolvers/zod";
import { createScheduleSchema } from "@/schemas/scheduleSchemas";
import z from "zod";

const CreateScheduleModal = () => {
  const { createSchedule } = useSchedule();

  const form = useForm({
    resolver: zodResolver(createScheduleSchema),
    defaultValues: { title: "", scheduledAt: "" },
  });

  const onSubmit = (data: z.infer<typeof createScheduleSchema>) => {
    createSchedule(data);
  };

  return (
    <Dialog>
      <form onSubmit={form.handleSubmit(onSubmit)} id="form">
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="mt-2 ml-5 rounded-xl p-6 shadow-sm sm:max-w-sm"
          >
            <Plus />
            作成
          </Button>
        </DialogTrigger>
        <DialogContent className="mt-2 ml-5 rounded-xl p-6 shadow-sm">
          <DialogHeader>
            <DialogTitle>予定を追加</DialogTitle>
            <DialogDescription>
              追加したい予定のタイトルと日付を入力できます
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">タイトル</FieldLabel>
                  <Input
                    {...field}
                    id="title"
                    aria-invalid={fieldState.invalid}
                    placeholder="タイトルを追加"
                    autoComplete="off"
                    maxLength={MAX_LENGTH_TITLE}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Label htmlFor="date">日付</Label>
            <Controller
              name="scheduledAt"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="scheduledAt"
                    type="date"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    min={MIN_DATE_STRING}
                    max={MAX_DATE_STRING}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">戻る</Button>
            </DialogClose>
            <Button type="submit" form="form">
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateScheduleModal;
