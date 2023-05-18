var con = require('../../condb/condb');

//CREAR OBJETO
//AGREGAR METODOS userModel
let myModel = {};

//SELECT X ID
myModel.getSubproyectoId = (id,callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            'SELECT SPR_ID AS spr_id, SPR_NOM AS spr_nom, SPR_COD AS spr_cod, SPR_CON AS spr_con, SPR_CC AS spr_cc '+
            'FROM SUBPROYECTO WHERE SPR_ID = (?)',[id] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//SELECT X ID
myModel.getSubproyectoCodeCC = (id,callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            'SELECT IFNULL(SPR_COD, 0) AS spr_cod, IFNULL(SPR_CC, 0) AS spr_cc '+
            'FROM SUBPROYECTO WHERE SPR_ID = (?)',[id] ,
            (err, rows) => {
				          callback(err, rows)
            }
        )
    }
	conCERT.end();
};


//SELECT TODO
myModel.getAllSubproyecto = (callback) => {
    con.conCERT("");
    if(conCERT){
        conCERT.query(
            'SELECT SPR_ID AS spr_id, SPR_NOM AS spr_nom, SPR_COD AS spr_cod, SPR_CON AS spr_con, SPR_CC AS spr_cc FROM SUBPROYECTO',
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//SELECT ID, NOMBRE TODOS
myModel.getAllSubproyectoNombre = (callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
          'SELECT SPR_ID AS spr_id, SPR_NOM AS spr_nom '+
          'FROM SUBPROYECTO '+
          'ORDER BY SPR_NOM ',
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//SELECT X CONTRATO
myModel.getSubproyectoContrato = (contrato,callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            'SELECT SPR_ID AS spr_id, SPR_NOM AS spr_nom, SPR_COD AS spr_cod, SPR_CON AS spr_con, SPR_CC AS spr_cc '+
            'FROM SUBPROYECTO WHERE SPR_CON = (?)',[contrato],
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//INSERT
myModel.insertSubproyecto = (nombre,codigo,contrato,centro,callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            'INSERT INTO SUBPROYECTO (SPR_NOM,SPR_COD,SPR_CON,SPR_CC) VALUES (?,?,?,?)',[nombre,codigo,contrato,centro],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//UPDATE
myModel.updateSubproyectoId = (nombre,codigo,contrato,centro,id,callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' UPDATE SUBPROYECTO  SET SPR_NOM = ?, SPR_COD = ?,SPR_CON = ?,SPR_CC= ? WHERE SPR_ID = ?',[nombre,codigo,contrato,centro,id],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
	conCERT.end();
};

//DELETE X ID
myModel.deleteSubproyectoId = (id,callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            'DELETE FROM SUBPROYECTO WHERE SPR_ID = ?',[id],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
	conCERT.end();
};
//DELETE X CONTRATO
myModel.deleteSubproyectoContrato = (contrato,callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            'DELETE FROM SUBPROYECTO WHERE SPR_CON = ?',[contrato],
            (err, rows) => {
                callback(err, rows)
            }
        )
    }
	conCERT.end();
};
//exportamos nuestro modelo
module.exports = myModel;
