var soap    = require('soap');
var async   = require("async");
var RoutePM          = require('../../properties/properties');
var propertiesReader = require('properties-reader');
var properties       = propertiesReader(RoutePM.fn_environment()+'/pm_soap.properties');

//Capturas URL del servicio SOAP
var soapURL = properties.get('url.pm');
var botUser = properties.get('bot.user');
var botPass = properties.get('bot.pass');

//CREAR OBJETO
//AGREGAR METODOS userModel
let myModel = {};

//LOGIN-PM
// Status Code
// 3 = User not registered!
// 4 = Wrong password
myModel.login = (userid, password, callback) => {

    var wsdl = soapURL+'/sysBECH/en/classic/services/wsdl2';
    var params = {userid: userid, password: password};
    var method = "login";

    soap.createClient(wsdl, function(err, client) {
        if(!err){
            if (typeof client[method] === "function") {
                client[method](params, function(err, result) {
                    callback(err,result);
                });
            }else{
                //Error al invocar metodo del webservice SOAP
                callback('El metodo '+method+' no existe',null);
            }
        }else{
            //Error al conectar a la URL del webservice SOAP
            callback(err,null);
        }
    });

};

//Create User PM
//Status Code
// -1 = Password surprases the maximun length allowed
//  7 = Username already exists
//  0 = Usuario Creado
myModel.createUser = (userId, password, firstname, lastname, email, callback) => {

    myModel.login(botUser, botPass, function callbackLogin(err, data){
        if(!err){
            if(data.status_code == 0){
                const sessionId = data.message;
                var wsdl = soapURL+'/sysBECH/en/classic/services/wsdl2';
                var role = 'PROCESSMAKER_OPERATOR';
                var params = {  sessionId:sessionId, userId: userId, password:password,
                                firstname: firstname, lastname:lastname, email:email, role: role};
                var method = "createUser";

                soap.createClient(wsdl, function(err, client) {
                    if(!err){
                        if (typeof client[method] === "function") {
                            client[method](params, function(err, result) {
                                callback(err,result);
                            });
                        }else{
                            //Error al invocar metodo del webservice SOAP
                            callback('El metodo '+method+' no existe',null);
                        }
                    }else{
                        //Error al conectar a la URL del webservice SOAP
                        callback(err,null);
                    }
                });
            }else{
                //Error de Login
                callback(data,null);
            }
        }else{
            //Error al conectar a la URL del webservice SOAP
            callback(err,null);
        }
    });
};

//Asigna Grupo User PM
//Status Code
//3 = User not registered!
//8 = User already exists in the group
//9 = Group not registered in the system
//0 = Grupo Asignado correctamente
myModel.assignUserToGroup = (userId, groupId, callback) => {

    myModel.login(botUser, botPass, function callbackLogin(err, data){
        if(!err){
            if(data.status_code == 0){
                const sessionId = data.message;
                var wsdl = soapURL+'/sysBECH/en/classic/services/wsdl2';
                var params = {  sessionId:sessionId, userId: userId, groupId:groupId };
                var method = "assignUserToGroup";

                soap.createClient(wsdl, function(err, client) {
                    if(!err){
                        if (typeof client[method] === "function") {
                            client[method](params, function(err, result) {
                                callback(err,result);
                            });
                        }else{
                            //Error al invocar metodo del webservice SOAP
                            callback('El metodo '+method+' no existe',null);
                        }
                    }else{
                        //Error al conectar a la URL del webservice SOAP
                        callback(err,null);
                    }
                });
            }else{
                //Error de Login
                callback(data,null);
            }
        }else{
            //Error al conectar a la URL del webservice SOAP
            callback(err,null);
        }
    });
};

//Quita Grupo User PM
//Status Code
//3 = User not registered!
//9 = Group not registered in the system
//8 = User not registered in the group
//0 = Grupo eliminado
myModel.removeUserFromGroup = (userId, groupId, callback) => {

    myModel.login(botUser, botPass, function callbackLogin(err, data){
        if(!err){
            if(data.status_code == 0){
                const sessionId = data.message;
                var wsdl = soapURL+'/sysBECH/en/classic/services/wsdl2';
                var params = {  sessionId:sessionId, userId: userId, groupId:groupId };
                var method = "removeUserFromGroup";

                soap.createClient(wsdl, function(err, client) {
                    if(!err){
                        if (typeof client[method] === "function") {
                            client[method](params, function(err, result) {
                                callback(err,result);
                            });
                        }else{
                            //Error al invocar metodo del webservice SOAP
                            callback('El metodo '+method+' no existe',null);
                        }
                    }else{
                        //Error al conectar a la URL del webservice SOAP
                        callback(err,null);
                    }
                });
            }else{
                //Error de Login
                callback(data,null);
            }
        }else{
            //Error al conectar a la URL del webservice SOAP
            callback(err,null);
        }
    });
};

//exportamos nuestro modelo
module.exports = myModel;
