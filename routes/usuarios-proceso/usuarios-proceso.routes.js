const Controller = require('../../controller/usuarios-proceso/usuarios-proceso.controller');
const fun_res 	 = require('../../functions/results/results-api.functions');
const fun_val 	 = require('../../functions/validaciones.functions');
const auth       = require("../../middleware/auth.middleware");


module.exports = function(app){


     //SELECT USUARIOS X ID
     app.post('/proc-bech/api/usuarios-proceso/getUsers/group_uid', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getAllUsers(id,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //SELECT USUARIOS X NOMBRE
    app.post('/proc-bech/api/usuarios-proceso/getUsers/group_nom', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['nom'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getAllUsersXNom(nom,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //SELECT USUARIOS X NOMBRE (MULTIPLE)
    app.post('/proc-bech/api/usuarios-proceso/getUsers/group_nom_array', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['nom_array'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getAllUsersXNomArray(nom_array,(err, err2, data) =>{
                if(!err2){
					fun_res.fn_results_select(req,res,err, data,'Sin Información');
				}else{
					res.status(500).json({success: false,message: err2})
				}
            });
        });
    });

    ///////
};