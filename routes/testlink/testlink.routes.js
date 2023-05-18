const Controller = require('../../controller/testlink/testlink.controller');
const fun_res 	 = require('../../functions/results/results-api.functions');
const fun_val 	 = require('../../functions/validaciones.functions');
const auth       = require("../../middleware/auth.middleware");

module.exports = function(app){

	//Valida Build esta asociado en procesos
    app.post('/proc-bech/api/testlink/validate/build-proceso', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getValidateBuildProceso(id,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'El build ['+id+'] no se encuentra asociado en Procesos.');
            });
        });
    });

};