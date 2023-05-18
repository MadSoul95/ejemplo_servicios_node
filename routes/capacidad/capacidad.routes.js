const Controller = require('../../controller/capacidad/capacidad.controller');
const fun_res 	 = require('../../functions/results/results-api.functions');
const fun_val 	 = require('../../functions/validaciones.functions');
const auth       = require("../../middleware/auth.middleware");

module.exports = function(app){

    //capacidad nominal x Día
    app.post('/proc-bech/api/capacidad/count/max_nominal/date', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['date'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCapacidadCountMaximaNominalxDia(date, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select_sp(req,res,err, data,'Sin Información');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

    //capacidad real x Día
    app.post('/proc-bech/api/capacidad/count/real/date', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['date'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCapacidadCountRealxDia(date, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select_sp(req,res,err, data,'Sin Información');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

    //uso de fabrica
    app.post('/proc-bech/api/capacidad/usofabrica/suma/creal', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['suma','creal'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getUsoFabrica(suma,creal, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select_sp(req,res,err, data,'Sin Información');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

};