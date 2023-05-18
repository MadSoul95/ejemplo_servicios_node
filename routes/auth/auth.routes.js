const Controller = require('../../controller/auth/auth.controller');
const fun_val 	 = require('../../functions/validaciones.functions');
const auth       = require("../../middleware/auth.middleware");

module.exports = function(app){
    app.post('/proc-bech/api/auth', (req,res) => {
		fun_val.fn_valida_param(req,res,['user','pass'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.auth(user, pass, (err, data) =>{ 
                auth.fn_results_auth(req,res,err, data,'Credenciales incorrectas');
            });
        });
    });
	
}    