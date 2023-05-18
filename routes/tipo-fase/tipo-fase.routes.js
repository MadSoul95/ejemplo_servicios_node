const Controller   	= require('../../controller/tipo-fase/tipo-fase.controller');
const fun_res 	    = require('../../functions/results/results-api.functions');
const fun_val 	    = require('../../functions/validaciones.functions');
const auth          = require("../../middleware/auth.middleware");

module.exports = function(app){

                                                                                        
    //SELECT FASES
    app.get('/proc-bech/api/tipo-fase/getAllTipoFase', auth.fn_verifyToken, (req,res) => {
        Controller.getAllTipoFase((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });
   
// export    
};
