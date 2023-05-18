var con = require('../../condb/condb');

//CREAR OBJETO
//AGREGAR METODOS userModel
let myModel = {};       

    //SELECT AREAS
    myModel.getAllAreas = (callback) => {
        con.conCERT("");
        if(conCERT){
            conCERT.query(
                'SELECT AR_ID AS id, '+
                'AR_NOMBRE	AS nombre '+
                'FROM AREA WHERE AR_VIG = 1 '+
                'ORDER BY nombre ASC',
                (err, rows) => {
                    callback(err, rows)
                }
            )
        }
        conCERT.end();
    };                  
//exportamos nuestro modelo
module.exports = myModel;
        