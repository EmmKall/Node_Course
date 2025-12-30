const fs = require('fs');

const data = fs.readFileSync('readme.md', 'utf8');

const newData = data.replace(/What is Lorem Ipsum?/ig, 'What the fuck is the life?');

fs.writeFileSync('readme_2.md', newData);

