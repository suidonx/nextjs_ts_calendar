import { ScheduleContext } from "@/contexts/scheduleContext";
import { useContext } from "react";

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error("useScheduleはProviderで囲む必要があります");
  }
  return context;
};
