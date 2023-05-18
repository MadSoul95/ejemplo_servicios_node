const Controller_User = require('../../../controller/processmaker/users/users.controller');
const fun_res 	      = require('../../../functions/results/results-api.functions');
const fun_val 	      = require('../../../functions/validaciones.functions');
const auth            = require("../../../middleware/auth.middleware");


module.exports = function(app){

    //===>TODOS

	//Datos User Todos
    app.get('/proc-bech/api/processmaker/users/all', auth.fn_verifyToken, (req,res) => {
        Controller_User.getAllUsers((err, data) =>{ 
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });
    });

    //Datos User Operators
    app.get('/proc-bech/api/processmaker/users/operators', auth.fn_verifyToken, (req,res) => {
        Controller_User.getAllUsersOperators((err, data) =>{ 
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });
    });
    
    //Datos User Todos x Grupo Alias
    app.post('/proc-bech/api/processmaker/users/all/group_alias', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['group_alias'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller_User.getAllUsersxGrupoAlias([group_alias],(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin información');
            });
        });
    });
    

    //Datos User Operators x Grupo Alias
    app.post('/proc-bech/api/processmaker/users/operators/group_alias', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['group_alias'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller_User.getAllUsersOperatorsxGrupoAlias([group_alias],(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin información');
            });
        });
    });

    //===>ACTIVOS

    //Datos User Activos Todos
    app.get('/proc-bech/api/processmaker/users/all/active', auth.fn_verifyToken, (req,res) => {
        Controller_User.getAllUsersActive((err, data) =>{ 
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });
    });

    //Datos User Activos Operators
    app.get('/proc-bech/api/processmaker/users/operators/active', auth.fn_verifyToken, (req,res) => {
        Controller_User.getAllUsersActiveOperators((err, data) =>{ 
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });
    });

    //Datos User Activos Todos x Grupo Alias
    app.post('/proc-bech/api/processmaker/users/all/active/group_alias', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['group_alias'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller_User.getAllUsersActivexGrupoAlias([group_alias],(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin información');
            });
        });
    });

    //Datos User Activos Operators x Grupo Alias
    app.post('/proc-bech/api/processmaker/users/operators/active/group_alias', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['group_alias'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller_User.getAllUsersActiveOperatorsxGrupoAlias([group_alias],(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin información');
            });
        });
    });

    //===>INACTIVOS

     //Datos User Inactivos Todos
     app.get('/proc-bech/api/processmaker/users/all/inactive', auth.fn_verifyToken, (req,res) => {
        Controller_User.getAllUsersInactive((err, data) =>{ 
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });
    });

    //Datos User Inactivos Operators
    app.get('/proc-bech/api/processmaker/users/operators/inactive', auth.fn_verifyToken, (req,res) => {
        Controller_User.getAllUsersInactiveOperators((err, data) =>{ 
            fun_res.fn_results_select(req,res,err, data,'Sin información');
        });
    });

    //Datos User Inactivos Todos x Grupo Alias
    app.post('/proc-bech/api/processmaker/users/all/inactive/group_alias', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['group_alias'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller_User.getAllUsersInactivexGrupoAlias([group_alias],(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin información');
            });
        });
    });

    //Datos User Inactivos Operators x Grupo Alias
    app.post('/proc-bech/api/processmaker/users/operators/inactive/group_alias', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['group_alias'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller_User.getAllUsersInactiveOperatorsxGrupoAlias([group_alias],(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin información');
            });
        });
    });

    //===>USER

   //Datos x User
    app.post('/proc-bech/api/processmaker/users/username', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['username'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller_User.getUserxUsername([username],(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin información');
            });
        });
    });

    //Datos x Operators x Group Alias (No Muestra Grupos Admin ex: BECH - Admin)
    app.post('/proc-bech/api/processmaker/users/operators/group_alias/username', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['group_alias', 'username'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller_User.getUserxUsernameOperatorsGroupAlias([group_alias, username],(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin información');
            });
        });
    });

    //Datos x All Muestra todos los grupos x group Alias
    app.post('/proc-bech/api/processmaker/users/all/group_alias/username', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['group_alias', 'username'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller_User.getUserxUsernameAllGroupAlias([group_alias, username],(err, data) =>{
                fun_res.fn_results_select(req,res,err, data,'Sin información');
            });
        });
    });

    //Update Status (ACTIVO | INACTIVO) x User
    app.put('/proc-bech/api/processmaker/users/updateStatus', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['username','status'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller_User.updateUserStatus(username, status,(err, data) =>{
                fun_res.fn_results_update(req,res,err, data,'Sin información');
            });
        });
    });

    //UPDATE TYPE AUTH USER
    app.put('/proc-bech/api/processmaker/users/updateTypeAuth', auth.fn_verifyToken, (req,res) => {
        fun_val.fn_valida_param(req,res,['username', 'auth_dn', 'auth_source', 'type_auth'],[], function callback(myParams){
            //Recibir Parametros
            eval(myParams);
            Controller_User.updateUserTypeAuth(username, auth_dn, auth_source, type_auth,(err, data) =>{
                fun_res.fn_results_update(req,res,err, data,'Sin información');
            });
        });
    });
};