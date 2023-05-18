var con = require('../../condb/condb');

//CREAR OBJETO
//AGREGAR METODOS userModel
let myModel = {};       

    //SP INSERT ACTIVIDAD CERTIFICACIÓN USR
    myModel.getinsertActUsr = (ac_id,acu_id,rol_id,callback) => {
        con.conCERT("SP");
        if(conCERT){
            conCERT.query(
                'CALL SP_INSERT_ACTIVIDAD_CERTIFICACION_USR(?,?,?)',
                [ac_id,acu_id,rol_id],(err, rows) => {
                    //callback(err, rows)
                    callback(err, rows)
                }
            )
        }
        conCERT.end();
    };      
    
    
    //SP UPDATE ACTIVIDAD CERTIFICACIÓN USR
    myModel.getUpdateActUsr = (ac_id,acu_id,rol_id,callback) => {
        con.conCERT("SP");
        if(conCERT){
            conCERT.query(
                'CALL SP_UPDATE_ACTIVIDAD_CERTIFICACION_USR(?,?,?)',[ac_id,acu_id,rol_id],(err, rows) => {
                    //callback(err, rows)
                    callback(err, rows)
                }
            )
        }
        conCERT.end();
    }; 

    //SP DELETE ACTIVIDAD CERTIFICACIÓN USR
    myModel.getDeleteActUsr = (ac_id,callback) => {
        con.conCERT("SP");
        if(conCERT){
            conCERT.query(
                'CALL SP_DELETE_ACTIVIDAD_CERTIFICACION_USR(?)',[ac_id],(err, rows) => {
                    //callback(err, rows)
                    callback(err, rows)
                }
            )
        }
        conCERT.end();
    }; 

    //SP UPDATE DESACTIVAR VIGENCIA USUARIO  
    myModel.getUpdateVig = (ac_id, callback) => {
        con.conCERT();
        if(conCERT){
            conCERT.query(
                'UPDATE CERTIFICACION.ACTIVIDAD_CERT_USR SET ACU_VIG = 0 WHERE AC_ID = (?)',
                [ac_id],(err, rows) => {
                    //callback(err, rows)
                    callback(err, rows)
                }
            )
        }
        conCERT.end();
    };  

    //SP UPDATE ACTIVAR VIGENCIA USUARIO
    myModel.getUpdateVigAc = (ac_id, callback) => {
        con.conCERT();
        if(conCERT){
            conCERT.query(
                'UPDATE CERTIFICACION.ACTIVIDAD_CERT_USR SET ACU_VIG = 1 WHERE AC_ID = (?)',
                [ac_id],(err, rows) => {
                    //callback(err, rows)
                    callback(err, rows)
                }
            )
        }
        conCERT.end();
    }; 

//exportamos nuestro modelo
module.exports = myModel;
        