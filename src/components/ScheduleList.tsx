"use client";

import { isSameDay } from "date-fns";
import ScheduleItem from "./ScheduleItem";
import { useSchedule } from "@/hooks/useSchedule";

type PropsType = {
  day: Date;
};

const ScheduleList = (Props: PropsType) => {
  const { day } = Props;

  const { schedules } = useSchedule();

  return (
    <>
      <div className="mt-2 flex flex-col gap-1">
        {schedules.map(
          (schedule) =>
            isSameDay(schedule.scheduledAt, day) && (
              <ScheduleItem key={schedule.id} schedule={schedule} />
            ),
        )}
      </div>
    </>
  );
};

export default ScheduleList;
