const Controller   	= require('../../controller/canal/canal.controller');
const fun_res 	    = require('../../functions/results/results-api.functions');
const fun_val 	    = require('../../functions/validaciones.functions');
const auth          = require("../../middleware/auth.middleware");

module.exports = function(app){

                                                                                        
    //SELECT CANALES
    app.get('/proc-bech/api/canal/getAllCanal', auth.fn_verifyToken, (req,res) => {
        Controller.getAllCanal((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });

    //SELECT CANALES
    app.get('/proc-bech/api/canal/getAllCanal/vigentes', auth.fn_verifyToken, (req,res) => {
        Controller.getAllCanalVigentes((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });
   
    //SELECT CANAL X INI_ID
    app.post('/proc-bech/api/canal/getAllCanalXIni/ini_id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['ini_id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getAllCanalXIni(ini_id,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin información');
            });
        });
    });

// export    
};
