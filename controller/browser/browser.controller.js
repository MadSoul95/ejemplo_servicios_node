var con = require('../../condb/condb');

//CREAR OBJETO
//AGREGAR METODOS userModel
let myModel = {};       

    //SELECT BROWSER
    myModel.getAllBrowser = (callback) => {
        con.conCERT("");
        if(conCERT){
            conCERT.query(
                'SELECT BR.BR_ID AS br_id, '+
                'BR.BR_NOMBRE AS br_nombre '+
                'FROM BROWSER BR '+
                'WHERE BR.BR_VIG = 1 '+
                'ORDER BY BR.BR_NOMBRE', 
                (err, rows) => {
                    callback(err, rows)
                }
            )
        }
        conCERT.end();
    };                  
//exportamos nuestro modelo
module.exports = myModel;
