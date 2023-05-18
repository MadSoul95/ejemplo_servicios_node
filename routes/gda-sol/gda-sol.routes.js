const Controller = require('../../controller/gda-sol/gda-sol.controller');
const fun_res 	 = require('../../functions/results/results-api.functions');
const fun_val 	 = require('../../functions/validaciones.functions');
const auth       = require("../../middleware/auth.middleware");

module.exports = function(app){

    //SELECT AMBIENTE PRUEBAS
    app.get('/proc-bech/api/gda-sol/ambiente_pruebas', auth.fn_verifyToken, (req,res) => {
        Controller.getAllAmbientePruebas((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin Información');
        });
    });
    
};