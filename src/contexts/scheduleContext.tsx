"use client";

import { Schedule } from "@/types/schedule";
import { createContext, ReactNode, useState } from "react";

type SchedulesContextType = {
  schedules: Schedule[];
  setSchedules: (schedules: Schedule[]) => void;
};

export const ScheduleContext = createContext<SchedulesContextType | undefined>(
  undefined,
);

export const ScheduleContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  return (
    <ScheduleContext.Provider value={{ schedules, setSchedules }}>
      {children}
    </ScheduleContext.Provider>
  );
};
