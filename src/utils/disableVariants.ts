type DisableObject = {
  [key: string]: {
    table: {
      disable: boolean;
    };
  };
};

export function disableVariants(array: string[]) {
  const result: DisableObject = {};
  array.forEach((item: string) => {
    result[item] = {
      table: {
        disable: true,
      },
    };
  });
  return result;
}
