const tabCount = 4;
const categoryCount = 3;

/**
 * @param {number, number} tabNumber, categoryNumber
 * @return {number} returns the file number matching chosen  tab and category
 * */
export function chosenAlternativesToNumber(tab, cat) {
  if (!Number.isInteger(tab) || tab < 0 || tab >= tabCount) {
    throw new Error('Illegal Argument - Tab must be a numeric between 0 and numOfTabs');
  } else if (!Number.isInteger(cat) || cat < 0 || cat > categoryCount) {
    throw new Error('Illegal Argument - Cat must be a numeric between 0 and numOfCat');
  }
  return 1 + tab + (tabCount * cat);
}

/**
 * @param {number, number, number, number} tabNumber, imageCatategory, audioCategory, textCategory
 * @return {object}
 * */
export function getFileNames(tab, imgCat, audCat, textCat) {
  const imgNumber = chosenAlternativesToNumber(tab, imgCat);
  const audNumber = chosenAlternativesToNumber(tab, audCat);
  const textNumber = chosenAlternativesToNumber(tab, textCat);
  const fileNames = {
    img: `img${imgNumber}.svg`,
    aud: `aud${audNumber}.mp3`,
    txt: textNumber,
  };
  return fileNames;
}
