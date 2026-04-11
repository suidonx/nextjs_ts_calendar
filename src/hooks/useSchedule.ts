import { ScheduleContext } from "@/contexts/scheduleContext";
import { createScheduleSchema } from "@/schemas/scheduleSchemas";
import { Schedule } from "@/types/schedule";
import { useContext } from "react";
import { toast } from "sonner";
import z from "zod";

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error("useScheduleはProviderで囲む必要があります");
  }

  const { schedules, setSchedules } = context;

  const createSchedule = (data: z.infer<typeof createScheduleSchema>) => {
    setSchedules([...schedules, { id: crypto.randomUUID(), ...data }]);
    toast.success("予定を追加しました", {
      position: "top-center",
    });
  };

  const updateScheduleTitle = (schedule: Schedule, title: string) => {
    setSchedules(
      schedules.map((val) => {
        if (val.id === schedule.id) {
          return { ...val, title };
        }
        return val;
      }),
    );
    toast.success("タイトルを更新しました", {
      position: "top-center",
    });
  };

  const deleteSchedule = (schedule: Schedule) => {
    setSchedules(schedules.filter((val) => val.id !== schedule.id));
    toast.success("予定を削除しました", {
      position: "top-center",
    });
  };

  return {
    schedules,
    setSchedules,
    createSchedule,
    updateScheduleTitle,
    deleteSchedule,
  };
};
