var RouteDB          = require('../properties/properties');
var propertiesReader = require('properties-reader');
var properties       = propertiesReader(RouteDB.fn_environment()+'/api.properties');
const createLog      = require("../logs/createLog").fn_createLog;


module.exports.fnProcesosApi_authBechTestLink = function (user, pass, callback) {
    var response = [];
    var unirest = require('unirest');
    var req = unirest('POST', ''+properties.get('api.url_testlink')+''+properties.get('api.port_testlink')+'/proc-bech-testlink/api/auth')
    .headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    })
    .send('user='+user+'')
    .send('pass='+pass+'')
    .end(function (res) { 
        if (res.error){
            createLog.error('capturaToken.function.js => fnProcesosApi_authBechTestLink => ' + err);
            response.push(false, res.error, 0); 
            callback(response);
        }else{
            var obj = res.body;
            if(obj.success == true){
                createLog.info('capturaToken.function.js => fnProcesosApi_authBechTestLink => CORRECTO');
                response.push(true, 0, obj.token); 
                callback(response);
            }else{
                createLog.error('capturaToken.function.js => fnProcesosApi_authBechTestLink => ' + obj.message);
                response.push(false, obj.message, 0); 
                callback(response);
            } 
        }
    });
};