// const fs = require('fs');
import fs from 'fs';
import { yarg } from './config/plugins/yargs.plugin';

const {b, l ,s} = yarg;
let content: string = `
===============================
     Tabla del ${b}
===============================
`;

for(let i = 1; i <=l; i++){ content += `${b} * ${i} = ${b*i} \n`; }

fs.writeFileSync(`output/tabla-${b}.txt`, content);
console.log('File wrote')
if(s) console.log(content);