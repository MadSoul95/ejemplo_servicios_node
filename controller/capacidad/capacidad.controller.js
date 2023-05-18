var con     = require('../../condb/condb');
var moment  = require('moment');

//CREAR OBJETO
//AGREGAR METODOS userModel
let myModel = {};

//capacidad nominal x Día
myModel.getCapacidadCountMaximaNominalxDia = (date, callback) => {
    if(moment(date, "YYYY-MM-DD", true).isValid() == false){
        callback(null, "la fecha "+date+" enviada no es de tipo date", null)
        return false;
    }
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' CALL CERTIFICACION.SP_CAPACIDAD_MAX_NOMINAL_X_DIA(?) ',[date],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT.end();
};

//capacidad real x Día
myModel.getCapacidadCountRealxDia = (date, callback) => {
    if(moment(date, "YYYY-MM-DD", true).isValid() == false){
        callback(null, "la fecha "+date+" enviada no es de tipo date", null)
        return false;
    }
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' CALL CERTIFICACION.SP_CAPACIDAD_REAL_X_DIA(?) ',[date],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT.end();
};

//calcula uso fabrica
myModel.getUsoFabrica = (suma,creal, callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT CAST(CONCAT(ROUND(((?*100)/?),2),"%") AS CHAR(10)) AS PORC ',[suma,creal],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT.end();
};

//exportamos nuestro modelo
module.exports = myModel;