//获取两个年份之间的数组
export const getTwoYearArray = (start, end = new Date().getFullYear()) => {
  if (start > end) return {};
  return Array.from(
    { length: end - start + 1 },
    (_, index) => index + start,
  ).reduce(
    (acc, cur) => ({
      ...acc,
      [cur]: {
        text: cur,
      },
    }),
    {},
  );
};
//防抖
export const debounce = (fn, delay = 300) => {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};
