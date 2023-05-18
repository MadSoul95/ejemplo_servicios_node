const Controller   	= require('../../controller/subproyecto/subproyecto.controller');
const fun_res 	    = require('../../functions/results/results-api.functions');
const fun_val 	    = require('../../functions/validaciones.functions');
const auth          = require("../../middleware/auth.middleware");

module.exports = function(app){

	//SELECT X ID
    app.post('/proc-bech/api/subproyecto/getSubproyecto/id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getSubproyectoId(id,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Subproyecto no encontrado');
            });
        });
    });

	//SELECT X CONTRATO
    app.post('/proc-bech/api/subproyecto/getSubproyecto/contrato', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['contrato'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getSubproyectoContrato(contrato,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin información');
            });
        });
    });

    //SELECT CONTRATO Y CC POR ID
      app.post('/proc-bech/api/subproyecto/getSubproyecto/id/codigocc', auth.fn_verifyToken, (req,res) => {
          fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
              //Recibir Parametros
              eval(myParams);
              Controller.getSubproyectoCodeCC(id,(err, data) =>{
                  fun_res.fn_results_select(req,res,err, data,'Sin información');
              });
          });
      });

	//SELECT TODO
    app.get('/proc-bech/api/subproyecto/getAllSubproyecto', auth.fn_verifyToken, (req,res) => {
        Controller.getAllSubproyecto((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });
    });

    //SELECT ID, NOMBRE TODOS
      app.get('/proc-bech/api/subproyecto/getAllSubproyecto/nombre', auth.fn_verifyToken, (req,res) => {
        Controller.getAllSubproyectoNombre((err, data) =>{
              fun_res.fn_results_select(req,res,err, data,'Sin información');
          });
      });

	//INSERT
    app.post('/proc-bech/api/subproyecto/insertSubproyecto', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['nombre','codigo','contrato','centro'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.insertSubproyecto(nombre,codigo,contrato,centro,(err, data) =>{
                fun_res.fn_results_insert(req,res,err, data,'Sin información');
            });
        });
    });

	//UPDATE X ID
	app.put('/proc-bech/api/subproyecto/updateSubproyecto/id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['nombre','codigo','contrato','centro','id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.updateSubproyectoId(nombre,codigo,contrato,centro,id,(err, data) =>{
                console.log(data);
                fun_res.fn_results_update(req,res,err, data,'Sin información');
            });
        });
    });

	// DELETE X ID
	app.delete('/proc-bech/subproyecto/api/deleteSubproyecto/id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.deleteSubproyectoId(id,(err, data) =>{
                fun_res.fn_results_delete(req,res,err, data,'Sin información');
            });
        });
    });

	// DELETE X CONTRATO
	app.delete('/proc-bech/api/subproyecto/deleteSubproyecto/contrato', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['contrato'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.deleteSubproyectoContrato(contrato,(err, data) =>{
                fun_res.fn_results_delete(req,res,err, data,'Sin información');
            });
        });
    });

};
