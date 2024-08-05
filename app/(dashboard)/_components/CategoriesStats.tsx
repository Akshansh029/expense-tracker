"use client";
import { GetCategoriesStatsResponseType } from "@/app/api/stats/categories/route";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DateToUTCDate, GetFormatterForCurrency } from "@/lib/helpers";
import { TransactionType } from "@/lib/types";
import { UserSettings } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";

interface Props {
  userSettings: UserSettings;
  from: Date;
  to: Date;
}

const CategoriesStats = ({ userSettings, from, to }: Props) => {
  const statsQuery = useQuery({
    queryKey: [
      "overview",
      "stats",
      "categories",
      from.toISOString(),
      to.toISOString(),
    ],
    queryFn: () =>
      fetch(
        `/api/stats/categories?from=${DateToUTCDate(from)}&to=${DateToUTCDate(
          to
        )}`
      ).then((res) => res.json()),
  });

  // console.log(statsQuery.data);

  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);
  return (
    <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
      <SkeletonWrapper isLoading={statsQuery.isPending} fullWidth={true}>
        <CatogoriesCard
          formatter={formatter}
          type="income"
          data={statsQuery.data || {}}
        />
      </SkeletonWrapper>
      <SkeletonWrapper fullWidth={true} isLoading={statsQuery.isPending}>
        <CatogoriesCard
          formatter={formatter}
          type="expense"
          data={statsQuery.data || {}}
        />
      </SkeletonWrapper>
    </div>
  );
};

export default CategoriesStats;

function CatogoriesCard({
  data,
  type,
  formatter,
}: {
  type: TransactionType;
  formatter: Intl.NumberFormat;
  data: GetCategoriesStatsResponseType;
}) {
  const filteredData = Array.isArray(data)
    ? data.filter((el) => el.type === type)
    : [];
  // const filteredData = data.filter((el) => el.type === type);
  const total = filteredData.reduce(
    (acc, el) => acc + (el._sum?.amount || 0),
    0
  );

  return (
    <Card className="h-80 w-full overflow-y-auto scrollbar scrollbar-custom">
      <CardHeader>
        <CardTitle className="grid grid-flow-row justify-between gap-2 text-muted-foreground md:grid-flex-col">
          {type === "income" ? "Incomes" : "Expenses"} by category
        </CardTitle>
      </CardHeader>
      <div className="flex items-center justify-between gap-2">
        {filteredData.length === 0 && (
          <div className="flex h-60 w-full flex-col items-center justify-center">
            No data for the selected period
            <p className="text-muted-foreground text-sm">
              Try selecting a different period or try adding new{" "}
              {type === "income" ? "income" : "expense"}
            </p>
          </div>
        )}

        {filteredData.length > 0 && (
          <ScrollArea className="h-[100%] w-full px-4 ">
            <div className="flex w-full flex-col gap-4 p-2">
              {filteredData.map((item) => {
                const amount = item._sum.amount || 0;
                const percentage = (amount * 100) / (total || amount);
                return (
                  <div className="flex flex-col gap-2" key={item.category}>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-gray-400s">
                        {item.categoryIcon} {item.category}
                        <span className="ml-2 text-sm text-muted-foreground">
                          ({percentage.toFixed(0)}%)
                        </span>
                      </span>

                      <span className="text-sm text-gray-400">
                        {formatter.format(amount)}
                      </span>
                    </div>

                    <Progress
                      value={percentage}
                      indicator={
                        type === "income" ? "bg-emerald-400" : "bg-red-400"
                      }
                    />
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </div>
    </Card>
  );
}
