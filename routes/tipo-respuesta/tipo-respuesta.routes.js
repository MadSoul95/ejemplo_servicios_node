const Controller   	= require('../../controller/tipo-respuesta/tipo-respuesta.controller');
const fun_res 	    = require('../../functions/results/results-api.functions');
const fun_val 	    = require('../../functions/validaciones.functions');
const auth          = require("../../middleware/auth.middleware");

module.exports = function(app){

                                                                                        
    //SELECT TIPO RESPUESTA
    app.get('/proc-bech/api/tipo-respuesta/getAllTRes', auth.fn_verifyToken, (req,res) => {
        Controller.getAllTRes((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });
   
     //SELECT TIPO RESPUESTA (SI/NO)
     app.get('/proc-bech/api/tipo-respuesta/getSiNo', auth.fn_verifyToken, (req,res) => {
        Controller.getSiNo((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });

// export    
};
