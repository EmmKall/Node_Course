const { getAgeHelper } = require('../plugins/get-age.pluging');
const { getUuid } = require('../plugins/get-uuid.plugin');
const { httpClientPlugin } = require('../plugins/http-client.plugin');
const buildLogger = require('../plugins/logger.pluging');

module.exports = {
 getAgeHelper,
 getUuid,
 http: httpClientPlugin,
 buildLogger,
};