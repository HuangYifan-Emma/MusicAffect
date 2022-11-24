const wordArray = ['valence', 'tension_arousal', 'energy_arousal'];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const getAllExcerptsSingleFieldObject = (
  firstExcerptID, lastExcerptID, fieldPrefix, initialValueArray) => {
  const initialArrayLength = initialValueArray.length;
  const singleExcerptObject = Array.from(
    {length: lastExcerptID - firstExcerptID + 1}, (_, i) => i + 1)
    .map((i) => {
      return {
        [`${fieldPrefix}${i}`]: initialValueArray[getRandomInt(0,
          initialArrayLength)],
      };
    });
  return Object.assign({}, ...singleExcerptObject);
};
const getAllExcerptsMultiFieldObject = (
  firstExcerptID, lastExcerptID, initialValueArray) => {
  const initialArrayLength = initialValueArray.length;
  const getExcerptMultiFieldObject = (wordArray, excerptID) => wordArray.reduce(
    (item, value) => ({
      ...item,
      [`Excerpt${excerptID}_${value}`]: initialValueArray[getRandomInt(0,
        initialArrayLength)],
    }), {});
  const wordObjectArray = Array.from(
    {length: lastExcerptID - firstExcerptID + 1}, (_, i) => i + 1)
    .map((i) => getExcerptMultiFieldObject(wordArray, i));
  return Object.assign({}, ...wordObjectArray);
};

export {
  wordArray,
  getRandomInt,
  getAllExcerptsSingleFieldObject,
  getAllExcerptsMultiFieldObject,
};