export const arraysAreEqual = (prevArray: any[], nextArray: any[]) => {
  if (prevArray.length !== nextArray.length) return false;
  let s = new Set([...prevArray, ...nextArray]);
  if (s.size !== nextArray.length) return false;
  return true;
};