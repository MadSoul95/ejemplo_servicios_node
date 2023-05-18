var con = require('../../condb/condb');
let myModel = {};
//exportamos nuestro modelo

myModel.getMailPostCertificacion = (v_bld,v_ejec,v_nom_ejec, v_estado, v_observacion, callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' CALL SP_SELECT_POSTCERTIFICACION_MAIL(?,?,?,?,?) ',[v_bld,v_ejec,v_nom_ejec,v_estado,v_observacion],
            (err, rows) => {
				callback(err, null, rows)
            }
        )
    }
	conCERT.end();
};
module.exports = myModel;