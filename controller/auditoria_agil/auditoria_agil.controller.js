var con = require('../../condb/condb');

//CREAR OBJETO
//AGREGAR METODOS userModel
let myModel = {};

//UPDATE - REASIGNACION (AUDITORIA)
myModel.updateReasingarAUD = (aud_id, usr_uid, callback) => {
    con.conAUD_AGIL("SP");
    if(conAUD_AGIL){
        conAUD_AGIL.query(
            ' CALL AUDITORIA_AGIL.SP_UPDATE_AUD_REASIGNACION(?,?) ',[aud_id, usr_uid] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conAUD_AGIL.end();
};

//UPDATE - REASIGNACION (QA)
myModel.updateReasingarQA = (aud_id, usr_uid, callback) => {
    con.conAUD_AGIL("SP");
    if(conAUD_AGIL){
        conAUD_AGIL.query(
            ' CALL AUDITORIA_AGIL.SP_UPDATE_QA_REASIGNACION(?,?) ',[aud_id, usr_uid] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conAUD_AGIL.end();
};

//UPDATE - REASIGNACION (QA) SUB PROC
myModel.updateReasingarQA40 = (aud_id, usr_uid, callback) => {
    con.conAUD_AGIL("SP");
    if(conAUD_AGIL){
        conAUD_AGIL.query(
            ' CALL AUDITORIA_AGIL.SP_UPDATE_QA_40_REASIGNACION(?,?) ',[aud_id, usr_uid] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conAUD_AGIL.end();
};

//DROP AUDITORIAS AUD
myModel.getAllAuditoriasAud = (callback) => {
    con.conAUD_AGIL();
    if(conAUD_AGIL){
        conAUD_AGIL.query(
            'SELECT '+ 
            'A.AUD_CASE		                    AS aud_case, '+
            'IFNULL(F_INICIATIVA(A.INI_ID),"-") AS nom, '+
            'IFNULL(H.HIS_USR,"-")		        AS his_usr, '+
            'IFNULL(F_NOMBRE(H.HIS_USR),"-")    AS his_nom, '+
            'CONCAT("[",A.AUD_CASE,"] ","- ",F_INICIATIVA(A.INI_ID)) AS conc, '+
            'IFNULL(F_NOMBRE(A.AUD_AUDITOR),"-")AS aud, '+
            'H.TAR_ID				            AS tarea  '+
            'FROM `AUDITORIA` A '+
            'left join `HISTORICO` H on H.`AUD_CASE` = A.`AUD_CASE` '+
            'WHERE A.AUD_VIG = 1 '+
            'AND H.HIS_ESTADO  = "ABIERTA" '+
            'AND H.TAR_ID IN ("20","30") '+
            'AND H.HIS_USR != "" '+
            'GROUP BY A.AUD_CASE',
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conAUD_AGIL.end();
};

//DROP AUDITORIAS QA
myModel.getAllAuditoriasQA = (callback) => {
    con.conAUD_AGIL();
    if(conAUD_AGIL){
        conAUD_AGIL.query(
            'SELECT '+ 
            'A.AUD_CASE		                    AS aud_case, '+
            'IFNULL(F_INICIATIVA(A.INI_ID),"-") AS nom, '+
            'IFNULL(H.HIS_USR,"-")		        AS his_usr, '+
            'IFNULL(F_NOMBRE(H.HIS_USR),"-")    AS his_nom, '+
            'CONCAT("[",A.AUD_CASE,"] ","- ",F_INICIATIVA(A.INI_ID)) AS conc, '+
            'IFNULL(F_NOMBRE(A.AUD_AUDITOR),"-")AS aud, '+
            'H.TAR_ID				            AS tarea  '+
            'FROM `AUDITORIA` A '+
            'left join `HISTORICO` H on H.`AUD_CASE` = A.`AUD_CASE` '+
            'WHERE A.AUD_VIG = 1 '+
            ' AND H.HIS_ESTADO  = "ABIERTA" '+
            'AND H.TAR_ID IN ("15","40") '+
            'GROUP BY A.AUD_CASE',
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conAUD_AGIL.end();
};
// =============================================================
// =============================================================
// =============================================================

//DROP AUDITORIAS QA
myModel.getAllSubAudQA = (ini_id, callback) => {
    con.conAUD_AGIL();
    if(conAUD_AGIL){
        conAUD_AGIL.query(
            'SELECT '+ 
            'A.AUD_CASE		                    AS aud_case, '+
            'CAST(IFNULL(H.SUB_CASE,"-") AS CHAR)			AS sub,  '+
            'IFNULL(F_INICIATIVA(A.INI_ID),"-") AS nom, '+
            'IFNULL(H.HIS_USR,"-")		        AS his_usr, '+
            'IFNULL(F_NOMBRE(H.HIS_USR),"-")    AS his_nom, '+
            'CONCAT("[",A.AUD_CASE,"] ","- ",F_INICIATIVA(A.INI_ID)) AS conc, '+
            'IFNULL(F_NOMBRE(A.AUD_AUDITOR),"-")AS aud, '+
            'H.TAR_ID				            AS tarea  '+
            'FROM `AUDITORIA` A '+
            'left join `HISTORICO` H on H.`AUD_CASE` = A.`AUD_CASE` '+
            'WHERE A.AUD_VIG = 1 '+
            ' AND H.HIS_ESTADO  = "ABIERTA" '+
            'AND H.TAR_ID IN ("40") '+
            'AND A.AUD_CASE = (?)',[ini_id],
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conAUD_AGIL.end();
};

// =============================================================
// =============================================================
// =============================================================
//DROP QA 
myModel.getAllQA = (callback) => {
    con.conAUD_AGIL(); 
    if(conAUD_AGIL){
        conAUD_AGIL.query(
            'SELECT F_NOMBRE(USR_UID) AS USR, USR_UID, F_GRUPO(GRP_UID),GRP_UID '+
            'FROM WF_BECH.GROUP_USER '+
            'WHERE GRP_UID = "73908569060ca7a6df0b4c8033842970" '+
            'GROUP BY USR_UID',
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conAUD_AGIL.end();
};

//DROP AUDITORES
myModel.getAllAuditores = ( callback) => {
    con.conAUD_AGIL();
    if(conAUD_AGIL){
        conAUD_AGIL.query(
            'SELECT F_NOMBRE(USR_UID) AS USR, USR_UID, F_GRUPO(GRP_UID),GRP_UID '+
            'FROM WF_BECH.GROUP_USER '+
            'WHERE GRP_UID = "13491388060d26671442481002079334" '+
            'GROUP BY USR_UID',
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conAUD_AGIL.end();
};

//INSERT - REASIGNACION
myModel.insertReasignar = (gsol_id, usr_uid, motivo, usr_prev, user_new, callback) => {
    con.conAUD_AGIL("SP");
    if(conAUD_AGIL){
        conAUD_AGIL.query(
            ' CALL AUDITORIA_AGIL.SP_INSERT_AUD_REASIGNACION(?,?,?,?,?) ',[gsol_id, usr_uid, motivo, usr_prev, user_new] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conAUD_AGIL.end();
};

// =========================== //
//exportamos nuestro modelo
module.exports = myModel;
