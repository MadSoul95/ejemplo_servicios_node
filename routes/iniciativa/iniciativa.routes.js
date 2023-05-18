const Controller = require('../../controller/iniciativa/iniciativa.controller');
const fun_res 	 = require('../../functions/results/results-api.functions');
const fun_val 	 = require('../../functions/validaciones.functions');
const auth       = require("../../middleware/auth.middleware");


module.exports = function(app){

    //DROP'S

    //SELECT TODO
    app.get('/proc-bech/api/iniciativa/getAllIniciativa', auth.fn_verifyToken, (req,res) => {
        Controller.getAllIniciativa((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin Información');
        });
    });

/*================================================================================*/ 
    //SELECT X GESTOR
    app.post('/proc-bech/api/iniciativa/getAllIniciativa/gestor', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getAllIniciativaxIdGestor(id,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });
/*================================================================================*/

    //SELECT X USUARIO DE INICIATIVA (TABLA: INICIATIVA_USER)
    app.post('/proc-bech/api/iniciativa/getAllIniciativa/iniciativa_user/usr_uid', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['usr_uid'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getAllIniciativaxIniciativaUser(usr_uid,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //SELECT INICIATIVA X GRUPO POSTCERTIFICACION
    app.post('/proc-bech/api/iniciativa/getAllIniciativa/iniciativa_userPost/usr_uid', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['usr_uid'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getAllIniciativaxUsrGrp(usr_uid,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //SELECT INICIATIVA X GRUPO POSTCERTIFICACION Y SOLICITANTE
    app.post('/proc-bech/api/iniciativa/getAllIniciativa/iniciativa_userPost2/usr_uid', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['usr_uid'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getAllIniciativaxUsrGrp2(usr_uid,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //SELECT X COD BECH
    app.post('/proc-bech/api/iniciativa/getAllIniciativa/codbech', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['codbech'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getAllIniciativaxCodBech(codbech,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //SELECT X TIPO INICIATIVA
    app.post('/proc-bech/api/iniciativa/getAllIniciativa/tipo_iniciativa', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['ti_id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getAllIniciativaxTipoIni(ti_id,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //SELECT X EST 2
    app.post('/proc-bech/api/iniciativa/getAllIniciativa/estado_iniciativa2', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['est_id2'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getAllIniciativaxEst2(est_id2,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });
     
    //SELECT X GESTOR Y COD BECH
    app.post('/proc-bech/api/iniciativa/getAllIniciativa/gestor/codbech', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id','codbech'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getAllIniciativaxGesCod(id,codbech,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

   //SELECT X GESTOR Y INICIATIVA
   app.post('/proc-bech/api/iniciativa/getAllIniciativa/gestor/tipo_iniciativa', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id','ti_id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getAllIniciativaxGesIni(id,ti_id,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });

    //SELECT X GESTOR Y EST2
   app.post('/proc-bech/api/iniciativa/getAllIniciativa/gestor/estado_iniciativa2', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id','est_id2'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getAllIniciativaxGesEst(id,est_id2,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });
    //SELCT COD BECH
    app.get('/proc-bech/api/iniciativa/getAllCodBech', auth.fn_verifyToken, (req,res) => {
        Controller.getAllCodBech((err, data) =>{
            fun_res.fn_results_select(req,res,err, data,'Sin Información');
        });
    });
    
    //===SEPARACION===//

    //SELECT X INI_ID
    app.post('/proc-bech/api/iniciativa/getIniciativa/ini_id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['ini_id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getIniciativaxIniId(ini_id,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });
    
   //SELECT X ID CODBECH
    app.post('/proc-bech/api/iniciativa/getIniciativa/id/codbech', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getIniciativaIdCodbech(id,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });
	//SELECT X ID SUBPROY
    app.post('/proc-bech/api/iniciativa/getIniciativa/id/subproy', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getIniciativaIdSubProy(id,(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin Información');
            });
        });
    });
	// UPDATE CODBECH X ID
	app.put('/proc-bech/api/iniciativa/updateIniciativa/id/codbech', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['codbech','id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.updateIniciativaIdCodbech(codbech,id,(err, data) =>{
                fun_res.fn_results_update(req,res,err, data,'Sin información');
            });
        });
    });

	// UPDATE SPR X ID
	app.put('/proc-bech/api/iniciativa/updateIniciativa/id/spr', auth.fn_verifyToken, (req,res) => {
		  fun_val.fn_valida_param(req,res,['spr','id'],[], function callback(myParams){
			  //Recibir Parametros
			  eval(myParams);
			  Controller.updateIniciativaSPRid(spr,id,(err, data) =>{
				  fun_res.fn_results_update(req,res,err, data,'Sin información');
			  });
		  });
      });
      

      // UPDATE ESTADO 2
	app.put('/proc-bech/api/iniciativa/updateEstado2/ini_id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['est_id2','ini_id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.getupdateEstado2(est_id2,ini_id,(err, data) =>{
                fun_res.fn_results_update(req,res,err, data,'Sin información');
            });
        });
    });

    //UPDATE INICIATIVA X INI ID - MODULO REGISTRO INICIATIVA (actividad-cert)
	app.put('/proc-bech/api/iniciativa/mant-registro-iniciativa/modulos/updateIniciativa/ini_id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['num_sol','rfc','ini_id',],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller.updateIniciativaIniId(num_sol, rfc, ini_id,(err, data) =>{
                fun_res.fn_results_update(req,res,err, data,'Sin información');
            });
        });
    });

      ///////
};