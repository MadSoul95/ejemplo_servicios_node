const Controller   	= require('../../controller/usuarios-banco/usuarios-banco.controller');
const fun_res 	    = require('../../functions/results/results-api.functions');
const fun_val 	    = require('../../functions/validaciones.functions');
const auth          = require("../../middleware/auth.middleware");

module.exports = function(app){

    //SELECT ACTIVIDAD X AREA
    app.post('/proc-bech/api/usuarios-banco/getAllUsers/rol_id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['rol_id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getAllUsers(rol_id,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin información');
            });
        });
    });

    //INSERT USUARIO
    app.post('/proc-bech/api/usuarios-banco/insertUsr', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['usr_nom','usr_email','rol_id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getinsertUsr(usr_nom,usr_email,rol_id,(err, data) =>{
                fun_res.fn_results_insert(req,res,err, data,'No se pudo Insertar...');
            });
        });
    });
};
