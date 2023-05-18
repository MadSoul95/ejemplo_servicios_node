var con     = require('../../condb/condb');
var moment  = require('moment');

//CREAR OBJETO
//AGREGAR METODOS userModel
let myModel = {};

//BUSCA ACTIVIDADES RECHAZADAS SIN CORRECCION
myModel.getActividadesCorreccion = (callback) => {
    con.conCERT("SP");
    if(conCERT){
        conCERT.query(
            'CALL CERTIFICACION.SP_ACT_PARA_CORRECCION()',
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT.end();
}; 

//Busca actividades por gestor
myModel.getActividadesCorreccionUser = (user, callback) => {
    con.conCERT("SP");
    if(conCERT){
        conCERT.query(
            'CALL CERTIFICACION.SP_ACT_PARA_CORRECCION_GESTOR(?)',[user],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT.end();
}; 

//DRP de analistas
myModel.getDrpAnalistas = (callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT ' +
            ' U.USR_UID,F_NOMBRE(U.USR_UID) AS NOM_ANA' +
            ' FROM WF_BECH.USERS U ' +
            ' LEFT JOIN WF_BECH.GROUP_USER GU ON GU.USR_UID = U.USR_UID ' +
            ' LEFT JOIN WF_BECH.CONTENT C ON C.CON_ID = GU.GRP_UID ' +
            ' WHERE CON_VALUE = "BECH - Analista" ' +
            ' AND USR_STATUS = "ACTIVE"',
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//Busca actividades pendientes de atención
myModel.getActividadesCorreccionPend = (user, callback) => {
    con.conCERT("SP");
    if(conCERT){
        conCERT.query(
            'CALL CERTIFICACION.SP_ACT_PARA_CORRECCION_PENDIENTE(?)',[user],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT.end();
};

//Busca actividades asignadas para su atencion
myModel.getActividadesCorreccionAsignada = (user, callback) => {
    con.conCERT("SP");
    if(conCERT){
        conCERT.query(
            'CALL CERTIFICACION.SP_ACT_PARA_CORRECCION_ANALISTA(?)',[user],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT.end();
};

//BUSCA ACTIVIDADES TERMINADAS PARA SU APROBACION O RECHAZO
myModel.getActividadesCorreccionTerm = (user, callback) => {
    con.conCERT("SP");
    if(conCERT){
        conCERT.query(
            'CALL CERTIFICACION.SP_ACT_PARA_CORRECCION_TERMINADOS(?)',[user],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT.end();
};

//exportamos nuestro modelo
module.exports = myModel;