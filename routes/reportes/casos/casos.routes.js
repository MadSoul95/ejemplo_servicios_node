const ControllerCasos = require('../../../controller/reportes/casos/casos.controller');
const fun_res 	      = require('../../../functions/results/results-api.functions');
const fun_val 	      = require('../../../functions/validaciones.functions');
const auth            = require("../../../middleware/auth.middleware");

module.exports = function(app){

    /* CASOS DISEÑADOS */

    //Obtiene fecha de ultima actualización en la tabla CERTIFICACION_GESTION.CASOS_DIS
    app.get('/proc-bech/api/reportes/casos-disenados/last-update', auth.fn_verifyToken, (req,res) => {
        ControllerCasos.getCasosDisenadosFromTL_lastUpdate((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'No existe información para casos disenados');
        });
    });

    //SELECT X PERIODO
    app.post('/proc-bech/api/reportes/casos-disenados/periodo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            ControllerCasos.getCasosDisenadosFromTLPeriodo(periodo,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Información no encontrada para el periodo '+periodo+'');
            });
        });
    });

    //SELECT X BUILD ID
    app.post('/proc-bech/api/reportes/casos-disenados/build', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            ControllerCasos.getCasosDisenadosFromTLBuild(id,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Información no encontrada para el build '+id+'');
            });
        });
    });

    /* CASOS EJECUTADOS */

    //Obtiene fecha de ultima actualización en la tabla CERTIFICACION_GESTION.CASOS_EJE
    app.get('/proc-bech/api/reportes/casos-ejecutados/last-update', auth.fn_verifyToken, (req,res) => {
        ControllerCasos.getCasosEjecutadosFromTL_lastUpdate((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'No existe información para casos ejecutados');
        });
    });

    //SELECT X PERIODO
    app.post('/proc-bech/api/reportes/casos-ejecutados/periodo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            ControllerCasos.getCasosEjecutadosFromTLPeriodo(periodo,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Información no encontrada para el periodo '+periodo+'');
            });
        });
    });

    //SELECT X BUILD ID
    app.post('/proc-bech/api/reportes/casos-ejecutados/build', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            ControllerCasos.getCasosEjecutadosFromTLBuild(id,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Información no encontrada para el build '+id+'');
            });
        });
    });

    //SELECT REPORTE DE INICIATIVAS X FACTURACION
    app.post('/proc-bech/api/reportes/casos-facturacion/periodo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            ControllerCasos.getReporteIniFactu(periodo,(err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'No existen Datos...');
            });
        });
    });

};