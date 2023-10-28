export const pluralize = (quantity: number, singular: string, plural: string, includeQuantity?: boolean) => {
  const pluralized = quantity === 1 ? singular : plural;
  return includeQuantity ? `${quantity} ${pluralized}` : pluralized;
};
