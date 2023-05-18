var con     = require('../../condb/condb');
var moment  = require('moment');

//CREAR OBJETO
//AGREGAR METODOS userModel
let myModel = {};

//FECHA ACTUAL
myModel.getDate = (callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT CAST(NOW() AS CHAR) AS datetime, '+
            ' CAST(CURDATE() AS CHAR) AS date, '+
            ' CAST(TIME(NOW()) AS CHAR) AS hour, '+
            ' DATE_FORMAT(NOW(), "%d/%m/%Y %H:%i:%s") AS datetime_format, '+ 
            ' DATE_FORMAT(NOW(), "%d/%m/%Y") AS date_format, '+
            ' DATE_FORMAT(NOW(),"%Y%m") AS periodo1, '+
            ' CONCAT(M.MES_NOM,"-",YEAR(NOW())) AS periodo2, '+
            ' CONCAT(M.MES_ALIAS,"-",YEAR(NOW())) AS periodo3, '+
            ' DATE_FORMAT(NOW(),"%Y-%m") AS periodo4 '+
            ' FROM CERTIFICACION.MESES M '+
            ' WHERE M.MES_ID = MONTH(NOW()) ',
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//FECHA info
myModel.getDateInfo = (date, callback) => {
    if(moment(date, "YYYY-MM-DD", true).isValid() == false){
        callback(null, "la fecha "+date+" enviada no es de tipo date", null)
        return false;
    }
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT CAST(? AS CHAR) AS date, '+
            ' DATE_FORMAT(?, "%d/%m/%Y") AS date_format, '+
            ' DATE_FORMAT(?, "%Y%m") AS periodo1, '+
            ' CONCAT(M.MES_NOM,"-",YEAR(?)) AS periodo2, '+
            ' CONCAT(M.MES_ALIAS,"-",YEAR(?)) AS periodo3, '+
            ' DATE_FORMAT(?,"%Y-%m") AS periodo4 '+
            ' FROM CERTIFICACION.MESES M '+
            ' WHERE M.MES_ID = MONTH(?) ',[date, date, date, date, date, date, date],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT.end();
};

//info Periodo
myModel.getPeriodoInfo = (periodo, callback) => {
    if(moment(periodo, "YYYYMM", true).isValid() == false){
        callback(null, "el periodo "+periodo+" enviado no es periodo YYYYMM", null)
        return false;
    }
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' ? AS periodo, '+
            ' CONCAT(M.MES_NOM,"-",SUBSTRING(?, 1, CHAR_LENGTH(?) - 2)) AS periodo2, '+
            ' CONCAT(M.MES_ALIAS,"-",SUBSTRING(?, 1, CHAR_LENGTH(?) - 2)) AS periodo3, '+
            ' CONCAT(SUBSTRING(?, 1, CHAR_LENGTH(?) - 2),"-", SUBSTRING(?, 5)) AS periodo4 '+
            ' FROM CERTIFICACION.MESES M '+
            ' WHERE M.MES_ID = SUBSTRING(?, 5) ',[periodo, periodo, periodo, periodo, periodo, periodo, periodo, periodo, periodo],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT.end();
};

//PERIODOS (MESES)
myModel.getPeriodosMeses = (fec_min, fec_max, callback) => {
    if(moment(fec_min, "YYYY-MM-DD", true).isValid() == false){
        callback(null, "la fecha minima "+fec_min+" enviada no es de tipo date", null)
        return false;
    }
    if(fec_max != "" && moment(fec_max, "YYYY-MM-DD", true).isValid() == false){
        callback(null, "la fecha maxima "+fec_max+" enviada no es de tipo date", null)
        return false;
    }
    if(fec_max != "" && fec_min > fec_max){
        callback(null, "la fecha minima "+fec_min+" enviada no pueda ser mayor a la maxima "+fec_max+"", null)
        return false;
    }
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT DATE_FORMAT(selected_date,"%Y%m") AS periodo1, '+
            ' CONCAT(M.MES_NOM,"-",YEAR(selected_date)) AS periodo2, '+
            ' CONCAT(M.MES_ALIAS,"-",YEAR(selected_date)) AS periodo3, '+
            ' DATE_FORMAT(selected_date,"%Y-%m") AS periodo4 '+
            ' FROM  '+
            ' (SELECT ADDDATE(? ,t4.i*10000 + t3.i*1000 + t2.i*100 + t1.i*10 + t0.i) selected_date FROM '+
            ' (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4  '+
            ' UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t0,  '+
            ' (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4  '+
            ' UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t1,  '+
            ' (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4  '+
            ' UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t2,  '+
            ' (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4  '+
            ' UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t3, '+
            ' (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5  '+
            ' UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t4) v  '+
            ' LEFT JOIN CERTIFICACION.MESES M ON M.MES_ID = MONTH(selected_date)  '+
            ' WHERE '+
            ' CASE WHEN ? = "" THEN selected_date <= CURDATE() '+
            ' ELSE '+
            '   selected_date <= ? '+
            ' END '+
            ' GROUP BY MONTH(selected_date), YEAR(selected_date)  '+
            ' ORDER BY YEAR(selected_date) DESC, MONTH(selected_date) DESC ',[fec_min, fec_max, fec_max],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT.end();
};

//PERIODOS (AÑOS)
myModel.getPeriodosAnios = (anio_min, anio_max, callback) => {
    if(moment(anio_min, "YYYY", true).isValid() == false){
        callback(null, "el año  minimo "+anio_min+" enviado, no es un año", null)
        return false;
    }
    if(anio_max != "" && moment(anio_max, "YYYY", true).isValid() == false){
        callback(null, "el año  maximo "+anio_max+" enviado, no es un año", null)
        return false;
    }
    if(anio_max != "" && anio_min > anio_max){
        callback(null, "el año minimi "+anio_min+" enviado no pueda ser mayor a al maximo "+anio_max+"", null)
        return false;
    }
    anio_min = anio_min+"-01-01";
    if(anio_max != ""){ç
        anio_max = anio_max+"-01-01";
    }
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT DATE_FORMAT(selected_date,"%Y") AS anio '+
            ' FROM  '+
            ' (SELECT ADDDATE(? ,t4.i*10000 + t3.i*1000 + t2.i*100 + t1.i*10 + t0.i) selected_date FROM '+
            ' (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4  '+
            ' UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t0,  '+
            ' (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4  '+
            ' UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t1,  '+
            ' (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4  '+
            ' UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t2,  '+
            ' (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4  '+
            ' UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t3, '+
            ' (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5  '+
            ' UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t4) v  '+
            ' WHERE '+
            ' CASE WHEN ? = "" THEN selected_date <= CURDATE() '+
            ' ELSE '+
            '   selected_date <= ? '+
            ' END '+
            ' GROUP BY YEAR(selected_date)  '+
            ' ORDER BY YEAR(selected_date) DESC ',[anio_min, anio_max, anio_max],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT.end();
};

//PERIODOS SEMANA (DIAS)
myModel.getPeriodosSemanaDias = (date, callback) => {
    if(moment(date, "YYYY-MM-DD", true).isValid() == false){
        callback(null, "la fecha "+date+" enviada no es de tipo date", null)
        return false;
    }
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' DATE_FORMAT(selected_date, "%Y-%m-%d") AS date, '+
            ' DATE_FORMAT(selected_date, "%d/%m/%Y") AS date_cl, '+
            ' DAYOFWEEK(selected_date) AS number_day, '+
            ' DS.DS_NOM AS nom_day, '+
            ' DS.DS_NOM_ALIAS AS nom_day_alias '+
            ' FROM  '+
            ' (SELECT ADDDATE(SUBDATE(?, WEEKDAY(?)),t4.i*10000 + t3.i*1000 + t2.i*100 + t1.i*10 + t0.i) selected_date FROM  '+
            ' (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4  '+
            ' UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t0,  '+
            ' (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4  '+
            ' UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t1,  '+
            ' (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4  '+
            ' UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t2,  '+
            ' (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4  '+
            ' UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t3, '+
            ' (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5  '+
            ' UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t4) v  '+
            ' LEFT JOIN CERTIFICACION.MESES M ON M.MES_ID = MONTH(selected_date) '+
            ' LEFT JOIN CERTIFICACION.DIAS_SEMANA DS ON DS.DS_ID = DAYOFWEEK(selected_date) '+
            ' WHERE selected_date <= DATE(? + INTERVAL (8 - DAYOFWEEK(?)) DAY) '+
            ' ORDER BY selected_date ASC ',[date, date, date, date],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT.end();
};

//PERIODO MES (DIAS)
myModel.getPeriodosMesDias = (date, callback) => {
    if(moment(date, "YYYY-MM-DD", true).isValid() == false){
        callback(null, "la fecha "+date+" enviada no es de tipo date", null)
        return false;
    }
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' DATE_FORMAT(selected_date, "%Y-%m-%d") AS date, '+
            ' DATE_FORMAT(selected_date, "%d/%m/%Y") AS date_cl, '+
            ' DAYOFWEEK(selected_date) AS number_day, '+
            ' DS.DS_NOM AS nom_day, '+
            ' DS.DS_NOM_ALIAS AS nom_day_alias '+
            ' FROM  '+
            ' (SELECT ADDDATE(DATE_FORMAT(?, "%Y-%m-01"),t4.i*10000 + t3.i*1000 + t2.i*100 + t1.i*10 + t0.i) selected_date FROM '+
            ' (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4  '+
            ' UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t0,  '+
            ' (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4  '+
            ' UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t1,  '+
            ' (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4  '+
            ' UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t2,  '+
            ' (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4  '+
            ' UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t3, '+
            ' (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5  '+
            ' UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t4) v  '+
            ' LEFT JOIN CERTIFICACION.MESES M ON M.MES_ID = MONTH(selected_date) '+
            ' LEFT JOIN CERTIFICACION.DIAS_SEMANA DS ON DS.DS_ID = DAYOFWEEK(selected_date) '+
            ' WHERE selected_date <= LAST_DAY(?) '+
            ' ORDER BY selected_date ASC ',[date, date],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT.end();
};

//exportamos nuestro modelo
module.exports = myModel;