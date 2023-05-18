const Controller_Grp  = require('../../../controller/processmaker/groups/groups.controller');
const fun_res 	      = require('../../../functions/results/results-api.functions');
const fun_val 	      = require('../../../functions/validaciones.functions');
const auth            = require("../../../middleware/auth.middleware");


module.exports = function(app){

    //===>TODOS

	//Roles Todos
    app.get('/proc-bech/api/processmaker/groups/all', auth.fn_verifyToken, (req,res) => {
        Controller_Grp.getAllGroups((err, data) =>{ 
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });
    });

    //Roles Todos menos Admin | ex: BECH - Admin
    app.get('/proc-bech/api/processmaker/groups/operators', auth.fn_verifyToken, (req,res) => {
        Controller_Grp.getAllGroupsOperators((err, data) =>{ 
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });
    });
    
    //Roles Todos x Grupo Alias
    app.post('/proc-bech/api/processmaker/groups/all/group_alias', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['group_alias'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller_Grp.getAllGroupsxGrupoAlias([group_alias],(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin información');
            });
        });
    });
    

    //Roles Todos x Grupo Alias menos Admin | ex: BECH - Admin
    app.post('/proc-bech/api/processmaker/groups/operators/group_alias', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['group_alias'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller_Grp.getAllGroupsOperatorsxGrupoAlias([group_alias],(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin información');
            });
        });
    });

    //===>ACTIVOS

    //Roles Activos Todos
    app.get('/proc-bech/api/processmaker/groups/active/all', auth.fn_verifyToken, (req,res) => {
        Controller_Grp.getAllGroupsActive((err, data) =>{ 
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });
    });

    //Roles Activos Todos menos Admin | ex: BECH - Admin
    app.get('/proc-bech/api/processmaker/groups/operators/active', auth.fn_verifyToken, (req,res) => {
        Controller_Grp.getAllGroupsActiveOperators((err, data) =>{ 
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });
    });

    //Roles Activos Todos x Grupo Alias
    app.post('/proc-bech/api/processmaker/groups/all/active/group_alias', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['group_alias'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller_Grp.getAllGroupsActivexGrupoAlias([group_alias],(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin información');
            });
        });
    });

    //Roles Activos Todos x Grupo Alias menos Admin | ex: BECH - Admin
    app.post('/proc-bech/api/processmaker/groups/operators/active/group_alias', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['group_alias'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller_Grp.getAllGroupsActiveOperatorsxGrupoAlias([group_alias],(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin información');
            });
        });
    });

    //===>INACTIVOS

     //Roles Inactivos Todos
     app.get('/proc-bech/api/processmaker/groups/all/inactive', auth.fn_verifyToken, (req,res) => {
        Controller_Grp.getAllGroupsInactive((err, data) =>{ 
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });
    });

    //Roles Inactivos Todos menos Admin | ex: BECH - Admin
    app.get('/proc-bech/api/processmaker/groups/operators/inactive', auth.fn_verifyToken, (req,res) => {
        Controller_Grp.getAllGroupsInactiveOperators((err, data) =>{ 
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });
    });

    //Roles Inactivos Todos x Grupo Alias
    app.post('/proc-bech/api/processmaker/groups/all/inactive/group_alias', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['group_alias'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller_Grp.getAllGroupsInactivexGrupoAlias([group_alias],(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin información');
            });
        });
    });

    //Roles Inactivos Todos x Grupo Alias menos Admin | ex: BECH - Admin
    app.post('/proc-bech/api/processmaker/groups/operators/inactive/group_alias', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['group_alias'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller_Grp.getAllGroupsInactiveOperatorsxGrupoAlias([group_alias],(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin información');
            });
        });
    });

    //===>USER

   //Rol x Id
    app.post('/proc-bech/api/processmaker/groups/id', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['id'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller_Grp.getGroupxGrupoId([id],(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin información');
            });
        });
    });

    //Rol x Nombre
    app.post('/proc-bech/api/processmaker/groups/nombre', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['nombre'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller_Grp.getGroupxGrupoNom([nombre],(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin información');
            });
        });
    });
};