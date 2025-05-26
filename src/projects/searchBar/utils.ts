export const debounce = (fn: any, delay: number) => {
  let timeOut: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => fn(...args), delay);
  };
};
