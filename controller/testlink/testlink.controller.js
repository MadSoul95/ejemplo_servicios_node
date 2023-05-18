var con = require('../../condb/condb');
let myModel = {};

//Valida Build esta asociado en procesos
myModel.getValidateBuildProceso = (id, callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' CONCAT("El build se encuentra asociado en procesos a la Actividad [",A.ACT_ID,"] - ",CERTIFICACION.F_NOMBRE_ACT_3(A.ACT_ID)) AS message, '+
            ' A.ACT_ID AS act_id, '+
            ' CERTIFICACION.F_NOMBRE_ACT_3(A.ACT_ID) AS act_nom'+
            ' FROM ACTIVIDAD A '+
            ' LEFT JOIN ESTADO EST_A ON EST_A.EST_ID = A.EST_ID '+
            ' WHERE EST_A.EST_GRUPO NOT IN ("C") '+
            ' AND A.BLD_ID = ? '+
            ' ORDER BY A.ACT_ID DESC LIMIT 1', [id],
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

module.exports = myModel;