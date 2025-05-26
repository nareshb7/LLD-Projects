export const debounce = (fn: any, delay: number) => {
  let timeOut: number;
  return (...args: any) => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => fn(...args), delay);
  };
};
