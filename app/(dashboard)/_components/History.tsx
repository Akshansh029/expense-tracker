"use client";

import React, { useState } from "react";
import { UserSettings } from "@prisma/client";
import { Period, TimeframeType } from "@/lib/types";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const History = ({ userSettings }: { userSettings: UserSettings }) => {
  const [timeFrame, setTimeFrame] = useState<TimeframeType>("month");
  const [period, setPeriod] = useState<Period>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  return (
    <div className="container">
      <h2 className="mt-12 text-3xl font-bold">History</h2>
      <Card className="col-span-12 mt-2 w-full">
        <CardHeader className="gap-2">
          <CardTitle className="grid grid-flow-row justify-between gap-2 md:grid-flow-col">
            <HistoryPeriodSelector
              period={period}
              setPeriod={setPeriod}
              timeframe={timeFrame}
              setTimeFrame={setTimeFrame}
            />

            <div className="flex h-10 gap-2">
              <Badge
                variant={"outline"}
                className="flex items-center gap-2 text-sm"
              >
                <div className="h-4 w-4 rounded-full bg-emerald-500"></div>
                Income
              </Badge>
              <Badge
                variant={"outline"}
                className="flex items-center gap-2 text-sm"
              >
                <div className="h-4 w-4 rounded-full bg-red-500"></div>
                Expense
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default History;
