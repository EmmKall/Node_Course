var getAge = require('get-age');

const getAgeHelper = (birthdate: string) => {
    if(!birthdate) throw new Error('birthdate is required');
    return getAge(birthdate);
}

module.exports = {
    getAgeHelper
};
