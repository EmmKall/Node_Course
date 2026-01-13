//const { getAgeHelper, getUuid } = require('../plugins');

const buildMakePerson = ({getUuid, getAgeHelper}) => {
    return ({name, birthdate}) => {
    
        return {
        id: getUuid(),
        name, 
        birthdate,
        age: getAgeHelper(birthdate),
        greeting() {
            console.log(`Hello, ${this.name}`);
        }
    }

};
};


// const jhon = buildPerson(obj);
// console.log(jhon);
// jhon.greeting();

module.exports = {
 buildMakePerson,
};
