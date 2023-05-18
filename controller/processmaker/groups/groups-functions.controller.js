var con   = require('../../../condb/condb');
var fnAPI = require('../../../functions/validaciones.functions');
var async = require("async");

fn_groups_qryDatos = function (arrCondition, params, callbackQryDatos) { 

    const type_user = arrCondition[0]; // all => Todos || operators => Operators menos Admin | ex: BECH - Admin
    const status    = arrCondition[1]; // active => Activo || inactive => Inactivo || all => Todos
    const condition = arrCondition[2]; // WHERE Params: group_alias => grp_alias

    //Captura params
    var param1 = params[0];

    //Construye Query
    var Qry =   ' SELECT ' +
                ' GU.GRP_UID AS grp_id, ' + 
                ' WF_BECH.F_GRUPO(GU.GRP_UID) AS grp_nom, ' + 
                ' GU.GRP_STATUS AS STATUS ' + 
                ' FROM WF_BECH.GROUPWF GU ' +
                ' WHERE WF_BECH.F_GRUPO(GU.GRP_UID) LIKE "%BECH AUDITORIA - Ing QA%" ' +
                ' UNION ' +
                ' SELECT '+
                ' GU.GRP_UID AS grp_id, '+
                ' WF_BECH.F_GRUPO(GU.GRP_UID) AS grp_nom, '+
                ' GU.GRP_STATUS AS status '+
                ' FROM GROUPWF GU ';

        //Where
        Qry +=  ' WHERE GU.GRP_UID IS NOT NULL  ';

    //Tipo de Rol Admin 
    if(type_user != "all"){
        if(type_user == "operators"){ //Todos  menos Admin | ex: BECH - Admin
            Qry +=  ' AND TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(WF_BECH.F_GRUPO(GU.GRP_UID),"-",-1),"-",1)) NOT IN ("Admin") ';
        }
    }
    //Estado del Estado PM
    if(status != "all"){
        if(status == "active"){
            Qry +=  ' AND GU.GRP_STATUS = "ACTIVE" ';
        }
        if(status == "inactive"){
            Qry +=  ' AND GU.GRP_STATUS = "INACTIVE" ';
        }
    }
    //Where condicion
    if(condition == "group_alias"){ 
        Qry +=  ' AND F_GRUPO(GU.GRP_UID) LIKE "'+param1+' -%" ';
    }
    if(condition == "id"){ 
        Qry +=  ' AND GU.GRP_UID = "'+param1+'"  ';
    }
    if(condition == "nombre"){ 
        Qry +=  ' AND WF_BECH.F_GRUPO(GU.GRP_UID) = "'+param1+'"  ';
    }

    Qry +=  ' ORDER BY grp_nom ';

    console.log(Qry);

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

module.exports.fn_groups_execute = function (conditions, params, callback, callbackExecute){ 
    fn_groups_qryDatos(conditions, params, function callbackQryDatos(err, rowsDatos){
        callback(err, rowsDatos);
    });
};
