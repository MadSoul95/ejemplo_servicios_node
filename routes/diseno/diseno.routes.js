const Controller = require('../../controller/diseno/diseno.controller');
const fun_res 	 = require('../../functions/results/results-api.functions');
const fun_val 	 = require('../../functions/validaciones.functions');
const auth       = require("../../middleware/auth.middleware");

module.exports = function(app){

    //SELECT DISENADOS X DIA 
    app.post('/proc-bech/api/diseno/count/all/date', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['date'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCasosDisenoxDiaAll(date, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El día '+date+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

    //SELECT DISENADOS X PERIODO 
    app.post('/proc-bech/api/diseno/count/all/periodo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCasosDisenoxPeriodoAll(periodo, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El periodo '+periodo+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

    //SELECT DISENADOS X DIA 
    app.post('/proc-bech/api/disenof04/count/all/date', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['date'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCasosDisenoxDiaAll_NEW(date, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El día '+date+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

    //SELECT DISENADOS X PERIODO 
    app.post('/proc-bech/api/disenof04/count/all/periodo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCasosDisenoxPeriodoAll_NEW(periodo, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El periodo '+periodo+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

    //DETALLES DISENADOS F04 X DIA
    app.post('/proc-bech/api/disenof04/detalleDis/all/date', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['date'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getDetalleCasosDisenoxDiaAll(date, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El día '+date+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

    //DETALLES DISENADOS F04 X PERIODO
    app.post('/proc-bech/api/disenof04/detalleDis/all/periodo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getDetalleCasosDisenoxPeriodoAll(periodo, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El periodo '+periodo+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

};