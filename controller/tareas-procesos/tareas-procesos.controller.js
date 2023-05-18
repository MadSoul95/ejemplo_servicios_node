var con = require('../../condb/condb');

//CREAR OBJETO
//AGREGAR METODOS userModel
let myModel = {};

//SELECT X ESTADO
myModel.getTareaEstado = (estado,callback) => {
    con.conTAR();
    if(conTAR){
        conTAR.query(
            'SELECT ' +
				'TAR_ID AS tar_id, ' +
				'IFNULL(TAR_PRIORIDAD,9999) AS tar_prioridad, ' +
				'TAR_NOMBRE AS tar_nombre, ' +
				'TAR_DESCRIPCION AS tar_descripcion, ' +
				'IFNULL(WF_BECH.F_NOMBRE(PART_ID),"S/D") AS part_id, ' +
				'E.EST_NOMBRE AS estado, ' +
				'E.EST_COLOR AS est_color, ' +
				'E.EST_COLOR2 AS est_color2, ' +
				'CAST(IFNULL(TAR_FECH_SOLICITUD,"S/D")AS CHAR) AS tar_fec_sol, ' +
				'CAST(IFNULL(TAR_ESFUERZO,0)AS CHAR) AS tar_esfuerzo, ' +
				'TAR_AVANCE AS tar_avance ' +
			'FROM TAREA T ' +
			'LEFT JOIN ESTADO E ON E.EST_ID = T.EST_ID ' +
			'WHERE TAR_VGN = 1 ' +
			'AND E.EST_TIPO = ? ' +
			'ORDER BY TAR_PRIORIDAD', [estado], 
            //callback devuelve error o filas
            (err, rows) => {
				callback(err, rows)   
            } 
        )
    }
	conTAR.end();
};

//SELECT TODO
myModel.getAllTarea = (callback) => {
    con.conTAR();
    if(conTAR){
        conTAR.query(
            'SELECT ' +
				'TAR_ID AS tar_id, ' +
				'IFNULL(TAR_PRIORIDAD,9999) AS tar_prioridad, ' +
				'TAR_NOMBRE AS tar_nombre, ' +
				'TAR_DESCRIPCION AS tar_descripcion, ' +
				'IFNULL(WF_BECH.F_NOMBRE(PART_ID),"S/D") AS part_id, ' +
				'E.EST_NOMBRE AS estado, ' +
				'E.EST_COLOR AS est_color, ' +
				'E.EST_COLOR2 AS est_color2, ' +
				'CAST(IFNULL(TAR_FECH_SOLICITUD,"S/D")AS CHAR) AS tar_fec_sol, ' +
				'CAST(IFNULL(TAR_ESFUERZO,0)AS CHAR) AS tar_esfuerzo, ' +
				'TAR_AVANCE AS tar_avance ' +
			'FROM TAREA T ' +
			'LEFT JOIN ESTADO E ON E.EST_ID = T.EST_ID ' +
			'WHERE TAR_VGN = 1 ' +
			'ORDER BY TAR_PRIORIDAD',
            //callback devuelve error o filas
            (err, rows) => {
				callback(err, rows)   
            } 
        )
    }
	conTAR.end();
};

myModel.getTareaEstadoCliente = (cliente, estado,callback) => {
    con.conTAR();
    if(conTAR){
        conTAR.query(
            'SELECT ' +
				'TAR_ID AS tar_id, ' +
				'IFNULL(TAR_PRIORIDAD,9999) AS tar_prioridad, ' +
				'TAR_NOMBRE AS tar_nombre, ' +
				'TAR_DESCRIPCION AS tar_descripcion, ' +
				'IFNULL(WF_BECH.F_NOMBRE(PART_ID),"S/D") AS part_id, ' +
				'E.EST_NOMBRE AS estado, ' +
				'E.EST_COLOR AS est_color, ' +
				'E.EST_COLOR2 AS est_color2, ' +
				'CAST(IFNULL(TAR_FECH_SOLICITUD,"S/D")AS CHAR) AS tar_fec_sol, ' +
				'CAST(IFNULL(TAR_ESFUERZO,0)AS CHAR) AS tar_esfuerzo, ' +
				'TAR_AVANCE AS tar_avance ' +
			'FROM TAREA T ' +
			'LEFT JOIN ESTADO E ON E.EST_ID = T.EST_ID ' +
			'WHERE TAR_VGN = 1 ' +
			'AND E.EST_TIPO = ? ' +
			'AND CLI_ID = ? ' +
			'ORDER BY TAR_PRIORIDAD', [estado, cliente], 
            //callback devuelve error o filas
            (err, rows) => {
				callback(err, rows)   
            } 
        )
    }
	conTAR.end();
};

//SELECT TODO
myModel.getAllTareaCliente = (cliente, callback) => {
    con.conTAR();
    if(conTAR){
        conTAR.query(
            'SELECT ' +
				'TAR_ID AS tar_id, ' +
				'IFNULL(TAR_PRIORIDAD,9999) AS tar_prioridad, ' +
				'TAR_NOMBRE AS tar_nombre, ' +
				'TAR_DESCRIPCION AS tar_descripcion, ' +
				'IFNULL(WF_BECH.F_NOMBRE(PART_ID),"S/D") AS part_id, ' +
				'E.EST_NOMBRE AS estado, ' +
				'E.EST_COLOR AS est_color, ' +
				'E.EST_COLOR2 AS est_color2, ' +
				'CAST(IFNULL(TAR_FECH_SOLICITUD,"S/D")AS CHAR) AS tar_fec_sol, ' +
				'CAST(IFNULL(TAR_ESFUERZO,0)AS CHAR) AS tar_esfuerzo, ' +
				'TAR_AVANCE AS tar_avance ' +
			'FROM TAREA T ' +
			'LEFT JOIN ESTADO E ON E.EST_ID = T.EST_ID ' +
			'WHERE TAR_VGN = 1 ' +
			'AND CLI_ID = (?) ' +
			'ORDER BY TAR_PRIORIDAD',[cliente],
            //callback devuelve error o filas
            (err, rows) => {
				callback(err, rows)   
            } 
        )
    }
	conTAR.end();
};

//exportamos nuestro modelo
module.exports = myModel;