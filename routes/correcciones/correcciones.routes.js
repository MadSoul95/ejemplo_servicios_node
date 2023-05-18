const Controller   	= require('../../controller/correcciones/correcciones.controller');
const fun_res 	    = require('../../functions/results/results-api.functions');
const fun_val 	    = require('../../functions/validaciones.functions');
const auth          = require("../../middleware/auth.middleware");

module.exports = function(app){
    //Todas las actividades rechazadas
    app.get('/proc-bech/api/correcciones/getActividadesCorreccion', auth.fn_verifyToken, (req,res) => {
        Controller.getActividadesCorreccion((err, data) =>{
            fun_res.fn_results_select_sp(req,res,err, data,'Sin información');
        });                                     
    });

    //Actividades rechazadas por gestor o admin (muestra todo)
    app.post('/proc-bech/api/correcciones/getActividadesCorreccionUser/user', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['user'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getActividadesCorreccionUser(user, (err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'Sin Información');
            });
        });
    });

    // DRP ANALISTAS
    app.get('/proc-bech/api/correcciones/getDrpAnalistas', auth.fn_verifyToken, (req,res) => {
        Controller.getDrpAnalistas((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });

    //Actividades Pendientes que se pueden Reasignar
    app.post('/proc-bech/api/correcciones/getActividadesCorreccionPend/user', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['user'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getActividadesCorreccionPend(user, (err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'Sin Información');
            });
        });
    });

    //Actividades Asignadas para iniciar correccion de analista
    app.post('/proc-bech/api/correcciones/getActividadesCorreccionAsignada/user', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['user'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getActividadesCorreccionAsignada(user, (err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'Sin Información');
            });
        });
    });

    //BUSCA ACTIVIDADES TERMINADAS PARA SU APROBACION O RECHAZO
    app.post('/proc-bech/api/correcciones/getActividadesCorreccionTerm/user', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['user'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getActividadesCorreccionTerm(user, (err, data) =>{
                fun_res.fn_results_select_sp(req,res,err, data,'Sin Información');
            });
        });
    });
};