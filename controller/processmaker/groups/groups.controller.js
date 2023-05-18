var con   = require('../../../condb/condb');
var fnAPI = require('../../../functions/validaciones.functions');
var async = require("async");

var fn_Qry = require('./groups-functions.controller');

let myModel = {};

//===>TODOS<===//

// -- Grupo

//SELECT TODO LOS GRUPOS
myModel.getAllGroups = (callback) => {
    // type_user | status | condition
    var conditions = ["all","all", ""];
    var params = [];
    fn_Qry.fn_groups_execute(conditions, params, callback, function callbackExecute(){});
};

//SELECT TODO LOS GRUPOS OPERATORS menos Admin | ex: BECH - Admin
myModel.getAllGroupsOperators = (callback) => {
    // type_user | status | condition
    var conditions = ["operators","all", ""];
    var params = [];
    fn_Qry.fn_groups_execute(conditions, params, callback, function callbackExecute(){});
};

//--Grupo Alias

//SELECT TODO LOS GRUPOS x GrupoAlias
myModel.getAllGroupsxGrupoAlias = (params, callback) => {
    // type_user | status | condition
    var conditions = ["all","all", "group_alias"];
    var params = params;
    fn_Qry.fn_groups_execute(conditions, params, callback, function callbackExecute(){});
};

//SELECT TODO LOS GRUPOS Operators x GrupoAlias => menos Admin | ex: BECH - Admin
myModel.getAllGroupsOperatorsxGrupoAlias = (params, callback) => {
    // type_user | status | condition
    var conditions = ["operators","all", "group_alias"];
    var params = params;
    fn_Qry.fn_groups_execute(conditions, params, callback, function callbackExecute(){});
};

//===>ACTIVOS<===//

// -- Grupo

//SELECT TODO LOS GRUPOS ACTIVOS
myModel.getAllGroupsActive = (callback) => {
    // type_user | status | condition
    var conditions = ["all","active", ""];
    var params = [];
    fn_Qry.fn_groups_execute(conditions, params, callback, function callbackExecute(){});
};

//SELECT TODO LOS GRUPOS ACTIVOS OPERATORS menos Admin | ex: BECH - Admin
myModel.getAllGroupsActiveOperators = (callback) => {
    // type_user | status | condition
    var conditions = ["operators","active", ""];
    var params = [];
    fn_Qry.fn_groups_execute(conditions, params, callback, function callbackExecute(){});
};

//--Grupo Alias

//SELECT TODO LOS GRUPOS ACTIVOS x GrupoAlias
myModel.getAllGroupsActivexGrupoAlias = (params, callback) => {
    // type_user | status | condition
    var conditions = ["all","active", "group_alias"];
    var params = params;
    fn_Qry.fn_groups_execute(conditions, params, callback, function callbackExecute(){});
};

//SELECT TODO LOS GRUPOS ACTIVOS Operators x GrupoAlias => menos Admin | ex: BECH - Admin
myModel.getAllGroupsActiveOperatorsxGrupoAlias = (params, callback) => {
    // type_user | status | condition
    var conditions = ["operators","active", "group_alias"];
    var params = params;
    fn_Qry.fn_groups_execute(conditions, params, callback, function callbackExecute(){});
};

//===>INACTIVOS<===//

// -- Grupo

//SELECT TODO LOS GRUPOS INACTIVOS
myModel.getAllGroupsInactive = (callback) => {
    // type_user | status | condition
    var conditions = ["all","inactive", ""];
    var params = [];
    fn_Qry.fn_groups_execute(conditions, params, callback, function callbackExecute(){});
};

//SELECT TODO LOS GRUPOS INACTIVOS OPERATORS menos Admin | ex: BECH - Admin
myModel.getAllGroupsInactiveOperators = (callback) => {
    // type_user | status | condition
    var conditions = ["operators","inactive", ""];
    var params = [];
    fn_Qry.fn_groups_execute(conditions, params, callback, function callbackExecute(){});
};

//--Grupo Alias

//SELECT TODO LOS GRUPOS INACTIVOS x GrupoAlias
myModel.getAllGroupsInactivexGrupoAlias = (params, callback) => {
    // type_user | status | condition
    var conditions = ["all","inactive", "group_alias"];
    var params = params;
    fn_Qry.fn_groups_execute(conditions, params, callback, function callbackExecute(){});
};

//SELECT TODO LOS GRUPOS INACTIVOS Operators x GrupoAlias => menos Admin | ex: BECH - Admin
myModel.getAllGroupsInactiveOperatorsxGrupoAlias = (params, callback) => {
    // type_user | status | condition
    var conditions = ["operators","inactive", "group_alias"];
    var params = params;
    fn_Qry.fn_groups_execute(conditions, params, callback, function callbackExecute(){});
};

//===>USERS<===//

//SELECT POR Id de Grupo
myModel.getGroupxGrupoId = (params, callback) => {
    // type_user | status | condition
    var conditions = ["all","all", "id"];
    var params = params;
    fn_Qry.fn_groups_execute(conditions, params, callback, function callbackExecute(){});
};

//SELECT POR Nombre de Grupo
myModel.getGroupxGrupoNom = (params, callback) => {
    // type_user | status | condition
    var conditions = ["all","all", "nombre"];
    var params = params;
    fn_Qry.fn_groups_execute(conditions, params, callback, function callbackExecute(){});
};

module.exports = myModel;