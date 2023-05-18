var con = require('../../condb/condb');

//CREAR OBJETO
//AGREGAR METODOS userModel
let myModel = {};

//SELECT AMBIENTE PRUEBAS
myModel.getAllAmbientePruebas = (callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' GS.GS_ID AS gs_id, '+
            ' GS.GS_NOM AS gs_nom, '+
            ' GS.GS_IS_NA AS gs_is_na, '+
            ' GS.GS_ORDER AS gs_order, '+
            ' GS.GS_VIG AS gs_vig, '+
            ' GS.GST_ID AS gst_id, '+
            ' GST.GST_NOM AS gst_nom, '+
            ' GST.GST_VIG AS gst_vig '+
            ' FROM GDA_SOL GS '+
            ' LEFT JOIN GDA_SOL_TIPO GST ON GST.GST_ID = GS.GST_ID '+
            ' WHERE GS.GST_ID = 3 '+
            ' ORDER BY GS.GS_ORDER, GS.GS_NOM ',
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT.end();
};    

//exportamos nuestro modelo
module.exports = myModel;