const Controller   	= require('../../controller/area-actividad/area-actividad.controller');
const fun_res 	    = require('../../functions/results/results-api.functions');
const fun_val 	    = require('../../functions/validaciones.functions');
const auth          = require("../../middleware/auth.middleware");

module.exports = function(app){

    //SELECT ALL ACTIVIDAD
    app.get('/proc-bech/api/area-actividad/getAllAct', auth.fn_verifyToken, (req,res) => {
        Controller.getAllAct((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });                                     
    });

    //SELECT ACTIVIDAD X AREA
    app.post('/proc-bech/api/area-actividad/getAct/area_id-tf_id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['area_id','tf_id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getActXAreaXTF_ID(area_id, tf_id,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin información');
            });
        });
    });

};
