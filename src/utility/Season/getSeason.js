export function getSeason(month = new Date().getMonth()) {
  if ([11, 0, 1].includes(month)) return 'winter';
  if ([2, 3, 4].includes(month)) return 'spring';
  if ([5, 6, 7].includes(month)) return 'summer';
  if ([8, 9].includes(month)) return 'monsoon'; // optional
  if ([10].includes(month)) return 'fall';
  return 'summer';
}