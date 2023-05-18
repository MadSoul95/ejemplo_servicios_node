const Controller   	= require('../../controller/browser/browser.controller');
const fun_res 	    = require('../../functions/results/results-api.functions');
const fun_val 	    = require('../../functions/validaciones.functions');
const auth          = require("../../middleware/auth.middleware");

module.exports = function(app){

                                                                                        
    //SELECT BROWSER
    app.get('/proc-bech/api/browser/getAllBrowser', auth.fn_verifyToken, (req,res) => {
        Controller.getAllBrowser((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });
   
// export    
};
