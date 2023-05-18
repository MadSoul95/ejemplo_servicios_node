const ControllerRI    = require('../../../controller/reportes/registro-iniciativa/registro-iniciativa.controller');
const fun_res 	      = require('../../../functions/results/results-api.functions');
const fun_val 	      = require('../../../functions/validaciones.functions');
const auth            = require("../../../middleware/auth.middleware");

module.exports = function(app){
    
    /* REGISTRO ACTIVIDADES */

    //Obtiene todas las actividades vigentes registradas
    app.get('/proc-bech/api/reportes/registro-iniciativa/getAllAct', auth.fn_verifyToken, (req,res) => {
        ControllerRI.getAllAct((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'No existe información');
        });
    });

    //Obtiene todas las actividades vigentes por ini_id
    app.post('/proc-bech/api/reportes/registro-iniciativa/getAllAct/ini_id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['ini_id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            ControllerRI.getAllActxIni(ini_id,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Información no encontrada para la iniciativa S'+ini_id+'');
            });
        });
    });

    //Obtiene todas las actividades vigentes por estado de iniciativa
    app.post('/proc-bech/api/reportes/registro-iniciativa/getAllAct/est_id2', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['est_id2'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            ControllerRI.getAllActxEstId2IngAct(est_id2,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Información no encontrada para el estado con Id '+est_id2+'');
            });
        });
    });

    //Obtiene todas las actividades vigentes por año ingreso de iniciativa
    app.post('/proc-bech/api/reportes/registro-iniciativa/getAllAct/anio/ini', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['anio'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            ControllerRI.getAllActxAnioIngIni(anio,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Información no encontrada para el año '+anio+'');
            });
        });
    });

    //Obtiene todas las actividades vigentes por año ingreso de actividad
    app.post('/proc-bech/api/reportes/registro-iniciativa/getAllAct/anio/act', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['anio'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            ControllerRI.getAllActxAnioIngAct(anio,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Información no encontrada para el año '+anio+'');
            });
        });
    });

    //Obtiene todas las actividades vigentes por año ingreso de actividad y estado de iniciativa
    app.post('/proc-bech/api/reportes/registro-iniciativa/getAllAct/anio/est_id2/act', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['anio','est_id2'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            ControllerRI.getAllActxAnioxEstId2IngAct(anio,est_id2,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Información no encontrada para el año '+anio+' y estado '+est_id2+'');
            });
        });
    });

    //Obtiene todas las actividades vigentes por fecha de ult mov gestor
    app.post('/proc-bech/api/reportes/registro-iniciativa/getAllAct/periodo/UltMovGestor', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            ControllerRI.getAllActxPeriodoxUMG(periodo,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Información no encontrada para periodo '+periodo+'');
            });
        });
    });

    //Obtiene todas las actividades vigentes por fecha de ult mov gestor e ini_id
    app.post('/proc-bech/api/reportes/registro-iniciativa/getAllAct/periodo/UltMovGestor/ini_id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['periodo','ini_id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            ControllerRI.getAllActxPeriodoxUMGxIni(periodo, ini_id, (err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Información no encontrada para iniciativa S'+ini_id+' en periodo '+periodo+'');
            });
        });
    });

};