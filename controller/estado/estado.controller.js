var con = require('../../condb/condb');

//CREAR OBJETO
//AGREGAR METODOS userModel
let myModel = {};       

    //SELECT ESTADOS
    myModel.getAllEstado = (callback) => {
        con.conCERT("");
        if(conCERT){
            conCERT.query(
                'SELECT EST_ID AS est_id, '+
                'EST_NOMBRE AS est_nombre, '+
                'EST_GRUPO AS est_grupo '+
                'FROM ESTADO '+
                'WHERE EST_TIPO = "MANTENEDOR_REG_INI" '+                
                'AND EST_ID IN (119,120,121,122)',
                (err, rows) => {
                    callback(err, rows)
                }
            )
        }
        conCERT.end();
    };       
    
    //SELECT ESTADOS MENT_REG_INI X INI
    myModel.getAllEstadoRedIni = (callback) => {
        con.conCERT("");
        if(conCERT){
            conCERT.query(
                'SELECT EST_ID AS est_id, '+
                'EST_NOMBRE AS est_nombre, '+
                'EST_GRUPO AS est_grupo '+
                'FROM ESTADO '+
                'WHERE EST_TIPO = "MANTENEDOR_REG_INI" '+                
                'AND EST_ID IN (123,124,125)',
                (err, rows) => {
                    callback(err, rows)
                }
            )
        }
        conCERT.end();
    };    
//exportamos nuestro modelo
module.exports = myModel;
