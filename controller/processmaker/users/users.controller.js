var con   = require('../../../condb/condb');
var fnAPI = require('../../../functions/validaciones.functions');
var async = require("async");

var fn_Qry = require('./users-functions.controller');

let myModel = {};


//===>TODOS<===//

// -- Tipo Usuario

//SELECT TODO LOS USUARIOS
myModel.getAllUsers = (callback) => {
    // type_user | status | condition
    var conditions = ["all","all", ""];
    var params = [];
    fn_Qry.fn_users_execute(conditions, params, callback, function callbackExecute(){});
};

//SELECT TODO LOS USUARIOS OPERATORS
myModel.getAllUsersOperators = (callback) => {
    // type_user | status | condition
    var conditions = ["operators","all", ""];
    var params = [];
    fn_Qry.fn_users_execute(conditions, params, callback, function callbackExecute(){});
};

//--Grupo Alias

//SELECT TODO LOS USUARIOS x GrupoAlias
myModel.getAllUsersxGrupoAlias = (params, callback) => {
    // type_user | status | condition
    var conditions = ["all","all", "group_alias"];
    var params = params;
    fn_Qry.fn_users_execute(conditions, params, callback, function callbackExecute(){});
};

//SELECT TODO LOS USUARIOS Operators x GrupoAlias
myModel.getAllUsersOperatorsxGrupoAlias = (params, callback) => {
    // type_user | status | condition
    var conditions = ["operators","all", "group_alias"];
    var params = params;
    fn_Qry.fn_users_execute(conditions, params, callback, function callbackExecute(){});
};

//===>ACTIVOS<===//

// -- Tipo Usuario

//SELECT TODO LOS USUARIOS ACTIVOS
myModel.getAllUsersActive = (callback) => {
    // type_user | status | condition
    var conditions = ["all","active", ""];
    var params = [];
    fn_Qry.fn_users_execute(conditions, params, callback, function callbackExecute(){});
};

//SELECT TODO LOS USUARIOS ACTIVOS OPERATORS
myModel.getAllUsersActiveOperators = (callback) => {
    // type_user | status | condition
    var conditions = ["operators","active", ""];
    var params = [];
    fn_Qry.fn_users_execute(conditions, params, callback, function callbackExecute(){});
};

//--Grupo Alias

//SELECT TODO LOS USUARIOS ACTIVOS x GrupoAlias
myModel.getAllUsersActivexGrupoAlias = (params, callback) => {
    // type_user | status | condition
    var conditions = ["all","active", "group_alias"];
    var params = params;
    fn_Qry.fn_users_execute(conditions, params, callback, function callbackExecute(){});
};

//SELECT TODO LOS USUARIOS ACTIVOS Operators x GrupoAlias
myModel.getAllUsersActiveOperatorsxGrupoAlias = (params, callback) => {
    // type_user | status | condition
    var conditions = ["operators","active", "group_alias"];
    var params = params;
    fn_Qry.fn_users_execute(conditions, params, callback, function callbackExecute(){});
};

//===>INACTIVOS<===//

// -- Tipo Usuario

//SELECT TODO LOS USUARIOS INACTIVOS
myModel.getAllUsersInactive = (callback) => {
    // type_user | status | condition
    var conditions = ["all","inactive", ""];
    var params = [];
    fn_Qry.fn_users_execute(conditions, params, callback, function callbackExecute(){});
};

//SELECT TODO LOS USUARIOS INACTIVOS OPERATORS
myModel.getAllUsersInactiveOperators = (callback) => {
    // type_user | status | condition
    var conditions = ["operators","inactive", ""];
    var params = [];
    fn_Qry.fn_users_execute(conditions, params, callback, function callbackExecute(){});
};

//--Grupo Alias

//SELECT TODO LOS USUARIOS INACTIVOS x GrupoAlias
myModel.getAllUsersInactivexGrupoAlias = (params, callback) => {
    // type_user | status | condition
    var conditions = ["all","inactive", "group_alias"];
    var params = params;
    fn_Qry.fn_users_execute(conditions, params, callback, function callbackExecute(){});
};

//SELECT TODO LOS USUARIOS INACTIVOS Operators x GrupoAlias
myModel.getAllUsersInactiveOperatorsxGrupoAlias = (params, callback) => {
    // type_user | status | condition
    var conditions = ["operators","inactive", "group_alias"];
    var params = params;
    fn_Qry.fn_users_execute(conditions, params, callback, function callbackExecute(){});
};

//===>USERS<===//

//SELECT POR USERNAME
myModel.getUserxUsername = (params, callback) => {
    // type_user | status | condition
    var conditions = ["all","all", "all", "id"];
    var params = params;
    fn_Qry.fn_users_execute(conditions, params, callback, function callbackExecute(){});
};

//SELECT POR USERNAME x Operators Group Alias (No Muestra Grupos Admin ex: BECH - Admin)
myModel.getUserxUsernameOperatorsGroupAlias = (params, callback) => {
    // type_user | status | condition
    var conditions = ["operators","all", "group_alias", "id"];
    var params = params;
    fn_Qry.fn_users_execute(conditions, params, callback, function callbackExecute(){});
};

//SELECT POR USERNAME x Group Alias Todos
myModel.getUserxUsernameAllGroupAlias = (params, callback) => {
    // type_user | status | condition
    var conditions = ["all","all", "group_alias", "id"];
    var params = params;
    fn_Qry.fn_users_execute(conditions, params, callback, function callbackExecute(){});
};

//Update Status (ACTIVO | INACTIVO) x User
myModel.updateUserStatus = (username, status, callback) => {
    var v_status_WF = '';
    var v_status_RB = '';
    if(status == 1 || status == 0){
        if(status == 1){
            v_status_WF = 'ACTIVE';
            v_status_RB = '1';
        }
        if(status == 0){
            v_status_WF = 'INACTIVE';
            v_status_RB = '0';
        }
    }else{
        callback("Ha ocurrido un error...", null);
        return false;
    }
    
    con.conRB_BECH();
    if(conRB_BECH){
        conRB_BECH.query(
            'UPDATE RB_BECH.USERS URB '+
            'LEFT JOIN WF_BECH.USERS UWF ON UWF.USR_UID = URB.USR_UID '+
            'SET URB.USR_STATUS = ?, '+
            'UWF.USR_STATUS = ? '+
            'WHERE URB.USR_USERNAME = ? '+
            'AND UWF.USR_USERNAME = ? ' , [v_status_RB, v_status_WF, username, username],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
	conRB_BECH.end();
};

//UPDATE TYPE AUTH USER
myModel.updateUserTypeAuth = (username, auth_dn, auth_source, type_auth, callback) => {
    con.conRB_BECH();
    if(conRB_BECH){
        conRB_BECH.query(
            'UPDATE USERS SET '+
            'USR_AUTH_USER_DN = ?, '+
            'UID_AUTH_SOURCE  = ?, '+
            'USR_AUTH_TYPE    = ?  '+
            'WHERE USR_USERNAME = ?' , [auth_dn, auth_source, type_auth, username],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
	conRB_BECH.end();
};

module.exports = myModel;