const Controller   	= require('../../controller/actividad-cert-usr/actividad-cert-usr.controller');
const fun_res 	    = require('../../functions/results/results-api.functions');
const fun_val 	    = require('../../functions/validaciones.functions');
const auth          = require("../../middleware/auth.middleware");

module.exports = function(app){

 
    //INSERT ACTIVIDAD CERTIFICACIÓN 
    app.post('/proc-bech/api/actividad-cert-usr/insertActUsr', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['ac_id','acu_id','rol_id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getinsertActUsr(ac_id,acu_id,rol_id,(err, data) =>{
                fun_res.fn_results_insert_sp(req,res,err, data,'No se pudo Insertar...');
            });
        });
    });


    //UPDATE ACTIVIDAD CERTIFICACIÓN USR
    app.put('/proc-bech/api/actividad-cert-usr/UpdateActUsr', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['ac_id','acu_id','rol_id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getUpdateActUsr(ac_id,acu_id,rol_id,(err, data) =>{
                fun_res.fn_results_generic_sp(req,res,err, data,'No se pudo Modificar...');
            });
        });
    });

    //DELETE ACTIVIDAD CERTIFICACIÓN USR
    app.delete('/proc-bech/api/actividad-cert-usr/DeleteActUsr', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['ac_id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getDeleteActUsr(ac_id,(err, data) =>{
                fun_res.fn_results_delete_sp(req,res,err, data,'No se pudo Modificar...');
            }); 
        });
    });

    //SP UPDATE DESACTIVAR VIGENCIA USUARIO
    app.put('/proc-bech/api/actividad-cert-usr/deactivateVig', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['ac_id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getUpdateVig(ac_id,(err, data) =>{
                fun_res.fn_results_update(req,res,err, data,'No se pudo Modificar...');
            });
        });
    });

    //SP UPDATE ACTIVAR VIGENCIA USUARIO
    app.put('/proc-bech/api/actividad-cert-usr/activateVig', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['ac_id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getUpdateVigAc(ac_id,(err, data) =>{
                fun_res.fn_results_update(req,res,err, data,'No se pudo Modificar...');
            });
        });
    });

// export    
};                              
