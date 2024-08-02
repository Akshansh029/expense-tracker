"use client";

import { Period, Timeframe } from "@/lib/types";
import React from "react";
interface Props {
  period: Period;
  setPeriod: (period: Period) => void;
  timeframe: Timeframe;
  setTimeframe: (timeframe: Timeframe) => void;
}

const HistoryPeriodSelector = ({
  period,
  setPeriod,
  timeframe,
  setTimeframe,
}) => {
  return <div>HistoryPeriodPicker</div>;
};

export default HistoryPeriodSelector;
