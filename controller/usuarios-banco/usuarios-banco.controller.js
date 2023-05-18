var con = require('../../condb/condb');

//CREAR OBJETO
//AGREGAR METODOS userModel
let myModel = {};

//SELECT USUARIOS_BANCO X ROL
myModel.getAllUsers = (rol_id,callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
			' SELECT * FROM ( '+
			' 	SELECT '+
			' 	UB.UB_ID AS id, '+
			' 	UB.UB_USUARIO AS usuario, '+
			' 	UB.UB_EMAIL AS email, '+
			' 	UB.ROL_ID AS rol_id, '+
			' 	R.ROL_NOMBRE AS rol '+
			' 	FROM USUARIOS_BANCO UB '+
			' 	LEFT JOIN ROLES_BANCO R ON R.ROL_ID = UB.ROL_ID '+
			' 	WHERE UB.ROL_ID = ? '+
			' 	AND UB.UB_VIG = 1 '+
			' 	AND R.ROL_VIG = 1 '+
			' 	ORDER BY UB.UB_ID ASC '+
			' ) X '+
			' GROUP BY usuario '+
			' ORDER BY usuario ASC ' , [rol_id], 
            //callback devuelve error o filas
            (err, rows) => {
				callback(err, rows)   
            } 
        )
    }
	conCERT.end();
};

    //SP INSERT USUARIO
    myModel.getinsertUsr = (usr_nom,usr_email,rol_id,callback) => {
        con.conCERT("");
        if(conCERT){
            conCERT.query(
                'INSERT INTO USUARIOS_BANCO(UB_USUARIO, UB_EMAIL, ROL_ID) '+
				'VALUES	(?,?,?);',
                [usr_nom,usr_email,rol_id],(err, rows) => {
                    //callback(err, rows)
                    callback(err, rows)
                }
            )
        }
        conCERT.end();
    };    

//exportamos nuestro modelo
module.exports = myModel;
