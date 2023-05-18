var con = require('../../condb/condb');

//TI_ID => 3 => BECH
var tipoApi = 3;

//CREAR OBJETO
let myModel = {};

myModel.auth = (user, password, callback) => {
    con.conAPI();
    if(conAPI){
        conAPI.query(
            ' SELECT USR.USR_ID AS userId, '+
            ' USR.USR_USERNAME AS user '+
            ' FROM USERS USR '+
            ' LEFT JOIN PERMISOS PER ON PER.USR_ID = USR.USR_ID '+
            ' WHERE PER.TI_ID = ? '+
            ' AND USR.USR_VIG = 1 '+
            ' AND PER.PER_VIG = 1 '+
            ' AND USR.USR_USERNAME = (?) AND USR.USR_PASS = MD5((?))',[tipoApi, user, password] ,
            //callback devuelve error o filas
            (err, rows) => {
                callback(err, rows);   
            } 
        )
    }
	conAPI.end();
};

myModel.routesAccess = (userId, route, callback) => {
    con.conAPI();
    if(conAPI){
        conAPI.query(
            'SELECT API.F_CHECK_ACCESS_ROUTES(?,?,?) AS result',[tipoApi, route, userId] ,
            //callback devuelve error o filas
            (err, rows) => {
                callback(err, rows);   
            } 
        )
    }
	conAPI.end();
};

//exportamos nuestro modelo
module.exports = myModel;