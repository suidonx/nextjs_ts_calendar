import { ScheduleContext } from "@/contexts/scheduleContext";
import { Schedule } from "@/types/schedule";
import { useContext } from "react";

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error("useScheduleはProviderで囲む必要があります");
  }

  const { schedules, setSchedules } = context;

  const updateScheduleTitle = (schedule: Schedule, title: string) => {
    setSchedules(
      schedules.map((val) => {
        if (val.id === schedule.id) {
          return { ...val, title };
        }
        return val;
      }),
    );
  };

  const deleteSchedule = (schedule: Schedule) => {
    setSchedules(schedules.filter((val) => val.id !== schedule.id));
  };

  return { schedules, setSchedules, updateScheduleTitle, deleteSchedule };
};
