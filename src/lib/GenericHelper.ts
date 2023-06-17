export function containsObject(obj: any, list: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) {
  var x;
  for (x in list) {
    if (list.hasOwnProperty(x) && list[x] === obj) {
      return true;
    }
  }

  return false;
}
