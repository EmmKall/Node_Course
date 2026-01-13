//import { v4 as uuidv4 } from 'uuid';
const { v4: uuidv4} = require('uuid'); //uuidv4()

const getUuid = () => {
    return uuidv4();
}

module.exports = {
    getUuid
}
