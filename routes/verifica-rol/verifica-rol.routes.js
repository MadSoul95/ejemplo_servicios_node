const Controller = require('../../controller/verifica-rol/verifica-rol.controller');
const fun_res 	 = require('../../functions/results/results-api.functions');
const fun_val 	 = require('../../functions/validaciones.functions');
const auth       = require("../../middleware/auth.middleware");

module.exports = function(app){

	//Verifica si usuario posee Rol
    app.post('/proc-bech/api/verifica-rol/user', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getVerificaRolUsuario(id,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

};