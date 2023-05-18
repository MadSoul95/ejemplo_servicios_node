var con     = require('../../../condb/condb');

//var unirest = require('unirest');
//var async   = require("async");
//var RouteApi         = require('../../properties/properties');
//var propertiesReader = require('properties-reader');
//var properties       = propertiesReader(RouteApi.fn_environment()+'/api.properties');
//var capturaToken     = require('../../functions/capturaToken.functions');


let myModel = {};

/* CASOS DISEÑADOS */

//Obtiene fecha de ultima actualización en la tabla CERTIFICACION_GESTION.CASOS_DIS
myModel.getCasosDisenadosFromTL_lastUpdate = (callback) => {
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT '+
            ' CAST(CD.CD_FECHA_INSERT AS CHAR) AS fec_insert, '+
            ' DATE_FORMAT(CD.CD_FECHA_INSERT,"%d/%m/%Y %H:%i:%s") AS fec_insert_cl  '+
            ' FROM CERTIFICACION_GESTION.CASOS_DIS CD  '+
            ' ORDER BY CD.CD_FECHA_INSERT DESC LIMIT 1 ',
            (err, rows) => {
                callback(err, rows)
            }
        )
        conCERT_GEST.end();
    }
};

//SELECT X PERIODO
//MODELO SH EN LA NOCHE
myModel.getCasosDisenadosFromTLPeriodo = (periodo,callback) => {
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT '+
            ' IFNULL(A.ACT_ID,"") AS act_id, '+
            ' IFNULL(I.INI_ID,"") AS ini_id, '+
            ' IFNULL(I.INI_NOM,"") AS ini_nom, '+
            ' IFNULL(TI.TI_NOMBRE,"") AS tipo_ini, '+
            ' IFNULL(TA.TA_NOMBRE,"") AS tipo_act, '+
            ' IFNULL(C.CAN_ALIAS,"") AS canal_alias, '+
            ' IFNULL(C.CAN_NOMBRE,"") AS canal, '+
            ' IFNULL(TF.TF_ALIAS,"") AS fase_alias, '+
            ' IFNULL(TF.TF_NOMBRE,"") AS fase_nom, '+
            ' IFNULL(CERTIFICACION.F_GET_DISP_BROW_X_ACT(A.ACT_ID),"") AS disp_brow, '+
            ' IFNULL(FCI.FCI_CICLO,"") AS ciclo_fase, '+
            ' IFNULL(FCI.FCI_ITER,"") AS iter_fase, '+
            ' IFNULL(CAST(A.ACT_FECHA_FIN AS CHAR),"")  AS fec_entrega_cli, '+
            ' IFNULL(CAST(DATE_FORMAT(A.ACT_FECHA_FIN, "%d/%m/%Y %H:%i:%s") AS CHAR),"") AS fec_entrega_cli_cl, '+
            ' IFNULL(F.F_DTF,"") AS dtf, '+
            ' IFNULL(CAST(EST_AUD.EST_ID AS CHAR), "") AS est_auditoria_id, '+
            ' IFNULL(EST_AUD.EST_NOMBRE,"") AS est_auditoria, '+
            ' IFNULL(CD.CD_PP_ID,"") AS testplan_id, '+
            ' IFNULL(CD.CD_PP_NOM,"") AS testplan_nom, '+
            ' IFNULL(CD.BLD_ID,"") AS build_id, '+
            ' IFNULL(CD.CD_BLD_NOM,"") AS nombre_build, '+
            ' IFNULL(CD.CD_FECHA_CARGA_BLD,"") AS fec_carga_build, '+
            ' IFNULL(CAST(DATE_FORMAT(CD.CD_FECHA_CARGA_BLD, "%d/%m/%Y %H:%i:%s") AS CHAR),"") AS fec_carga_build_cl, '+
            ' IFNULL(CD.CD_CASO,"") AS caso, '+
            ' IFNULL(CD.CD_TCVERSION_ID,"") AS tcversion_id, '+
            ' IFNULL(CD.CD_CICLO,"") AS ciclo_dis, '+
            ' IFNULL(CD.CD_ITER,"") AS iteracion_dis, '+
            ' IFNULL(CD.CD_EST_ANALISIS,"") AS estado_analisis, '+
            ' IFNULL(CD.CD_DISPOSITIVO,"") AS dispositivo_dis, '+
            ' IFNULL(CD.CD_V_DISPOSITIVO,"") AS version_dispositivo_dis, '+
            ' IFNULL(CD.CD_SEGMENTO,"") AS segmento, '+
            ' IFNULL(CD.CD_CRITICO,"") AS es_critico_dis, '+
            ' IFNULL(CD.CD_DATO_PRUEBA,"") AS dato_de_prueba_dis, '+
            ' IFNULL(CD.CD_DISENADOR,"") AS disenador_dis, '+
            ' IFNULL(CAST(CD.CD_FEC_DISENO AS CHAR),"") AS fec_dis, '+
            ' IFNULL(CAST(DATE_FORMAT(CD.CD_FEC_DISENO, "%d/%m/%Y") AS CHAR),"") AS fec_dis_cl, '+
            ' IFNULL(CD.CD_FEC_DISENO_UNIX,"") AS fec_dis_unix '+
            ' FROM CERTIFICACION_GESTION.CASOS_DIS CD '+
            ' LEFT JOIN CERTIFICACION.ACTIVIDAD A ON A.BLD_ID = CD.BLD_ID '+
            ' LEFT JOIN CERTIFICACION.FASE_CICLO_ITER FCI ON FCI.FCI_ID = A.FCI_ID '+
            ' LEFT JOIN CERTIFICACION.FASE F ON F.F_ID = FCI.F_ID '+
            ' LEFT JOIN CERTIFICACION.TIPO_ACTIVIDAD TA ON TA.TA_ID = F.TA_ID '+
            ' LEFT JOIN CERTIFICACION.TIPO_FASE TF ON TF.TF_ID = F.TF_ID '+
            ' LEFT JOIN CERTIFICACION.INICIATIVA_CANAL IC ON IC.IC_ID = F.IC_ID '+
            ' LEFT JOIN CERTIFICACION.INICIATIVA I ON I.INI_ID = IC.INI_ID '+
            ' LEFT JOIN CERTIFICACION.TIPO_INICIATIVA TI ON TI.TI_ID = I.TI_ID '+
            ' LEFT JOIN CERTIFICACION.CANAL C ON C.CAN_ID = IC.CAN_ID '+
            ' LEFT JOIN CERTIFICACION.ESTADO EST_AUD ON EST_AUD.EST_ID = A.ACT_AUD '+
            ' LEFT JOIN CERTIFICACION.ESTADO EST_F   ON EST_F.EST_ID   = F.EST_ID '+
            ' LEFT JOIN CERTIFICACION.ESTADO EST_FCI ON EST_FCI.EST_ID = FCI.EST_ID  '+
            ' LEFT JOIN CERTIFICACION.ESTADO EST_A   ON EST_A.EST_ID   = A.EST_ID '+
            ' WHERE CD.CD_PERIODO = ? '+
            ' AND TF.TF_ID = 1 '+
            ' AND EST_F.EST_GRUPO NOT IN ("C") '+
            ' AND EST_FCI.EST_GRUPO NOT IN ("C") '+
            ' AND EST_A.EST_GRUPO NOT IN ("C") '+
            ' AND A.ACT_ID IS NOT NULL '+
            //' AND A.ACT_AUD IN (41,43,70) '+ //41 Aprobada, 43 Liberada, 70 Lib Condicional
            ' ORDER BY I.INI_ID, TF.TF_ALIAS, C.CAN_NOMBRE, TA.TA_ALIAS, F.F_ID, FCI.FCI_ID, A.ACT_ID, CD.CD_CASO',[periodo] ,
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT_GEST.end();
};

/*
//SELECT X PERIODO
//MODELO EN LINEA
myModel.getCasosDisenadosFromTLPeriodo = (periodo,callback) => {

    capturaToken.fnProcesosApi_authBechTestLink(properties.get('api.user_testlink'), properties.get('api.pass_testlink'), function callbackGetToken(responseToken){
        var arrSuccess  = responseToken[0];
        var arrError    = responseToken[1];
        var arrToken    = responseToken[2];
        if(arrSuccess == false){
            callback(arrError, 0);
        }else{
            var req = unirest('POST', ''+properties.get('api.url_testlink')+''+properties.get('api.port_testlink')+'/proc-bech-testlink/api/diseno/casos/periodo')
            .headers({
                'Content-Type': ['application/x-www-form-urlencoded', 'application/x-www-form-urlencoded'],
                'Authorization': arrToken
            })
            .send('periodo='+periodo+'')
            .end(function (res) { 
                if (res.error){
                    callback(res.error, 0);
                }else{
                    var arrayTL = res.body.data;
                    con.conCERT().connect();
                    //var builds_check = [];
                    //builds_check.push(arrayTL[0].id_build);
                    async.forEachOf(arrayTL, function (row, i, callbackTL){
                        var obj = arrayTL[i];
                        var id_build = obj.id_build;
                        //console.log(i);
                        //console.log(builds_check);
                        //if(builds_check.indexOf(id_build) !== -1){
                            //delete arrayTL[i];
                            //callbackTL();
                        //}else{
                            //builds_check.push(id_build); 
                            if(conCERT){
                                conCERT.query(
                                    ' SELECT '+
                                    ' IFNULL(A.ACT_ID,"") AS act_id, '+
                                    ' IFNULL(I.INI_ID,"") AS ini_id, '+
                                    ' IFNULL(I.INI_NOM,"") AS ini_nom, '+
                                    ' IFNULL(TI.TI_NOMBRE,"") AS tipo_ini, '+
                                    ' IFNULL(TA.TA_NOMBRE,"") AS tipo_act, '+
                                    ' IFNULL(C.CAN_ALIAS,"") AS canal_alias, '+
                                    ' IFNULL(C.CAN_NOMBRE,"") AS canal, '+
                                    ' IFNULL(TF.TF_ALIAS,"") AS fase_alias, '+
                                    ' IFNULL(TF.TF_NOMBRE,"") AS fase_nom, '+
                                    ' IFNULL(CERTIFICACION.F_GET_DISP_BROW_X_ACT(A.ACT_ID),"") AS disp_brow, '+
                                    ' IFNULL(FCI.FCI_CICLO,"") AS ciclo_fase, '+
                                    ' IFNULL(FCI.FCI_ITER,"") AS iter_fase, '+
                                    ' IFNULL(CAST(A.ACT_FECHA_FIN AS CHAR),"")  AS fec_entrega_cli, '+
                                    ' IFNULL(CAST(DATE_FORMAT(A.ACT_FECHA_FIN, "%d/%m/%Y %H:%i:%s") AS CHAR),"") AS fec_entrega_cli_cl, '+
                                    ' IFNULL(F.F_DTF,"") AS dtf, '+
                                    ' IFNULL(CAST(EST_AUD.EST_ID AS CHAR), "") AS est_auditoria_id, '+
                                    ' IFNULL(EST_AUD.EST_NOMBRE,"") AS est_auditoria '+
                                    ' FROM ACTIVIDAD A'+
                                    ' LEFT JOIN CERTIFICACION.FASE_CICLO_ITER FCI ON FCI.FCI_ID = A.FCI_ID '+
                                    ' LEFT JOIN CERTIFICACION.FASE F ON F.F_ID = FCI.F_ID '+
                                    ' LEFT JOIN CERTIFICACION.TIPO_ACTIVIDAD TA ON TA.TA_ID = F.TA_ID '+
                                    ' LEFT JOIN CERTIFICACION.TIPO_FASE TF ON TF.TF_ID = F.TF_ID '+
                                    ' LEFT JOIN CERTIFICACION.INICIATIVA_CANAL IC ON IC.IC_ID = F.IC_ID '+
                                    ' LEFT JOIN CERTIFICACION.INICIATIVA I ON I.INI_ID = IC.INI_ID '+
                                    ' LEFT JOIN CERTIFICACION.TIPO_INICIATIVA TI ON TI.TI_ID = I.TI_ID '+
                                    ' LEFT JOIN CERTIFICACION.CANAL C ON C.CAN_ID = IC.CAN_ID '+
                                    ' LEFT JOIN CERTIFICACION.ESTADO EST_AUD ON EST_AUD.EST_ID = A.ACT_AUD '+
                                    ' WHERE A.BLD_ID = ? ',[id_build] ,
                                    function(err, rowsACT, fields){
                                        console.log(fields);
                                        if(!err){
                                            if(Object.keys(rowsACT).length != 0){ 
                                                arrayTL[i] = Object.assign(rowsACT[0], arrayTL[i]);
                                                //console.log(arrayTL[i]);
                                            }else{ //El build no existe en tabla ACTIVIDAD
                                                delete arrayTL[i]; //Quitamos array de builds no existente en CERTIFICACION 
                                                //console.log(arrayTL[i]);
                                            }
                                            callbackTL();
                                        }else{
                                            //Error en la Query del Loop
                                            callback(err,null);
                                        }
                                    }
                                )
                            }
                        //}
                    }, function(err, row){
                        if(err){
                            //Error dentro del Loop
                            callback(err,null);
                            conCERT.end();
                        }else{
                            //Termina el Lopp
                            arrayTL = arrayTL.filter(function(x){return x !== null}); //Remueve null de Builds no existentes en CERTIFICACION
                            callback(err,arrayTL);
                            conCERT.end();
                        }
                    });
                } 
            });
        }
    });
};
*/

//SELECT X BUILD ID
myModel.getCasosDisenadosFromTLBuild = (id,callback) => {
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT '+
            ' IFNULL(A.ACT_ID,"") AS act_id, '+
            ' IFNULL(I.INI_ID,"") AS ini_id, '+
            ' IFNULL(I.INI_NOM,"") AS ini_nom, '+
            ' IFNULL(TI.TI_NOMBRE,"") AS tipo_ini, '+
            ' IFNULL(TA.TA_NOMBRE,"") AS tipo_act, '+
            ' IFNULL(C.CAN_ALIAS,"") AS canal_alias, '+
            ' IFNULL(C.CAN_NOMBRE,"") AS canal, '+
            ' IFNULL(TF.TF_ALIAS,"") AS fase_alias, '+
            ' IFNULL(TF.TF_NOMBRE,"") AS fase_nom, '+
            ' IFNULL(CERTIFICACION.F_GET_DISP_BROW_X_ACT(A.ACT_ID),"") AS disp_brow, '+
            ' IFNULL(FCI.FCI_CICLO,"") AS ciclo_fase, '+
            ' IFNULL(FCI.FCI_ITER,"") AS iter_fase, '+
            ' IFNULL(CAST(A.ACT_FECHA_FIN AS CHAR),"")  AS fec_entrega_cli, '+
            ' IFNULL(CAST(DATE_FORMAT(A.ACT_FECHA_FIN, "%d/%m/%Y %H:%i:%s") AS CHAR),"") AS fec_entrega_cli_cl, '+
            ' IFNULL(F.F_DTF,"") AS dtf, '+
            ' IFNULL(CAST(EST_AUD.EST_ID AS CHAR), "") AS est_auditoria_id, '+
            ' IFNULL(EST_AUD.EST_NOMBRE,"") AS est_auditoria, '+
            ' IFNULL(CD.CD_PP_ID,"") AS testplan_id, '+
            ' IFNULL(CD.CD_PP_NOM,"") AS testplan_nom, '+
            ' IFNULL(CD.BLD_ID,"") AS build_id, '+
            ' IFNULL(CD.CD_BLD_NOM,"") AS nombre_build, '+
            ' IFNULL(CD.CD_FECHA_CARGA_BLD,"") AS fec_carga_build, '+
            ' IFNULL(CAST(DATE_FORMAT(CD.CD_FECHA_CARGA_BLD, "%d/%m/%Y %H:%i:%s") AS CHAR),"") AS fec_carga_build_cl, '+
            ' IFNULL(CD.CD_CASO,"") AS caso, '+
            ' IFNULL(CD.CD_TCVERSION_ID,"") AS tcversion_id, '+
            ' IFNULL(CD.CD_CICLO,"") AS ciclo_dis, '+
            ' IFNULL(CD.CD_ITER,"") AS iteracion_dis, '+
            ' IFNULL(CD.CD_EST_ANALISIS,"") AS estado_analisis, '+
            ' IFNULL(CD.CD_DISPOSITIVO,"") AS dispositivo_dis, '+
            ' IFNULL(CD.CD_V_DISPOSITIVO,"") AS version_dispositivo_dis, '+
            ' IFNULL(CD.CD_SEGMENTO,"") AS segmento, '+
            ' IFNULL(CD.CD_CRITICO,"") AS es_critico_dis, '+
            ' IFNULL(CD.CD_DATO_PRUEBA,"") AS dato_de_prueba_dis, '+
            ' IFNULL(CD.CD_DISENADOR,"") AS disenador_dis, '+
            ' IFNULL(CAST(CD.CD_FEC_DISENO AS CHAR),"") AS fec_dis, '+
            ' IFNULL(CAST(DATE_FORMAT(CD.CD_FEC_DISENO, "%d/%m/%Y") AS CHAR),"") AS fec_dis_cl, '+
            ' IFNULL(CD.CD_FEC_DISENO_UNIX,"") AS fec_dis_unix '+
            ' FROM CERTIFICACION_GESTION.CASOS_DIS CD '+
            ' LEFT JOIN CERTIFICACION.ACTIVIDAD A ON A.BLD_ID = CD.BLD_ID '+
            ' LEFT JOIN CERTIFICACION.FASE_CICLO_ITER FCI ON FCI.FCI_ID = A.FCI_ID '+
            ' LEFT JOIN CERTIFICACION.FASE F ON F.F_ID = FCI.F_ID '+
            ' LEFT JOIN CERTIFICACION.TIPO_ACTIVIDAD TA ON TA.TA_ID = F.TA_ID '+
            ' LEFT JOIN CERTIFICACION.TIPO_FASE TF ON TF.TF_ID = F.TF_ID '+
            ' LEFT JOIN CERTIFICACION.INICIATIVA_CANAL IC ON IC.IC_ID = F.IC_ID '+
            ' LEFT JOIN CERTIFICACION.INICIATIVA I ON I.INI_ID = IC.INI_ID '+
            ' LEFT JOIN CERTIFICACION.TIPO_INICIATIVA TI ON TI.TI_ID = I.TI_ID '+
            ' LEFT JOIN CERTIFICACION.CANAL C ON C.CAN_ID = IC.CAN_ID '+
            ' LEFT JOIN CERTIFICACION.ESTADO EST_AUD ON EST_AUD.EST_ID = A.ACT_AUD '+
            ' WHERE CD.BLD_ID = ? '+
            ' AND TF.TF_ID = 1 '+
            ' AND A.ACT_ID IS NOT NULL '+
            ' ORDER BY I.INI_ID, TF.TF_ALIAS, C.CAN_NOMBRE, TA.TA_ALIAS, F.F_ID, FCI.FCI_ID, A.ACT_ID, CD.CD_CASO',[id] ,
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT_GEST.end();
};

// ================================== //
// ========== SEPARACION ============ //
// ================================== //

/* CASOS EJECUTADOS */

//Obtiene fecha de ultima actualización en la tabla CERTIFICACION_GESTION.CASOS_EJE
myModel.getCasosEjecutadosFromTL_lastUpdate = (callback) => {
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT '+
            ' CAST(CE.CE_FECHA_INSERT AS CHAR) AS fec_insert, '+
            ' DATE_FORMAT(CE.CE_FECHA_INSERT,"%d/%m/%Y %H:%i:%s") AS fec_insert_cl  '+
            ' FROM CERTIFICACION_GESTION.CASOS_EJE CE  '+
            ' ORDER BY CE.CE_FECHA_INSERT DESC LIMIT 1 ',
            (err, rows) => {
                callback(err, rows)
            }
        )
        conCERT_GEST.end();
    }
};


//SELECT X PERIODO
//MODELO SH EN LA NOCHE
myModel.getCasosEjecutadosFromTLPeriodo = (periodo,callback) => {
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT '+
            ' IFNULL(A.ACT_ID,"") AS act_id, '+
            ' IFNULL(I.INI_ID,"") AS ini_id, '+
            ' IFNULL(I.INI_NOM,"") AS ini_nom, '+
            ' IFNULL(TI.TI_NOMBRE,"") AS tipo_ini, '+
            ' IFNULL(TA.TA_NOMBRE,"") AS tipo_act, '+
            ' IFNULL(C.CAN_ALIAS,"") AS canal_alias, '+
            ' IFNULL(C.CAN_NOMBRE,"") AS canal, '+
            ' IFNULL(TF.TF_ALIAS,"") AS fase_alias, '+
            ' IFNULL(TF.TF_NOMBRE,"") AS fase_nom, '+
            ' IFNULL(CERTIFICACION.F_GET_DISP_BROW_X_ACT(A.ACT_ID),"") AS disp_brow, '+
            ' IFNULL(FCI.FCI_CICLO,"") AS ciclo_fase, '+
            ' IFNULL(FCI.FCI_ITER,"") AS iter_fase, '+
            ' IFNULL(CAST(A.ACT_FECHA_FIN AS CHAR),"")  AS fec_entrega_cli, '+
            ' IFNULL(CAST(DATE_FORMAT(A.ACT_FECHA_FIN, "%d/%m/%Y %H:%i:%s") AS CHAR),"") AS fec_entrega_cli_cl, '+
            ' IFNULL(F.F_DTF,"") AS dtf, '+
            ' IFNULL(CAST(EST_AUD.EST_ID AS CHAR), "") AS est_auditoria_id, '+
            ' IFNULL(EST_AUD.EST_NOMBRE,"") AS est_auditoria, '+
            ' IFNULL(CE.CE_PP_ID,"") AS testplan_id, '+
            ' IFNULL(CE.CE_PP_NOM,"") AS testplan_nom, '+
            ' IFNULL(CE.BLD_ID,"") AS build_id, '+
            ' IFNULL(CE.CE_BLD_NOM,"") AS nombre_build, '+
            ' IFNULL(CE.CE_FECHA_CARGA_BLD,"") AS fec_carga_build,'+
            ' IFNULL(CAST(DATE_FORMAT(CE.CE_FECHA_CARGA_BLD, "%d/%m/%Y %H:%i:%s") AS CHAR),"") AS fec_carga_build_cl, '+
            ' IFNULL(CE.CE_CASO,"") AS caso, '+
            ' IFNULL(CE.CE_TCVERSION_ID,"") AS tcversion_id, '+
            ' IFNULL(CE.CE_EXECUTION_ID,"") AS execution_id, '+
            ' IFNULL(CE.CE_FEC_EXECUTION,"") AS fec_execution, '+
            ' IFNULL(CAST(DATE_FORMAT(CE.CE_FEC_EXECUTION, "%d/%m/%Y %H:%i:%s") AS CHAR),"") AS fec_execution_cl, '+
            ' IFNULL(CE.CE_CICLO,"") AS ciclo_ejec, '+
            ' IFNULL(CE.CE_ITER,"") AS iteracion_ejec, '+
            ' IFNULL(CE.CE_ESTADO_CASO_ALIAS,"") AS estado_caso_alias, '+
            ' IFNULL(CE.CE_ESTADO_CASO,"") AS estado_caso_nom, '+
            ' IFNULL(CE.CE_EJEC_USERNAME,"") AS ejec_username, '+
            ' IFNULL(CE.CE_EJEC_FULLNAME,"") AS ejec_full_name, '+
            ' IFNULL(CE.CE_PREEXISTENCIA,"") AS preexistencia, '+
            ' IFNULL(CE.CE_TRACKMAU,"") AS trackmau, '+
            ' IFNULL(CE.CE_TIPO_EJEC_REAL,"") AS tipo_ejecucion_real, '+
            ' IFNULL(CE.CE_TIPO_HORARIO,"") AS tipo_horario, '+
            ' IFNULL(CE.CE_DATO_PRUEBA_REAL,"") AS dato_prueba_real, '+
            ' IFNULL(CE.CE_ES_REPETICION,"") AS es_repeticion, '+
            ' IFNULL(CE.CE_MOT_REPETICION,"") AS motivo_repeticion, '+
            ' IFNULL(CE.CE_MOT_EJEC_MANUAL,"") AS motivo_ejecucion_manual, '+
            ' IFNULL(CE.CE_AUTO_DIS_TEST,"") AS auto_dis_test, '+
            ' IFNULL(CE.CE_AUTO_DIS_TESTQA,"") AS auto_dis_tesqa, '+
            ' IFNULL(CE.CE_AUTO_DIS_PREPROD,"") AS auto_dis_preprod, '+
            ' IFNULL(CE.CE_AUTO_DIS_PROD,"") AS auto_dis_prod, '+
            ' IFNULL(CE.CE_CRITICO,"") AS es_critico_dis, '+
            ' IFNULL(CE.CE_DESC_CASO_PRU,"") AS desc_caso_prueba, '+
            ' IFNULL(CE.CE_NOTAS_DESC,"") AS notas_desc '+
            ' FROM CERTIFICACION_GESTION.CASOS_EJE CE '+
            ' LEFT JOIN CERTIFICACION.ACTIVIDAD A ON A.BLD_ID = CE.BLD_ID '+
            ' LEFT JOIN CERTIFICACION.FASE_CICLO_ITER FCI ON FCI.FCI_ID = A.FCI_ID '+
            ' LEFT JOIN CERTIFICACION.FASE F ON F.F_ID = FCI.F_ID '+
            ' LEFT JOIN CERTIFICACION.TIPO_ACTIVIDAD TA ON TA.TA_ID = F.TA_ID '+
            ' LEFT JOIN CERTIFICACION.TIPO_FASE TF ON TF.TF_ID = F.TF_ID '+
            ' LEFT JOIN CERTIFICACION.INICIATIVA_CANAL IC ON IC.IC_ID = F.IC_ID '+
            ' LEFT JOIN CERTIFICACION.INICIATIVA I ON I.INI_ID = IC.INI_ID '+
            ' LEFT JOIN CERTIFICACION.TIPO_INICIATIVA TI ON TI.TI_ID = I.TI_ID '+
            ' LEFT JOIN CERTIFICACION.CANAL C ON C.CAN_ID = IC.CAN_ID '+
            ' LEFT JOIN CERTIFICACION.ESTADO EST_AUD ON EST_AUD.EST_ID = A.ACT_AUD '+
            ' LEFT JOIN CERTIFICACION.ESTADO EST_F   ON EST_F.EST_ID   = F.EST_ID '+
            ' LEFT JOIN CERTIFICACION.ESTADO EST_FCI ON EST_FCI.EST_ID = FCI.EST_ID  '+
            ' LEFT JOIN CERTIFICACION.ESTADO EST_A   ON EST_A.EST_ID   = A.EST_ID '+
            ' WHERE CE.CE_PERIODO = ? '+
            ' AND TF.TF_ID != 1 '+
            ' AND EST_F.EST_GRUPO NOT IN ("C") '+
            ' AND EST_FCI.EST_GRUPO NOT IN ("C") '+
            ' AND EST_A.EST_GRUPO NOT IN ("C") '+
            //' AND A.ACT_AUD IN (41,43,70) '+ //41 Aprobada, 43 Liberada, 70 Lib Condicional
            ' AND A.ACT_ID IS NOT NULL '+
            ' ORDER BY I.INI_ID, TF.TF_ALIAS, C.CAN_NOMBRE, TA.TA_ALIAS, F.F_ID, FCI.FCI_ID, A.ACT_ID, CE.CE_CASO, CE.CE_FEC_EXECUTION ',[periodo] ,
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT_GEST.end();
};

//SELECT X BUILD ID
myModel.getCasosEjecutadosFromTLBuild = (id,callback) => {
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT '+
            ' IFNULL(A.ACT_ID,"") AS act_id, '+
            ' IFNULL(I.INI_ID,"") AS ini_id, '+
            ' IFNULL(I.INI_NOM,"") AS ini_nom, '+
            ' IFNULL(TI.TI_NOMBRE,"") AS tipo_ini, '+
            ' IFNULL(TA.TA_NOMBRE,"") AS tipo_act, '+
            ' IFNULL(C.CAN_ALIAS,"") AS canal_alias, '+
            ' IFNULL(C.CAN_NOMBRE,"") AS canal, '+
            ' IFNULL(TF.TF_ALIAS,"") AS fase_alias, '+
            ' IFNULL(TF.TF_NOMBRE,"") AS fase_nom, '+
            ' IFNULL(CERTIFICACION.F_GET_DISP_BROW_X_ACT(A.ACT_ID),"") AS disp_brow, '+
            ' IFNULL(FCI.FCI_CICLO,"") AS ciclo_fase, '+
            ' IFNULL(FCI.FCI_ITER,"") AS iter_fase, '+
            ' IFNULL(CAST(A.ACT_FECHA_FIN AS CHAR),"")  AS fec_entrega_cli, '+
            ' IFNULL(CAST(DATE_FORMAT(A.ACT_FECHA_FIN, "%d/%m/%Y %H:%i:%s") AS CHAR),"") AS fec_entrega_cli_cl, '+
            ' IFNULL(F.F_DTF,"") AS dtf, '+
            ' IFNULL(CAST(EST_AUD.EST_ID AS CHAR), "") AS est_auditoria_id, '+
            ' IFNULL(EST_AUD.EST_NOMBRE,"") AS est_auditoria, '+
            ' IFNULL(CE.CE_PP_ID,"") AS testplan_id, '+
            ' IFNULL(CE.CE_PP_NOM,"") AS testplan_nom, '+
            ' IFNULL(CE.BLD_ID,"") AS build_id, '+
            ' IFNULL(CE.CE_BLD_NOM,"") AS nombre_build, '+
            ' IFNULL(CE.CE_FECHA_CARGA_BLD,"") AS fec_carga_build,'+
            ' IFNULL(CAST(DATE_FORMAT(CE.CE_FECHA_CARGA_BLD, "%d/%m/%Y %H:%i:%s") AS CHAR),"") AS fec_carga_build_cl, '+
            ' IFNULL(CE.CE_CASO,"") AS caso, '+
            ' IFNULL(CE.CE_TCVERSION_ID,"") AS tcversion_id, '+
            ' IFNULL(CE.CE_EXECUTION_ID,"") AS execution_id, '+
            ' IFNULL(CE.CE_FEC_EXECUTION,"") AS fec_execution, '+
            ' IFNULL(CAST(DATE_FORMAT(CE.CE_FEC_EXECUTION, "%d/%m/%Y %H:%i:%s") AS CHAR),"") AS fec_execution_cl, '+
            ' IFNULL(CE.CE_CICLO,"") AS ciclo_ejec, '+
            ' IFNULL(CE.CE_ITER,"") AS iteracion_ejec, '+
            ' IFNULL(CE.CE_ESTADO_CASO_ALIAS,"") AS estado_caso_alias, '+
            ' IFNULL(CE.CE_ESTADO_CASO,"") AS estado_caso_nom, '+
            ' IFNULL(CE.CE_EJEC_USERNAME,"") AS ejec_username, '+
            ' IFNULL(CE.CE_EJEC_FULLNAME,"") AS ejec_full_name, '+
            ' IFNULL(CE.CE_PREEXISTENCIA,"") AS preexistencia, '+
            ' IFNULL(CE.CE_TRACKMAU,"") AS trackmau, '+
            ' IFNULL(CE.CE_TIPO_EJEC_REAL,"") AS tipo_ejecucion_real, '+
            ' IFNULL(CE.CE_TIPO_HORARIO,"") AS tipo_horario, '+
            ' IFNULL(CE.CE_DATO_PRUEBA_REAL,"") AS dato_prueba_real, '+
            ' IFNULL(CE.CE_ES_REPETICION,"") AS es_repeticion, '+
            ' IFNULL(CE.CE_MOT_REPETICION,"") AS motivo_repeticion, '+
            ' IFNULL(CE.CE_MOT_EJEC_MANUAL,"") AS motivo_ejecucion_manual, '+
            ' IFNULL(CE.CE_AUTO_DIS_TEST,"") AS auto_dis_test, '+
            ' IFNULL(CE.CE_AUTO_DIS_TESTQA,"") AS auto_dis_tesqa, '+
            ' IFNULL(CE.CE_AUTO_DIS_PREPROD,"") AS auto_dis_preprod, '+
            ' IFNULL(CE.CE_AUTO_DIS_PROD,"") AS auto_dis_prod, '+
            ' IFNULL(CE.CE_CRITICO,"") AS es_critico_dis, '+
            ' IFNULL(CE.CE_DESC_CASO_PRU,"") AS desc_caso_prueba, '+
            ' IFNULL(CE.CE_NOTAS_DESC,"") AS notas_desc '+
            ' FROM CERTIFICACION_GESTION.CASOS_EJE CE '+
            ' LEFT JOIN CERTIFICACION.ACTIVIDAD A ON A.BLD_ID = CE.BLD_ID '+
            ' LEFT JOIN CERTIFICACION.FASE_CICLO_ITER FCI ON FCI.FCI_ID = A.FCI_ID '+
            ' LEFT JOIN CERTIFICACION.FASE F ON F.F_ID = FCI.F_ID '+
            ' LEFT JOIN CERTIFICACION.TIPO_ACTIVIDAD TA ON TA.TA_ID = F.TA_ID '+
            ' LEFT JOIN CERTIFICACION.TIPO_FASE TF ON TF.TF_ID = F.TF_ID '+
            ' LEFT JOIN CERTIFICACION.INICIATIVA_CANAL IC ON IC.IC_ID = F.IC_ID '+
            ' LEFT JOIN CERTIFICACION.INICIATIVA I ON I.INI_ID = IC.INI_ID '+
            ' LEFT JOIN CERTIFICACION.TIPO_INICIATIVA TI ON TI.TI_ID = I.TI_ID '+
            ' LEFT JOIN CERTIFICACION.CANAL C ON C.CAN_ID = IC.CAN_ID '+
            ' LEFT JOIN CERTIFICACION.ESTADO EST_AUD ON EST_AUD.EST_ID = A.ACT_AUD '+
            ' LEFT JOIN CERTIFICACION.ESTADO EST_F   ON EST_F.EST_ID   = F.EST_ID '+
            ' LEFT JOIN CERTIFICACION.ESTADO EST_FCI ON EST_FCI.EST_ID = FCI.EST_ID  '+
            ' LEFT JOIN CERTIFICACION.ESTADO EST_A   ON EST_A.EST_ID   = A.EST_ID '+
            ' WHERE CE.BLD_ID = ? '+
            ' AND TF.TF_ID != 1 '+
            ' AND A.ACT_ID IS NOT NULL '+
            ' ORDER BY I.INI_ID, TF.TF_ALIAS, C.CAN_NOMBRE, TA.TA_ALIAS, F.F_ID, FCI.FCI_ID, A.ACT_ID, CE.CE_CASO, CE.CE_FEC_EXECUTION ',[id] ,
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT_GEST.end();
};

//SELECT REPORTE DE INICIATIVAS X FACTURACION
myModel.getReporteIniFactu = (periodo,callback) => {
    con.conCERT("SP");
    if(conCERT){
        conCERT.query(
            'CALL CERTIFICACION.SP_REPORTE_INI_TIP_FACT(?)',[periodo],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT.end();
};

module.exports = myModel;