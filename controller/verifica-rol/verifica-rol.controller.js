var con = require('../../condb/condb');
let myModel = {};

//Verifica si usuario posee Rol
myModel.getVerificaRolUsuario = (id,callback) => {
    con.conPANEL_BECH();
    if(conPANEL_BECH){
        conPANEL_BECH.query(
            ' SELECT '+
            ' PANEL_BECH.F_CHECK_ES_ADMIN(?) AS admin, '+
            ' PANEL_BECH.F_CHECK_ES_AUDITOR(?) AS auditor, '+
            ' PANEL_BECH.F_CHECK_ES_GESTOR(?) AS gestor, '+
            ' PANEL_BECH.F_CHECK_ES_JEFE_SERVICIO(?) AS jefe_servicio, '+
            ' PANEL_BECH.F_CHECK_ES_JEFE_FABRICA(?) AS jefe_fabrica, '+
            ' PANEL_BECH.F_CHECK_ES_SOLICITANTE_BCO(?) AS solicitante, '+
            ' PANEL_BECH.F_CHECK_ES_JEFE_PROY_CERT(?) AS jefe_proy_cert, '+
            ' PANEL_BECH.F_CHECK_ES_SOLICITANTE_SENTRA(?) AS solicitante_sentra, '+
            ' PANEL_BECH.F_CHECK_ES_GRP_POST(?) AS grupo_post '
            ,[id, id, id, id, id, id, id, id, id] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conPANEL_BECH.end();
};

module.exports = myModel;