const Controller   	= require('../../controller/actividad-cert/actividad-cert.controller');
const fun_res 	    = require('../../functions/results/results-api.functions');
const fun_val 	    = require('../../functions/validaciones.functions');
const auth          = require("../../middleware/auth.middleware");

module.exports = function(app){

 
    //INSERT ACTIVIDAD CERTIFICACIÓN 
    app.post('/proc-bech/api/actividad-cert/getInsertAct', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['ini_id','can_id','tf_id','br_id_di_id','ac_dtf','est_id','ac_ciclo','ac_iter','ac_casos','ac_fec_ini','ac_fec_term','ar_id','aac_id','ac_obs','ac_fec_ult_gest','ac_fec_prox_seg','ac_cant_cons','ac_pend_res','ac_estrategica','ac_fraude','usr_uid'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getInsertAct(ini_id,can_id,tf_id,br_id_di_id,ac_dtf,est_id,ac_ciclo,ac_iter,ac_casos,ac_fec_ini,ac_fec_term,ar_id,aac_id,ac_obs,ac_fec_ult_gest,ac_fec_prox_seg,ac_cant_cons,ac_pend_res,ac_estrategica,ac_fraude,usr_uid,(err, data) =>{
                fun_res.fn_results_insert_sp(req,res,err, data,'No se pudo Insertar...');
            });
        });
    });

    //UPDATE ACTIVIDAD CERTIFICACIÓN 
    app.put('/proc-bech/api/actividad-cert/UpdateAct', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['ac_id','can_id','tf_id','br_id_di_id','ac_dtf','est_id','ac_ciclo','ac_iter','ac_casos','ac_fec_ini','ac_fec_term','ar_id','aac_id','ac_obs','ac_fec_ult_gest','ac_fec_prox_seg','ac_cant_cons','ac_pend_res','ac_estrategica','ac_fraude','usr_uid'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getUpdateAct(ac_id,can_id,tf_id,br_id_di_id,ac_dtf,est_id,ac_ciclo,ac_iter,ac_casos,ac_fec_ini,ac_fec_term,ar_id,aac_id,ac_obs,ac_fec_ult_gest,ac_fec_prox_seg,ac_cant_cons,ac_pend_res,ac_estrategica,ac_fraude,usr_uid,(err, data) =>{
                fun_res.fn_results_update_sp(req,res,err, data,'No se pudo Modificar...');
            });
        });
    });

    //SELECT ACTIVIDADES X INI
    app.post('/proc-bech/api/actividad-cert/getAllAct/ini_id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['ini_id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getAllAct(ini_id,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //SP UPDATE DESACTIVAR VIGENCIA CERT
    app.put('/proc-bech/api/actividad-cert/deactivateVig', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['ac_id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getUpdateVigCertDes(ac_id,(err, data) =>{
                fun_res.fn_results_update(req,res,err, data,'No se pudo Modificar...');
            });
        });
    });

    //SP UPDATE ACTIVAR VIGENCIA CERT
    app.put('/proc-bech/api/actividad-cert/activateVig', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['ac_id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getUpdateVigCertAc(ac_id,(err, data) =>{
                fun_res.fn_results_update(req,res,err, data,'No se pudo Modificar...');
            });
        });
    });

// export    
};
            