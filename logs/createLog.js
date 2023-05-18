const log4js = require('log4js');
const path   = require('path');
const filePath = path.join(__dirname);

log4js.configure({
    appenders: { cheese: { type: 'file', filename: ''+filePath+'/log.log' } },
categories: { 
    default: { appenders: ['cheese'], level: 'info' },
}
});

exports.fn_createLog = log4js.getLogger('cheese');