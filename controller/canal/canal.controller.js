var con = require('../../condb/condb');

//CREAR OBJETO
//AGREGAR METODOS userModel
let myModel = {};       

    //SELECT CANAL
    myModel.getAllCanal = (callback) => {
        con.conCERT("");
        if(conCERT){
            conCERT.query(
                'SELECT C.CAN_ID AS can_id, '+
                'C.CAN_ALIAS AS can_alias, '+
                'C.CAN_NOMBRE AS can_nombre, '+
                'C.CAN_VIG AS can_vig, '+
                'C.TC_ID AS tc_id, '+
                'C.TD_ID AS td_id, '+
                'CONCAT("[",C.CAN_ALIAS,"] ",C.CAN_NOMBRE) AS canal_concat '+
                'FROM CANAL C '+        
                'ORDER BY C.CAN_NOMBRE',
                (err, rows) => {
                    callback(err, rows)
                }
            )
        }
        conCERT.end();
    };
    
    //SELECT CANAL VIGENTES
    myModel.getAllCanalVigentes = (callback) => {
        con.conCERT("");
        if(conCERT){
            conCERT.query(
                'SELECT C.CAN_ID AS can_id, '+
                'C.CAN_ALIAS AS can_alias, '+
                'C.CAN_NOMBRE AS can_nombre, '+
                'C.CAN_VIG AS can_vig, '+
                'C.TC_ID AS tc_id, '+
                'C.TD_ID AS td_id, '+
                'CONCAT("[",C.CAN_ALIAS,"] ",C.CAN_NOMBRE) AS canal_concat '+
                'FROM CANAL C '+
                'WHERE C.CAN_VIG = 1 '+        
                'ORDER BY C.CAN_NOMBRE',
                (err, rows) => {
                    callback(err, rows)
                }
            )
        }
        conCERT.end();
    };

    //SELECT CANAL X INI_ID
    myModel.getAllCanalXIni = (ini_id,callback) => {
        con.conCERT();
        if(conCERT){
            conCERT.query(
                'SELECT C.CAN_ID AS can_id, '+
                'C.CAN_ALIAS AS can_alias, '+
                'C.CAN_NOMBRE AS can_nombre, '+
                'C.CAN_VIG AS can_vig, '+
                'C.TC_ID AS tc_id, '+
                'C.TD_ID AS td_id, '+
                'CONCAT("[",C.CAN_ALIAS,"] ",C.CAN_NOMBRE) AS canal_concat, '+
                'IC.IC_ID AS ic_id '+
                'FROM INICIATIVA_CANAL IC '+
                'LEFT JOIN CANAL C ON C.CAN_ID = IC.CAN_ID '+
                'WHERE IC.INI_ID = ? '+
                'ORDER BY C.CAN_NOMBRE ASC ' , [ini_id], 
                //callback devuelve error o filas
                (err, rows) => {
                    callback(err, rows)   
                } 
            )
        }
        conCERT.end();
    };
//exportamos nuestro modelo
module.exports = myModel;
