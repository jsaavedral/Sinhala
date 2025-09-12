// Sinhala Numbers Game Data and Logic
// This file provides the data and rendering logic for a numbers game similar to the alphabet game.
// It uses pairs of numbers per exercise, with Sinhala numerals and their transliterations/values.

// Number data: 0-10, 11-20, 30,40,...100, 1000
const sinhalaNumbers = [
  {char: '0', sinhala: '෦', ans: '0', word: 'ශූන්‍ය', word_en: 'Shoonya'},
  {char: '1', sinhala: '෧', ans: '1', word: 'එක', word_en: 'Eka'},
  {char: '2', sinhala: '෨', ans: '2', word: 'දෙක', word_en: 'Deka'},
  {char: '3', sinhala: '෩', ans: '3', word: 'තුන', word_en: 'Thuna'},
  {char: '4', sinhala: '෪', ans: '4', word: 'හතර', word_en: 'Hathara'},
  {char: '5', sinhala: '෫', ans: '5', word: 'පහ', word_en: 'Paha'},
  {char: '6', sinhala: '෬', ans: '6', word: 'හය', word_en: 'Haya'},
  {char: '7', sinhala: '෭', ans: '7', word: 'හත', word_en: 'Hatha'},
  {char: '8', sinhala: '෮', ans: '8', word: 'අට', word_en: 'Ata'},
  {char: '9', sinhala: '෯', ans: '9', word: 'නවය', word_en: 'Nawaya'},
  {char: '10', sinhala: 'ෲ', ans: '10', word: 'දහය', word_en: 'Dahaya'},
  {char: '11', sinhala: '', ans: '11', word: 'එකොළහ', word_en: 'Ekolaha'},
  {char: '12', sinhala: '', ans: '12', word: 'දොළහ', word_en: 'Dolaha'},
  {char: '13', sinhala: '', ans: '13', word: 'දහතුන', word_en: 'Dahathuna'},
  {char: '14', sinhala: '', ans: '14', word: 'දහහතර', word_en: 'Dahahathara'},
  {char: '15', sinhala: '', ans: '15', word: 'පහලොස්', word_en: 'Pahalos'},
  {char: '16', sinhala: '', ans: '16', word: 'දහසය', word_en: 'Dahasaya'},
  {char: '17', sinhala: '', ans: '17', word: 'දහහත', word_en: 'Dahahatha'},
  {char: '18', sinhala: '', ans: '18', word: 'දහඅට', word_en: 'Dahaata'},
  {char: '19', sinhala: '', ans: '19', word: 'දහනවය', word_en: 'Dahanawaya'},
  {char: '20', sinhala: '', ans: '20', word: 'විස්ස', word_en: 'Vissa'},
  {char: '30', sinhala: '', ans: '30', word: 'තිහ', word_en: 'Thihaya'},
  {char: '40', sinhala: '', ans: '40', word: 'හතලිහ', word_en: 'Hataliha'},
  {char: '50', sinhala: '', ans: '50', word: 'පනහ', word_en: 'Panaha'},
  {char: '60', sinhala: '', ans: '60', word: 'හැට', word_en: 'Hatawa'},
  {char: '70', sinhala: '', ans: '70', word: 'හැත්තෑව', word_en: 'Hathawa'},
  {char: '80', sinhala: '', ans: '80', word: 'අසූව', word_en: 'Asuwawa'},
  {char: '90', sinhala: '', ans: '90', word: 'අනූව', word_en: 'Anunawa'},
  {char: '100', sinhala: '', ans: '100', word: 'සියය', word_en: 'Seeyak'},
  {char: '1000', sinhala: '', ans: '1000', word: 'දහස', word_en: 'Dahasak'}
];

// Group numbers into pairs for exercises
function getNumberGroups() {
  const groups = [];
  for (let i = 0; i < 11; i += 2) groups.push(sinhalaNumbers.slice(i, i + 2)); // 0-10
  for (let i = 11; i < 21; i += 2) groups.push(sinhalaNumbers.slice(i, i + 2)); // 11-20
  // Add 30,40,...100,1000 as pairs
  for (let i = 21; i < sinhalaNumbers.length; i += 2) groups.push(sinhalaNumbers.slice(i, i + 2));
  return groups;
}

// Export for use in the main game script
if (typeof window !== 'undefined') {
  window.sinhalaNumbers = sinhalaNumbers;
  window.getNumberGroups = getNumberGroups;
}
