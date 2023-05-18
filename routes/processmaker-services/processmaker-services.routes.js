const Controller = require('../../controller/processmaker-services/processmaker-services.controller');
const fun_resPM  = require('../../functions/results/results-api-processmaker-services.functions');
const fun_val 	 = require('../../functions/validaciones.functions');
const auth       = require("../../middleware/auth.middleware");

module.exports = function(app){

    //LOGIN PM
    app.post('/proc-bech/api/processmaker/soap/login', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['userid','password'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.login(userid, password, (err, data) =>{
                fun_resPM.fn_results_pmSoap(req,res,err, data,'Ha ocurrido un error en PM...');
            });
        });
    });

    //Create User PM
    app.post('/proc-bech/api/processmaker/soap/createUser', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['userId', 'password', 'firstname','lastname','email'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.createUser(userId, password, firstname, lastname, email, (err, data) =>{
                console.log(data);
                fun_resPM.fn_results_pmSoap(req,res,err, data,'Ha ocurrido un error en PM...');
            });
        });
    });

    //Asigna Grupo User PM
    app.post('/proc-bech/api/processmaker/soap/assignUserToGroup', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['userId', 'groupId'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.assignUserToGroup(userId, groupId, (err, data) =>{
                console.log(data);
                fun_resPM.fn_results_pmSoap(req,res,err, data,'Ha ocurrido un error en PM...');
            });
        });
    });

    //Quita Grupo User PM
    app.post('/proc-bech/api/processmaker/soap/removeUserFromGroup', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['userId', 'groupId'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.removeUserFromGroup(userId, groupId, (err, data) =>{
                console.log(data);
                fun_resPM.fn_results_pmSoap(req,res,err, data,'Ha ocurrido un error en PM...');
            });
        });
    });


};
