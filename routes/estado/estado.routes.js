const Controller   	= require('../../controller/estado/estado.controller');
const fun_res 	    = require('../../functions/results/results-api.functions');
const fun_val 	    = require('../../functions/validaciones.functions');
const auth          = require("../../middleware/auth.middleware");

module.exports = function(app){

                                                                                        
    //SELECT ESTADOS MENT_REG_INI X ACT
    app.get('/proc-bech/api/estado/getAllEstado/mantRegIni/act', auth.fn_verifyToken, (req,res) => {
        Controller.getAllEstado((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });
   
    //SELECT ESTADOS MENT_REG_INI X INI
    app.get('/proc-bech/api/estado/getAllEstado/mantRegIni/ini', auth.fn_verifyToken, (req,res) => {
        Controller.getAllEstadoRedIni((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });
// export    
};
