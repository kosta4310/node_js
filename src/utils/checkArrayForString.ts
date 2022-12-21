export function checkArrayForString(arr: Array<any>) {
  let isString = true;
  arr.forEach((element) => {
    if (typeof element !== 'string') {
      isString = false;
    }
  });
  return isString;
}
