const Controller   	= require('../../controller/dispositivo/dispositivo.controller');
const fun_res 	    = require('../../functions/results/results-api.functions');
const fun_val 	    = require('../../functions/validaciones.functions');
const auth          = require("../../middleware/auth.middleware");

module.exports = function(app){

                                                                                        
    //SELECT DISPOSITIVO
    app.get('/proc-bech/api/dispositivo/getAllDispositivo', auth.fn_verifyToken, (req,res) => {
        Controller.getAllDispositivo((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });
   
// export    
};
