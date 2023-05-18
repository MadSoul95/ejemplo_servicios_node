const Controller   	= require('../../controller/gda-control/gda-control.controller');
const fun_res 	    = require('../../functions/results/results-api.functions');
const fun_val 	    = require('../../functions/validaciones.functions');
const auth          = require("../../middleware/auth.middleware");

module.exports = function(app){

                                                                                        
    //SELECT ESTADOS MENT_REG_INI X ACT
    app.get('/proc-bech/api/gda-control/getAllCSol', auth.fn_verifyToken, (req,res) => {
        Controller.getAllCSOL((err, data) =>{
            fun_res.fn_results_select_sp(req,res,err, data,'Sin información');
        });                                     
    });

  	//SP DETALLE FILTRO BUSQUEDA REQUERIMIENTO X ID 

    app.post('/proc-bech/api/gda-control/getDetalSol', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['idtas'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getDetalSol(idtas,(err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'No existen Datos...');
            });
        });
    });

    //COUNT SOLICITUDES GDA PENDIENTES UNASSIGNED
    app.get('/proc-bech/api/gda-control/getAllPendBandeja', auth.fn_verifyToken, (req,res) => {
        Controller.getAllPendBandeja((err, data) =>{
            fun_res.fn_results_select_sp(req,res,err, data,'Sin información');
        });                                     
    });

    //COUNT SOLICITUDES GDA PENDIENTES UNASSIGNED
    app.get('/proc-bech/api/gda-control/getDetPendBandeja', auth.fn_verifyToken, (req,res) => {
        Controller.getDetalSolPendBandeja((err, data) =>{
            fun_res.fn_results_select_sp(req,res,err, data,'Sin información');
        });                                     
    });

    //SP DETALLE FILTRO BUSQUEDA REQUERIMIENTO X CASE/ITERACION 
    app.post('/proc-bech/api/gda-control/getDetalCaseIter', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['idcase','iter'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getDetalCaseIter(idcase,iter,(err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'No existen Datos...');
            });
        });
    });

    //SP DETALLE FILTRO BUSQUEDA REQUERIMIENTO X CASE/ITERACION (HISTORICO)
    app.post('/proc-bech/api/gda-control/getDetalHisCase', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['idcase','iter'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getDetalHisCase(idcase,iter,(err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'No existen Datos...');
            });
        });
    });

    //SP DOCUMENTOS X CASE

    app.post('/proc-bech/api/gda-control/getDocCase', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['idcase'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getDocCase(idcase,(err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'No existen Datos...');
            });
        });
    });

// export    
};
