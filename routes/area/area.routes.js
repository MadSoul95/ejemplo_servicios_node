const Controller   	= require('../../controller/area/area.controller');
const fun_res 	    = require('../../functions/results/results-api.functions');
const fun_val 	    = require('../../functions/validaciones.functions');
const auth          = require("../../middleware/auth.middleware");

module.exports = function(app){

                                                                                        
    //SELECT AREAS
    app.get('/proc-bech/api/area/getAllAreas', auth.fn_verifyToken, (req,res) => {
        Controller.getAllAreas((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });
   
// export    
};
