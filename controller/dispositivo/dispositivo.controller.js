var con = require('../../condb/condb');

//CREAR OBJETO
//AGREGAR METODOS userModel
let myModel = {};       

    //SELECT DISPOSITIVO
    myModel.getAllDispositivo = (callback) => {
        con.conCERT("");
        if(conCERT){
            conCERT.query(
                'SELECT DI.DI_ID AS di_id, '+
                'DI.DI_NOMBRE AS di_nombre, '+
                'DI.TD_ID AS td_id '+
                'FROM DISPOSITIVO DI '+
                'WHERE DI.DI_VIG = 1 '+
                'ORDER BY DI.DI_NOMBRE', 
                (err, rows) => {
                    callback(err, rows)
                }
            )
        }
        conCERT.end();
    };                  
//exportamos nuestro modelo
module.exports = myModel;
