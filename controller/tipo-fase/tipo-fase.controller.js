var con = require('../../condb/condb');

//CREAR OBJETO
//AGREGAR METODOS userModel
let myModel = {};       

    //SELECT CANAL
    myModel.getAllTipoFase = (callback) => {
        con.conCERT("");
        if(conCERT){
            conCERT.query(          
                'SELECT TF.TF_ID AS tf_id, '+
                'TF.TF_ALIAS AS tf_alias, '+
                'TF.TF_NOMBRE AS tf_nom, '+
                'TF.TF_NOM2 AS tf_nom_2 '+
                'FROM TIPO_FASE TF '+
                'WHERE TF.TF_VIG = 1 '+
                'ORDER BY TF.TF_ORDER',
                (err, rows) => {
                    callback(err, rows)
                }
            )
        }
        conCERT.end();
    };                  
//exportamos nuestro modelo
module.exports = myModel;
