const Controller = require('../../controller/postcertificacion/postcertificacion.controller');
const fun_res 	 = require('../../functions/results/results-api.functions');
const fun_val 	 = require('../../functions/validaciones.functions');
const auth       = require("../../middleware/auth.middleware");

module.exports = function(app){
    //capacidad nominal x Día
    app.post('/proc-bech/api/postcertificacion/email-post', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['v_bld','v_ejec','v_nom_ejec','v_estado','v_observacion'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getMailPostCertificacion(v_bld,v_ejec,v_nom_ejec,v_estado,v_observacion, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select_sp(req,res,err, data,'Sin Información');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });
};