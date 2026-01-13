const { getAgeHelper } = require('../plugins/get-age.pluging');
const { getUuid } = require('../plugins/get-uuid.plugin');
// const { httpClientPlugin } = require('../plugins/http-client.plugin');
// const buildLogger = require('../plugins/logger.pluging');
//import { getAgeHelper } from '../plugins/get-age.plug';
import { httpClientPlugin as http } from '../plugins/http-client.plugin';
import { buildLogger } from '../plugins/logger.pluging';

export {
 getAgeHelper,
 getUuid,
 http,
 buildLogger,
};