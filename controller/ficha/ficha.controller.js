var con = require('../../condb/condb');
let myModel = {};

//SELECT DATOS BASICOS INICIATIVA
myModel.getDatosIniciativaId = (id,callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT I.INI_ID AS ini_id, ' +
            ' CAST(CONCAT("[",I.INI_ID,"] ",I.INI_NOM) AS CHAR) AS ini_nom, ' +
            ' I.TI_ID AS ti_id, ' +
            ' TI.TI_NOMBRE AS ti_nom, ' +
            ' I.INI_NOM AS ini_nom2, ' +
            ' IFNULL(I.INI_BECH_MAU, "") AS cod_bech, ' +
            ' I.INI_GESTOR AS gestor_uid, ' +
            ' CERTIFICACION.F_NOMBRE(I.INI_GESTOR) AS gestor_nom, ' +
            ' IFNULL(I.INI_FLUJO, "") AS tipo_flujo, ' +
            ' IFNULL(CAST(E.EST_ID AS CHAR), "") AS ini_est_id, ' +
            ' IFNULL(E.EST_GRUPO, "") AS ini_est_grupo, ' +
            ' IFNULL(CAST(E2.EST_ID AS CHAR), "") AS ini_est_id2, ' +
            ' IFNULL(E2.EST_GRUPO, "") AS ini_grupo_id2 ' +
            ' FROM INICIATIVA I ' +
            ' LEFT JOIN ESTADO E ON E.EST_ID = I.EST_ID ' +
            ' LEFT JOIN ESTADO E2 ON E2.EST_ID = I.EST_ID2 ' +
            ' LEFT JOIN TIPO_INICIATIVA TI ON TI.TI_ID = I.TI_ID ' +
            ' WHERE I.INI_ID =  ?' +
            ' AND E.EST_GRUPO NOT IN ("C")',[id] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

////////////////////FICHA APOYO-MAU-PROYECTO////////////////////
//SELECT DATOS SECCION A FICHA
myModel.getApoyoSeccionA = (id,callback) => {
    con.conCERT("SP");
    if(conCERT){
        conCERT.query(
            'CALL CERTIFICACION.SP_FICHA_INI_SECCION_A(?)',[id],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT.end();
}; 
//SELECT DATOS SECCION B1 FICHA
myModel.getApoyoSeccionB1 = (id,callback) => {
    con.conCERT("SP");
    if(conCERT){
        conCERT.query(
            'CALL CERTIFICACION.SP_FICHA_INI_SECCION_B_1(?)',[id],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT.end();
};
//SELECT DATOS SECCION B2 FICHA
myModel.getApoyoSeccionB2 = (id,callback) => {
    con.conCERT("SP");
    if(conCERT){
        conCERT.query(
            'CALL CERTIFICACION.SP_FICHA_INI_SECCION_B_2(?)',[id],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT.end();
};
//SELECT DATOS SECCION TXA FICHA
myModel.getApoyoSeccionTXA = (id,callback) => {
    con.conCERT("SP");
    if(conCERT){
        conCERT.query(
            'CALL CERTIFICACION.SP_FICHA_INI_SECCION_TXA(?)',[id],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT.end();
};
//SELECT DATOS SECCION D FICHA
myModel.getApoyoSeccionD = (id,callback) => {
    con.conCERT("SP");
    if(conCERT){
        conCERT.query(
            'CALL CERTIFICACION.SP_FICHA_INI_SECCION_D(?)',[id],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT.end();
};
//SELECT DATOS SECCION E FICHA
myModel.getApoyoSeccionE = (id,callback) => {
    con.conCERT("SP");
    if(conCERT){
        conCERT.query(
            'CALL CERTIFICACION.SP_FICHA_INI_SECCION_E(?)',[id],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT.end();
};
//SELECT DATOS SECCION F FICHA
myModel.getApoyoSeccionF = (id,callback) => {
    con.conCERT("SP");
    if(conCERT){
        conCERT.query(
            'CALL CERTIFICACION.SP_FICHA_INI_SECCION_F(?)',[id],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT.end();
};
////////////////////FICHA CONVENIO////////////////////
//SELECT DATOS SECCION a FICHA
myModel.getConvenioSeccionA = (id,callback) => {
    con.conCERT("SP");
    if(conCERT){
        conCERT.query(
            'CALL CERTIFICACION.SP_FICHA_INI_SECCION_A_CONV(?)',[id],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT.end();
};

//SELECT DATOS SECCION A2 FICHA
myModel.getConvenioSeccionA2 = (id,callback) => {
    con.conCERT("SP");
    if(conCERT){
        conCERT.query(
            'CALL CERTIFICACION.SP_FICHA_INI_SECCION_A_CONV_2(?)',[id],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT.end();
};

//SELECT DATOS SECCION B FICHA
myModel.getConvenioSeccionB = (id,callback) => {
    con.conCERT("SP");
    if(conCERT){
        conCERT.query(
            'CALL CERTIFICACION.SP_FICHA_INI_SECCION_B_CONV(?)',[id],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT.end();
};

//DRP TIPO DE INICIATIVA
myModel.getDrpTipoIniciativa = (callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT ' +
            ' TI_ID AS TI_ID, ' +
            ' TI_NOMBRE AS TI_NOMB ' +
            ' FROM TIPO_INICIATIVA ' +
            ' WHERE TI_VIG = 1 ' +
            ' AND TI_ID NOT IN (5)',
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//DRP TIPO DE FACTURACION
myModel.getDrpTipoFacturacion = (callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT ' +
            ' TFI_ID AS TFI_ID, ' +
            ' TFI_NOM AS TFI_NOM ' +
            ' FROM TIPO_FACT_INI ' +
            ' WHERE TFI_VIG = 1',
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//DRP TIPO DE FLUJO
myModel.getDrpTipoFlujoPP = (callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT FPP_ID AS FPP_ID, ' +
            ' FPP_NOM AS FPP_NOM ' +
            ' FROM FLUJO_PASO_PRODUCCION ' + 
            ' WHERE FPP_VIG = 1',
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//DRP Aplica malla
myModel.getDrpAplicaMalla = (callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT TR_ID AS TR_ID, ' +
            ' TR_NOM AS TR_NOM ' +
            ' FROM TIPO_RESPUESTA ' + 
            ' WHERE TR_VIG = 1',
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//DRP ESPECIALISTA
myModel.getDrpEspecialista = (callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT UB_ID, UB_USUARIO ' +
            ' FROM USUARIOS_BANCO ' +
            ' WHERE ROL_ID = 5 ' +
            ' AND UB_VIG = 1 ' +
            ' ORDER BY UB_USUARIO ASC',
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//DRP CLIENTE COMERCIAL
myModel.getDrpClienteComercial = (callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT UB_ID, UB_USUARIO ' +
            ' FROM USUARIOS_BANCO ' +
            ' WHERE ROL_ID = 2 AND UB_VIG = 1 ' +
            ' ORDER BY UB_USUARIO ASC',
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//mail x id cliente comercial
myModel.getMailClienteComercial = (id,callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT UB_EMAIL ' +
            ' FROM USUARIOS_BANCO '+
            ' WHERE UB_ID = ?',[id],
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//DRP CLIENTE COMERCIAL
myModel.getDrpSubproyecto = (callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT SPR_ID, SPR_NOM, SPR_COD FROM SUBPROYECTO ORDER BY SPR_NOM ASC',
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//CC X SUBPROY
myModel.getCentroCostoProy = (id,callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT SPR_ID, SPR_NOM, SPR_CC FROM SUBPROYECTO WHERE SPR_ID = ?',[id],
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//SELECT DATOS INSTALACION AMBIENTE CANAL X INICIATIVA
myModel.getInsAmbCanalIniciativa = (idIni,idCanal,callback) => {
    con.conCERT("SP");
    if(conCERT){
        conCERT.query(
            'CALL CERTIFICACION.SP_DATOS_INS_AMB_X_CANAL_INICIATIVA(?,?)',[idIni,idCanal],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT.end();
};

//INTERCONEXIONES
myModel.getCheckInterconexiones = (callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT TINT_ID, TINT_NOM FROM TIPO_INTERCONEXION WHERE TINT_VIG = 1 ORDER BY TINT_NOM',
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//ESTADO INTERCONEXIONES
myModel.getEstadoInterIniciativa = (id,callback) => {
    con.conCERT("SP");
    if(conCERT){
        conCERT.query(
            'CALL CERTIFICACION.SP_ESTADO_INTER_X_INICIATIVA(?)',[id],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT.end();
};

//DRP Nivel MAU
myModel.getDrpNivelMau = (callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT NM_ID, NM_NOM FROM NIVEL_MAU WHERE NM_VIG = 1',
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//SELECT DATOS CANAL X INICIATIVA
myModel.getDatosCanalIniciativa = (idIni,idCanal,callback) => {
    con.conCERT("SP");
    if(conCERT){
        conCERT.query(
            'CALL CERTIFICACION.SP_FICHA_INI_SECCION_B_2_INICANAL(?,?)',[idIni,idCanal],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT.end();
};

//SELECT DRP AFA
myModel.getDrpResAFA = (callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT UB_ID, UB_USUARIO FROM USUARIOS_BANCO WHERE ROL_ID = 1 AND UB_VIG = 1 '+ 
            ' ORDER BY UB_USUARIO ASC',
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//SELECT DRP LIDER
myModel.getDrpLiderDes = (callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT UB_ID, UB_USUARIO FROM USUARIOS_BANCO WHERE ROL_ID = 4 AND UB_VIG = 1 ORDER BY UB_USUARIO ASC',
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};
//SELECT DRP RESPONSABLE FAB
myModel.getDrpRespFab = (callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT UB_ID, UB_USUARIO FROM USUARIOS_BANCO WHERE ROL_ID = 6 AND UB_VIG = 1 ' +
            ' ORDER BY UB_USUARIO ASC',
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//SELECT DATOS CANAL CONTINUIDAD IMPACTO
myModel.getDatosCanalContImpa = (idIni,callback) => {
    con.conCERT("SP");
    if(conCERT){
        conCERT.query(
            'CALL CERTIFICACION.SP_FICHA_INI_CANALES_IMPA_CONT(?)',[idIni],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT.end();
};

//SELECT DETALLE DATOS CANAL CONTINUIDAD IMPACTO
myModel.getDetalDatosCanalContImpa = (idIni,idCanal,callback) => {
    con.conCERT("SP");
    if(conCERT){
        conCERT.query(
            'CALL CERTIFICACION.SP_FICHA_INI_CANALES_IMPA_CONT2(?,?)',[idIni,idCanal],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT.end();
};

//SELECT Detalle Pruebas CANAL
myModel.getDetallePrueba = (idIni,callback) => {
    con.conCERT("SP");
    if(conCERT){
        conCERT.query(
            'CALL CERTIFICACION.SP_FICHA_DETALLE_PRUEBAS_CANAL(?)',[idIni],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT.end();
};

//SELECT DETALLE Pruebas CANAL2
myModel.getDetallePrueba2 = (idIni,idCanal,idTipo,callback) => {
    con.conCERT("SP");
    if(conCERT){
        conCERT.query(
            'CALL CERTIFICACION.SP_FICHA_DETALLE_PRUEBAS_CANAL2(?,?,?)',[idIni,idCanal,idTipo],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
    conCERT.end();
};
module.exports = myModel;