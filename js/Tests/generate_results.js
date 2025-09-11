// Sinhala Alphabet Game Test Result Image Generator
// This script simulates the result screen for each level and generates a PNG image for each.
// Place this file in the js/Tests folder and run it in a browser or with Node.js + canvas.

// --- CONFIG ---
const vowels = [
    {char: 'අ', ans: 'a'}, {char: 'ආ', ans: 'aa'},
    {char: 'ඇ', ans: 'ae'}, {char: 'ඈ', ans: 'aeae'},
    {char: 'ඉ', ans: 'i'}, {char: 'ඊ', ans: 'ii'},
    {char: 'උ', ans: 'u'}, {char: 'ඌ', ans: 'uu'},
    {char: 'එ', ans: 'e'}, {char: 'ඒ', ans: 'ee'},
    {char: 'ඔ', ans: 'o'}, {char: 'ඕ', ans: 'oo'}
];
const consonants = [
    {char:'ක',ans:'ka'}, {char:'ග',ans:'ga'}, {char:'ච',ans:'che'},
    {char:'ඡ',ans:'ja'}, {char:'ට',ans:'ta'}, {char:'ඬ',ans:'nda'},
    {char:'ණ',ans:'na'}, {char:'ත',ans:'ta'}, {char:'ද',ans:'da'},        
    {char:'න',ans:'na'}, {char:'ප',ans:'pa'}, {char:'බ',ans:'ba'},
    {char:'ම',ans:'ma'}, {char:'ය',ans:'ya'}, {char:'ර',ans:'ra'},
    {char:'ල',ans:'la'}, {char:'ව',ans:'va'}, {char:'ස',ans:'sa'},
    {char:'හ',ans:'ha'}, {char:'ළ',ans:'la'}, {char:'අං',ans:'am'}
];

const levels = [
  {name: 'basic', mistakes: 1, file: 'result_basic.png'},
  {name: 'intermediate', mistakes: 2, file: 'result_intermediate.png'},
  {name: 'advanced', mistakes: 3, file: 'result_advanced.png'}
];

// --- DRAWING ---
function drawResult(level, cb) {
  const width = 900, height = 600;
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0,0,width,height);
  ctx.font = 'bold 32px sans-serif';
  ctx.fillStyle = '#222';
  ctx.fillText('Level Complete!', 30, 50);
  ctx.font = '20px sans-serif';
  ctx.fillText('Level: ' + level.name.charAt(0).toUpperCase() + level.name.slice(1), 30, 90);
  ctx.fillText('Vowels', 30, 140);
  let y = 170, x = 30;
  vowels.forEach((v, i) => {
    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#28a745';
    ctx.fillText(v.char, x, y);
    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#333';
    ctx.fillText('(' + v.ans + ')', x, y+22);
    x += 60;
    if ((i+1)%6 === 0) { x = 30; y += 50; }
  });
  y += 60; x = 30;
  ctx.font = '20px sans-serif';
  ctx.fillStyle = '#222';
  ctx.fillText('Consonants', 30, y);
  y += 30;
  consonants.forEach((c, i) => {
    ctx.font = '28px sans-serif';
    // Mark mistakes in red, correct in green, rest in gray
    if (i < level.mistakes) ctx.fillStyle = '#dc3545';
    else ctx.fillStyle = '#28a745';
    ctx.fillText(c.char, x, y);
    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#333';
    ctx.fillText('(' + c.ans + ')', x, y+22);
    x += 60;
    if ((i+1)%7 === 0) { x = 30; y += 50; }
  });
  // Save as image
  canvas.toBlob(function(blob) {
    cb(blob);
  }, 'image/png');
}

// --- MAIN ---
function saveAllResults() {
  levels.forEach((level, idx) => {
    drawResult(level, function(blob) {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = level.file;
      a.click();
    });
  });
}

// Uncomment to run in browser:
// saveAllResults();

// To use in Node.js, replace canvas creation with node-canvas and fs.writeFileSync
