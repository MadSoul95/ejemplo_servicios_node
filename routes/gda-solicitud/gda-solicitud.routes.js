const Controller = require('../../controller/gda-solicitud/gda-solicitud.controller');
const fun_res 	 = require('../../functions/results/results-api.functions');
const fun_val 	 = require('../../functions/validaciones.functions');
const auth       = require("../../middleware/auth.middleware");

module.exports = function(app){

    //SELECT SOLICITUD REALIZADAS EN UN PERIODO
    app.post('/proc-bech/api/gda-solicitud/solicitudes/periodo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getAllSolicitudesxPeriodo(periodo, (err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //SELECT SOLICITUD x GSOL_ID
    app.post('/proc-bech/api/gda-solicitud/solicitudes/gsol_id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['gsol_id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getAllSolicitudesxGsolId(gsol_id, (err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //==

    //SELECT SOLICITUDES (COMBOBOX)
    app.get('/proc-bech/api/gda-solicitud/getAllSolicitudesCbo', auth.fn_verifyToken, (req,res) => {
        Controller.getAllSolicitudesCbo((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });

    //SELECT SOLICITUDES POR ESTADO GRUPO (COMBOBOX)
    app.post('/proc-bech/api/gda-solicitud/getAllSolicitudesCbo/est_grupo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['est_grupo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getAllSolicitudesCboxEstGrupo(est_grupo, (err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //==

    //SELECT CANTIDAD DE DATOS SOLICITUD X GSOL_ID
    app.post('/proc-bech/api/gda-solicitud/cant_datos/gsol_id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['gsol_id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCantDatosxGsolId(gsol_id, (err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //SELECT CANTIDAD DE DATOS SOLICITUD X Periodo
    app.post('/proc-bech/api/gda-solicitud/cant_datos/periodo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCantDatosxPeriodo(periodo, (err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //SELECT CANTIDAD DE DATOS SOLICITUD X Periodo x Tipo Solicitante
    app.post('/proc-bech/api/gda-solicitud/cant_datos/periodo/ti_solicitante', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo','ti_solicitante'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCantDatosxPeriodoxTipoSolicitante(periodo, ti_solicitante, (err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //==

    //SELECT TIPO PRUEBA Y TIPO SOLICITUD AGRUPADOS DE SOLICITUDES REALIZADAS EN UN PERIODO DE DOS FECHAS
    app.post('/proc-bech/api/gda-solicitud/tipo-prueba_tipo-solicitud/amb/periodo/between', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['amb','fec_ini','fec_term'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getSol_TipoPruebaTipoSolicitudxAmbxPeriodoBetween(amb, fec_ini, fec_term, (err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //TRAE LA CANTIDAD DE SOLICITUD POR PERIODO - AMBIENTE - TIPO PRUBA - TIPO SOLICITUD
    app.post('/proc-bech/api/gda-solicitud/count/periodo-amb-ti_pru-ti_sol', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo','amb','ti_pru','ti_sol'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCountSolPeriodoxAmbxTiPruxTiSol(periodo, amb, ti_pru, ti_sol, (err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //TRAE LA CANTIDAD DE SOLICITUD POR PERIODO
    app.post('/proc-bech/api/gda-solicitud/count/periodo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCountSolPeriodo(periodo,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //TRAE LA CANTIDAD DE TIPO DE SOLICITUD POR PERIODO
    app.post('/proc-bech/api/gda-solicitud/count/ti-sol/periodo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCountTiSolPeriodo(periodo,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //==

    //SELECT TIPO PRUEBA Y TIPO SOLICITUD AGRUPADOS DE SOLICITUDES QUE HAYAN PASADO POR TESTING REALIZADAS EN UN PERIODO DE DOS FECHAS 
    app.post('/proc-bech/api/gda-solicitud/tipo-prueba_tipo-solicitud/amb/periodo/between/testing', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['amb','fec_ini','fec_term'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getSol_TipoPruebaTipoSolicitudxAmbxPeriodoBetweenxTesting(amb, fec_ini, fec_term, (err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //TRAE LA CANTIDAD DE SOLICITUD QUE HAYAN PASADO POR TESTING POR PERIODO - AMBIENTE - TIPO PRUBA - TIPO SOLICITUD
    app.post('/proc-bech/api/gda-solicitud/count/periodo-amb-ti_pru-ti_sol/testing', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo','amb','ti_pru','ti_sol'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCountSolPeriodoxAmbxTiPruxTiSolxTesting(periodo, amb, ti_pru, ti_sol, (err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //TRAE LA CANTIDAD DE SOLICITUD QUE HAYAN POR TESTING POR PERIODO
    app.post('/proc-bech/api/gda-solicitud/count/periodo/testing', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCountSolPeriodoxTesting(periodo,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //TRAE LA CANTIDAD DE TIPO DE SOLICITUD QUE HAYAN POR TESTING POR PERIODO
    app.post('/proc-bech/api/gda-solicitud/count/ti-sol/periodo/testing', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCountTiSolPeriodoxTesting(periodo,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //==

    //SELECT TIPO PRUEBA Y TIPO SOLICITUD AGRUPADOS DE SOLICITUDES QUE HAYAN PASADO POR GESTION DE DATOS REALIZADAS EN UN PERIODO DE DOS FECHAS 
    app.post('/proc-bech/api/gda-solicitud/tipo-prueba_tipo-solicitud/amb/periodo/between/gest_de_datos', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['amb','fec_ini','fec_term'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getSol_TipoPruebaTipoSolicitudxAmbxPeriodoBetweenxGestDeDatos(amb, fec_ini, fec_term, (err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //TRAE LA CANTIDAD DE SOLICITUD QUE HAYAN PASADO POR GESTION DE DATOS POR PERIODO - AMBIENTE - TIPO PRUBA - TIPO SOLICITUD
    app.post('/proc-bech/api/gda-solicitud/count/periodo-amb-ti_pru-ti_sol/gest_de_datos', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo','amb','ti_pru','ti_sol'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCountSolPeriodoxAmbxTiPruxTiSolxGestDeDatos(periodo, amb, ti_pru, ti_sol, (err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //TRAE LA CANTIDAD DE SOLICITUD QUE HAYAN POR GESTION DE DATOS POR PERIODO
    app.post('/proc-bech/api/gda-solicitud/count/periodo/gest_de_datos', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCountSolPeriodoxGestDeDatos(periodo,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //TRAE LA CANTIDAD DE TIPO DE SOLICITUD QUE HAYAN POR GESTION DE DATOS POR PERIODO
    app.post('/proc-bech/api/gda-solicitud/count/ti-sol/periodo/gest_de_datos', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCountTiSolPeriodoxGestDeDatos(periodo,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //==

    //SELECT TIPO PRUEBA, TIPO SOLICITUD Y SOLICITANTE AGRUPADOS DE SOLICITUDES REALIZADAS EN UN PERIODO DE DOS FECHAS
    app.post('/proc-bech/api/gda-solicitud/solicitante-tipo-prueba_tipo-solicitud/amb/periodo/between', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['amb','fec_ini','fec_term'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getSol_SolicitanteTipoPruebaTipoSolicitudxAmbxPeriodoBetween(amb, fec_ini, fec_term, (err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //TRAE LA CANTIDAD DE SOLICITUD POR PERIODO - AMBIENTE - SOLICITANTE - TIPO PRUBA - TIPO SOLICITUD
    app.post('/proc-bech/api/gda-solicitud/count/periodo-amb-solicitante-ti_pru-ti_sol', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo','amb','solicitante','ti_pru','ti_sol'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCountSolPeriodoxAmbxSolicitantexTiPruxTiSol(periodo, amb, solicitante, ti_pru, ti_sol, (err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //==

    //SELECT TIPO PRUEBA, TIPO SOLICITUD Y VALIDADOR GDA AGRUPADOS DE SOLICITUDES REALIZADAS EN UN PERIODO DE DOS FECHAS
    app.post('/proc-bech/api/gda-solicitud/val-gda_tipo-prueba_tipo-solicitud/amb/periodo/between', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['amb','fec_ini','fec_term'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getSol_ValGDATipoPruebaTipoSolicitudxAmbxPeriodoBetween(amb, fec_ini, fec_term, (err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //TRAE LA CANTIDAD DE SOLICITUD POR PERIODO - AMBIENTE - VALIDADOR GDA - TIPO PRUBA - TIPO SOLICITUD
    app.post('/proc-bech/api/gda-solicitud/count/periodo-amb-val_gda-ti_pru-ti_sol', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo','amb','val_gda','ti_pru','ti_sol'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCountSolPeriodoxAmbxValGDAxTiPruxTiSol(periodo, amb, val_gda, ti_pru, ti_sol, (err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //==

    //SELECT TIPO PRUEBA, TIPO SOLICITUD (CONCAT) Y ID SOLICITUD
    app.post('/proc-bech/api/gda-solicitud/tipo-prueba_tipo-solicitud-concat/amb/periodo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['amb','periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getSol_TipoPruebaTipoSolicitudConcatxAmbxPeriodo(amb, periodo, (err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //SELECT TIPO PRUEBA, TIPO SOLICITUD (CONCAT) Y ID SOLICITUD x Ambiente x TipoSolicitante
    app.post('/proc-bech/api/gda-solicitud/tipo-prueba_tipo-solicitud-concat/amb/ti_solicitante/periodo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['amb','ti_solicitante','periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getSol_TipoPruebaTipoSolicitudConcatxAmbxTipoSolicitantexPeriodo(amb, ti_solicitante, periodo, (err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //==

    //SELECT VALIDADOR GDA, TIPO PRUEBA, TIPO SOLICITUD (CONCAT) Y ID SOLICITUD
    app.post('/proc-bech/api/gda-solicitud/val-gda_tipo-prueba_tipo-solicitud-concat/amb/periodo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['amb','periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getSol_ValGDATipoPruebaTipoSolicitudConcatxAmbxPeriodo(amb, periodo, (err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //SELECT VALIDADOR GDA, TIPO PRUEBA, TIPO SOLICITUD (CONCAT) Y ID SOLICITUD x Ambiente x TipoSolicitante
    app.post('/proc-bech/api/gda-solicitud/val-gda_tipo-prueba_tipo-solicitud-concat/amb/ti_solicitante/periodo', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['amb','ti_solicitante','periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getSol_ValGDATipoPruebaTipoSolicitudConcatxAmbxTipoSolicitantexPeriodo(amb, ti_solicitante, periodo, (err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });


    
};