const tabCount = 4;
const categoryCount = 3;

/**
 * @param {number, number} tabNumber, categoryNumber
 * @return {number} returns the file number matching chosen  tab and category
 * */
export function chosenAlternativesToNumber(tab, cat) {
  if (!Number.isInteger(tab) || tab < 0 || tab > tabCount) {
    throw new Error('Illegal Argument - Tab must be a numeric between 0 and numOfTabs');
  } else if (!Number.isInteger(cat) || cat < 0 || cat > categoryCount) {
    throw new Error('Illegal Argument - Cat must be a numeric between 0 and numOfCat');
  }
  return (cat - 1) * tabCount + tab;
}

/**
 * @param {number, number} tabNumber, categoryNumber
 * @return {object}
 * */
export function getFileNames(tab, cat) {
  const number = chosenAlternativesToNumber(tab, cat);
  const fileNames = {
    img: `img${number}.svg`,
    aud: `aud${number}.mp3`,
    txt: `txt${number}.json`,
  };
  return fileNames;
}
