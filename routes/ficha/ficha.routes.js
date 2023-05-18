const Controller   	= require('../../controller/ficha/ficha.controller');
const fun_res 	    = require('../../functions/results/results-api.functions');
const fun_val 	    = require('../../functions/validaciones.functions');
const auth          = require("../../middleware/auth.middleware");

module.exports = function(app){

    //SELECT DATOS BASICOS INICIATIVA
    app.post('/proc-bech/api/ficha/getDatosIniciativaId/id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getDatosIniciativaId(id,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //SELECT DATOS SECCION A FICHA
    app.post('/proc-bech/api/fichas/getApoyoSeccionA/id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getApoyoSeccionA(id,(err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'No existen Datos...');
            });
        });
    });
    //SELECT DATOS SECCION B1 FICHA
    app.post('/proc-bech/api/fichas/getApoyoSeccionB1/id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getApoyoSeccionB1(id,(err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'No existen Datos...');
            });
        });
    });
    //SELECT DATOS SECCION B2 FICHA
    app.post('/proc-bech/api/fichas/getApoyoSeccionB2/id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getApoyoSeccionB2(id,(err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'No existen Datos...');
            });
        });
    });
    //SELECT DATOS SECCION TXA FICHA
    app.post('/proc-bech/api/fichas/getApoyoSeccionTXA/id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getApoyoSeccionTXA(id,(err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'No existen Datos...');
            });
        });
    });
    //SELECT DATOS SECCION D FICHA
    app.post('/proc-bech/api/fichas/getApoyoSeccionD/id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getApoyoSeccionD(id,(err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'No existen Datos...');
            });
        });
    });
    //SELECT DATOS SECCION E FICHA
    app.post('/proc-bech/api/fichas/getApoyoSeccionE/id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getApoyoSeccionE(id,(err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'No existen Datos...');
            });
        });
    });
    //SELECT DATOS SECCION F FICHA
    app.post('/proc-bech/api/fichas/getApoyoSeccionF/id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getApoyoSeccionF(id,(err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'No existen Datos...');
            });
        });
    });
    ////////////////////FICHA CONVENIO////////////////////
    //SELECT DATOS SECCION A FICHA
    app.post('/proc-bech/api/fichas/getConvenioSeccionA/id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getConvenioSeccionA(id,(err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'No existen Datos...');
            });
        });
    });
    //SELECT DATOS SECCION A2 FICHA
    app.post('/proc-bech/api/fichas/getConvenioSeccionA2/id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getConvenioSeccionA2(id,(err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'No existen Datos...');
            });
        });
    });
    //SELECT DATOS SECCION B FICHA
    app.post('/proc-bech/api/fichas/getConvenioSeccionB/id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getConvenioSeccionB(id,(err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'No existen Datos...');
            });
        });
    });
    //DRP TIPO DE INICIATIVA
    app.get('/proc-bech/api/fichas/getDrpTipoIniciativa', auth.fn_verifyToken, (req,res) => {
        Controller.getDrpTipoIniciativa((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });
    //DRP TIPO DE FACTURACION
    app.get('/proc-bech/api/fichas/getDrpTipoFacturacion', auth.fn_verifyToken, (req,res) => {
        Controller.getDrpTipoFacturacion((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });
    //DRP TIPO DE FLUJO
    app.get('/proc-bech/api/fichas/getDrpTipoFlujoPP', auth.fn_verifyToken, (req,res) => {
        Controller.getDrpTipoFlujoPP((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });
    //DRP Aplica malla
    app.get('/proc-bech/api/fichas/getDrpAplicaMalla', auth.fn_verifyToken, (req,res) => {
        Controller.getDrpAplicaMalla((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });
    //DRP Especialista IAS
    app.get('/proc-bech/api/fichas/getDrpEspecialista', auth.fn_verifyToken, (req,res) => {
        Controller.getDrpEspecialista((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });
    //DRP Cliente comercial
    app.get('/proc-bech/api/fichas/getDrpClienteComercial', auth.fn_verifyToken, (req,res) => {
        Controller.getDrpClienteComercial((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });

    //SELECT MAIL CLIENTE COMERCIAL
    app.post('/proc-bech/api/ficha/getMailClienteComercial/id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getMailClienteComercial(id,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //DRP Cliente comercial
    app.get('/proc-bech/api/fichas/getDrpSubproyecto', auth.fn_verifyToken, (req,res) => {
        Controller.getDrpSubproyecto((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });

    //CC X SUBPROY
    app.post('/proc-bech/api/ficha/getCentroCostoProy/id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getCentroCostoProy(id,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //DATOS INSTALACION AMBIENTE CANAL
    app.post('/proc-bech/api/fichas/getInsAmbCanalIniciativa/idIni/idCanal', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['idIni','idCanal'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getInsAmbCanalIniciativa(idIni,idCanal,(err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'No existen Datos...');
            });
        });
    });

    //INTERCONEXIONES
    app.get('/proc-bech/api/fichas/getCheckInterconexiones', auth.fn_verifyToken, (req,res) => {
        Controller.getCheckInterconexiones((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });

    //ESTADO INTERCONEXIONES
    app.post('/proc-bech/api/fichas/getEstadoInterIniciativa/id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getEstadoInterIniciativa(id,(err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'No existen Datos...');
            });
        });
    });

    //DRP Nivel MAU
    app.get('/proc-bech/api/fichas/getDrpNivelMau', auth.fn_verifyToken, (req,res) => {
        Controller.getDrpNivelMau((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });

    //DATOS CANAL X INICIATIVA
    app.post('/proc-bech/api/fichas/getDatosCanalIniciativa/idIni/idCanal', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['idIni','idCanal'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getDatosCanalIniciativa(idIni,idCanal,(err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'No existen Datos...');
            });
        });
    });

    ////SELECT DRP AFA
    app.get('/proc-bech/api/fichas/getDrpResAFA', auth.fn_verifyToken, (req,res) => {
        Controller.getDrpResAFA((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });

    //SELECT DRP LIDER
    app.get('/proc-bech/api/fichas/getDrpLiderDes', auth.fn_verifyToken, (req,res) => {
        Controller.getDrpLiderDes((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });

    ////SELECT DRP RESPONSABLE FAB
    app.get('/proc-bech/api/fichas/getDrpRespFab', auth.fn_verifyToken, (req,res) => {
        Controller.getDrpRespFab((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });

    //SELECT DATOS CANAL CONTINUIDAD IMPACTO
    app.post('/proc-bech/api/fichas/getDatosCanalContImpa/idIni', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['idIni'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getDatosCanalContImpa(idIni,(err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'No existen Datos...');
            });
        });
    });

    //SELECT DETALLE DATOS CANAL CONTINUIDAD IMPACTO
    app.post('/proc-bech/api/fichas/getDetalDatosCanalContImpa/idIni/idCanal', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['idIni','idCanal'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getDetalDatosCanalContImpa(idIni,idCanal,(err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'No existen Datos...');
            });
        });
    });

    //SELECT Detalle Pruebas CANAL CONTINUIDAD IMPACTO
    app.post('/proc-bech/api/fichas/getDetallePrueba/idIni', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['idIni'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getDetallePrueba(idIni,(err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'No existen Datos...');
            });
        });
    });

    //SELECT DETALLE Pruebas CANAL2
    app.post('/proc-bech/api/fichas/getDetallePrueba2/idIni/idCanal', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['idIni','idCanal','idTipo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getDetallePrueba2(idIni,idCanal,idTipo,(err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'No existen Datos...');
            });
        });
    });
};