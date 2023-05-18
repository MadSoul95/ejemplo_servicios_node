var con = require('../../condb/condb');
var moment  = require('moment');
let myModel = {};

//SELECT EJECUTADOS X DIA 
/*
d	=> No Ejecutado Por Dato
e	=> No Ejecutado Por Ambiente
f	=> Rechazado
p	=> Aprobado
x	=> No Ejecutado
y	=> No Aplica
*/
myModel.getCasosEjecucionxDiaAll = (date, callback) => {
    if(moment(date, "YYYY-MM-DD", true).isValid() == false){
        callback(null, "la fecha "+date+" enviada no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT ' +
            ' IFNULL(SUM(EDT_CANT),0) AS cantidad ' +
            ' FROM EJECUCION_DIARIA_TESTLINK ' +
            ' WHERE EDT_FILTRO = "EST_EJEC" ' +
            ' AND DATE(EDT_FEC) = ? ',[date],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};

//SELECT EJECUTADOS X DIA APROBADOS Y RECHAZADOS
/*
d	=> No Ejecutado Por Dato
e	=> No Ejecutado Por Ambiente
f	=> Rechazado
p	=> Aprobado
x	=> No Ejecutado
y	=> No Aplica
*/
myModel.getCasosEjecucionxDiaAprobRech = (date, callback) => {
    if(moment(date, "YYYY-MM-DD", true).isValid() == false){
        callback(null, "la fecha "+date+" enviada no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT ' +
            ' IFNULL(SUM(EDT_CANT),0) AS cantidad ' +
            ' FROM EJECUCION_DIARIA_TESTLINK ' +
            ' WHERE EDT_FILTRO = "EST_EJEC" ' +
            ' AND EDT_FILTRO_VAL IN ("f","p") ' +
            ' AND DATE(EDT_FEC) = ?',[date],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};

//SELECT EJECUTADOS X DIA EXCEPTO NO APLICA
/*
d	=> No Ejecutado Por Dato
e	=> No Ejecutado Por Ambiente
f	=> Rechazado
p	=> Aprobado
x	=> No Ejecutado
y	=> No Aplica
*/
myModel.getCasosEjecucionxDiaAllWithoutNoAplica = (date, callback) => {
    if(moment(date, "YYYY-MM-DD", true).isValid() == false){
        callback(null, "la fecha "+date+" enviada no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT ' +
            ' IFNULL(SUM(EDT_CANT),0) AS cantidad ' +
            ' FROM EJECUCION_DIARIA_TESTLINK  ' +
            ' WHERE EDT_FILTRO = "EST_EJEC" ' +
            ' AND EDT_FILTRO_VAL NOT IN ("y") ' +
            ' AND DATE(EDT_FEC) = ?',[date],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};

//SELECT EJECUTADOS X DIA X STATUS 
/*
d	=> No Ejecutado Por Dato
e	=> No Ejecutado Por Ambiente
f	=> Rechazado
p	=> Aprobado
x	=> No Ejecutado
y	=> No Aplica
*/
myModel.getCasosEjecucionxStatusxDate = (status, date, callback) => {
    if(moment(date, "YYYY-MM-DD", true).isValid() == false){
        callback(null, "la fecha "+date+" enviada no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT ' +
            ' EDT_CANT AS cantidad ' +
            ' FROM EJECUCION_DIARIA_TESTLINK ' +
            ' WHERE DATE(EDT_FEC) = ? ' +
            ' AND EDT_FILTRO = "EST_EJEC" ' +
            ' AND EDT_FILTRO_VAL = ?',[date, status],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};

//SELECT EJECUTADOS X DIA X Tipo Ejecucion (Manual-Automatica) 
myModel.getCasosEjecucionxTipoEjectxDate = (tipo_ejec, date, callback) => {
    if(moment(date, "YYYY-MM-DD", true).isValid() == false){
        callback(null, "la fecha "+date+" enviada no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT ' +
            ' IFNULL(SUM(EDT_CANT),0) AS cantidad ' + 
            ' FROM EJECUCION_DIARIA_TESTLINK ' +
            ' WHERE DATE(EDT_FEC) = ? ' +
            ' AND EDT_FILTRO = "EJEC_AUTO_MAN" ' +
            ' AND EDT_FILTRO_VAL = ?',[date, tipo_ejec],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};

//SELECT EJECUTADOS X DIA X Tipo Ejecucion (Manual-Auto) - EXCEPTO NO APLICA
myModel.getCasosEjecucionxWithoutNoAplicaTipoEjectxDate = (tipo_ejec, date, callback) => {
    if(moment(date, "YYYY-MM-DD", true).isValid() == false){
        callback(null, "la fecha "+date+" enviada no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT ' +
            ' IFNULL(SUM(EDT_CANT),0) AS cantidad ' +
            ' FROM EJECUCION_DIARIA_TESTLINK ' +
            ' WHERE DATE(EDT_FEC) = ? ' +
            ' AND EDT_FILTRO = "EJEC_AUTO_MAN" ' +
            ' AND EDT_FILTRO_VAL = ? ' +
            ' AND EDT_STATUS NOT IN ("y")',[date, tipo_ejec],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};

//PERIODO ANIO-MES
//SELECT EJECUTADOS X PERIODO 
/*
d	=> No Ejecutado Por Dato
e	=> No Ejecutado Por Ambiente
f	=> Rechazado
p	=> Aprobado
x	=> No Ejecutado
y	=> No Aplica
*/
myModel.getCasosEjecucionxPeriodoAll = (periodo, callback) => {
    if(moment(periodo, "YYYYMM", true).isValid() == false){
        callback(null, "el periodo "+periodo+" enviado no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT ' +
            ' IFNULL(SUM(EDT_CANT),0) AS cantidad ' +
            ' FROM EJECUCION_DIARIA_TESTLINK ' +
            ' WHERE EDT_FILTRO = "EST_EJEC" ' +
            ' AND DATE_FORMAT(EDT_FEC,"%Y%m") = ? ',[periodo],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};

//SELECT EJECUTADOS X PERIODO APROBADOS Y RECHAZADOS
/*
d	=> No Ejecutado Por Dato
e	=> No Ejecutado Por Ambiente
f	=> Rechazado
p	=> Aprobado
x	=> No Ejecutado
y	=> No Aplica
*/
myModel.getCasosEjecucionxPeriodoAprobRech = (periodo, callback) => {
    if(moment(date, "YYYYMM", true).isValid() == false){
        callback(null, "el periodo "+periodo+" enviado no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT ' +
            ' IFNULL(SUM(EDT_CANT),0) AS cantidad ' +
            ' FROM EJECUCION_DIARIA_TESTLINK ' +
            ' WHERE EDT_FILTRO = "EST_EJEC" ' +
            ' AND EDT_FILTRO_VAL IN ("f","p") ' +
            ' AND DATE_FORMAT(EDT_FEC,"%Y%m") = ?',[periodo],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};

//SELECT EJECUTADOS X PERIODO EXCEPTO NO APLICA
/*
d	=> No Ejecutado Por Dato
e	=> No Ejecutado Por Ambiente
f	=> Rechazado
p	=> Aprobado
x	=> No Ejecutado
y	=> No Aplica
*/
myModel.getCasosEjecucionxPeriodoAllWithoutNoAplica = (periodo, callback) => {
    if(moment(periodo, "YYYYMM", true).isValid() == false){
        callback(null, "el periodo "+periodo+" enviado no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT ' +
            ' IFNULL(SUM(EDT_CANT),0) AS cantidad ' +
            ' FROM EJECUCION_DIARIA_TESTLINK  ' +
            ' WHERE EDT_FILTRO = "EST_EJEC" ' +
            ' AND EDT_FILTRO_VAL NOT IN ("y") ' +
            ' AND DATE_FORMAT(EDT_FEC,"%Y%m") = ?',[periodo],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};

//SELECT EJECUTADOS X PERIODO X STATUS 
/*
d	=> No Ejecutado Por Dato
e	=> No Ejecutado Por Ambiente
f	=> Rechazado
p	=> Aprobado
x	=> No Ejecutado
y	=> No Aplica
*/
myModel.getCasosEjecucionxStatusxPeriodo = (status, periodo, callback) => {
    if(moment(periodo, "YYYYMM", true).isValid() == false){
        callback(null, "el periodo "+periodo+" enviada no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT ' +
            ' IFNULL(SUM(EDT_CANT),0) AS cantidad ' +
            ' FROM EJECUCION_DIARIA_TESTLINK ' +
            ' WHERE DATE_FORMAT(EDT_FEC,"%Y%m") = ? ' +
            ' AND EDT_FILTRO = "EST_EJEC" ' +
            ' AND EDT_FILTRO_VAL = ?',[periodo, status],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};

//SELECT EJECUTADOS X PERIODO X Tipo Ejecucion (Manual-Automatica) 
myModel.getCasosEjecucionxTipoEjectxPeriodo = (tipo_ejec, periodo, callback) => {
    if(moment(periodo, "YYYYMM", true).isValid() == false){
        callback(null, "el periodo "+periodo+" enviado no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT ' +
            ' IFNULL(SUM(EDT_CANT),0) AS cantidad ' + 
            ' FROM EJECUCION_DIARIA_TESTLINK ' +
            ' WHERE DATE_FORMAT(EDT_FEC,"%Y%m") = ? ' +
            ' AND EDT_FILTRO = "EJEC_AUTO_MAN" ' +
            ' AND EDT_FILTRO_VAL = ?',[periodo, tipo_ejec],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};

//SELECT EJECUTADOS X PERIODO X Tipo Ejecucion (Manual-Auto) - EXCEPTO NO APLICA
myModel.getCasosEjecucionxWithoutNoAplicaTipoEjectxPeriodo = (tipo_ejec, periodo, callback) => {
    if(moment(date, "YYYYMM", true).isValid() == false){
        callback(null, "el periodo "+periodo+" enviado no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT ' +
            ' IFNULL(SUM(EDT_CANT),0) AS cantidad ' +
            ' FROM EJECUCION_DIARIA_TESTLINK ' +
            ' WHERE DATE_FORMAT(EDT_FEC,"%Y%m") = ? ' +
            ' AND EDT_FILTRO = "EJEC_AUTO_MAN" ' +
            ' AND EDT_FILTRO_VAL = ? ' +
            ' AND EDT_STATUS NOT IN ("y")',[periodo, tipo_ejec],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};

///SELECTS DE CASOS EJECUTADOS USUARIOS FÁBRICA 
//SELECT EJECUTADOS X DIA EXCEPTO NO APLICA
/*
d	=> No Ejecutado Por Dato
e	=> No Ejecutado Por Ambiente
f	=> Rechazado
p	=> Aprobado
x	=> No Ejecutado
y	=> No Aplica
*/
myModel.getCasosEjecucionxDiaAllWithoutNoAplica_NEW = (date, callback) => {
    if(moment(date, "YYYY-MM-DD", true).isValid() == false){
        callback(null, "la fecha "+date+" enviada no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT ' +
            ' IFNULL(SUM(EDT_CANT),0) AS cantidad ' +
            ' FROM EJECUCION_DIARIA_TESTLINK_FAB  ' +
            ' WHERE EDT_FILTRO = "EST_EJEC" ' +
            ' AND EDT_FILTRO_VAL NOT IN ("y") ' +
            ' AND DATE(EDT_FEC) = ?',[date],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};

//SELECT EJECUTADOS X DIA X STATUS 
/*
d	=> No Ejecutado Por Dato
e	=> No Ejecutado Por Ambiente
f	=> Rechazado
p	=> Aprobado
x	=> No Ejecutado
y	=> No Aplica
*/
myModel.getCasosEjecucionxStatusxDate_NEW = (status, date, callback) => {
    if(moment(date, "YYYY-MM-DD", true).isValid() == false){
        callback(null, "la fecha "+date+" enviada no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT ' +
            ' EDT_CANT AS cantidad ' +
            ' FROM EJECUCION_DIARIA_TESTLINK_FAB ' +
            ' WHERE DATE(EDT_FEC) = ? ' +
            ' AND EDT_FILTRO = "EST_EJEC" ' +
            ' AND EDT_FILTRO_VAL = ?',[date, status],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};

//SELECT EJECUTADOS X PERIODO EXCEPTO NO APLICA
/*
d	=> No Ejecutado Por Dato
e	=> No Ejecutado Por Ambiente
f	=> Rechazado
p	=> Aprobado
x	=> No Ejecutado
y	=> No Aplica
*/
myModel.getCasosEjecucionxPeriodoAllWithoutNoAplica_NEW = (periodo, callback) => {
    if(moment(periodo, "YYYYMM", true).isValid() == false){
        callback(null, "el periodo "+periodo+" enviado no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT ' +
            ' IFNULL(SUM(EDT_CANT),0) AS cantidad ' +
            ' FROM EJECUCION_DIARIA_TESTLINK_FAB  ' +
            ' WHERE EDT_FILTRO = "EST_EJEC" ' +
            ' AND EDT_FILTRO_VAL NOT IN ("y") ' +
            ' AND DATE_FORMAT(EDT_FEC,"%Y%m") = ?',[periodo],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};

//SELECT EJECUTADOS X PERIODO X STATUS 
/*
d	=> No Ejecutado Por Dato
e	=> No Ejecutado Por Ambiente
f	=> Rechazado
p	=> Aprobado
x	=> No Ejecutado
y	=> No Aplica
*/
myModel.getCasosEjecucionxStatusxPeriodo_NEW = (status, periodo, callback) => {
    if(moment(periodo, "YYYYMM", true).isValid() == false){
        callback(null, "el periodo "+periodo+" enviada no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT ' +
            ' IFNULL(SUM(EDT_CANT),0) AS cantidad ' +
            ' FROM EJECUCION_DIARIA_TESTLINK_FAB ' +
            ' WHERE DATE_FORMAT(EDT_FEC,"%Y%m") = ? ' +
            ' AND EDT_FILTRO = "EST_EJEC" ' +
            ' AND EDT_FILTRO_VAL = ?',[periodo, status],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};
///////////////////////DETALLE DE CASOS EJECUTADOR POR FABRICA/////////////////////////
///////SELECT DETALLE EJECUTADOS X DIA EXCEPTO NO APLICA////
/*
d	=> No Ejecutado Por Dato
e	=> No Ejecutado Por Ambiente
f	=> Rechazado
p	=> Aprobado
x	=> No Ejecutado
y	=> No Aplica
*/
myModel.getDetalleCasosEjexDiaAllWithoutNoAplica = (date, callback) => {
    if(moment(date, "YYYY-MM-DD", true).isValid() == false){
        callback(null, "la fecha "+date+" enviada no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT ' +
            ' DE_COD_BECH 		AS cod_bech,' +
            ' DE_TESTPLAN_ID		AS test_id,' +
            ' DE_TESTPLAN_NOM		AS test_nom,' +
            ' DE_CICLO		AS ciclo,' +
            ' DE_ITER			AS iteracion,' +
            ' DE_ID_CASO_PRUEBA	AS id_caso_pru,' +
            ' DE_DISPOSITIVO		AS dispositivo,' +
            ' DE_VER_DISPO		AS ver_dispo,' +
            ' DE_SEGMENTO		AS segmento,' +
            ' DE_ES_CRITICO		AS es_critico,' +
            ' DE_EST_ID		AS est_id,' +
            ' DE_ESTADO		AS estado_nom,' +
            ' DE_EJECUTOR		AS ejecutor,' +
            ' DATE_FORMAT(DE_FECHA_EJECUCION, "%Y-%m-%d %T")	AS ejec_date,' +
            ' DE_FASE			AS fase, ' +
            ' DE_CASO			AS caso, ' +
            ' DE_EST_ANA		AS est_ana, ' +
            ' DE_DISENADOR		AS disenador, ' +
            ' DATE_FORMAT(DE_FECHA_DISENO,"%Y-%m-%d")	AS fec_diseno ' +
            ' FROM DATOS_EJECUCION_DIARIA' +
            ' WHERE DATE(DE_FECHA_EJECUCION) = ?' +
            ' AND DE_EST_ID NOT IN ("y")',[date],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};

///////SELECT DETALLE CASOS X DIA X ESTADO////
myModel.getDetalleCasosEjexStatusxDate = (date, status, callback) => {
    if(moment(date, "YYYY-MM-DD", true).isValid() == false){
        callback(null, "la fecha "+date+" enviada no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT ' +
            ' DE_COD_BECH 		AS cod_bech,' +
            ' DE_TESTPLAN_ID		AS test_id,' +
            ' DE_TESTPLAN_NOM		AS test_nom,' +
            ' DE_CICLO		AS ciclo,' +
            ' DE_ITER			AS iteracion,' +
            ' DE_ID_CASO_PRUEBA	AS id_caso_pru,' +
            ' DE_DISPOSITIVO		AS dispositivo,' +
            ' DE_VER_DISPO		AS ver_dispo,' +
            ' DE_SEGMENTO		AS segmento,' +
            ' DE_ES_CRITICO		AS es_critico,' +
            ' DE_EST_ID		AS est_id,' +
            ' DE_ESTADO		AS estado_nom,' +
            ' DE_EJECUTOR		AS ejecutor,' +
            ' DATE_FORMAT(DE_FECHA_EJECUCION, "%Y-%m-%d %T")	AS ejec_date,' +
            ' DE_FASE			AS fase, ' +
            ' DE_CASO			AS caso, ' +
            ' DE_EST_ANA		AS est_ana, ' +
            ' DE_DISENADOR		AS disenador, ' +
            ' DATE_FORMAT(DE_FECHA_DISENO,"%Y-%m-%d")	AS fec_diseno ' +
            ' FROM DATOS_EJECUCION_DIARIA' +
            ' WHERE DATE(DE_FECHA_EJECUCION) = ?' +
            ' AND DE_EST_ID IN (?)',[date, status],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};

///////SELECT DETALLE EJECUTADOS X PERIODO EXCEPTO NO APLICA////
myModel.getDetalleCasosEjexPeriodoAllWithoutNoAplica = (periodo, callback) => {
    if(moment(periodo, "YYYYMM", true).isValid() == false){
        callback(null, "el periodo "+periodo+" enviado no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT ' +
            ' DE_COD_BECH 		AS cod_bech,' +
            ' DE_TESTPLAN_ID		AS test_id,' +
            ' DE_TESTPLAN_NOM		AS test_nom,' +
            ' DE_CICLO		AS ciclo,' +
            ' DE_ITER			AS iteracion,' +
            ' DE_ID_CASO_PRUEBA	AS id_caso_pru,' +
            ' DE_DISPOSITIVO		AS dispositivo,' +
            ' DE_VER_DISPO		AS ver_dispo,' +
            ' DE_SEGMENTO		AS segmento,' +
            ' DE_ES_CRITICO		AS es_critico,' +
            ' DE_EST_ID		AS est_id,' +
            ' DE_ESTADO		AS estado_nom,' +
            ' DE_EJECUTOR		AS ejecutor,' +
            ' DATE_FORMAT(DE_FECHA_EJECUCION, "%Y-%m-%d %T")	AS ejec_date,' +
            ' DE_FASE			AS fase, ' +
            ' DE_CASO			AS caso, ' +
            ' DE_EST_ANA		AS est_ana, ' +
            ' DE_DISENADOR		AS disenador, ' +
            ' DATE_FORMAT(DE_FECHA_DISENO,"%Y-%m-%d")	AS fec_diseno ' +
            ' FROM DATOS_EJECUCION_DIARIA' +
            ' WHERE DATE_FORMAT(DE_FECHA_EJECUCION,"%Y%m") = ?' +
            ' AND DE_EST_ID NOT IN ("y")',[periodo],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};

///////SELECT DETALLE CASOS X DIA X ESTADO////
myModel.getDetalleCasosEjexStatusxPeriodo = (periodo, status, callback) => {
    if(moment(periodo, "YYYYMM", true).isValid() == false){
        callback(null, "el periodo "+periodo+" enviada no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT ' +
            ' DE_COD_BECH 		AS cod_bech,' +
            ' DE_TESTPLAN_ID		AS test_id,' +
            ' DE_TESTPLAN_NOM		AS test_nom,' +
            ' DE_CICLO		AS ciclo,' +
            ' DE_ITER			AS iteracion,' +
            ' DE_ID_CASO_PRUEBA	AS id_caso_pru,' +
            ' DE_DISPOSITIVO		AS dispositivo,' +
            ' DE_VER_DISPO		AS ver_dispo,' +
            ' DE_SEGMENTO		AS segmento,' +
            ' DE_ES_CRITICO		AS es_critico,' +
            ' DE_EST_ID		AS est_id,' +
            ' DE_ESTADO		AS estado_nom,' +
            ' DE_EJECUTOR		AS ejecutor,' +
            ' DATE_FORMAT(DE_FECHA_EJECUCION, "%Y-%m-%d %T")	AS ejec_date,' +
            ' DE_FASE			AS fase, ' +
            ' DE_CASO			AS caso, ' +
            ' DE_EST_ANA		AS est_ana, ' +
            ' DE_DISENADOR		AS disenador, ' +
            ' DATE_FORMAT(DE_FECHA_DISENO,"%Y-%m-%d")	AS fec_diseno ' +
            ' FROM DATOS_EJECUCION_DIARIA' +
            ' WHERE DATE_FORMAT(DE_FECHA_EJECUCION,"%Y%m") = ?' +
            ' AND DE_EST_ID IN (?)',[periodo, status],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};
module.exports = myModel;