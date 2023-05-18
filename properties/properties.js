var path             = require('path');
var filePath         = path.join(__dirname, '../properties/');
var propertiesReader = require('properties-reader');
var properties       = propertiesReader(filePath+'/environment.properties');

module.exports.fn_environment = function () {
    var ambiente = properties.get('env.env');
    if(ambiente == "dev"){
        return filePath+'dev';
    }else{
        return filePath+'prod';
    }
};