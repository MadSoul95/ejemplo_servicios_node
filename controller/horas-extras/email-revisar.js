var con     = require("../../condb/condb")
const createLog = require("../../logs/createLog").fn_createLog;
let myModel = {};


myModel.getEmail = (id_doc,callback) => {
    
    con.conCERT();
    if(conCERT){
        conCERT.query(
            'CALL CERTIFICACION.SP_SELECT_DOC_HE(?)',[id_doc],
                (err, rows) => {
                    callback(err, rows)
                }
        )
    }
    conCERT.end();
}

myModel.deleteEmail = (id_doc,callback) => {
	con.conCERT();
	if(conCERT){
	   conCERT.query(
	   'CALL CERTIFICACION.SP_DELETE_DOC_HE(?)',[id_doc],
		(err) => {
			callback(err)
		}
	  )
	
	}
	conCERT.end();
}

module.exports = myModel;
