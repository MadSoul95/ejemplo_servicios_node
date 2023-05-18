const Controller   	= require('../../controller/tipo-iniciativa/tipo-iniciativa.controller');
const fun_res 	    = require('../../functions/results/results-api.functions');
const fun_val 	    = require('../../functions/validaciones.functions');
const auth          = require("../../middleware/auth.middleware");

module.exports = function(app){

                                                                                        
    //SELECT AREAS
    app.get('/proc-bech/api/tipo-iniciativa/getAllTipoIniciativa', auth.fn_verifyToken, (req,res) => {
        Controller.getAllTipoIniciativa((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });
   
// export    
};
