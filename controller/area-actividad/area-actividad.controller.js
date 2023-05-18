var con = require('../../condb/condb');

//CREAR OBJETO
//AGREGAR METODOS userModel
let myModel = {};

//SELECT ALL ACTIVIDAD
myModel.getAllAct = (callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
			'SELECT AAC_ID AS id, '+
			'AAC_ACT_NOM AS nombre, '+
			'AR_ID AS ar_id, '+
			'TF_ID AS tf_id '+
			'FROM AREA_ACTIVIDAD '+
			'WHERE AAC_VIG = 1 '+
			'ORDER BY AR_ID, TF_ID, AAC_ACT_NOM ;', 
            //callback devuelve error o filas
            (err, rows) => {
				callback(err, rows)   
            } 
        )
    }
	conCERT.end();
};

//SELECT ACTIVIDAD X AREA X TF_ID
myModel.getActXAreaXTF_ID = (area_id, tf_id,callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
			'SELECT AAC_ID AS id, '+
			'AAC_ACT_NOM AS nombre '+
			'FROM AREA_ACTIVIDAD '+
			'WHERE AR_ID = ?' +
			'AND TF_ID = ? '+
			'AND AAC_VIG = 1 '+
			'ORDER BY nombre ASC ;' , [area_id, tf_id], 
            //callback devuelve error o filas
            (err, rows) => {
				callback(err, rows)   
            } 
        )
    }
	conCERT.end();
};

//exportamos nuestro modelo
module.exports = myModel;
