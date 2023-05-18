var con = require('../../condb/condb');

//CREAR OBJETO
//AGREGAR METODOS userModel
let myModel = {};        

    //SELECT TIPO INICIATIVA
    myModel.getAllTipoIniciativa = (callback) => {
        con.conCERT("");
        if(conCERT){
            conCERT.query(
                'SELECT '+
                'TI.TI_ID AS ti_id, '+
                'TI.TI_NOMBRE AS ti_nom, '+
                'TI.TI_VIG AS ti_vig '+
                'FROM CERTIFICACION.TIPO_INICIATIVA TI '+
                'WHERE TI.TI_VIG = 1 '+
                'ORDER BY TI.TI_NOMBRE',
                (err, rows) => {
                    callback(err, rows)
                }
            )
        }
        conCERT.end();
    };                  
//exportamos nuestro modelo
module.exports = myModel;
        