const valOf = (key) =>
  new Map([
    ['I', 1],
    ['V', 5],
    ['X', 10],
    ['L', 50],
    ['C', 100],
    ['D', 500],
    ['M', 1000],
  ]).get(key);
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  console.log(s, s[0], valOf(s[0]));
  if (s.length === 0) return 0;
  if (s.length === 1) return valOf(s);
  let value = valOf(s[0]);
  if (valOf(s[0]) >= valOf(s[1])) {
    value += romanToInt(s.slice(1, s.length));
    return value;
  } else {
    value = valOf(s[1]) - value;
    value += romanToInt(s.slice(2, s.length));
    return value;
  }
};
