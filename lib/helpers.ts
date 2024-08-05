import { Currencies } from "./currencies";

export function DateToUTCDate(date: Date) {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  );
}

export function DateToISTDate(date: Date): Date {
  const utcDate = new Date(date.getTime());

  const IST_OFFSET = 5.5 * 60 * 60 * 1000;

  const istDate = new Date(utcDate.getTime() + IST_OFFSET);

  return istDate;
}

export function GetFormatterForCurrency(currency: string) {
  const locale = Currencies.find((c) => c.value === currency)?.locale;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  });
}
