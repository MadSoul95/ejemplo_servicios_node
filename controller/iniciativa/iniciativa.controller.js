var con = require('../../condb/condb');
let myModel = {};

//DRP'S

//SELECT TODO MENOS CANCELADAS
myModel.getAllIniciativa = (callback) => { 
    con.conCERT();
    if(conCERT){
        conCERT.query(
                ' SELECT I.INI_ID AS ini_id, '+
                ' CAST(CONCAT("[",I.INI_ID,"] ",I.INI_NOM) AS CHAR) AS ini_nom, '+
                ' I.INI_NOM AS ini_nom2, ' +
                ' IFNULL(I.INI_BECH_MAU, "") AS cod_bech, '+
                ' I.INI_GESTOR AS gestor_uid, '+
                ' CERTIFICACION.F_NOMBRE(I.INI_GESTOR) AS gestor_nom, '+
                ' IFNULL(I.INI_FLUJO, "") AS tipo_flujo, '+
                ' IFNULL(CAST(E.EST_ID AS CHAR), "") AS ini_est_id, '+
                ' IFNULL(E.EST_GRUPO, "") AS ini_est_grupo, '+
                ' IFNULL(CAST(E2.EST_ID AS CHAR), "") AS ini_est_id2, '+
                ' IFNULL(E2.EST_GRUPO, "") AS ini_grupo_id2 '+
				' FROM INICIATIVA I ' +
                ' LEFT JOIN ESTADO E ON E.EST_ID = I.EST_ID  ' +
                ' LEFT JOIN ESTADO E2 ON E2.EST_ID = I.EST_ID2  ' +
				' WHERE E.EST_GRUPO NOT IN ("C")',
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

/*================================================================================*/
//SELECT INICIATIVAS POR GESTOR MENOS CANCELADAS
myModel.getAllIniciativaxIdGestor = (id, callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
                ' SELECT I.INI_ID AS ini_id, '+
                ' CAST(CONCAT("[",I.INI_ID,"] ",I.INI_NOM) AS CHAR) AS ini_nom, '+
                ' I.INI_NOM AS ini_nom2, ' +
                ' IFNULL(I.INI_BECH_MAU, "") AS cod_bech, '+
                ' I.INI_GESTOR AS gestor_uid, '+
                ' CERTIFICACION.F_NOMBRE(I.INI_GESTOR) AS gestor_nom, '+
                ' IFNULL(I.INI_FLUJO, "") AS tipo_flujo, '+
                ' IFNULL(CAST(E.EST_ID AS CHAR), "") AS ini_est_id, '+
                ' IFNULL(E.EST_GRUPO, "") AS ini_est_grupo, '+
                ' IFNULL(CAST(E2.EST_ID AS CHAR), "") AS ini_est_id2, '+
                ' IFNULL(E2.EST_GRUPO, "") AS ini_grupo_id2 '+
                ' FROM INICIATIVA I ' +
                ' LEFT JOIN ESTADO E ON E.EST_ID = I.EST_ID  ' +
                ' LEFT JOIN ESTADO E2 ON E2.EST_ID = I.EST_ID2  ' +
				' WHERE E.EST_GRUPO NOT IN ("C") AND I.INI_GESTOR = ?',[id] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};
/*================================================================================*/

//SELECT X USUARIO DE INICIATIVA (TABLA: INICIATIVA_USER)
myModel.getAllIniciativaxIniciativaUser = (usr_uid, callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
                ' SELECT I.INI_ID AS ini_id, '+
                ' CAST(CONCAT("[",I.INI_ID,"] ",I.INI_NOM) AS CHAR) AS ini_nom, '+
                ' I.INI_NOM AS ini_nom2, '+
                ' IFNULL(I.INI_BECH_MAU, "") AS cod_bech, '+
                ' I.INI_GESTOR AS gestor_uid, '+
                ' CERTIFICACION.F_NOMBRE(I.INI_GESTOR) AS gestor_nom, '+
                ' IFNULL(I.INI_FLUJO, "") AS tipo_flujo, '+
                ' IFNULL(CAST(E.EST_ID AS CHAR), "") AS ini_est_id, '+
                ' IFNULL(E.EST_GRUPO, "") AS ini_est_grupo, '+
                ' IFNULL(CAST(E2.EST_ID AS CHAR), "") AS ini_est_id2, '+
                ' IFNULL(E2.EST_GRUPO, "") AS ini_grupo_id2 '+
                ' FROM INICIATIVA I '+
                ' LEFT JOIN ESTADO E ON E.EST_ID = I.EST_ID  '+
                ' LEFT JOIN ESTADO E2 ON E2.EST_ID = I.EST_ID2 '+
                ' LEFT JOIN INICIATIVA_USER IUSR ON IUSR.INI_ID =  I.INI_ID '+
                ' WHERE E.EST_GRUPO NOT IN ("C") AND IUSR.USR_UID = ? ',[usr_uid] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//SELECT INICIATIVA X GRUPO POSTCERTIFICACION
myModel.getAllIniciativaxUsrGrp = (usr_uid, callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
                ' SELECT I.INI_ID AS ini_id, '+
                ' CAST(CONCAT("[",I.INI_ID,"] ",I.INI_NOM) AS CHAR) AS ini_nom, '+
                ' I.INI_NOM AS ini_nom2, '+
                ' IFNULL(I.INI_BECH_MAU, "") AS cod_bech, '+
                ' I.INI_GESTOR AS gestor_uid, '+
                ' CERTIFICACION.F_NOMBRE(I.INI_GESTOR) AS gestor_nom, '+
                ' IFNULL(I.INI_FLUJO, "") AS tipo_flujo, '+
                ' IFNULL(CAST(E.EST_ID AS CHAR), "") AS ini_est_id, '+
                ' IFNULL(E.EST_GRUPO, "") AS ini_est_grupo, '+
                ' IFNULL(CAST(E2.EST_ID AS CHAR), "") AS ini_est_id2, '+
                ' IFNULL(E2.EST_GRUPO, "") AS ini_grupo_id2 '+
                ' FROM INICIATIVA I '+
                ' LEFT JOIN ESTADO E ON E.EST_ID = I.EST_ID  '+
                ' LEFT JOIN ESTADO E2 ON E2.EST_ID = I.EST_ID2 '+
                ' LEFT JOIN GRP_INI_POST GIP ON GIP.GIP_INI = I.INI_ID '+
                ' WHERE E.EST_GRUPO NOT IN ("C") AND GIP.GIP_VIG = 1 AND GIP.GIP_USR = ? ',[usr_uid] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//SELECT INICIATIVA X GRUPO POSTCERTIFICACION Y SOLICITANTE
myModel.getAllIniciativaxUsrGrp2 = (usr_uid, callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
                ' SELECT I.INI_ID AS ini_id, '+
                ' CAST(CONCAT("[",I.INI_ID,"] ",I.INI_NOM) AS CHAR) AS ini_nom, '+
                ' I.INI_NOM AS ini_nom2, '+
                ' IFNULL(I.INI_BECH_MAU, "") AS cod_bech, '+
                ' I.INI_GESTOR AS gestor_uid, '+
                ' CERTIFICACION.F_NOMBRE(I.INI_GESTOR) AS gestor_nom, '+
                ' IFNULL(I.INI_FLUJO, "") AS tipo_flujo, '+
                ' IFNULL(CAST(E.EST_ID AS CHAR), "") AS ini_est_id, '+
                ' IFNULL(E.EST_GRUPO, "") AS ini_est_grupo, '+
                ' IFNULL(CAST(E2.EST_ID AS CHAR), "") AS ini_est_id2, '+
                ' IFNULL(E2.EST_GRUPO, "") AS ini_grupo_id2 '+
                ' FROM INICIATIVA I '+
                ' LEFT JOIN ESTADO E ON E.EST_ID = I.EST_ID  '+
                ' LEFT JOIN ESTADO E2 ON E2.EST_ID = I.EST_ID2 '+
                ' LEFT JOIN INICIATIVA_USER IUSR ON IUSR.INI_ID =  I.INI_ID '+
                ' WHERE E.EST_GRUPO NOT IN ("C") AND IUSR.USR_UID = ? ' +
                ' UNION' +
                ' SELECT I.INI_ID AS ini_id, '+
                ' CAST(CONCAT("[",I.INI_ID,"] ",I.INI_NOM) AS CHAR) AS ini_nom, '+
                ' I.INI_NOM AS ini_nom2, '+
                ' IFNULL(I.INI_BECH_MAU, "") AS cod_bech, '+
                ' I.INI_GESTOR AS gestor_uid, '+
                ' CERTIFICACION.F_NOMBRE(I.INI_GESTOR) AS gestor_nom, '+
                ' IFNULL(I.INI_FLUJO, "") AS tipo_flujo, '+
                ' IFNULL(CAST(E.EST_ID AS CHAR), "") AS ini_est_id, '+
                ' IFNULL(E.EST_GRUPO, "") AS ini_est_grupo, '+
                ' IFNULL(CAST(E2.EST_ID AS CHAR), "") AS ini_est_id2, '+
                ' IFNULL(E2.EST_GRUPO, "") AS ini_grupo_id2 '+
                ' FROM INICIATIVA I '+
                ' LEFT JOIN ESTADO E ON E.EST_ID = I.EST_ID  '+
                ' LEFT JOIN ESTADO E2 ON E2.EST_ID = I.EST_ID2 '+
                ' LEFT JOIN GRP_INI_POST GIP ON GIP.GIP_INI = I.INI_ID '+
                ' WHERE E.EST_GRUPO NOT IN ("C") AND GIP.GIP_VIG = 1 AND GIP.GIP_USR = ?  GROUP BY ini_id',[usr_uid, usr_uid] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//SELECT INICIATIVAS POR CODIGO BECH MENOS CANCELADAS
myModel.getAllIniciativaxCodBech = (codbech, callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
                ' SELECT I.INI_ID AS ini_id, '+
                ' CAST(CONCAT("[",I.INI_ID,"] ",I.INI_NOM) AS CHAR) AS ini_nom, '+
                ' I.INI_NOM AS ini_nom2, ' +
                ' IFNULL(I.INI_BECH_MAU, "") AS cod_bech, '+
                ' I.INI_GESTOR AS gestor_uid, '+
                ' CERTIFICACION.F_NOMBRE(I.INI_GESTOR) AS gestor_nom, '+
                ' IFNULL(I.INI_FLUJO, "") AS tipo_flujo, '+
                ' IFNULL(CAST(E.EST_ID AS CHAR), "") AS ini_est_id, '+
                ' IFNULL(E.EST_GRUPO, "") AS ini_est_grupo, '+
                ' IFNULL(CAST(E2.EST_ID AS CHAR), "") AS ini_est_id2, '+
                ' IFNULL(E2.EST_GRUPO, "") AS ini_grupo_id2 '+
                ' FROM INICIATIVA I ' +
                ' LEFT JOIN ESTADO E ON E.EST_ID = I.EST_ID  ' +
                ' LEFT JOIN ESTADO E2 ON E2.EST_ID = I.EST_ID2  ' +
				' WHERE E.EST_GRUPO NOT IN ("C") AND I.INI_BECH_MAU = ?',[codbech] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//SELECT INICIATIVAS POR TIPO INICIATIVA MENOS CANCELADAS
myModel.getAllIniciativaxTipoIni = (ti_id, callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
                ' SELECT I.INI_ID AS ini_id, '+
                ' CAST(CONCAT("[",I.INI_ID,"] ",I.INI_NOM) AS CHAR) AS ini_nom, '+                              
                ' I.INI_NOM AS ini_nom2, ' +
                ' IFNULL(I.INI_BECH_MAU, "") AS cod_bech, '+
                ' I.INI_GESTOR AS gestor_uid, '+
                ' CERTIFICACION.F_NOMBRE(I.INI_GESTOR) AS gestor_nom, '+
                ' IFNULL(I.INI_FLUJO, "") AS tipo_flujo, '+
                ' IFNULL(CAST(E.EST_ID AS CHAR), "") AS ini_est_id, '+
                ' IFNULL(E.EST_GRUPO, "") AS ini_est_grupo, '+
                ' IFNULL(CAST(E2.EST_ID AS CHAR), "") AS ini_est_id2, '+
                ' IFNULL(E2.EST_GRUPO, "") AS ini_grupo_id2 '+
                ' FROM INICIATIVA I ' +
                ' LEFT JOIN ESTADO E ON E.EST_ID = I.EST_ID  ' +
                ' LEFT JOIN ESTADO E2 ON E2.EST_ID = I.EST_ID2  ' +
				' WHERE E.EST_GRUPO NOT IN ("C") AND I.TI_ID = ?',[ti_id] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//SELECT INICIATIVAS POR EST2 MENOS CANCELADAS
myModel.getAllIniciativaxEst2 = (est_id2, callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
                ' SELECT I.INI_ID AS ini_id, '+
                ' CAST(CONCAT("[",I.INI_ID,"] ",I.INI_NOM) AS CHAR) AS ini_nom, '+   
                ' I.EST_ID2, '+                           
                ' I.INI_NOM AS ini_nom2, ' +
                ' IFNULL(I.INI_BECH_MAU, "") AS cod_bech, '+
                ' I.INI_GESTOR AS gestor_uid, '+
                ' CERTIFICACION.F_NOMBRE(I.INI_GESTOR) AS gestor_nom, '+
                ' IFNULL(I.INI_FLUJO, "") AS tipo_flujo, '+
                ' IFNULL(CAST(E.EST_ID AS CHAR), "") AS ini_est_id, '+
                ' IFNULL(E.EST_GRUPO, "") AS ini_est_grupo, '+
                ' IFNULL(CAST(E2.EST_ID AS CHAR), "") AS ini_est_id2, '+
                ' IFNULL(E2.EST_GRUPO, "") AS ini_grupo_id2 '+
                ' FROM INICIATIVA I ' +
                ' LEFT JOIN ESTADO E ON E.EST_ID = I.EST_ID  ' +
                ' LEFT JOIN ESTADO E2 ON E2.EST_ID = I.EST_ID2  ' +
				' WHERE E.EST_GRUPO NOT IN ("C") AND I.EST_ID2  = ?',[est_id2] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};


//SELECT INICIATIVAS POR GESTOR Y COD BECH MENOS CANCELADAS
myModel.getAllIniciativaxGesCod = (id,codbech, callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
                ' SELECT I.INI_ID AS ini_id, '+
                ' CAST(CONCAT("[",I.INI_ID,"] ",I.INI_NOM) AS CHAR) AS ini_nom, '+
                ' I.INI_NOM AS ini_nom2, ' +
                ' IFNULL(I.INI_BECH_MAU, "") AS cod_bech, '+
                ' I.INI_GESTOR AS gestor_uid, '+
                ' CERTIFICACION.F_NOMBRE(I.INI_GESTOR) AS gestor_nom, '+
                ' IFNULL(I.INI_FLUJO, "") AS tipo_flujo, '+
                ' IFNULL(CAST(E.EST_ID AS CHAR), "") AS ini_est_id, '+
                ' IFNULL(E.EST_GRUPO, "") AS ini_est_grupo, '+
                ' IFNULL(CAST(E2.EST_ID AS CHAR), "") AS ini_est_id2, '+
                ' IFNULL(E2.EST_GRUPO, "") AS ini_grupo_id2 '+
                ' FROM INICIATIVA I ' +
                ' LEFT JOIN ESTADO E ON E.EST_ID = I.EST_ID  ' +
                ' LEFT JOIN ESTADO E2 ON E2.EST_ID = I.EST_ID2  ' +
				' WHERE E.EST_GRUPO NOT IN ("C") AND I.INI_GESTOR = ? AND I.INI_BECH_MAU = ?',[id,codbech] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//SELECT INICIATIVAS POR GESTOR Y TIPO INICATIVA MENOS CANCELADAS
myModel.getAllIniciativaxGesIni = (id,ti_id, callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
                ' SELECT I.INI_ID AS ini_id, '+
                ' CAST(CONCAT("[",I.INI_ID,"] ",I.INI_NOM) AS CHAR) AS ini_nom, '+
                ' I.INI_NOM AS ini_nom2, ' +
                ' IFNULL(I.INI_BECH_MAU, "") AS cod_bech, '+
                ' I.INI_GESTOR AS gestor_uid, '+
                ' CERTIFICACION.F_NOMBRE(I.INI_GESTOR) AS gestor_nom, '+
                ' IFNULL(I.INI_FLUJO, "") AS tipo_flujo, '+
                ' IFNULL(CAST(E.EST_ID AS CHAR), "") AS ini_est_id, '+
                ' IFNULL(E.EST_GRUPO, "") AS ini_est_grupo, '+
                ' IFNULL(CAST(E2.EST_ID AS CHAR), "") AS ini_est_id2, '+
                ' IFNULL(E2.EST_GRUPO, "") AS ini_grupo_id2 '+
                ' FROM INICIATIVA I ' +
                ' LEFT JOIN ESTADO E ON E.EST_ID = I.EST_ID  ' +
                ' LEFT JOIN ESTADO E2 ON E2.EST_ID = I.EST_ID2  ' +
				' WHERE E.EST_GRUPO NOT IN ("C") AND I.INI_GESTOR = ? AND I.TI_ID = ?',[id,ti_id] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//SELECT INICIATIVAS POR GESTOR Y ESTADO 2 MENOS CANCELADAS
myModel.getAllIniciativaxGesEst = (id,est_id2, callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
                ' SELECT I.INI_ID AS ini_id, '+
                ' CAST(CONCAT("[",I.INI_ID,"] ",I.INI_NOM) AS CHAR) AS ini_nom, '+
                ' I.INI_NOM AS ini_nom2, ' +
                ' IFNULL(I.INI_BECH_MAU, "") AS cod_bech, '+
                ' I.INI_GESTOR AS gestor_uid, '+
                ' CERTIFICACION.F_NOMBRE(I.INI_GESTOR) AS gestor_nom, '+
                ' IFNULL(I.INI_FLUJO, "") AS tipo_flujo, '+
                ' IFNULL(CAST(E.EST_ID AS CHAR), "") AS ini_est_id, '+
                ' IFNULL(E.EST_GRUPO, "") AS ini_est_grupo, '+
                ' IFNULL(CAST(E2.EST_ID AS CHAR), "") AS ini_est_id2, '+
                ' IFNULL(E2.EST_GRUPO, "") AS ini_grupo_id2 '+
                ' FROM INICIATIVA I ' +
                ' LEFT JOIN ESTADO E ON E.EST_ID = I.EST_ID  ' +
                ' LEFT JOIN ESTADO E2 ON E2.EST_ID = I.EST_ID2  ' +
				' WHERE E.EST_GRUPO NOT IN ("C") AND I.INI_GESTOR = ? AND I.EST_ID2  = ?',[id,est_id2] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};
//SELECT COD BECH
myModel.getAllCodBech = (callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' I.INI_ID AS ini_id, '+
            ' I.INI_BECH_MAU AS cod_bech '+
            ' FROM INICIATIVA I '+
            ' LEFT JOIN ESTADO E ON E.EST_ID = I.EST_ID '+
            ' WHERE I.INI_BECH_MAU IS NOT NULL  '+
            ' AND E.EST_GRUPO NOT IN ("C") '+
            ' GROUP BY I.INI_BECH_MAU '+
            ' ORDER BY I.INI_BECH_MAU ',
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};
//===SEPARACION===//

 //SELECT X INI_ID
myModel.getIniciativaxIniId = (ini_id,callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' I.INI_ID AS ini_id, '+
            ' IFNULL(I.INI_NOM, "") AS ini_nom, '+
            ' TI.TI_ID AS ti_id, '+
            ' TI.TI_NOMBRE AS ti_nom, '+
            ' IFNULL(CAST(EST_I.EST_ID AS CHAR), "") AS est_id_ini, '+
            ' IFNULL(EST_I.EST_NOMBRE, "") AS est_nombre_ini, '+
            ' IFNULL(CAST(EST_I2.EST_ID AS CHAR), "") AS est2_id_ini, '+
            ' IFNULL(EST_I2.EST_NOMBRE, "") AS est2_nombre_ini, '+
            ' IFNULL(I.INI_GESTOR, "") AS gestor_uid, '+
            ' CASE WHEN CERTIFICACION.F_NOMBRE(I.INI_GESTOR) IN (NULL, "-") THEN "" '+
            ' ELSE CERTIFICACION.F_NOMBRE(I.INI_GESTOR) '+
            ' END AS gestor_nom, '+
            ' IFNULL(I.INI_BECH_MAU, "") AS cod_bech, '+
            ' IFNULL(I.INI_NUMSOL, "") AS num_sol, '+
            ' IFNULL(CAST(I.INI_RFC AS CHAR), "") AS rfc '+
            ' FROM INICIATIVA I '+
            ' LEFT JOIN ESTADO EST_I  ON EST_I.EST_ID = I.EST_ID '+
            ' LEFT JOIN ESTADO EST_I2 ON EST_I2.EST_ID = I.EST_ID2 '+
            ' LEFT JOIN TIPO_INICIATIVA TI ON TI.TI_ID = I.TI_ID '+
            ' WHERE I.INI_ID = ?',[ini_id] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//SELECT X ID COD BECH
myModel.getIniciativaIdCodbech = (id,callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            'SELECT INI_ID AS ini_id,INI_NOM AS ini_nom, IFNULL(INI_BECH_MAU,"") AS cod_bech ' +
				'FROM INICIATIVA I ' +
				'WHERE INI_ID = ?',[id] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//SELECT X ID
myModel.getIniciativaIdSubProy = (id,callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            'SELECT INI_ID AS ini_id ,INI_NOM AS ini_nom, IFNULL(I.SPR_ID,0) AS spr_id ' +
			'FROM INICIATIVA I '+
			'WHERE I.INI_ID = ?',[id] , 
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//UPDATE X ID
myModel.updateIniciativaIdCodbech = (codbech,id,callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            'UPDATE INICIATIVA SET INI_BECH_MAU = ? WHERE INI_ID = ?' , [codbech,id],
            (err, rows) => {
                //callback(err, rows)
                callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//UPDATE X ID
myModel.updateIniciativaSPRid = (spr,id,callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            'UPDATE INICIATIVA SET SPR_ID = ? WHERE INI_ID = ?' , [spr,id],
            (err, rows) => {
                //callback(err, rows)
                callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//UPDATE ESTADO2
myModel.getupdateEstado2 = (est_id2,ini_id,callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            'UPDATE CERTIFICACION.INICIATIVA SET EST_ID2 = ? WHERE INI_ID = ?' , [est_id2,ini_id],
            (err, rows) => {
                //callback(err, rows)
                callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//UPDATE INICIATIVA X INI ID - MODULO REGISTRO INICIATIVA (actividad-cert)
myModel.updateIniciativaIniId = (num_sol, rfc, ini_id,callback) => {
    if(num_sol == "NULL"){num_sol = undefined;}
    if(rfc == "NULL"){rfc = undefined;}
    con.conCERT();
    if(conCERT){
        conCERT.query(
            'UPDATE CERTIFICACION.INICIATIVA SET INI_NUMSOL = ?, INI_RFC = ? WHERE INI_ID = ?' , [num_sol, rfc, ini_id],
            (err, rows) => {
                //callback(err, rows)
                callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//exportamos nuestro modelo
module.exports = myModel;
