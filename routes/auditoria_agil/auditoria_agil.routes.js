const Controller   	= require('../../controller/auditoria_agil/auditoria_agil.controller');
const fun_res 	    = require('../../functions/results/results-api.functions');
const fun_val 	    = require('../../functions/validaciones.functions');
const auth          = require("../../middleware/auth.middleware");

module.exports = function(app){

  //UPDATE - REASIGNACION (AUDITORIA)
  app.put('/proc-bech/api/gda-auditoria_agil/reasignar/aud', auth.fn_verifyToken, (req,res) => {
      fun_val.fn_valida_param(req,res,['aud_id', 'usr_uid'],[], function callback(myParams){
          //Recibir Parametros
          eval(myParams);
          Controller.updateReasingarAUD(aud_id, usr_uid,(err, data) =>{
              fun_res.fn_results_update_sp(req,res,err, data,'Sin Información');
          });
      });
  });

  //UPDATE - REASIGNACION (QA)
  app.put('/proc-bech/api/gda-auditoria_agil/reasignar/qa', auth.fn_verifyToken, (req,res) => {
      fun_val.fn_valida_param(req,res,['aud_id', 'usr_uid'],[], function callback(myParams){
          //Recibir Parametros
          eval(myParams);
          Controller.updateReasingarQA(aud_id, usr_uid,(err, data) =>{
              fun_res.fn_results_update_sp(req,res,err, data,'Sin Información');
          });
      });
  });

  //UPDATE - REASIGNACION (QA) SUB PROC
  app.put('/proc-bech/api/gda-auditoria_agil/reasignar/qa40', auth.fn_verifyToken, (req,res) => {
    fun_val.fn_valida_param(req,res,['aud_id', 'usr_uid'],[], function callback(myParams){
        //Recibir Parametros
        eval(myParams);
        Controller.updateReasingarQA40(aud_id, usr_uid,(err, data) =>{
            fun_res.fn_results_update_sp(req,res,err, data,'Sin Información');
        });
    });
  });

  //SP AUDITORIAS AUD
  app.get('/proc-bech/api/auditoria_agil/getAllAuditoriasAud/drp', auth.fn_verifyToken, (req,res) => {
    Controller.getAllAuditoriasAud((err, data) =>{
      fun_res.fn_results_select(req,res,err,data,'Sin información');
    });
  });

  //SP AUDITORIAS QA
  app.get('/proc-bech/api/auditoria_agil/getAllAuditoriasQA/drp', auth.fn_verifyToken, (req,res) => {
    Controller.getAllAuditoriasQA((err, data) =>{
      fun_res.fn_results_select(req,res,err,data,'Sin información');
    });
  });

  //SELECT ACTIVIDADES X INI
  app.post('/proc-bech/api/auditoria_agil/getAllSub/ini_id', auth.fn_verifyToken, (req,res) => {
    fun_val.fn_valida_param(req,res,['ini_id'],[], function callback(myParams){
        //Recibir Parametros
        eval(myParams);
        Controller.getAllSubAudQA(ini_id,(err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin Información');
        });
    });
  });

  //SP QA
  app.get('/proc-bech/api/auditoria_agil/getAllQA/drp', auth.fn_verifyToken, (req,res) => {
    Controller.getAllQA((err, data) =>{
      fun_res.fn_results_select(req,res,err,data,'Sin información');
    });
  });

  //SP AUDITORES
  app.get('/proc-bech/api/auditoria_agil/getAllAuditores/drp', auth.fn_verifyToken, (req,res) => {
    Controller.getAllAuditores((err, data) =>{
      fun_res.fn_results_select(req,res,err,data,'Sin información');
    });
  });

  //INSERT - REASIGNACION
  app.post('/proc-bech/api/auditoria_agil/insertReasignacion', auth.fn_verifyToken, (req,res) => {
      fun_val.fn_valida_param(req,res,['gsol_id', 'usr_uid', 'motivo', 'usr_prev', 'user_new'],[], function callback(myParams){
          //Recibir Parametros
          eval(myParams);
          Controller.insertReasignar(gsol_id, usr_uid, motivo, usr_prev, user_new, (err, data) =>{
              fun_res.fn_results_insert_sp(req,res,err, data,'Sin Información');
          });
      });
  });


//*************************//
};

