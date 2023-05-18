var con = require('../../condb/condb');

//CREAR OBJETO
//AGREGAR METODOS userModel
let myModel = {};       

 //SELECT ROLES X ID 
 myModel.getAllRolesxId = (id,callback) => {
    con.conCERT();
    if(conCERT){
        conCERT.query(
            ' SELECT '+
            ' ROL.ROL_ID AS rol_id, '+
            ' ROL.ROL_NOMBRE AS rol_nombre, '+
            ' ROL.ROL_VIG AS rol_vig '+
            ' FROM CERTIFICACION.ROLES_BANCO ROL '+
            ' WHERE ROL.ROL_ID = ?',[id] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conCERT.end();
};                  
//exportamos nuestro modelo
module.exports = myModel;
        