var con     = require('../../../condb/condb');


let myModel = {};

/* REGISTRO ACTIVIDADES */

function fn_generateSQL(fnName, callback){
    var sql =   ' SELECT '+
                ' AC.AC_ID AS ac_id, '+
                ' I.INI_ID AS ini_id, '+
                ' I.INI_NOM AS ini_nom, '+
                ' IFNULL(CAST(I.INI_RFC AS CHAR), "") AS ini_rfc, '+
                ' IFNULL(CAST(I.INI_NUMSOL AS CHAR), "") AS ini_num_sol, '+
                ' IFNULL(CAST(DATE_FORMAT(I.INI_FEC_INI, "%d/%m/%Y") AS CHAR),"") AS fec_ini_iniciativa_cl, '+
                ' IFNULL(CAST(I.INI_FEC_INI AS CHAR), "") AS fec_ini_iniciativa, '+
                ' TI.TI_ID AS ti_id, '+
                ' IFNULL(TI.TI_NOMBRE, "") AS ti_nom, '+
                ' IFNULL(CAST(EST_I.EST_ID AS CHAR), "") AS est_id_ini, '+
                ' IFNULL(EST_I.EST_NOMBRE, "") AS est_nombre_ini, '+
                ' IFNULL(CAST(EST_I2.EST_ID AS CHAR), "") AS est2_id_ini, '+
                ' IFNULL(EST_I2.EST_NOMBRE, "") AS est2_nombre_ini, '+
                ' IFNULL(I.INI_GESTOR, "") AS gestor_uid, '+
                ' CASE WHEN CERTIFICACION.F_NOMBRE(I.INI_GESTOR) IN (NULL, "-") THEN "" '+
                ' ELSE CERTIFICACION.F_NOMBRE(I.INI_GESTOR) '+
                ' END AS gestor_nom, '+
                ' IFNULL(I.INI_BECH_MAU, "") AS cod_bech, '+
                ' C.CAN_ID AS can_id, '+
                ' IFNULL(CAST(C.TC_ID AS CHAR), "") AS tc_id, '+
                ' IFNULL(CAST(C.TD_ID AS CHAR), "") AS td_id, '+
                ' C.CAN_NOMBRE AS can_nom, '+
                ' C.CAN_ALIAS AS can_alias, '+
                ' TF.TF_ID AS tf_id, '+
                ' TF.TF_ALIAS AS tf_alias, '+
                ' TF.TF_ALIAS2 AS tf_alias2, '+
                ' TF.TF_NOMBRE AS tf_nom, '+
                ' TF.TF_NOM2 AS tf_nom_2, '+
                ' CASE WHEN C.TC_ID = 1 THEN IFNULL(CAST(BR.BR_ID AS CHAR), "") '+
                ' WHEN C.TC_ID = 2 THEN IFNULL(CAST(DI.DI_ID AS CHAR), "") '+
                ' ELSE 0 '+
                ' END AS br_id, '+
                ' CASE WHEN C.TC_ID = 1 THEN IFNULL(CAST(BR.BR_NOMBRE AS CHAR), "") '+
                ' WHEN C.TC_ID = 2 THEN IFNULL(CAST(DI.DI_NOMBRE AS CHAR), "") '+
                ' ELSE "" '+
                ' END AS br_id_nom, '+
                ' IFNULL(AC.AC_DTF, "") AS dtf, '+
                ' IFNULL(CAST(EST.EST_ID AS CHAR), "")  AS est_id, '+
                ' IFNULL(EST.EST_NOMBRE, "") AS est_nombre, '+
                ' IFNULL(EST.EST_GRUPO, "") AS est_grupo, '+
                ' IFNULL(CAST(AC.AC_CICLO AS CHAR), "") AS ciclo, '+
                ' IFNULL(CAST(AC.AC_ITER AS CHAR), "") AS iter, '+
                ' IFNULL(CAST(AC.AC_CASOS AS CHAR), "") AS casos, '+
                ' IFNULL(CAST(AC.AC_FEC_INI AS CHAR), "") AS fec_ini, '+
                ' IFNULL(CAST(DATE_FORMAT(AC.AC_FEC_INI, "%d/%m/%Y") AS CHAR),"") AS fec_ini_cl, '+
                ' IFNULL(CAST(AC.AC_FEC_TERM AS CHAR), "") AS fec_term, '+
                ' IFNULL(CAST(DATE_FORMAT(AC.AC_FEC_TERM, "%d/%m/%Y") AS CHAR),"") AS fec_term_cl, '+
                ' CASE WHEN AC.AC_FEC_TERM = CURDATE() THEN 1 ELSE 0 END AS fec_term_is_now, '+
                ' CASE WHEN AC.AC_FEC_TERM < CURDATE() THEN '+
                '   CERTIFICACION.F_CALCULA_DIAS_HABILES(AC.AC_FEC_TERM,CURDATE())-1'+
                ' ELSE'+
                '   0'+
                ' END AS fec_atrasada,'+
                ' IFNULL(CAST(AR.AR_ID AS CHAR), "") AS ar_id, '+
                ' IFNULL(CAST(CERTIFICACION.F_GET_AREA_PRIORITY_ACT_CERT(AC.INI_ID) AS CHAR), "") AS ar_id_priority, '+
                ' IFNULL(AR.AR_NOMBRE, "") AS ar_nom, '+
                ' IFNULL(CAST(AAC.AAC_ID AS CHAR), "") AS aac_id, '+
                ' IFNULL(AAC.AAC_ACT_NOM, "") AS aac_nom, '+
                ' IFNULL(AC.AC_OBS, "") AS obs, '+
                ' IFNULL(CAST(AC.AC_FEC_ULT_GEST AS CHAR), "") AS fec_ult_gest, '+
                ' IFNULL(CAST(DATE_FORMAT(AC.AC_FEC_ULT_GEST, "%d/%m/%Y") AS CHAR),"") AS fec_ult_gest_cl, '+
                ' IFNULL(CAST(AC.AC_FEC_PROX_SEG AS CHAR), "") AS fec_prox_seg, '+
                ' IFNULL(CAST(DATE_FORMAT(AC.AC_FEC_PROX_SEG, "%d/%m/%Y") AS CHAR),"") AS fec_prox_seg_cl, '+
                ' IFNULL(CAST(AC.AC_CANT_CONS AS CHAR), "") AS cant_cons, '+
                ' IFNULL(CAST(TRPR.TR_ID AS CHAR), "") AS pend_res_id, '+
                ' IFNULL(CAST(TRPR.TR_NOM AS CHAR), "") AS pend_res, '+
                ' IFNULL(CAST(TRES.TR_ID AS CHAR), "") AS estrategica_id, '+
                ' IFNULL(CAST(TRES.TR_NOM AS CHAR), "") AS estrategica_res, '+
                ' IFNULL(CAST(TRFR.TR_ID AS CHAR), "") AS fraude_id, '+
                ' IFNULL(TRFR.TR_NOM, "") AS fraude_res, '+
                ' CASE WHEN AR.AR_ID IS NOT NULL AND TF.TF_ID IS NOT NULL THEN '+
                ' CONCAT("_",TF.TF_ALIAS2,AR.AR_NOMBRE) '+
                ' ELSE "" '+
                ' END AS aux, '+
                //ContraparteGestion
                ' CAST(IFNULL(GROUP_CONCAT(CASE WHEN ACU.ROL_ID = 9  THEN ACU.ACU_USR END SEPARATOR "^^"), "") AS CHAR) AS cont_gestion_id, '+
                ' CAST(IFNULL(GROUP_CONCAT(CASE WHEN ACU.ROL_ID = 9  THEN CERTIFICACION.F_NOMBRE_UB(ACU.ACU_USR) END SEPARATOR "^^"), "") AS CHAR) AS cont_gestion_nom, '+
                ' CAST(IFNULL(GROUP_CONCAT(CASE WHEN ACU.ROL_ID = 9  THEN ACU.ROL_ID END SEPARATOR "^^"), "") AS CHAR) AS cont_gestion_rol_id, '+
                //RA-DES
                ' CAST(IFNULL(GROUP_CONCAT(CASE WHEN ACU.ROL_ID = 4  THEN ACU.ACU_USR END SEPARATOR "^^"), "") AS CHAR) AS ra_des_id, '+
                ' CAST(IFNULL(GROUP_CONCAT(CASE WHEN ACU.ROL_ID = 4  THEN CERTIFICACION.F_NOMBRE_UB(ACU.ACU_USR) END SEPARATOR "^^"), "") AS CHAR) AS ra_des_nom, '+
                ' CAST(IFNULL(GROUP_CONCAT(CASE WHEN ACU.ROL_ID = 4  THEN ACU.ROL_ID END SEPARATOR "^^"), "") AS CHAR) AS ra_des_rol_id, '+
                //Integrador
                ' CAST(IFNULL(GROUP_CONCAT(CASE WHEN ACU.ROL_ID = 10 THEN ACU.ACU_USR END SEPARATOR "^^"), "") AS CHAR) AS integrador_id, '+
                ' CAST(IFNULL(GROUP_CONCAT(CASE WHEN ACU.ROL_ID = 10 THEN CERTIFICACION.F_NOMBRE_UB(ACU.ACU_USR) END SEPARATOR "^^"), "") AS CHAR) AS integrador_nom, '+
                ' CAST(IFNULL(GROUP_CONCAT(CASE WHEN ACU.ROL_ID = 10 THEN ACU.ROL_ID END SEPARATOR "^^"), "") AS CHAR) AS integrador_rol_id, '+
                //
                ' IFNULL(AC.AC_USR_INSERT, "") AS usr_uid, '+
                ' CASE WHEN CERTIFICACION.F_NOMBRE(AC.AC_USR_INSERT) IN (NULL, "-") THEN "" '+
                ' ELSE CERTIFICACION.F_NOMBRE(AC.AC_USR_INSERT) '+
                ' END AS usr_nom, '+
                ' IFNULL(CAST(AC.AC_FEC_INSERT AS CHAR), "") AS fec_insert, '+
                ' IFNULL(CAST(DATE_FORMAT(AC.AC_FEC_INSERT, "%d/%m/%Y %H:%i:%S") AS CHAR),"") AS fec_insert_cl, '+
                ' IFNULL(CAST(AC.AC_VIG AS CHAR), "") AS ac_vig '+
                ' FROM ACTIVIDAD_CERT AC '+
                ' LEFT JOIN INICIATIVA I ON I.INI_ID = AC.INI_ID '+
                ' LEFT JOIN TIPO_INICIATIVA TI ON TI.TI_ID = I.TI_ID '+
                ' LEFT JOIN CANAL C ON C.CAN_ID = AC.CAN_ID '+
                ' LEFT JOIN TIPO_FASE TF ON TF.TF_ID = AC.TF_ID '+
                ' LEFT JOIN BROWSER BR ON BR.BR_ID = AC.BR_ID '+
                ' LEFT JOIN DISPOSITIVO DI ON DI.DI_ID = AC.DI_ID '+
                ' LEFT JOIN AREA AR ON AR.AR_ID = AC.AR_ID '+
                ' LEFT JOIN AREA_ACTIVIDAD AAC ON AAC.AAC_ID = AC.AAC_ID '+
                ' LEFT JOIN TIPO_RESPUESTA TRPR ON TRPR.TR_ID = AC.AC_PEND_RES '+
                ' LEFT JOIN TIPO_RESPUESTA TRES ON TRES.TR_ID = AC.AC_ESTRATEGICA '+
                ' LEFT JOIN TIPO_RESPUESTA TRFR ON TRFR.TR_ID = AC.AC_FRAUDE '+
                ' LEFT JOIN ESTADO EST_I  ON EST_I.EST_ID = I.EST_ID '+
                ' LEFT JOIN ESTADO EST_I2 ON EST_I2.EST_ID = I.EST_ID2 '+
                ' LEFT JOIN ESTADO EST    ON EST.EST_ID = AC.EST_ID '+
                ' LEFT JOIN ACTIVIDAD_CERT_USR ACU ON ACU.AC_ID = AC.AC_ID AND ACU.ACU_VIG = 1 '+
                ' WHERE AC.AC_VIG = 1 ';
                if(fnName == "getAllActxIni"){
                    sql += ' AND I.INI_ID = ? ';
                }
                if(fnName == "getAllActxEstId2IngAct"){
                    sql += ' AND I.EST_ID2 = ? ';
                }
                if(fnName == "getAllActxPeriodoxUMG"){
                    sql += ' AND DATE_FORMAT(AC.AC_FEC_ULT_GEST, "%Y%m") = ? ';
                }
                if(fnName == "getAllActxAnioIngIni"){
                    sql += ' AND YEAR(I.INI_FEC_INI) = ? ';
                }
                if(fnName == "getAllActxAnioIngAct"){
                    sql += ' AND YEAR(AC.AC_FEC_INSERT)  = ? ';
                }
                if(fnName == "getAllActxAnioxEstId2IngAct"){
                    sql += ' AND YEAR(AC.AC_FEC_INSERT)  = ? AND I.EST_ID2 = ? ';
                }
                if(fnName == "getAllActxPeriodoxUMGxIni"){
                    sql += ' AND DATE_FORMAT(AC.AC_FEC_ULT_GEST, "%Y%m") = ? AND I.INI_ID = ? ';
                }
                sql += ' GROUP BY AC.AC_ID ORDER BY I.INI_ID ASC, TF.TF_ALIAS ASC';
                callback(sql);
}


function fn_generateArrayUsers(rows, callback){
    for (var i = 0; i < rows.length; i++) {
        //Se crea array contraparte-gestion
        rows[i]["cont_gestion"] = [];
        if(rows[i].cont_gestion_id != ""){
            var arr_Id      = rows[i].cont_gestion_id.split('^^');
            var arr_Nom     = rows[i].cont_gestion_nom.split('^^');
            var arr_RolId   = rows[i].cont_gestion_rol_id.split('^^');
            for(var ci = 0; ci < arr_Id.length; ci++) {
                rows[i]["cont_gestion"].push({id: arr_Id[ci], nom: arr_Nom[ci], rol_id: arr_RolId[ci]});
            }
        }
        delete rows[i]['cont_gestion_id'];
        delete rows[i]['cont_gestion_nom'];
        delete rows[i]['cont_gestion_rol_id'];

        //Se crea array ra-des
        rows[i]["ra_des"] = [];
        if(rows[i].ra_des_id != ""){
            var arr_Id      = rows[i].ra_des_id.split('^^');
            var arr_Nom     = rows[i].ra_des_nom.split('^^');
            var arr_RolId   = rows[i].ra_des_rol_id.split('^^');
            for(var ci = 0; ci < arr_Id.length; ci++) {
                rows[i]["ra_des"].push({id: arr_Id[ci], nom: arr_Nom[ci], rol_id: arr_RolId[ci]});
            }
        }
        delete rows[i]['ra_des_id'];
        delete rows[i]['ra_des_nom'];
        delete rows[i]['ra_des_rol_id'];

        //Se crea array integrador
        rows[i]["integrador"] = [];
        if(rows[i].integrador_id != ""){
            var arr_Id      = rows[i].integrador_id.split('^^');
            var arr_Nom     = rows[i].integrador_nom.split('^^');
            var arr_RolId   = rows[i].integrador_rol_id.split('^^');
            for(var ci = 0; ci < arr_Id.length; ci++) {
                rows[i]["integrador"].push({id: arr_Id[ci], nom: arr_Nom[ci], rol_id: arr_RolId[ci]});
            }
        }
        delete rows[i]['integrador_id'];
        delete rows[i]['integrador_nom'];
        delete rows[i]['integrador_rol_id'];
        
        if(rows.length == i+1){
            callback(rows)
        }
    }
}



//Obtiene todas las actividades vigentes registradas
myModel.getAllAct = (callback) => {
    fn_generateSQL("getAllAct", function callbackSQL(sql){
        con.conCERT();
        if(conCERT){
            conCERT.query(
                sql,
                (err, rows) => {
                    if(!err){
                        if(Object.keys(rows).length != 0){
                            fn_generateArrayUsers(rows, function callbackArray(rowsR){
                                callback(err, rowsR)
                            });
                        }else{
                            callback(err, rows)
                        }
                    }else{
                        callback(err, null)
                    }
                }
            )
        }
        conCERT.end(); 
    });
};

//Obtiene todas las actividades vigentes por ini_id
myModel.getAllActxIni = (ini_id, callback) => {
    fn_generateSQL("getAllActxIni", function callbackSQL(sql){
        con.conCERT();
        if(conCERT){
            conCERT.query(
                sql,[ini_id],
                (err, rows) => {
                    if(!err){
                        if(Object.keys(rows).length != 0){
                            fn_generateArrayUsers(rows, function callbackArray(rowsR){
                                callback(err, rowsR)
                            });
                        }else{
                            callback(err, rows)
                        }
                    }else{
                        callback(err, null)
                    }
                }
            )
        }
        conCERT.end(); 
    });
};

//Obtiene todas las actividades vigentes por estado de iniciativa
myModel.getAllActxEstId2IngAct = (ini_id, callback) => {
    fn_generateSQL("getAllActxEstId2IngAct", function callbackSQL(sql){
        con.conCERT();
        if(conCERT){
            conCERT.query(
                sql,[ini_id],
                (err, rows) => {
                    if(!err){
                        if(Object.keys(rows).length != 0){
                            fn_generateArrayUsers(rows, function callbackArray(rowsR){
                                callback(err, rowsR)
                            });
                        }else{
                            callback(err, rows)
                        }
                    }else{
                        callback(err, null)
                    }
                }
            )
        }
        conCERT.end(); 
    });
};

//Obtiene todas las actividades vigentes por fecha de ult mov gestor
myModel.getAllActxPeriodoxUMG = (periodo, callback) => {
    fn_generateSQL("getAllActxPeriodoxUMG", function callbackSQL(sql){
        con.conCERT();
        if(conCERT){
            conCERT.query(
                sql,[periodo],
                (err, rows) => {
                    if(!err){
                        if(Object.keys(rows).length != 0){
                            fn_generateArrayUsers(rows, function callbackArray(rowsR){
                                callback(err, rowsR)
                            });
                        }else{
                            callback(err, rows)
                        }
                    }else{
                        callback(err, null)
                    }
                }
            )
        }
        conCERT.end(); 
    });
};

//Obtiene todas las actividades vigentes por año de ingreso iniciativa
myModel.getAllActxAnioIngIni = (anio, callback) => {
    fn_generateSQL("getAllActxAnioIngIni", function callbackSQL(sql){
        con.conCERT();
        if(conCERT){
            conCERT.query(
                sql,[anio],
                (err, rows) => {
                    if(!err){
                        if(Object.keys(rows).length != 0){
                            fn_generateArrayUsers(rows, function callbackArray(rowsR){
                                callback(err, rowsR)
                            });
                        }else{
                            callback(err, rows)
                        }
                    }else{
                        callback(err, null)
                    }
                }
            )
        }
        conCERT.end(); 
    });
};

//Obtiene todas las actividades vigentes por año de ingreso iniciativa
myModel.getAllActxAnioIngAct = (anio, callback) => {
    fn_generateSQL("getAllActxAnioIngAct", function callbackSQL(sql){
        con.conCERT();
        if(conCERT){
            conCERT.query(
                sql,[anio],
                (err, rows) => {
                    if(!err){
                        if(Object.keys(rows).length != 0){
                            fn_generateArrayUsers(rows, function callbackArray(rowsR){
                                callback(err, rowsR)
                            });
                        }else{
                            callback(err, rows)
                        }
                    }else{
                        callback(err, null)
                    }
                }
            )
        }
        conCERT.end(); 
    });
};

//Obtiene todas las actividades vigentes por año ingreso de actividad y estado de iniciativa
myModel.getAllActxAnioxEstId2IngAct = (anio, est_id2, callback) => {
    fn_generateSQL("getAllActxAnioxEstId2IngAct", function callbackSQL(sql){
        con.conCERT();
        if(conCERT){
            conCERT.query(
                sql,[anio, est_id2],
                (err, rows) => {
                    if(!err){
                        if(Object.keys(rows).length != 0){
                            fn_generateArrayUsers(rows, function callbackArray(rowsR){
                                callback(err, rowsR)
                            });
                        }else{
                            callback(err, rows)
                        }
                    }else{
                        callback(err, null)
                    }
                }
            )
        }
        conCERT.end(); 
    });
};

//Obtiene todas las actividades vigentes por fecha de ult mov gestor e ini_id
myModel.getAllActxPeriodoxUMGxIni = (periodo, ini_id, callback) => {
    fn_generateSQL("getAllActxPeriodoxUMGxIni", function callbackSQL(sql){
        con.conCERT();
        if(conCERT){
            conCERT.query(
                sql,[periodo, ini_id],
                (err, rows) => {
                    if(!err){
                        if(Object.keys(rows).length != 0){
                            fn_generateArrayUsers(rows, function callbackArray(rowsR){
                                callback(err, rowsR)
                            });
                        }else{
                            callback(err, rows)
                        }
                    }else{
                        callback(err, null)
                    }
                }
            )
        }
        conCERT.end(); 
    });
};


module.exports = myModel;