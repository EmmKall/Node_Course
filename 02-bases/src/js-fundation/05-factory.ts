//const { getAgeHelper, getUuid } = require('../plugins');

interface buildPersonOptions {
    getUuid: () => string;
    getAgeHelper: (birthdate: string) => number;
}

interface personI {
    name: string,
    birthdate: string
}

export const buildMakePerson = ({getUuid, getAgeHelper}: buildPersonOptions) => {
    return ({name, birthdate}: personI) => {
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
