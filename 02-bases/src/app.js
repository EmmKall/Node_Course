// const templateExport01 = require('./js-fundation/01-template');
// const {emailTemplate} = require('./js-fundation/01-template');
// const templateExport01 = require('./js-fundation/02-destructuring');

//console.log(templateExport01.emailTemplate);
// console.log(emailTemplate);

// const {getuserById} = require('./js-fundation/03-callback');

// const id = 4;

// getuserById(id, function (error, user){
//     if(error){
//         throw new Error(`User not found with id: ${id}`);
//         return console.log(`User not found with id: ${id}`);
//     }
//     console.log('user:', user);
// });

// const {getuserById} = require('./js-fundation/04-arrow');
// const id = 1;
// getuserById(id, (error, user) => {
//     if(error) throw new Error(`User not found with id: ${id}`);
//     console.log(user);
// });


// const { getAgeHelper, getUuid } = require('./plugins');
// const {buildMakePerson} = require('./js-fundation/05-factory');

// const makePerson = buildMakePerson({getAgeHelper, getUuid});
// const jhon = makePerson({name: 'Jhon', birthdate: '1990-01-01'});
// console.log(jhon);
//jhon.greeting();


//import axios from 'axios';
/* const axios = require('axios');
const {getPokemonById} = require('./js-fundation/06-promises');

getPokemonById(1)
.then(pokemon => console.log(pokemon))
.catch(error => console.log(error)); */

const { buildLogger } = require('./plugins');

const logger = buildLogger('app.js');
logger.log('Hello world');
logger.error('Hello world error');
