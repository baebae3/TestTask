export const SORT_BY_HIGH_PRICE = "SORT_BY_HIGH_PRICE";
export const SORT_BY_LOW_PRICE = "SORT_BY_LOW_PRICE";
export const SORT_BY_DURATION = "SORT_BY_DURATION";
export const SORT_BY_NONSTOP = "SORT_BY_NONSTOP";
export const SORT_BY_STOP = "SORT_BY_STOP";
export const SORT_BY_PRICE1 = "SORT_BY_PRICE1";

export const sortByHighPrice = () => ({
  type: SORT_BY_HIGH_PRICE,
});

export const sortByLowPrice = () => ({
  type: SORT_BY_LOW_PRICE,
});

export const sortByDuration = () => ({
  type: SORT_BY_DURATION,
});

export const sortByNonStop = () => ({
  type: SORT_BY_NONSTOP,
});

export const sortByStop = () => ({
  type: SORT_BY_STOP,
});

export const sortByPrice1 = (item) => ({
  type: SORT_BY_PRICE1,
  payload: item,
});
