export const calculatePrice = (value: number | null, maxValue: number) => {
  const result = ((value || 0) * maxValue) / 100;
  return Number(result.toFixed(2));
};
