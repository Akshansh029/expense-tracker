export const Currencies = [
  { value: "USD", label: "$ Dollar", locale: "en-US" },
  { value: "USD", label: "€ Euro", locale: "de-DE" },
  { value: "USD", label: "¥ Yen", locale: "ja-JP" },
  { value: "USD", label: "£ Pound", locale: "en-GB" },
];

export type Currency = (typeof Currencies)[0];
