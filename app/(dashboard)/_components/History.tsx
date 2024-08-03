"use client";

import React, { useCallback, useMemo, useState } from "react";
import { UserSettings } from "@prisma/client";
import { Period, Timeframe } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HistoryPeriodSelector from "./HistoryPeriodSelector";
import { GetFormatterForCurrency } from "@/lib/helpers";
import { useQuery } from "@tanstack/react-query";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";
import CountUp from "react-countup";

// Define the props interface for the History component
interface HistoryProps {
  userSettings: UserSettings;
}

// The History component to display historical data
const History = ({ userSettings }: HistoryProps) => {
  const [timeFrame, setTimeFrame] = useState<Timeframe>("month");
  const [period, setPeriod] = useState<Period>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  // Memoize the currency formatter to optimize performance
  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);

  // Fetch history data using react-query with queryKey based on timeFrame and period
  const historyDataQuery = useQuery({
    queryKey: ["overview", "history", timeFrame, period],
    queryFn: () =>
      fetch(
        `/api/history-data?timeframe=${timeFrame}&year=${period.year}&month=${period.month}`
      ).then((res) => res.json()),
  });

  // Determine if data is available for rendering the chart
  const dataAvailable =
    historyDataQuery.data && historyDataQuery.data.length > 0;

  return (
    <div className="container">
      <h2 className="mt-12 text-3xl font-bold">History</h2>
      <Card className="col-span-12 mt-2 w-full">
        <CardHeader className="gap-2">
          <CardTitle className="grid grid-flow-row justify-between gap-2 md:grid-flow-col">
            {/* Component for selecting history periods */}
            <HistoryPeriodSelector
              period={period}
              setPeriod={setPeriod}
              timeframe={timeFrame}
              setTimeframe={setTimeFrame}
            />

            <div className="flex h-10 gap-2">
              {/* Badges for income and expense legend */}
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
        <CardContent>
          {/* Wrapper to show skeleton loading animation while data is being fetched */}
          <SkeletonWrapper isLoading={historyDataQuery.isFetching}>
            {dataAvailable ? (
              <ResponsiveContainer width={"100%"} height={300}>
                <BarChart
                  height={300}
                  data={historyDataQuery.data}
                  barCategoryGap={5}
                >
                  {/* Defining gradients for bar colors */}
                  <defs>
                    <linearGradient id="incomeBar" x1="0" y1="0" x2="1" y2="1">
                      <stop
                        offset={"0"}
                        stopColor="#10b981"
                        stopOpacity={"1"}
                      />
                      <stop
                        offset={"1"}
                        stopColor="#10b981"
                        stopOpacity={"0"}
                      />
                    </linearGradient>
                    <linearGradient id="expenseBar" x1="0" y1="0" x2="1" y2="1">
                      <stop
                        offset={"0"}
                        stopColor="#ef4444"
                        stopOpacity={"1"}
                      />
                      <stop
                        offset={"1"}
                        stopColor="#ef4444"
                        stopOpacity={"0"}
                      />
                    </linearGradient>
                  </defs>
                  {/* Grid for the chart */}
                  <CartesianGrid
                    strokeDasharray="5 5"
                    strokeOpacity={"0.2"}
                    vertical={false}
                  />
                  {/* X-axis configuration */}
                  <XAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    padding={{ left: 5, right: 5 }}
                    dataKey={(data) => {
                      const { year, month, day } = data;
                      const date = new Date(year, month, day || 1);
                      if (timeFrame === "year") {
                        return date.toLocaleDateString("default", {
                          month: "long",
                        });
                      }
                      return date.toLocaleDateString("default", {
                        day: "2-digit",
                      });
                    }}
                  />
                  {/* Y-axis configuration */}
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false} // Ensure only integer values
                  />
                  {/* Bar components for income and expense */}
                  <Bar
                    dataKey={"income"}
                    label="Income"
                    fill="url(#incomeBar)"
                    radius={2}
                    className="cursor-pointer"
                    barSize={20}
                  />
                  <Bar
                    dataKey={"expense"}
                    label="Expense"
                    fill="url(#expenseBar)"
                    radius={2}
                    className="cursor-pointer"
                    barSize={20}
                  />
                  {/* Tooltip with custom content */}
                  <Tooltip
                    cursor={{ opacity: 0.15 }}
                    content={(props) => (
                      <CustomTooltip formatter={formatter} {...props} />
                    )}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              // Message when no data is available
              <Card className="flex h-[300px] flex-col items-center justify-center bg-background">
                No data for the selected period
                <p className="text-sm text-muted-foreground">
                  Try selecting a different period or adding new transactions
                </p>
              </Card>
            )}
          </SkeletonWrapper>
        </CardContent>
      </Card>
    </div>
  );
};

export default History;

// CustomTooltip Component to display custom tooltip content
function CustomTooltip({ active, payload, formatter }: any) {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;
  const { income, expense } = data;

  return (
    <div className="min-w-[300px] rounded border bg-background p-4">
      {/* Rows for Income, Expense, and Balance */}
      <TooltipRow
        formatter={formatter}
        label="Income"
        value={income}
        bgColor="bg-emerald-500"
        textColor="text-emerald-500"
      />
      <TooltipRow
        formatter={formatter}
        label="Expense"
        value={expense}
        bgColor="bg-red-500"
        textColor="text-red-500"
      />
      <TooltipRow
        formatter={formatter}
        label="Balance"
        value={income - expense}
        bgColor="bg-gray-500"
        textColor="text-gray-500"
      />
    </div>
  );
}

function TooltipRow({
  label,
  value,
  bgColor,
  textColor,
  formatter,
}: {
  label: string;
  textColor: string;
  value: number;
  bgColor: string;
  formatter: Intl.NumberFormat;
}) {
  const formattingFn = useCallback(() => {
    return formatter.format(value);
  }, [formatter, value]);

  return (
    <div className="flex items-center gap-2">
      <div className={cn("h-4 w-4 rounded-full", bgColor)} />
      <div className="flex w-full justify-between">
        <p className="text-sm text-muted-foreground">{label} </p>
        <div className={cn("text-sm font-bold", textColor)}>
          <CountUp
            duration={0.5}
            preserveValue
            end={value}
            decimals={0}
            formattingFn={formattingFn}
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );
}
