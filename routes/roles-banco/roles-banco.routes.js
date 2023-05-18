const Controller   	= require('../../controller/roles-banco/roles-banco.controller');
const fun_res 	    = require('../../functions/results/results-api.functions');
const fun_val 	    = require('../../functions/validaciones.functions');
const auth          = require("../../middleware/auth.middleware");

module.exports = function(app){

//SELECT ROLES X ID

 app.post('/proc-bech/api/roles-banco/getRol/id', auth.fn_verifyToken, (req,res) => {
    fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
        //Recibir Parametros
        eval(myParams);
        Controller.getAllRolesxId(id,(err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin Información');
        });
    });
});


// export    
};

