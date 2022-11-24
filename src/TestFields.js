import {
  getRandomInt,
  getAllExcerptsMultiFieldObject,
  getAllExcerptsSingleFieldObject,
} from './FieldGenerator';


const testBasicInfoFields = {
  'Name': 'Test Name',
  'Age': getRandomInt(20, 30),
  'Years': getRandomInt(1, 10),
  'MusicIdentity': 'Test Identity',
  'ListenHabit': 'Test Habit',
  'Feedback': 'Test Feedback Text',
};
const testFamiliarityFields = getAllExcerptsSingleFieldObject(1, 10,
  'FamiliarityRatingExcerpt', [1, 2, 3, 4, 5]);
const testEmotionChangeTextFields = getAllExcerptsSingleFieldObject(1, 10,
  'EmotionChangeTextExcerpt', ['Test String']);
const testOverallEmotionRatingFields = getAllExcerptsMultiFieldObject(1, 10,
  [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]);
const testEmotionChangeRatingFields = getAllExcerptsMultiFieldObject(1, 10,
  ['no_change', 'low_change', 'moderate_change', 'high_change']);

export {
  testBasicInfoFields,
  testFamiliarityFields,
  testEmotionChangeTextFields,
  testOverallEmotionRatingFields,
  testEmotionChangeRatingFields,
};