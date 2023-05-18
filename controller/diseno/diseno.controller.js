var con = require('../../condb/condb');
var moment  = require('moment');
let myModel = {};

//SELECT DISENADOS X DIA 
myModel.getCasosDisenoxDiaAll = (date, callback) => {
    if(moment(date, "YYYY-MM-DD", true).isValid() == false){
        callback(null, "la fecha "+date+" enviada no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT IFNULL(SUM(DDT_CANT),0) cantidad '+
            ' FROM DISENO_DIARIA_TESTLINK '+
            ' WHERE DDT_FILTRO = "ALL" '+
            ' AND DDT_FEC = ? ',[date],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};

//SELECT DISENADOS X PERIODO 
myModel.getCasosDisenoxPeriodoAll = (periodo, callback) => {
    if(moment(periodo, "YYYYMM", true).isValid() == false){
        callback(null, "el periodo "+periodo+" enviado no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT IFNULL(SUM(DDT_CANT),0) cantidad '+
            ' FROM DISENO_DIARIA_TESTLINK '+
            ' WHERE DDT_FILTRO = "ALL" '+
            ' AND DATE_FORMAT(DDT_FEC,"%Y%m") = ? ',[periodo],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};

//SELECT DISENADOS F04 X DIA NEW
myModel.getCasosDisenoxDiaAll_NEW = (date, callback) => {
    if(moment(date, "YYYY-MM-DD", true).isValid() == false){
        callback(null, "la fecha "+date+" enviada no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT IFNULL(SUM(DDT_CANT),0) cantidad '+
            ' FROM DISENO_DIARIO_TESTLINK_F04 '+
            ' WHERE DDT_FILTRO = "ALL" '+
            ' AND DDT_FEC = ? ',[date],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};

//SELECT DISENADOS F04 X PERIODO NEW
myModel.getCasosDisenoxPeriodoAll_NEW = (periodo, callback) => {
    if(moment(periodo, "YYYYMM", true).isValid() == false){
        callback(null, "el periodo "+periodo+" enviado no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT IFNULL(SUM(DDT_CANT),0) cantidad '+
            ' FROM DISENO_DIARIO_TESTLINK_F04 '+
            ' WHERE DDT_FILTRO = "ALL" '+
            ' AND DATE_FORMAT(DDT_FEC,"%Y%m") = ? ',[periodo],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};

//DETALLES DISENADOS F04 X DIA
myModel.getDetalleCasosDisenoxDiaAll = (date, callback) => {
    if(moment(date, "YYYY-MM-DD", true).isValid() == false){
        callback(null, "la fecha "+date+" enviada no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT ' +
            ' COD_BECH AS cod_bech, ' +
            ' TESTPLAN_ID AS test_id, ' +
            ' TESTPLAN_NOM AS test_nom, ' +
            ' CICLO_DIS AS ciclo_dis, ' +
            ' ITER_DIS AS iter_dis, ' +
            ' CICLO_BLD AS ciclo_bld, ' +
            ' ITER_BLD AS iter_bld, ' +
            ' DISPOSITIVO AS disp_nom, ' +
            ' VER_DISPO AS ver_disp, ' +
            ' SEGMENTO AS seg_nom, ' +
            ' CRITICO AS critico, ' +
            ' ESTADO AS est_nom, ' +
            ' DISENADOR AS dise_nom, ' +
            ' DATE_FORMAT(FEC_DISENO,"%Y-%m-%d") AS fec_dis, ' +
            ' FEC_DISENO_UNIX AS fec_unix, ' +
            ' PER_DISENO AS per_dis, ' +
            ' FASE_DISENO AS fase_dis, ' +
            ' CASO AS caso_dis, ' +
            ' DATO_PRUEBA AS dato_pru, ' +
            ' IF(FEC_EJEC = "0000-00-00", "Sin Ejecución", DATE_FORMAT(FEC_EJEC,"%Y-%m-%d")) AS fec_eje, ' +
            ' EST_EJE AS est_eje, ' +
            ' EJECUTOR AS eje_nom, ' +
			' AUTOR AS autor ' +
            ' FROM DATOS_DISENO_DIARIA ' +
            ' WHERE FEC_DISENO = ?',[date],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};

//DETALLES DISENADOS F04 X PERIODO
myModel.getDetalleCasosDisenoxPeriodoAll = (periodo, callback) => {
    if(moment(periodo, "YYYYMM", true).isValid() == false){
        callback(null, "el periodo "+periodo+" enviado no es de tipo date", null)
        return false;
    }
    con.conCERT_GEST();
    if(conCERT_GEST){
        conCERT_GEST.query(
            ' SELECT ' +
            ' COD_BECH AS cod_bech, ' +
            ' TESTPLAN_ID AS test_id, ' +
            ' TESTPLAN_NOM AS test_nom, ' +
            ' CICLO_DIS AS ciclo_dis, ' +
            ' ITER_DIS AS iter_dis, ' +
            ' CICLO_BLD AS ciclo_bld, ' +
            ' ITER_BLD AS iter_bld, ' +
            ' DISPOSITIVO AS disp_nom, ' +
            ' VER_DISPO AS ver_disp, ' +
            ' SEGMENTO AS seg_nom, ' +
            ' CRITICO AS critico, ' +
            ' ESTADO AS est_nom, ' +
            ' DISENADOR AS dise_nom, ' +
            ' DATE_FORMAT(FEC_DISENO,"%Y-%m-%d") AS fec_dis, ' +
            ' FEC_DISENO_UNIX AS fec_unix, ' +
            ' PER_DISENO AS per_dis, ' +
            ' FASE_DISENO AS fase_dis, ' +
            ' CASO AS caso_dis, ' +
            ' DATO_PRUEBA AS dato_pru, ' +
            ' IF(FEC_EJEC = "0000-00-00", "Sin Ejecución", DATE_FORMAT(FEC_EJEC,"%Y-%m-%d")) AS fec_eje, ' +
            ' EST_EJE AS est_eje, ' +
            ' EJECUTOR AS eje_nom, ' +
			' AUTOR AS autor ' +
            ' FROM DATOS_DISENO_DIARIA ' +
            ' WHERE PER_DISENO = ?',[periodo],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT_GEST.end();
};

module.exports = myModel;