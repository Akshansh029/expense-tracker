"use client";

import { DateRangePicker } from "@/components/ui/date-range-picker";
import { UserSettings } from "@prisma/client";
import { startOfMonth } from "date-fns";
import { useState } from "react";

const Overview = ({ userSettings }: UserSettings) => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2 p-6">
        <h2 className="text-3xl font-bold">Overview</h2>
        <div className="flex items-center gap-3">
          <DateRangePicker />
        </div>
      </div>
    </>
  );
};

export default Overview;
