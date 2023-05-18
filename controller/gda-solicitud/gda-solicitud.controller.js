var con = require('../../condb/condb');

//CREAR OBJETO
//AGREGAR METODOS userModel
let myModel = {}; 

//QUERY SOLICITUDES, TODA LA DATA
function fn_generateAllSolicitudes(fnName, callback){ 
    var sql =   ' SELECT '+
                ' GSOL.GSOL_ID AS gsol_id, '+
                ' IFNULL(CAST(GSOL.GSOL_CASE AS CHAR), "")  AS gsol_case, '+ 
                ' IFNULL(GSOL.GSOL_SOLICITANTE, "")  AS gsol_solicitante_uid, '+
                ' IFNULL(CERTIFICACION.F_NOMBRE(GSOL.GSOL_SOLICITANTE), "")  AS gsol_solicitante_nom, '+
                ' IFNULL(GSOL.GSOL_TI_SOLICITANTE,"") AS gsol_tipo_solicitante, '+
                ' IFNULL(GSOL.GSOL_VALIDADOR, "")  AS gsol_validador_uid, '+
                ' CASE WHEN GSOL.GSOL_VALIDADOR IS NULL OR "" THEN '+
                ' "" '+
                ' ELSE '+
                ' CERTIFICACION.F_NOMBRE(GSOL.GSOL_VALIDADOR) '+
                ' END AS gsol_validador_nom, '+
                ' IFNULL(CAST(GSOL.GSOL_FEC_INI AS CHAR), "")  AS gsol_fec_ini, '+
                ' IFNULL(CAST(DATE_FORMAT(GSOL.GSOL_FEC_INI, "%d/%m/%Y %H:%i:%s") AS CHAR),"") AS gsol_fec_ini_cl, '+
                ' IFNULL(CAST(GSOL.GSOL_FEC_TERM AS CHAR), "")  AS gsol_fec_term, '+
                ' IFNULL(CAST(DATE_FORMAT(GSOL.GSOL_FEC_TERM, "%d/%m/%Y %H:%i:%s") AS CHAR),"") AS gsol_fec_term_cl, '+
                ' IFNULL(CAST(GSOL.GSOL_FEC_EST_TERM AS CHAR), "")  AS gsol_fec_est_term, '+
                ' IFNULL(CAST(DATE_FORMAT(GSOL.GSOL_FEC_EST_TERM, "%d/%m/%Y") AS CHAR),"") AS gsol_fec_est_term_cl, '+
                ' IFNULL(CAST(E.EST_ID AS CHAR), "")  AS gsol_est_id, '+
                ' IFNULL(E.EST_NOMBRE, "")  AS gsol_est_nom, '+
                ' IFNULL(CAST(GSOL.GSOL_ITER AS CHAR), "")  AS gsol_iter, '+
                ' IFNULL(CAST(GSOL.DEL_INDEX AS CHAR), "")  AS gsol_del_index, '+
                ' IFNULL(CAST(GSOL.INI_ID AS CHAR), "")  AS gsol_ini_id, '+
                ' CASE WHEN I.INI_ID IS NULL THEN '+
                ' GSOL.GSOL_INI_NOM '+
                ' ELSE '+
                ' I.INI_NOM '+
                ' END AS gsol_ini_nom, '+ 
                ' CASE WHEN I.INI_ID IS NULL THEN '+
                ' IFNULL(GSOL.GSOL_COD_BECH, "") '+
                ' ELSE '+
                ' IFNULL(I.INI_BECH_MAU, "") '+
                ' END AS gsol_cod_bech, '+
                ' IFNULL(CAST(C.CAN_ID AS CHAR), "") AS can_id, '+
                ' IFNULL(C.CAN_ALIAS, "") AS can_alias, '+
                ' IFNULL(C.CAN_NOMBRE, "") AS can_nom, '+
                ' IFNULL(GSOL.GSOL_RUT, "") AS rut_solicitado, '+
                ' IFNULL(CAST(SUBSTRING(GSOL.GSOL_HORA_INI, 1, CHAR_LENGTH(GSOL.GSOL_HORA_INI) - 3) AS CHAR), "") AS hora_ini, '+
                ' IFNULL(CAST(SUBSTRING(GSOL.GSOL_HORA_TER, 1, CHAR_LENGTH(GSOL.GSOL_HORA_TER) - 3) AS CHAR), "") AS hora_term, '+
                ' IFNULL(GSOL.GSOL_FUNC, "") AS funcionalidad, '+
                ' IFNULL(GSOL.GSOL_COND_DATO, "") AS condicion_dato, '+
                ' IFNULL(CAST(GSOL.GSOL_CAN_DATO_SOL AS CHAR), "") AS cant_dato_sol, '+
                ' IFNULL(CAST(GSOL.GSOL_CAN_DATO_ENT AS CHAR), "") AS cant_dato_ent, '+
                ' IFNULL(GSOL.GSOL_OBS_ENT_DATO, "") AS obs_dato_ent, '+
                ' IFNULL(GSOL.GSOL_OBS, "") AS obs, '+
                ' IFNULL(GSOL.GSOL_OBS_CORR, "") AS obs_corr, '+
                ' GS3.GS_ID AS gs_id_amb, '+ 
                ' GS3.GS_NOM AS gs_nom_amb, '+
                ' GS2.GS_ID AS gs_id_ti_pru, '+
                ' GS2.GS_NOM AS gs_nom_ti_pru, '+
                ' GS2.GS_VIG AS gs_vig_ti_pru, '+
                ' CAST(IFNULL(CERTIFICACION.F_GDA_CONCAT_SOLICITUD_TI_SOL(GSOL.GSOL_ID, "ID"), "")  AS CHAR) AS gs_id_ti_sol, '+
                ' CAST(IFNULL(CERTIFICACION.F_GDA_CONCAT_SOLICITUD_TI_SOL(GSOL.GSOL_ID, "NOM"), "") AS CHAR) AS gs_nom_ti_sol, '+
                ' CAST(IFNULL(CERTIFICACION.F_GDA_CONCAT_SOLICITUD_TI_SOL(GSOL.GSOL_ID, "VIG"), "") AS CHAR) AS gs_vig_ti_sol, '+
                ' CAST(IFNULL(CERTIFICACION.F_GDA_CONCAT_GDA_SOLICITUD_TI_ACOND_SOL(GSOL.GSOL_ID, "ID"), "")  AS CHAR) AS gs_id_ti_acond_sol, '+ 
                ' CAST(IFNULL(CERTIFICACION.F_GDA_CONCAT_GDA_SOLICITUD_TI_ACOND_SOL(GSOL.GSOL_ID, "NOM"), "") AS CHAR) AS gs_nom_ti_acond_sol, '+
                ' CAST(IFNULL(CERTIFICACION.F_GDA_CONCAT_GDA_SOLICITUD_TI_ACOND_SOL(GSOL.GSOL_ID, "VIG"), "") AS CHAR) AS gs_vig_ti_acond_sol '+
                ' FROM GDA_SOLICITUD GSOL '+
                ' LEFT JOIN ESTADO E ON E.EST_ID = GSOL.EST_ID '+
                ' LEFT JOIN INICIATIVA I ON I.INI_ID = GSOL.INI_ID '+
                ' LEFT JOIN CANAL C ON C.CAN_ID = GSOL.CAN_ID  '+
                ' LEFT JOIN GDA_SOL GS2 ON GS2.GS_ID = GSOL.GSOL_TI_PRU '+
                ' LEFT JOIN GDA_SOL GS3 ON GS3.GS_ID = GSOL.GSOL_AMB_PRU '+
                ' WHERE GSOL.GSOL_VIG = 1 ';
                if(fnName == "getAllSolicitudesxPeriodo"){
                    sql += ' AND DATE_FORMAT(DATE(GSOL.GSOL_FEC_INI),"%Y%m") = ? ';
                }
                if(fnName == "getAllSolicitudesxGsolId"){
                    sql += ' AND GSOL.GSOL_ID = ? ';
                }
                sql += ' GROUP BY GSOL.GSOL_ID ';

                callback(sql);
}

function fn_generateAarray_AllSolicitudes(rows, callback){
    for (var i = 0; i < rows.length; i++) {
        //Se crea array Tipo de Solicitudes
        rows[i]["tipo_solicitud"] = [];
        if(rows[i].gs_id_ti_sol != ""){
            var arr_Id      = rows[i].gs_id_ti_sol.split('^^');
            var arr_Nom     = rows[i].gs_nom_ti_sol.split('^^');
            var arr_Vig     = rows[i].gs_vig_ti_sol.split('^^');
            for(var ci = 0; ci < arr_Id.length; ci++) {
                rows[i]["tipo_solicitud"].push({id: arr_Id[ci], nom: arr_Nom[ci], vig: arr_Vig[ci]});
            }
        }
        delete rows[i]['gs_id_ti_sol'];
        delete rows[i]['gs_nom_ti_sol'];
        delete rows[i]['gs_vig_ti_sol'];

        //Se crea array Tipo de Acondicionamiento
        rows[i]["tipo_acondicionamiento"] = [];
        if(rows[i].gs_id_ti_acond_sol != ""){
            var arr_Id      = rows[i].gs_id_ti_acond_sol.split('^^');
            var arr_Nom     = rows[i].gs_nom_ti_acond_sol.split('^^');
            var arr_Vig     = rows[i].gs_vig_ti_acond_sol.split('^^');
            for(var ci = 0; ci < arr_Id.length; ci++) {
                rows[i]["tipo_acondicionamiento"].push({id: arr_Id[ci], nom: arr_Nom[ci], vig: arr_Vig[ci]});
            }
        }
        delete rows[i]['gs_id_ti_acond_sol'];
        delete rows[i]['gs_nom_ti_acond_sol'];
        delete rows[i]['gs_vig_ti_acond_sol'];

        if(rows.length == i+1){
            callback(rows)
        }
    }
}

//SELECT SOLICITUD REALIZADAS EN UN PERIODO
myModel.getAllSolicitudesxPeriodo = (periodo, callback) => {
    fn_generateAllSolicitudes("getAllSolicitudesxPeriodo", function callbackSQL(sql){
        con.conCERT();
        if(conCERT){
            conCERT.query(
                sql,[periodo],
                (err, rows) => {
                    if(!err){
                        if(Object.keys(rows).length != 0){
                            fn_generateAarray_AllSolicitudes(rows, function callbackArray(rowsR){
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

//SELECT SOLICITUD x GSOL_ID
myModel.getAllSolicitudesxGsolId = (gsol_id, callback) => {
    fn_generateAllSolicitudes("getAllSolicitudesxGsolId", function callbackSQL(sql){
        con.conCERT();
        if(conCERT){
            conCERT.query(
                sql,[gsol_id],
                (err, rows) => {
                    if(!err){
                        if(Object.keys(rows).length != 0){
                            fn_generateAarray_AllSolicitudes(rows, function callbackArray(rowsR){
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

//==Separacion

//SELECT SOLICITUDES (COMBOBOX)
myModel.getAllSolicitudesCbo = (callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' GSOL.GSOL_ID AS gsol_id, '+
            ' GSOL.GSOL_CASE AS gsol_case, '+
            ' E.EST_ID AS gsol_est_id, '+
            ' E.EST_GRUPO AS gsol_est_grupo, '+
            ' IFNULL(E.EST_GRUPO2, "") AS gsol_est_grupo2, '+
            ' CAST(CERTIFICACION.F_GDA_GET_NOMBRE_CASO_SOL(GSOL.GSOL_ID) AS CHAR) AS gsol_nom_concat, '+
            ' IFNULL(GSOL.GSOL_VALIDADOR, "") AS gda_validador_uid,'+
            ' CASE WHEN GSOL.GSOL_VALIDADOR IS NULL OR "" THEN '+
            ' "" '+
            ' ELSE '+
            ' CERTIFICACION.F_NOMBRE(GSOL.GSOL_VALIDADOR) '+
            ' END AS gda_validador_nom, '+
            ' GSOL.GSOL_VIG AS gsol_vig '+
            ' FROM GDA_SOLICITUD GSOL '+
            ' LEFT JOIN ESTADO E ON E.EST_ID = GSOL.EST_ID '+
            ' ORDER BY GSOL.GSOL_CASE ',
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//SELECT SOLICITUDES POR ESTADO GRUPO (COMBOBOX)
myModel.getAllSolicitudesCboxEstGrupo = (est_grupo, callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' GSOL.GSOL_ID AS gsol_id, '+
            ' GSOL.GSOL_CASE AS gsol_case, '+
            ' E.EST_ID AS gsol_est_id, '+
            ' E.EST_GRUPO AS gsol_est_grupo, '+
            ' IFNULL(E.EST_GRUPO2, "") AS gsol_est_grupo2, '+
            ' CAST(CERTIFICACION.F_GDA_GET_NOMBRE_CASO_SOL(GSOL.GSOL_ID) AS CHAR) AS gsol_nom_concat, '+
            ' IFNULL(GSOL.GSOL_VALIDADOR, "") AS gda_validador_uid,'+
            ' CASE WHEN GSOL.GSOL_VALIDADOR IS NULL OR "" THEN '+
            ' "" '+
            ' ELSE '+
            ' CERTIFICACION.F_NOMBRE(GSOL.GSOL_VALIDADOR) '+
            ' END AS gda_validador_nom, '+
            ' GSOL.GSOL_VIG AS gsol_vig '+
            ' FROM GDA_SOLICITUD GSOL '+
            ' LEFT JOIN ESTADO E ON E.EST_ID = GSOL.EST_ID '+
            ' WHERE E.EST_GRUPO = ? '+
            ' ORDER BY GSOL.GSOL_CASE ',[est_grupo] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//==Separacion

//SELECT CANTIDAD DE DATOS SOLICITUD X GSOL_ID
myModel.getCantDatosxGsolId = (gsol_id, callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' GSOL.GSOL_ID AS gsol_id, '+
            ' IFNULL(CAST(GSOL.GSOL_CAN_DATO_SOL AS CHAR), "") AS cant_dato_sol, '+
            ' IFNULL(CAST(GSOL.GSOL_CAN_DATO_ENT AS CHAR), "") AS cant_dato_ent '+
            ' FROM GDA_SOLICITUD GSOL  '+
            ' WHERE GSOL.GSOL_ID = ? ',[gsol_id] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//SELECT CANTIDAD DE DATOS SOLICITUD X PERIODO
myModel.getCantDatosxPeriodo = (periodo, callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' GSOL.GSOL_ID AS gsol_id, '+
            ' IFNULL(CAST(SUM(GSOL.GSOL_CAN_DATO_SOL) AS CHAR), "") AS cant_dato_sol, '+
            ' IFNULL(CAST(SUM(GSOL.GSOL_CAN_DATO_ENT) AS CHAR), "") AS cant_dato_ent '+
            ' FROM GDA_SOLICITUD GSOL  '+
            ' WHERE DATE_FORMAT(DATE(GSOL.GSOL_FEC_INI),"%Y%m") = ? '+
            ' AND GSOL.GSOL_VIG = 1 ',[periodo] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//SELECT CANTIDAD DE DATOS SOLICITUD X PERIODO
myModel.getCantDatosxPeriodoxTipoSolicitante = (periodo, ti_solicitante, callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' GSOL.GSOL_ID AS gsol_id, '+
            ' IFNULL(CAST(SUM(GSOL.GSOL_CAN_DATO_SOL) AS CHAR), "") AS cant_dato_sol, '+
            ' IFNULL(CAST(SUM(GSOL.GSOL_CAN_DATO_ENT) AS CHAR), "") AS cant_dato_ent '+
            ' FROM GDA_SOLICITUD GSOL  '+
            ' WHERE DATE_FORMAT(DATE(GSOL.GSOL_FEC_INI),"%Y%m") = ? '+
            ' AND GSOL.GSOL_TI_SOLICITANTE = ? '+
            ' AND GSOL.GSOL_VIG = 1 ',[periodo, ti_solicitante] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//==Separacion

//SELECT TIPO PRUEBA Y TIPO SOLICITUD AGRUPADOS DE SOLICITUDES REALIZADAS EN UN PERIODO DE DOS FECHAS
myModel.getSol_TipoPruebaTipoSolicitudxAmbxPeriodoBetween = (amb, fec_ini, fec_term, callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' GS3.GS_ID AS gs_id_amb, '+
            ' GS3.GS_NOM AS gs_nom_amb, '+
            ' GS2.GS_ID AS gs_id_ti_pru, '+
            ' GS2.GS_NOM AS gs_nom_ti_pru, '+
            ' GS2.GS_VIG AS gs_vig_ti_pru, '+
            ' GS1.GS_ID AS gs_id_ti_sol, '+
            ' GS1.GS_NOM AS gs_nom_ti_sol, '+
            ' GS1.GS_VIG AS gs_vig_ti_sol '+
            ' FROM GDA_SOLICITUD GSOL '+
            ' LEFT JOIN GDA_SOLICITUD_TI_SOL GSTS ON GSTS.GSOL_ID = GSOL.GSOL_ID '+
            ' LEFT JOIN GDA_SOL GS1 ON GS1.GS_ID = GSTS.GS_ID '+
            ' LEFT JOIN GDA_SOL GS2 ON GS2.GS_ID = GSOL.GSOL_TI_PRU '+
            ' LEFT JOIN GDA_SOL GS3 ON GS3.GS_ID = GSOL.GSOL_AMB_PRU '+
            ' WHERE GSOL.GSOL_AMB_PRU = ? '+
            ' AND (DATE(GSOL.GSOL_FEC_INI) >= ? AND DATE(GSOL.GSOL_FEC_INI)  <= ?) '+
            ' AND GSOL.GSOL_VIG = 1 '+
            ' GROUP BY GS2.GS_ID, GS1.GS_ID '+
            ' ORDER BY GS2.GS_NOM, GS1.GS_NOM ',[amb, fec_ini, fec_term] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//TRAE LA CANTIDAD DE SOLICITUD POR PERIODO - AMBIENTE - TIPO PRUBA - TIPO SOLICITUD
myModel.getCountSolPeriodoxAmbxTiPruxTiSol = (periodo, amb, ti_pru, ti_sol, callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' COUNT(GSOL.GSOL_ID) AS cantidad, '+
            ' GS3.GS_ID AS gs_id_amb, '+
            ' GS3.GS_NOM AS gs_nom_amb, '+
            ' GS2.GS_ID AS gs_id_ti_pru, '+
            ' GS2.GS_NOM AS gs_nom_ti_pru, '+
            ' GS2.GS_VIG AS gs_vig_ti_pru, '+
            ' GS1.GS_NOM AS gs_nom_ti_sol, '+
            ' GS1.GS_ID AS gs_id_ti_sol, '+
            ' GS1.GS_VIG AS gs_vig_ti_sol '+
            ' FROM GDA_SOLICITUD GSOL '+
            ' LEFT JOIN GDA_SOLICITUD_TI_SOL GSTS ON GSTS.GSOL_ID = GSOL.GSOL_ID '+
            ' LEFT JOIN GDA_SOL GS1 ON GS1.GS_ID = GSTS.GS_ID '+
            ' LEFT JOIN GDA_SOL GS2 ON GS2.GS_ID = GSOL.GSOL_TI_PRU '+
            ' LEFT JOIN GDA_SOL GS3 ON GS3.GS_ID = GSOL.GSOL_AMB_PRU '+
            ' WHERE DATE_FORMAT(GSOL.GSOL_FEC_INI,"%Y%m") = ? '+
            ' AND GSOL.GSOL_AMB_PRU = ? '+
            ' AND GS2.GS_ID = ? '+
            ' AND GS1.GS_ID = ? '+
            ' AND GSOL.GSOL_VIG = 1 ',[periodo, amb, ti_pru, ti_sol] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//TRAE LA CANTIDAD DE SOLICITUD POR PERIODO
myModel.getCountSolPeriodo = (periodo, callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' COUNT(GSOL.GSOL_ID) AS cantidad '+
            ' FROM GDA_SOLICITUD GSOL '+
            ' WHERE DATE_FORMAT(GSOL.GSOL_FEC_INI,"%Y%m") = ? '+
            ' AND GSOL.GSOL_VIG = 1 ',[periodo] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//TRAE LA CANTIDAD DE TIPO DE SOLICITUD POR PERIODO
myModel.getCountTiSolPeriodo = (periodo, callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' COUNT(GSOL.GSOL_ID) AS cantidad '+
            ' FROM GDA_SOLICITUD GSOL '+
            ' LEFT JOIN GDA_SOLICITUD_TI_SOL GSTS ON GSTS.GSOL_ID = GSOL.GSOL_ID '+
            ' WHERE DATE_FORMAT(GSOL.GSOL_FEC_INI,"%Y%m") = ? '+
            ' AND GSOL.GSOL_VIG = 1 ',[periodo] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//==Separacion

//SELECT TIPO PRUEBA Y TIPO SOLICITUD AGRUPADOS DE SOLICITUDES QUE HAYAN PASADO POR TESTING REALIZADAS EN UN PERIODO DE DOS FECHAS 
myModel.getSol_TipoPruebaTipoSolicitudxAmbxPeriodoBetweenxTesting = (amb, fec_ini, fec_term, callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' GS3.GS_ID AS gs_id_amb, '+
            ' GS3.GS_NOM AS gs_nom_amb, '+
            ' GS2.GS_ID AS gs_id_ti_pru, '+
            ' GS2.GS_NOM AS gs_nom_ti_pru, '+
            ' GS2.GS_VIG AS gs_vig_ti_pru, '+
            ' GS1.GS_ID AS gs_id_ti_sol, '+
            ' GS1.GS_NOM AS gs_nom_ti_sol, '+
            ' GS1.GS_VIG AS gs_vig_ti_sol '+
            ' FROM GDA_SOLICITUD GSOL '+
            ' LEFT JOIN GDA_SOLICITUD_TI_SOL GSTS ON GSTS.GSOL_ID = GSOL.GSOL_ID '+
            ' LEFT JOIN GDA_SOL GS1 ON GS1.GS_ID = GSTS.GS_ID '+
            ' LEFT JOIN GDA_SOL GS2 ON GS2.GS_ID = GSOL.GSOL_TI_PRU '+
            ' LEFT JOIN GDA_SOL GS3 ON GS3.GS_ID = GSOL.GSOL_AMB_PRU '+
            ' WHERE GSOL.GSOL_AMB_PRU = ? '+
            ' AND (DATE(GSOL.GSOL_FEC_INI) >= ? AND DATE(GSOL.GSOL_FEC_INI)  <= ?) '+
            ' AND GSOL.GSOL_AR_TESTING = 1 '+
            ' AND GSOL.GSOL_VIG = 1 '+
            ' GROUP BY GS2.GS_ID, GS1.GS_ID '+
            ' ORDER BY GS2.GS_NOM, GS1.GS_NOM ',[amb, fec_ini, fec_term] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//TRAE LA CANTIDAD DE SOLICITUD QUE HAYAN PASADO POR TESTING POR PERIODO - AMBIENTE - TIPO PRUBA - TIPO SOLICITUD
myModel.getCountSolPeriodoxAmbxTiPruxTiSolxTesting = (periodo, amb, ti_pru, ti_sol, callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' COUNT(GSOL.GSOL_ID) AS cantidad, '+
            ' GS3.GS_ID AS gs_id_amb, '+
            ' GS3.GS_NOM AS gs_nom_amb, '+
            ' GS2.GS_ID AS gs_id_ti_pru, '+
            ' GS2.GS_NOM AS gs_nom_ti_pru, '+
            ' GS2.GS_VIG AS gs_vig_ti_pru, '+
            ' GS1.GS_NOM AS gs_nom_ti_sol, '+
            ' GS1.GS_ID AS gs_id_ti_sol, '+
            ' GS1.GS_VIG AS gs_vig_ti_sol '+
            ' FROM GDA_SOLICITUD GSOL '+
            ' LEFT JOIN GDA_SOLICITUD_TI_SOL GSTS ON GSTS.GSOL_ID = GSOL.GSOL_ID '+
            ' LEFT JOIN GDA_SOL GS1 ON GS1.GS_ID = GSTS.GS_ID '+
            ' LEFT JOIN GDA_SOL GS2 ON GS2.GS_ID = GSOL.GSOL_TI_PRU '+
            ' LEFT JOIN GDA_SOL GS3 ON GS3.GS_ID = GSOL.GSOL_AMB_PRU '+
            ' WHERE DATE_FORMAT(GSOL.GSOL_FEC_INI,"%Y%m") = ? '+
            ' AND GSOL.GSOL_AMB_PRU = ? '+
            ' AND GS2.GS_ID = ? '+
            ' AND GS1.GS_ID = ? '+
            ' AND GSOL.GSOL_AR_TESTING = 1 '+
            ' AND GSOL.GSOL_VIG = 1 ',[periodo, amb, ti_pru, ti_sol] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//TRAE LA CANTIDAD DE SOLICITUD QUE HAYAN POR TESTING POR PERIODO
myModel.getCountSolPeriodoxTesting = (periodo, callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' COUNT(GSOL.GSOL_ID) AS cantidad '+
            ' FROM GDA_SOLICITUD GSOL '+
            ' WHERE DATE_FORMAT(GSOL.GSOL_FEC_INI,"%Y%m") = ? '+
            ' AND GSOL.GSOL_AR_TESTING = 1 '+
            ' AND GSOL.GSOL_VIG = 1 ',[periodo] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//TRAE LA CANTIDAD DE TIPO DE SOLICITUD QUE HAYAN POR TESTING POR PERIODO
myModel.getCountTiSolPeriodoxTesting = (periodo, callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' COUNT(GSOL.GSOL_ID) AS cantidad '+
            ' FROM GDA_SOLICITUD GSOL '+
            ' LEFT JOIN GDA_SOLICITUD_TI_SOL GSTS ON GSTS.GSOL_ID = GSOL.GSOL_ID '+
            ' WHERE DATE_FORMAT(GSOL.GSOL_FEC_INI,"%Y%m") = ? '+
            ' AND GSOL.GSOL_AR_TESTING = 1 '+
            ' AND GSOL.GSOL_VIG = 1 ',[periodo] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//==Separacion

//SELECT TIPO PRUEBA Y TIPO SOLICITUD AGRUPADOS DE SOLICITUDES QUE HAYAN PASADO POR GESTION DE DATOS REALIZADAS EN UN PERIODO DE DOS FECHAS 
myModel.getSol_TipoPruebaTipoSolicitudxAmbxPeriodoBetweenxGestDeDatos = (amb, fec_ini, fec_term, callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' GS3.GS_ID AS gs_id_amb, '+
            ' GS3.GS_NOM AS gs_nom_amb, '+
            ' GS2.GS_ID AS gs_id_ti_pru, '+
            ' GS2.GS_NOM AS gs_nom_ti_pru, '+
            ' GS2.GS_VIG AS gs_vig_ti_pru, '+
            ' GS1.GS_ID AS gs_id_ti_sol, '+
            ' GS1.GS_NOM AS gs_nom_ti_sol, '+
            ' GS1.GS_VIG AS gs_vig_ti_sol '+
            ' FROM GDA_SOLICITUD GSOL '+
            ' LEFT JOIN GDA_SOLICITUD_TI_SOL GSTS ON GSTS.GSOL_ID = GSOL.GSOL_ID '+
            ' LEFT JOIN GDA_SOL GS1 ON GS1.GS_ID = GSTS.GS_ID '+
            ' LEFT JOIN GDA_SOL GS2 ON GS2.GS_ID = GSOL.GSOL_TI_PRU '+
            ' LEFT JOIN GDA_SOL GS3 ON GS3.GS_ID = GSOL.GSOL_AMB_PRU '+
            ' WHERE GSOL.GSOL_AMB_PRU = ? '+
            ' AND (DATE(GSOL.GSOL_FEC_INI) >= ? AND DATE(GSOL.GSOL_FEC_INI)  <= ?) '+
            ' AND GSOL.GSOL_AR_GDD = 1 '+
            ' AND GSOL.GSOL_VIG = 1 '+
            ' GROUP BY GS2.GS_ID, GS1.GS_ID '+
            ' ORDER BY GS2.GS_NOM, GS1.GS_NOM ',[amb, fec_ini, fec_term] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//TRAE LA CANTIDAD DE SOLICITUD QUE HAYAN PASADO POR GESTION DE DATOS POR PERIODO - AMBIENTE - TIPO PRUBA - TIPO SOLICITUD
myModel.getCountSolPeriodoxAmbxTiPruxTiSolxGestDeDatos = (periodo, amb, ti_pru, ti_sol, callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' COUNT(GSOL.GSOL_ID) AS cantidad, '+
            ' GS3.GS_ID AS gs_id_amb, '+
            ' GS3.GS_NOM AS gs_nom_amb, '+
            ' GS2.GS_ID AS gs_id_ti_pru, '+
            ' GS2.GS_NOM AS gs_nom_ti_pru, '+
            ' GS2.GS_VIG AS gs_vig_ti_pru, '+
            ' GS1.GS_NOM AS gs_nom_ti_sol, '+
            ' GS1.GS_ID AS gs_id_ti_sol, '+
            ' GS1.GS_VIG AS gs_vig_ti_sol '+
            ' FROM GDA_SOLICITUD GSOL '+
            ' LEFT JOIN GDA_SOLICITUD_TI_SOL GSTS ON GSTS.GSOL_ID = GSOL.GSOL_ID '+
            ' LEFT JOIN GDA_SOL GS1 ON GS1.GS_ID = GSTS.GS_ID '+
            ' LEFT JOIN GDA_SOL GS2 ON GS2.GS_ID = GSOL.GSOL_TI_PRU '+
            ' LEFT JOIN GDA_SOL GS3 ON GS3.GS_ID = GSOL.GSOL_AMB_PRU '+
            ' WHERE DATE_FORMAT(GSOL.GSOL_FEC_INI,"%Y%m") = ? '+
            ' AND GSOL.GSOL_AMB_PRU = ? '+
            ' AND GS2.GS_ID = ? '+
            ' AND GS1.GS_ID = ? '+
            ' AND GSOL.GSOL_AR_GDD = 1 '+
            ' AND GSOL.GSOL_VIG = 1 ',[periodo, amb, ti_pru, ti_sol] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//TRAE LA CANTIDAD DE SOLICITUD QUE HAYAN POR GESTION DE DATOS POR PERIODO
myModel.getCountSolPeriodoxGestDeDatos = (periodo, callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' COUNT(GSOL.GSOL_ID) AS cantidad '+
            ' FROM GDA_SOLICITUD GSOL '+
            ' WHERE DATE_FORMAT(GSOL.GSOL_FEC_INI,"%Y%m") = ? '+
            ' AND GSOL.GSOL_AR_GDD = 1 '+
            ' AND GSOL.GSOL_VIG = 1 ',[periodo] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//TRAE LA CANTIDAD DE TIPO DE SOLICITUD QUE HAYAN POR GESTION DE DATOS POR PERIODO
myModel.getCountTiSolPeriodoxGestDeDatos = (periodo, callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' COUNT(GSOL.GSOL_ID) AS cantidad '+
            ' FROM GDA_SOLICITUD GSOL '+
            ' LEFT JOIN GDA_SOLICITUD_TI_SOL GSTS ON GSTS.GSOL_ID = GSOL.GSOL_ID '+
            ' WHERE DATE_FORMAT(GSOL.GSOL_FEC_INI,"%Y%m") = ? '+
            ' AND GSOL.GSOL_AR_GDD = 1 '+
            ' AND GSOL.GSOL_VIG = 1 ',[periodo] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//==Separacion

//SELECT TIPO PRUEBA, TIPO SOLICITUD Y SOLICITANTE AGRUPADOS DE SOLICITUDES REALIZADAS EN UN PERIODO DE DOS FECHAS
myModel.getSol_SolicitanteTipoPruebaTipoSolicitudxAmbxPeriodoBetween = (amb, fec_ini, fec_term, callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' GSOL.GSOL_SOLICITANTE AS solicitante_uid, '+
            ' CERTIFICACION.F_NOMBRE(GSOL.GSOL_SOLICITANTE) AS solicitante_nombre, '+
            ' GS3.GS_ID AS gs_id_amb, '+
            ' GS3.GS_NOM AS gs_nom_amb, '+
            ' GS2.GS_ID AS gs_id_ti_pru, '+
            ' GS2.GS_NOM AS gs_nom_ti_pru, '+
            ' GS2.GS_VIG AS gs_vig_ti_pru, '+
            ' GS1.GS_ID AS gs_id_ti_sol, '+
            ' GS1.GS_NOM AS gs_nom_ti_sol, '+
            ' GS1.GS_VIG AS gs_vig_ti_sol '+
            ' FROM GDA_SOLICITUD GSOL '+
            ' LEFT JOIN GDA_SOLICITUD_TI_SOL GSTS ON GSTS.GSOL_ID = GSOL.GSOL_ID '+
            ' LEFT JOIN GDA_SOL GS1 ON GS1.GS_ID = GSTS.GS_ID '+
            ' LEFT JOIN GDA_SOL GS2 ON GS2.GS_ID = GSOL.GSOL_TI_PRU '+
            ' LEFT JOIN GDA_SOL GS3 ON GS3.GS_ID = GSOL.GSOL_AMB_PRU '+
            ' WHERE GSOL.GSOL_AMB_PRU = ? '+
            ' AND (DATE(GSOL.GSOL_FEC_INI) >= ? AND DATE(GSOL.GSOL_FEC_INI)  <= ?) '+
            ' AND GSOL.GSOL_VIG = 1 '+
            ' GROUP BY GSOL.GSOL_SOLICITANTE, GS2.GS_ID, GS1.GS_ID '+
            ' ORDER BY CERTIFICACION.F_NOMBRE(GSOL.GSOL_SOLICITANTE), GS2.GS_NOM, GS1.GS_NOM ',[amb, fec_ini, fec_term] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//TRAE LA CANTIDAD DE SOLICITUD POR PERIODO - AMBIENTE - SOLICITANTE - TIPO PRUBA - TIPO SOLICITUD
myModel.getCountSolPeriodoxAmbxSolicitantexTiPruxTiSol = (periodo, amb, solicitante, ti_pru, ti_sol, callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' GSOL.GSOL_SOLICITANTE AS solicitante_uid, '+
            ' CERTIFICACION.F_NOMBRE(GSOL.GSOL_SOLICITANTE) AS solicitante_nombre, '+
            ' COUNT(GSOL.GSOL_ID) AS cantidad, '+
            ' GS3.GS_ID AS gs_id_amb, '+
            ' GS3.GS_NOM AS gs_nom_amb, '+
            ' GS2.GS_ID AS gs_id_ti_pru, '+
            ' GS2.GS_NOM AS gs_nom_ti_pru, '+
            ' GS2.GS_VIG AS gs_vig_ti_pru, '+
            ' GS1.GS_NOM AS gs_nom_ti_sol, '+
            ' GS1.GS_ID AS gs_id_ti_sol, '+
            ' GS1.GS_VIG AS gs_vig_ti_sol '+
            ' FROM GDA_SOLICITUD GSOL '+
            ' LEFT JOIN GDA_SOLICITUD_TI_SOL GSTS ON GSTS.GSOL_ID = GSOL.GSOL_ID '+
            ' LEFT JOIN GDA_SOL GS1 ON GS1.GS_ID = GSTS.GS_ID '+
            ' LEFT JOIN GDA_SOL GS2 ON GS2.GS_ID = GSOL.GSOL_TI_PRU '+
            ' LEFT JOIN GDA_SOL GS3 ON GS3.GS_ID = GSOL.GSOL_AMB_PRU '+
            ' WHERE DATE_FORMAT(GSOL.GSOL_FEC_INI,"%Y%m") = ? '+
            ' AND GSOL.GSOL_AMB_PRU = ? '+
            ' AND GSOL.GSOL_SOLICITANTE = ? '+
            ' AND GS2.GS_ID = ? '+
            ' AND GS1.GS_ID = ? '+
            ' AND GSOL.GSOL_VIG = 1 ',[periodo, amb, solicitante, ti_pru, ti_sol] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//==Separacion

//SELECT TIPO PRUEBA, TIPO SOLICITUD Y VALIDADOR GDA AGRUPADOS DE SOLICITUDES REALIZADAS EN UN PERIODO DE DOS FECHAS
myModel.getSol_ValGDATipoPruebaTipoSolicitudxAmbxPeriodoBetween = (amb, fec_ini, fec_term, callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' IFNULL(GSOL.GSOL_VALIDADOR, "") AS validador_gda_uid, '+
            ' CASE WHEN GSOL.GSOL_VALIDADOR IS NOT NULL THEN '+
            '   CERTIFICACION.F_NOMBRE(GSOL.GSOL_VALIDADOR) '+
            ' ELSE '+
            '   "Validador Pendiente" '+
            ' END AS validador_gda_nombre, '+
            ' GS3.GS_ID AS gs_id_amb, '+
            ' GS3.GS_NOM AS gs_nom_amb, '+
            ' GS2.GS_ID AS gs_id_ti_pru, '+
            ' GS2.GS_NOM AS gs_nom_ti_pru, '+
            ' GS2.GS_VIG AS gs_vig_ti_pru, '+
            ' GS1.GS_ID AS gs_id_ti_sol, '+
            ' GS1.GS_NOM AS gs_nom_ti_sol, '+
            ' GS1.GS_VIG AS gs_vig_ti_sol '+
            ' FROM GDA_SOLICITUD GSOL '+
            ' LEFT JOIN GDA_SOLICITUD_TI_SOL GSTS ON GSTS.GSOL_ID = GSOL.GSOL_ID '+
            ' LEFT JOIN GDA_SOL GS1 ON GS1.GS_ID = GSTS.GS_ID '+
            ' LEFT JOIN GDA_SOL GS2 ON GS2.GS_ID = GSOL.GSOL_TI_PRU '+
            ' LEFT JOIN GDA_SOL GS3 ON GS3.GS_ID = GSOL.GSOL_AMB_PRU '+
            ' WHERE GSOL.GSOL_AMB_PRU = ? '+
            ' AND (DATE(GSOL.GSOL_FEC_INI) >= ? AND DATE(GSOL.GSOL_FEC_INI)  <= ?) '+
            ' AND GSOL.GSOL_VIG = 1 '+
            ' GROUP BY GSOL.GSOL_VALIDADOR, GS2.GS_ID, GS1.GS_ID '+
            ' ORDER BY CASE WHEN GSOL.GSOL_VALIDADOR IS NOT NULL THEN CERTIFICACION.F_NOMBRE(GSOL.GSOL_VALIDADOR) ELSE "Validador Pendiente" END, '+
            ' GS2.GS_NOM, GS1.GS_NOM ',[amb, fec_ini, fec_term] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//TRAE LA CANTIDAD DE SOLICITUD POR PERIODO - AMBIENTE - VALIDADOR GDA - TIPO PRUBA - TIPO SOLICITUD
myModel.getCountSolPeriodoxAmbxValGDAxTiPruxTiSol = (periodo, amb, val_gda, ti_pru, ti_sol, callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' IFNULL(GSOL.GSOL_VALIDADOR, "") AS validador_gda_uid, '+
            ' CASE WHEN GSOL.GSOL_VALIDADOR IS NOT NULL THEN '+
            '   CERTIFICACION.F_NOMBRE(GSOL.GSOL_VALIDADOR) '+
            ' ELSE '+
            '   "Validador Pendiente" '+
            ' END AS validador_gda_nombre, '+
            ' COUNT(GSOL.GSOL_ID) AS cantidad, '+
            ' GS3.GS_ID AS gs_id_amb, '+
            ' GS3.GS_NOM AS gs_nom_amb, '+
            ' GS2.GS_ID AS gs_id_ti_pru, '+
            ' GS2.GS_NOM AS gs_nom_ti_pru, '+
            ' GS2.GS_VIG AS gs_vig_ti_pru, '+
            ' GS1.GS_NOM AS gs_nom_ti_sol, '+
            ' GS1.GS_ID AS gs_id_ti_sol, '+
            ' GS1.GS_VIG AS gs_vig_ti_sol '+
            ' FROM GDA_SOLICITUD GSOL '+
            ' LEFT JOIN GDA_SOLICITUD_TI_SOL GSTS ON GSTS.GSOL_ID = GSOL.GSOL_ID '+
            ' LEFT JOIN GDA_SOL GS1 ON GS1.GS_ID = GSTS.GS_ID '+
            ' LEFT JOIN GDA_SOL GS2 ON GS2.GS_ID = GSOL.GSOL_TI_PRU '+
            ' LEFT JOIN GDA_SOL GS3 ON GS3.GS_ID = GSOL.GSOL_AMB_PRU '+
            ' WHERE DATE_FORMAT(GSOL.GSOL_FEC_INI,"%Y%m") = ? '+
            ' AND GSOL.GSOL_AMB_PRU = ? '+
            ' AND IFNULL(GSOL.GSOL_VALIDADOR, "") = ? '+
            ' AND GS2.GS_ID = ? '+
            ' AND GS1.GS_ID = ? '+
            ' AND GSOL.GSOL_VIG = 1 ',[periodo, amb, val_gda, ti_pru, ti_sol] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//==Separacion

//SELECT TIPO PRUEBA, TIPO SOLICITUD (CONCAT) Y ID SOLICITUD
myModel.getSol_TipoPruebaTipoSolicitudConcatxAmbxPeriodo = (amb, periodo, callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' GSOL.GSOL_ID as gsol_id, '+
            ' GS3.GS_ID AS gs_id_amb, '+
            ' GS3.GS_NOM AS gs_nom_amb, '+
            ' GS2.GS_ID AS gs_id_ti_pru, '+
            ' GS2.GS_NOM AS gs_nom_ti_pru, '+
            ' GS2.GS_VIG AS gs_vig_ti_pru, '+
            ' CAST(IFNULL(REPLACE(CERTIFICACION.F_GDA_CONCAT_SOLICITUD_TI_SOL(GSOL.GSOL_ID, "NOM"),"^^",", "), "") AS CHAR) AS gs_nom_ti_sol, '+
            ' CAST(IFNULL(REPLACE(CERTIFICACION.F_GDA_CONCAT_SOLICITUD_TI_SOL(GSOL.GSOL_ID, "NOM"),"^^","\n"), "") AS CHAR) AS gs_nom_ti_sol_breakline, '+
            ' CAST(IFNULL(REPLACE(CERTIFICACION.F_GDA_CONCAT_SOLICITUD_TI_SOL(GSOL.GSOL_ID, "NOM"),"^^","<br>"), "") AS CHAR) AS gs_nom_ti_sol_html '+
            ' FROM GDA_SOLICITUD GSOL '+
            ' LEFT JOIN GDA_SOL GS2 ON GS2.GS_ID = GSOL.GSOL_TI_PRU '+
            ' LEFT JOIN GDA_SOL GS3 ON GS3.GS_ID = GSOL.GSOL_AMB_PRU '+
            ' WHERE GSOL.GSOL_AMB_PRU = ? '+
            ' AND DATE_FORMAT(DATE(GSOL.GSOL_FEC_INI),"%Y%m") = ? '+
            ' AND GSOL.GSOL_VIG = 1  '+
            ' ORDER BY GS2.GS_NOM ',[amb, periodo] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//SELECT TIPO PRUEBA, TIPO SOLICITUD (CONCAT) Y ID SOLICITUD x Ambiente x TipoSolicitante
myModel.getSol_TipoPruebaTipoSolicitudConcatxAmbxTipoSolicitantexPeriodo = (amb, ti_solicitante, periodo, callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' GSOL.GSOL_ID as gsol_id, '+
            ' GS3.GS_ID AS gs_id_amb, '+
            ' GS3.GS_NOM AS gs_nom_amb, '+
            ' GS2.GS_ID AS gs_id_ti_pru, '+
            ' GS2.GS_NOM AS gs_nom_ti_pru, '+
            ' GS2.GS_VIG AS gs_vig_ti_pru, '+
            ' CAST(IFNULL(REPLACE(CERTIFICACION.F_GDA_CONCAT_SOLICITUD_TI_SOL(GSOL.GSOL_ID, "NOM"),"^^",", "), "") AS CHAR) AS gs_nom_ti_sol, '+
            ' CAST(IFNULL(REPLACE(CERTIFICACION.F_GDA_CONCAT_SOLICITUD_TI_SOL(GSOL.GSOL_ID, "NOM"),"^^","\n"), "") AS CHAR) AS gs_nom_ti_sol_breakline, '+
            ' CAST(IFNULL(REPLACE(CERTIFICACION.F_GDA_CONCAT_SOLICITUD_TI_SOL(GSOL.GSOL_ID, "NOM"),"^^","<br>"), "") AS CHAR) AS gs_nom_ti_sol_html '+
            ' FROM GDA_SOLICITUD GSOL '+
            ' LEFT JOIN GDA_SOL GS2 ON GS2.GS_ID = GSOL.GSOL_TI_PRU '+
            ' LEFT JOIN GDA_SOL GS3 ON GS3.GS_ID = GSOL.GSOL_AMB_PRU '+
            ' WHERE GSOL.GSOL_AMB_PRU = ? '+
            ' AND GSOL.GSOL_TI_SOLICITANTE = ?'+
            ' AND DATE_FORMAT(DATE(GSOL.GSOL_FEC_INI),"%Y%m") = ? '+
            ' AND GSOL.GSOL_VIG = 1  '+
            ' ORDER BY GS2.GS_NOM ',[amb, ti_solicitante, periodo] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//==Separacion

//SELECT VALIDADOR GDA, TIPO PRUEBA, TIPO SOLICITUD (CONCAT) Y ID SOLICITUD
myModel.getSol_ValGDATipoPruebaTipoSolicitudConcatxAmbxPeriodo = (amb, periodo, callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' GSOL.GSOL_ID as gsol_id, '+
            ' GS3.GS_ID AS gs_id_amb, '+
            ' GS3.GS_NOM AS gs_nom_amb, '+
            ' IFNULL(GSOL.GSOL_VALIDADOR, "") AS validador_gda_uid, '+
            ' CASE WHEN GSOL.GSOL_VALIDADOR IS NOT NULL THEN '+
            '   CERTIFICACION.F_NOMBRE(GSOL.GSOL_VALIDADOR) '+
            ' ELSE '+
            '   "Validador Pendiente" '+
            ' END AS validador_gda_nombre, '+
            ' GS2.GS_ID AS gs_id_ti_pru, '+
            ' GS2.GS_NOM AS gs_nom_ti_pru, '+
            ' GS2.GS_VIG AS gs_vig_ti_pru, '+
            ' CAST(IFNULL(REPLACE(CERTIFICACION.F_GDA_CONCAT_SOLICITUD_TI_SOL(GSOL.GSOL_ID, "NOM"),"^^",", "), "") AS CHAR) AS gs_nom_ti_sol, '+
            ' CAST(IFNULL(REPLACE(CERTIFICACION.F_GDA_CONCAT_SOLICITUD_TI_SOL(GSOL.GSOL_ID, "NOM"),"^^","\n"), "") AS CHAR) AS gs_nom_ti_sol_breakline, '+
            ' CAST(IFNULL(REPLACE(CERTIFICACION.F_GDA_CONCAT_SOLICITUD_TI_SOL(GSOL.GSOL_ID, "NOM"),"^^","<br>"), "") AS CHAR) AS gs_nom_ti_sol_html '+
            ' FROM GDA_SOLICITUD GSOL '+
            ' LEFT JOIN GDA_SOL GS2 ON GS2.GS_ID = GSOL.GSOL_TI_PRU '+
            ' LEFT JOIN GDA_SOL GS3 ON GS3.GS_ID = GSOL.GSOL_AMB_PRU '+
            ' WHERE GSOL.GSOL_AMB_PRU = ? '+
            ' AND DATE_FORMAT(DATE(GSOL.GSOL_FEC_INI),"%Y%m") = ? '+
            ' AND GSOL.GSOL_VIG = 1  '+
            ' ORDER BY CASE WHEN GSOL.GSOL_VALIDADOR IS NOT NULL THEN CERTIFICACION.F_NOMBRE(GSOL.GSOL_VALIDADOR) ELSE "Validador Pendiente" END, '+
            ' GS2.GS_NOM ',[amb, periodo] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//SELECT VALIDADOR GDA, TIPO PRUEBA, TIPO SOLICITUD (CONCAT) Y ID SOLICITUD x Ambiente x TipoSolicitante
myModel.getSol_ValGDATipoPruebaTipoSolicitudConcatxAmbxTipoSolicitantexPeriodo = (amb, ti_solicitante, periodo, callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' GSOL.GSOL_ID as gsol_id, '+
            ' GS3.GS_ID AS gs_id_amb, '+
            ' GS3.GS_NOM AS gs_nom_amb, '+
            ' IFNULL(GSOL.GSOL_VALIDADOR, "") AS validador_gda_uid, '+
            ' CASE WHEN GSOL.GSOL_VALIDADOR IS NOT NULL THEN '+
            '   CERTIFICACION.F_NOMBRE(GSOL.GSOL_VALIDADOR) '+
            ' ELSE '+
            '   "Validador Pendiente" '+
            ' END AS validador_gda_nombre, '+
            ' GS2.GS_ID AS gs_id_ti_pru, '+
            ' GS2.GS_NOM AS gs_nom_ti_pru, '+
            ' GS2.GS_VIG AS gs_vig_ti_pru, '+
            ' CAST(IFNULL(REPLACE(CERTIFICACION.F_GDA_CONCAT_SOLICITUD_TI_SOL(GSOL.GSOL_ID, "NOM"),"^^",", "), "") AS CHAR) AS gs_nom_ti_sol, '+
            ' CAST(IFNULL(REPLACE(CERTIFICACION.F_GDA_CONCAT_SOLICITUD_TI_SOL(GSOL.GSOL_ID, "NOM"),"^^","\n"), "") AS CHAR) AS gs_nom_ti_sol_breakline, '+
            ' CAST(IFNULL(REPLACE(CERTIFICACION.F_GDA_CONCAT_SOLICITUD_TI_SOL(GSOL.GSOL_ID, "NOM"),"^^","<br>"), "") AS CHAR) AS gs_nom_ti_sol_html '+
            ' FROM GDA_SOLICITUD GSOL '+
            ' LEFT JOIN GDA_SOL GS2 ON GS2.GS_ID = GSOL.GSOL_TI_PRU '+
            ' LEFT JOIN GDA_SOL GS3 ON GS3.GS_ID = GSOL.GSOL_AMB_PRU '+
            ' WHERE GSOL.GSOL_AMB_PRU = ? '+
            ' AND GSOL.GSOL_TI_SOLICITANTE = ?'+
            ' AND DATE_FORMAT(DATE(GSOL.GSOL_FEC_INI),"%Y%m") = ? '+
            ' AND GSOL.GSOL_VIG = 1  '+
            ' ORDER BY CASE WHEN GSOL.GSOL_VALIDADOR IS NOT NULL THEN CERTIFICACION.F_NOMBRE(GSOL.GSOL_VALIDADOR) ELSE "Validador Pendiente" END, '+
            ' GS2.GS_NOM ',[amb, ti_solicitante, periodo] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};


//exportamos nuestro modelo
module.exports = myModel;
        