export function checkArrayForString(arr: Array<string>) {
  return arr.every((str) => typeof str === 'string');
}
