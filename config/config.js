const config = require('./config.json'),
    defaultConfig = config.development,
    environment = process.env.NODE_ENV || 'development',
    environmentConfig = config[environment],
    finalConfig = Object.assign(defaultConfig, environmentConfig);

global.gConfig = finalConfig;

console.log('global config: ', JSON.stringify(global.gConfig, undefined, global.gConfig.json_indentation));