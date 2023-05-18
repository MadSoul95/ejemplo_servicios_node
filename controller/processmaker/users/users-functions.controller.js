var con   = require('../../../condb/condb');
var fnAPI = require('../../../functions/validaciones.functions');
var async = require("async");

fn_users_qryDatos = function (arrCondition, params, callbackQryDatos) {

    const type_user  = arrCondition[0]; // all => Todos || operators => Operators
    const status     = arrCondition[1]; // active => Activo || inactive => Inactivo || all => Todos
    const condition  = arrCondition[2]; // WHERE Params: group_alias => grp_alias
    const condition2 = arrCondition[3]; // WHERE Params: id => idUser

    //Captura params
    var param1 = params[0];
    var param2 = params[1];



    //Construye Query
    var Qry = ' SELECT '+
                ' U.USR_UID AS pm_id,'+
                ' U.USR_USERNAME AS username,'+
                ' U.USR_FIRSTNAME AS nombre,  '+
                ' U.USR_LASTNAME AS apellido,  '+
                ' U.USR_EMAIL AS email,  '+
                ' CAST(U.USR_CREATE_DATE AS CHAR) AS date_create,  '+
                ' U.USR_STATUS as status'+
                ' FROM USERS U ';
    //Joins en Base a condicion
    if(condition == "group_alias"){
        Qry +=   ' LEFT JOIN GROUP_USER GU ON GU.USR_UID = U.USR_UID';
    }
        //Where
        Qry +=  ' WHERE U.USR_UID IS NOT NULL ';
    //Tipo Usuario PM
    if(type_user != "all"){
        if(type_user == "operators"){
            Qry +=  ' AND U.USR_ROLE = "PROCESSMAKER_OPERATOR" '+
                    ' AND TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(WF_BECH.F_GRUPO(GRP_UID),"-",-1),"-",1)) NOT IN ("Admin") ';
        }
    }
    //Estado del Usuario PM
    if(status != "all"){
        if(status == "active"){
            Qry +=  ' AND U.USR_STATUS = "ACTIVE" ';
        }
        if(status == "inactive"){
            Qry +=  ' AND U.USR_STATUS = "INACTIVE" ';
        }
    }
    //Where condicion
    if(condition == "group_alias"){ 
        Qry +=  ' AND (F_GRUPO(GU.GRP_UID) LIKE "'+param1+' -%" OR F_GRUPO(GRP_UID) = "BECH AUDITORIA - ING QA")';
    }
    if(condition2 == "id" && condition == "group_alias"){ 
        Qry +=  ' AND U.USR_USERNAME = "'+param2+'"  ';
    }
    if(condition2 == "id" && condition == "all"){ 
        Qry +=  ' AND U.USR_USERNAME = "'+param1+'"  ';
    }


    Qry +=  ' GROUP BY U.USR_UID '+
            ' ORDER BY U.USR_USERNAME';

    //console.log(Qry);

    con.conWF_BECH();
    if(conWF_BECH){
        conWF_BECH.query(
            Qry,
            (err, rows) => {
                callbackQryDatos(err, rows);
            }
        )
    }
    conWF_BECH.end();
};

fn_users_createArrRoles = function (pm_id, conWF_BECH, arrCondition, params, callbackArrRoles){
    const type_user  = arrCondition[0]; // all => Todos || operators => Operators
    const status     = arrCondition[1]; // active => Activo || inactive => Inactivo || all => Todos
    const condition  = arrCondition[2]; // WHERE Params: group_alias => grp_alias
    const condition2 = arrCondition[3]; // WHERE Params: id => idUser

    //Captura params
    var param1 = params[0];
    //var param2 = params[1];

    var Qry =   'SELECT GRP_UID AS grp_id, '+
                'WF_BECH.F_GRUPO(GRP_UID) AS grp_nom '+
                'FROM GROUP_USER WHERE USR_UID = "'+pm_id+'"';
    //Where condicion
    if(type_user == "operators"){  //Descartamos al - Admin (Ex: BECH - Admin)
        Qry +=  ' AND TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(WF_BECH.F_GRUPO(GRP_UID),"-",-1),"-",1)) NOT IN ("Admin") ';
    }
    if(condition == "group_alias"){ 
        Qry +=  ' AND (F_GRUPO(GRP_UID) LIKE "'+param1+' -%" OR F_GRUPO(GRP_UID) = "BECH AUDITORIA - ING QA")';
    }

    if(conWF_BECH){
        conWF_BECH.query(
            Qry,
            function(err, rows, fields){
                var rolJson = "";
                if(!err){
                    rolJson = rows.map(rows => ({ ["grp_id"]: rows.grp_id, ["grp_nom"]: rows.grp_nom}));
                    //console.log(rolJson);
                    callbackArrRoles(err, rows, fields, rolJson)
                }else{
                    rolJson = "";
                    callbackArrRoles(err, rows, fields, rolJson)
                }
            }
        )
    }
};

module.exports.fn_users_execute = function (conditions, params, callback, callbackExecute){

    // type_user | status | condition
    fn_users_qryDatos(conditions, params, function callbackQryDatos(err, rowsDatos){
        if(!err && Object.keys(rowsDatos).length != 0){
            con.conWF_BECH();
            async.forEachOf(rowsDatos, function (row, i, callbackGroup){ 
                fn_users_createArrRoles(row.pm_id, conWF_BECH, conditions, params, function callbackArrRoles(err, rowsGroup, fields, rolJson){
                    if(!err){
                        rowsDatos[i] = Object.assign({"groups": rolJson}, row);
                        rowsDatos = fnAPI.fn_reOrderJSON(rowsDatos, [ "pm_id", "username", "nombre", 
                                                            "apellido", "email", 
                                                            "groups", "grp_id", "grp_nom",
                                                            "date_create", "status"]);
                        //Termina la iteración
                        callbackGroup(null);
                    }else{
                        //Error en la Query del Loop
                        callback(err,null);
                    }
                })
                
            }, function(err, row){
                if(err){
                    //Error dentro del Loop
                    callback(err,null);
                }else{
                    //Termina el Lopp
                    callback(err,rowsDatos);
                }
            });
            conWF_BECH.end();
        }else{
            callback(err, rowsDatos);
        }
    });
};