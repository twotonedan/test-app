export const HOURS_OF_DAY_OPTIONS_START = Array.from({ length: 24 }, (_, i) => ({
  label: `${i < 10 ? '0' : ''}${i}:00`,
  value: i,
}));

export const HOURS_OF_DAY_OPTIONS_END = Array.from({ length: 24 }, (_, i) => ({
  label: `${i < 10 ? '0' : ''}${i}:00`,
  value: i,
}));

export const toastDismissTime = 2000;
