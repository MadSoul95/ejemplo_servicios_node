const Controller = require('../../controller/gda-reasignacion/gda-reasignacion.controller');
const fun_res 	 = require('../../functions/results/results-api.functions');
const fun_val 	 = require('../../functions/validaciones.functions');
const auth       = require("../../middleware/auth.middleware");

module.exports = function(app){

    //UPDATE - REASIGNACION (GDA)
    app.put('/proc-bech/api/gda-reasignacion/reasignar/gda', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['gsol_id', 'usr_uid'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.updateReasingarGDA(gsol_id, usr_uid,(err, data) =>{
                fun_res.fn_results_update_sp(req,res,err, data,'Sin Información');
            });
        });
    });

    //INSERT - REASIGNACION
    app.post('/proc-bech/api/gda-reasignacion/insertReasignacion', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['gsol_id', 'usr_uid', 'motivo', 'usr_prev', 'user_new', 'tipo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.insertReasignar(gsol_id, usr_uid, motivo, usr_prev, user_new, tipo, (err, data) =>{
                fun_res.fn_results_insert_sp(req,res,err, data,'Sin Información');
            });
        });
    });

};