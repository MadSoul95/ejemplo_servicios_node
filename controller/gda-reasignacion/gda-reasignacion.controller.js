var con = require('../../condb/condb');

//CREAR OBJETO
//AGREGAR METODOS userModel
let myModel = {}; 

//UPDATE - REASIGNACION (GDA)
myModel.updateReasingarGDA = (gsol_id, usr_uid, callback) => {
    con.conCERT("SP");
    if(conCERT){
        conCERT.query(
            ' CALL CERTIFICACION.SP_UPDATE_GDA_REASIGNACION_GDA(?,?) ',[gsol_id, usr_uid] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//INSERT - REASIGNACION
myModel.insertReasignar = (gsol_id, usr_uid, motivo, usr_prev, user_new, tipo, callback) => {
    con.conCERT("SP");
    if(conCERT){
        conCERT.query(
            ' CALL CERTIFICACION.SP_INSERT_GDA_REASIGNACION(?,?,?,?,?,?) ',[gsol_id, usr_uid, motivo, usr_prev, user_new, tipo] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//exportamos nuestro modelo
module.exports = myModel;