const fs = require("fs");

const data = fs.readFileSync("readme.md", "utf8");

const words = data.split(" ");
const totalWords = words.length;

console.log(`Total words: ${totalWords}`);

const WordsLorem = words.filter((word) => word.includes("Lorem") );
const totalLorem = WordsLorem.length;

console.log(`Lorem word total: ${totalLorem}`);

const totalRegexLorem = words.match(/Lorem/gi ?? []).length;
console.log(`Total Lorem words with regex: ${totalRegexLorem}`);