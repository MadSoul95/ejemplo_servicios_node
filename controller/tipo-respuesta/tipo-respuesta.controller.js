var con = require('../../condb/condb');

//CREAR OBJETO
//AGREGAR METODOS userModel
let myModel = {};       

    //SELECT TIPO RESPUESTAS
    myModel.getAllTRes = (callback) => {
        con.conCERT("");
        if(conCERT){
            conCERT.query(
                'SELECT TR_ID AS tr_id, '+
                'TR_NOM as tr_nom '+
                'FROM TIPO_RESPUESTA '+
                'WHERE TR_VIG ="1"',
                (err, rows) => {
                    callback(err, rows)
                }
            )
        }
        conCERT.end();
    };  
    
    //SELECT TIPO RESPUESTAS SI/NO
    myModel.getSiNo = (callback) => {
        con.conCERT("");
        if(conCERT){
            conCERT.query(
                'SELECT TR_ID AS tr_id, '+
                'TR_NOM as tr_nom '+
                'FROM TIPO_RESPUESTA '+
                'WHERE TR_ID IN ("1","2") ',
                (err, rows) => {
                    callback(err, rows)
                }
            )
        }
        conCERT.end();
    };                  
    
//exportamos nuestro modelo
module.exports = myModel;
        