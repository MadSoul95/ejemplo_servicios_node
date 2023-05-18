const Controller = require('../../controller/dates/dates.controller');
const fun_res 	 = require('../../functions/results/results-api.functions');
const fun_val 	 = require('../../functions/validaciones.functions');
const auth       = require("../../middleware/auth.middleware");

module.exports = function(app){

	//FECHA ACTUAL
    app.get('/proc-bech/api/dates/getDate', auth.fn_verifyToken, (req,res) => {
		Controller.getDate((err, data) =>{ 
			fun_res.fn_results_select(req,res,err, data,'Sin información');
		});
	});

	//FECHA info
	app.post('/proc-bech/api/dates/infoDate', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['date'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getDateInfo(date, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'Sin Información');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
	});
	
	//info Periodo
	app.post('/proc-bech/api/dates/infoPeriodo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getPeriodoInfo(periodo, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'Sin Información');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

	//PERIODOS (MESES)
	app.post('/proc-bech/api/dates/getPeriodos/meses', auth.fn_verifyToken, (req,res) => {
		fun_val.fn_valida_param(req,res,['fec_min'],['fec_max'], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getPeriodosMeses(fec_min, fec_max, (err, err2, data) =>{ 
				if(!err2){
					fun_res.fn_results_select(req,res,err, data,'Periodos no disponibles');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
	});
	
	//PERIODOS (AÑOS)
	app.post('/proc-bech/api/dates/getPeriodos/anios', auth.fn_verifyToken, (req,res) => {
		fun_val.fn_valida_param(req,res,['anio_min'],['anio_max'], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getPeriodosAnios(anio_min, anio_max, (err, err2, data) =>{ 
				if(!err2){
					fun_res.fn_results_select(req,res,err, data,'Periodos no disponibles');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
	});
	
	//PERIODOS SEMANA (DIAS)
	app.post('/proc-bech/api/dates/getPeriodos/semana_dias', auth.fn_verifyToken, (req,res) => {
		fun_val.fn_valida_param(req,res,['date'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getPeriodosSemanaDias(date, (err, err2, data) =>{ 
				if(!err2){
					fun_res.fn_results_select(req,res,err, data,'Periodos no disponibles');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
	});
	
	//PERIODO MES (DIAS)
	app.post('/proc-bech/api/dates/getPeriodos/mes_dias', auth.fn_verifyToken, (req,res) => {
		fun_val.fn_valida_param(req,res,['date'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getPeriodosMesDias(date, (err, err2, data) =>{ 
				if(!err2){
					fun_res.fn_results_select(req,res,err, data,'Periodos no disponibles');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });
	
};

   