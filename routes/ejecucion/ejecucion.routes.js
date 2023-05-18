const Controller = require('../../controller/ejecucion/ejecucion.controller');
const fun_res 	 = require('../../functions/results/results-api.functions');
const fun_val 	 = require('../../functions/validaciones.functions');
const auth       = require("../../middleware/auth.middleware");

module.exports = function(app){
    //SELECT EJECUTADOS X DIA 
    app.post('/proc-bech/api/ejecucion/count/all/date', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['date'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCasosEjecucionxDiaAll(date, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El día '+date+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

    //SELECT EJECUTADOS X DIA APROBADOS Y RECHAZADOS
    app.post('/proc-bech/api/ejecucion/count/aprobados-rechazados/date', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['date'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCasosEjecucionxDiaAprobRech(date, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El día '+date+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

    //SELECT EJECUTADOS X DIA EXCEPTO NO APLICA
    app.post('/proc-bech/api/ejecucion/count/all-without-noaplica/date', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['date'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCasosEjecucionxDiaAllWithoutNoAplica(date, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El día '+date+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

    //SELECT EJECUTADOS X DIA X STATUS 
    app.post('/proc-bech/api/ejecucion/count/status/date', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['status', 'date'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCasosEjecucionxStatusxDate(status, date, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El status '+status+' y el día '+date+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

    //SELECT EJECUTADOS X DIA X Tipo Ejecucion (Manual-Auto) 
    app.post('/proc-bech/api/ejecucion/count/tipo_ejec/date', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['tipo_ejec', 'date'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCasosEjecucionxTipoEjectxDate(tipo_ejec, date, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El Tipo de Ejecución '+tipo_ejec+' y el día '+date+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

    //SELECT EJECUTADOS X DIA X Tipo Ejecucion (Manual-Auto) - EXCEPTO NO APLICA
    app.post('/proc-bech/api/ejecucion/count/without-noaplica/tipo_ejec/date', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['tipo_ejec', 'date'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCasosEjecucionxWithoutNoAplicaTipoEjectxDate(tipo_ejec, date, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El Tipo de Ejecución '+tipo_ejec+' y el día '+date+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

    //PERIODO ANIO-MES
    //SELECT EJECUTADOS X PERIODO 
    app.post('/proc-bech/api/ejecucion/count/all/periodo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCasosEjecucionxPeriodoAll(periodo, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El periodo '+periodo+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

    //SELECT EJECUTADOS X PERIODO APROBADOS Y RECHAZADOS
    app.post('/proc-bech/api/ejecucion/count/aprobados-rechazados/periodo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCasosEjecucionxPeriodoAprobRech(periodo, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El periodo '+periodo+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

    //SELECT EJECUTADOS X PERIODO EXCEPTO NO APLICA
    app.post('/proc-bech/api/ejecucion/count/all-without-noaplica/periodo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCasosEjecucionxPeriodoAllWithoutNoAplica(periodo, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El periodo '+periodo+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

    //SELECT EJECUTADOS X PERIODO X STATUS 
    app.post('/proc-bech/api/ejecucion/count/status/periodo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['status', 'periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCasosEjecucionxStatusxPeriodo(status, periodo, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El status '+status+' y el periodo '+periodo+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

    //SELECT EJECUTADOS X PERIODO X Tipo Ejecucion (Manual-Auto) 
    app.post('/proc-bech/api/ejecucion/count/tipo_ejec/periodo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['tipo_ejec', 'periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCasosEjecucionxTipoEjectxPeriodo(tipo_ejec, periodo, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El Tipo de Ejecución '+tipo_ejec+' y el periodo '+periodo+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

    //SELECT EJECUTADOS X PERIODO X Tipo Ejecucion (Manual-Auto) - EXCEPTO NO APLICA
    app.post('/proc-bech/api/ejecucion/count/without-noaplica/tipo_ejec/periodo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['tipo_ejec', 'periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCasosEjecucionxWithoutNoAplicaTipoEjectxPeriodo(tipo_ejec, periodo, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El Tipo de Ejecución '+tipo_ejec+' y el día '+periodo+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

    ///SELECTS DE CASOS EJECUTADOS USUARIOS FÁBRICA 
    //SELECT EJECUTADOS X DIA EXCEPTO NO APLICA
    app.post('/proc-bech/api/ejecucionFab/count/all-without-noaplica/date', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['date'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCasosEjecucionxDiaAllWithoutNoAplica_NEW(date, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El día '+date+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

    //SELECT EJECUTADOS X DIA X STATUS 
    app.post('/proc-bech/api/ejecucionFab/count/status/date', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['status', 'date'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCasosEjecucionxStatusxDate_NEW(status, date, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El status '+status+' y el día '+date+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

    //SELECT EJECUTADOS X PERIODO EXCEPTO NO APLICA
    app.post('/proc-bech/api/ejecucionFab/count/all-without-noaplica/periodo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCasosEjecucionxPeriodoAllWithoutNoAplica_NEW(periodo, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El periodo '+periodo+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

    //SELECT EJECUTADOS X PERIODO X STATUS 
    app.post('/proc-bech/api/ejecucionFab/count/status/periodo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['status', 'periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCasosEjecucionxStatusxPeriodo_NEW(status, periodo, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El status '+status+' y el periodo '+periodo+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

    ///////////////////////DETALLE DE CASOS EJECUTADOR POR FABRICA/////////////////////////
    ///////SELECT DETALLE EJECUTADOS X DIA EXCEPTO NO APLICA////
    app.post('/proc-bech/api/ejecucionFab/detalles/without-noaplica/date', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['date'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getDetalleCasosEjexDiaAllWithoutNoAplica(date, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El día '+date+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });
    ///////SELECT DETALLE CASOS X DIA X ESTADO////
    app.post('/proc-bech/api/ejecucionFab/detalles/status/date', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['date', 'status'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getDetalleCasosEjexStatusxDate(date, status, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El status '+status+' y el día '+date+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });
    ///////SELECT DETALLE EJECUTADOS X PERIODO EXCEPTO NO APLICA////
    app.post('/proc-bech/api/ejecucionFab/detalles/without-noaplica/periodo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getDetalleCasosEjexPeriodoAllWithoutNoAplica(periodo, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El periodo '+periodo+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });
    ///////SELECT DETALLE CASOS X DIA X ESTADO////
    app.post('/proc-bech/api/ejecucionFab/detalles/status/periodo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo', 'status'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getDetalleCasosEjexStatusxPeriodo(periodo, status, (err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'El status '+status+' y el periodo '+periodo+' no contiene casos...');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });
};