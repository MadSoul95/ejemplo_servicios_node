const Controller   	= require('../../controller/tareas-procesos/tareas-procesos.controller');
const fun_res 	    = require('../../functions/results/results-api.functions');
const fun_val 	    = require('../../functions/validaciones.functions');
const auth          = require("../../middleware/auth.middleware");

module.exports = function(app){
	//SELECT X ESTADO
    app.post('/proc-bech/api/getTarea/estado',  auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['estado'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getTareaEstado(estado,(err, data) =>{ 
                fun_res.fn_results_select(req,res,err, data,'Sin información');
            });
        });
    });
	
	app.get('/proc-bech/api/getAllTarea',  auth.fn_verifyToken, (req,res) => {
        Controller.getAllTarea((err, data) =>{ 
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });
    });

	
	app.post('/proc-bech/api/getTareas',  auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['estado'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
			if(estado != '0'){ 
				Controller.getTareaEstado(estado,(err, data) =>{ 
					fun_res.fn_results_select(req,res,err, data,'Sin información');
				});
			}else{
				Controller.getAllTarea((err, data) =>{ 
					fun_res.fn_results_select(req,res,err, data,'Sin información');
				});
				
			}
        });
    });

    app.post('/proc-bech/api/getTareas/cliente',  auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['cliente', 'estado'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
			if(estado != '0'){ 
				Controller.getTareaEstadoCliente(cliente, estado,(err, data) =>{ 
					fun_res.fn_results_select(req,res,err, data,'Sin información');
				});
			}else{
				Controller.getAllTareaCliente(cliente, (err, data) =>{ 
					fun_res.fn_results_select(req,res,err, data,'Sin información');
				});
				
			}
        });
    });
}    