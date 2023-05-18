const auth            = require("../../middleware/auth.middleware");
const fun_val         = require("../../functions/validaciones.functions");
const createLog      = require("../../logs/createLog").fn_createLog;
const ControllerRI    = require("../../controller/horas-extras/email-revisar.js") 
const fun_res         = require("../../functions/results/results-api.functions");
const myModel         = require("../../controller/horas-extras/email-revisar");


module.exports = function(app){

    app.get('/proc-bech/api/getEmail',   (req,res) => {
        const id_doc = req.headers.id_doc;
	
	if (id_doc === undefined || id_doc === null){
	    createLog.error("id_doc no entregado")
	    res.status(400).send("ID_DOC no entregado")
	    
 	}
        myModel.getEmail( id_doc ,(err, data) => {
	
                try {
                    fun_res.fn_result_email(req,res,err,data,'Archivo no encontrado con el email dado');
                } catch (err) {
                    createLog.error(err,'Error en routes')
		    res.status(404).send('Archivo no encontrado');
                }
            })
            
            
        })

	app.put('/proc-bech/api/deleteEmail/:id', (req,res) => {
		createLog.info('Se llama put')
		const {path} = req.body;
		const id_doc = req.params.id;
		
		createLog.info('----------------')
		createLog.info(id_doc,'ID_DOC');
		createLog.info('----------------')
		createLog.info(req.params.id,'REQ PARAMS ID');

		if(path === "" || path === " " || path === "-"){
			createLog.info("Habil o sin ruta ");
			res.status(200).send("Sin archivo")
		}
		
		if(path === undefined ||path === null ) {
			createLog.error("Error path undefined");
			res.status(400).send("PATH no entregado")
		}
		
			try {
				fun_res.fn_deleteEmail(req,res,path,"Error al llamar la funcion fn_deleteEmail")
			} catch(err){
				createLog.error(err);
				createLog.error(`Error al eliminar el archivo ${err}`)
				res.status(500);
			}	
		
})
    
}


