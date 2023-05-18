const createLog = require("../../logs/createLog").fn_createLog;
var fs = require('fs');

module.exports.fn_results_select = function(req, res, err, data, msg) {
    createLog.info('Client IP => '+ req.ip +' | API : ' + req.route.path); 
    res.header('Content-Type', 'application/json');
    if (!err) {
        var count = Object.keys(data).length;
        if (count != 0) { //SI LA QUERY TIENE REGISTROS
            res.status(200).json({ success: true, length: count, data });
        } else { //LA QUERY NO TIENE REGISTROS
            res.status(200).json({ success: false, length: count, message: msg });
        }
    } else {
        res.status(500).json({
            success: false,
            message: "Ha ocurrido un error..."
        })
        createLog.error('Client IP => '+ req.ip +' | API : ' + req.route.path + ' => ' + err);
    }
};

module.exports.fn_results_insert = function(req, res, err, data, msg) {
    createLog.info('Client IP => '+ req.ip +' | API : ' + req.route.path); 
    res.header('Content-Type', 'application/json');
    if (!err) {
        res.status(200).json({ success: true, message: "Tupla Insertada", insertId: data.insertId, affectedRows: data.affectedRows });
    } else {
        res.status(500).json({
            success: false,
            message: "Ha ocurrido un error... "
        })
        createLog.error('Client IP => '+ req.ip +' | API : ' + req.route.path + ' => ' + err);
    }
};

module.exports.fn_results_update = function(req, res, err, data, msg) {
    createLog.info('Client IP => '+ req.ip +' | API : ' + req.route.path); 
    res.header('Content-Type', 'application/json');

    //changedRows => Filas actualizadas
    //affectedRows => Filas encontradas

    if (!err) {
        if (data.changedRows > 0) {
            res.status(200).json({ success: true, message: "Cambio exitoso", changedRows: data.changedRows, affectedRows: data.affectedRows });
            return false;
        } else {
            if (data.affectedRows > 0) {
                res.status(200).json({ success: true, message: "Cambio exitoso", changedRows: data.changedRows, affectedRows: data.affectedRows });
                return false;
            } else {
                res.status(200).json({ success: false, message: "Tupla no encontrada", changedRows: data.changedRows, affectedRows: data.affectedRows });
                return false;
            }
        }
    } else {
        res.status(500).json({
            success: false,
            message: "Ha ocurrido un error... "
        })
        createLog.error('Client IP => '+ req.ip +' | API : ' + req.route.path + ' => ' + err);
    }
};
module.exports.fn_results_delete = function(req, res, err, data, msg) {
    createLog.info('Client IP => '+ req.ip +' | API : ' + req.route.path);  
    res.header('Content-Type', 'application/json');
    if (!err) {
        if (data.affectedRows > 0) {
            res.status(200).json({ success: true, message: "Tupla eliminada", affectedRows: data.affectedRows });
            return false;
        } else {
            res.status(200).json({ success: false, message: "Tupla no encontrada", affectedRows: data.affectedRows });
            return false;
        }
    } else {
        res.status(500).json({
            success: false,
            message: "Ha ocurrido un error... "
        })
        createLog.error('Client IP => '+ req.ip +' | API : ' + req.route.path + ' => ' + err);
    }
};


//  _____ _______ ____  _____  ______ _____    _____  _____   ____   _____ ______ _____  _    _ _____  ______ 
// / ____|__   __/ __ \|  __ \|  ____|  __ \  |  __ \|  __ \ / __ \ / ____|  ____|  __ \| |  | |  __ \|  ____|
//| (___    | | | |  | | |__) | |__  | |  | | | |__) | |__) | |  | | |    | |__  | |  | | |  | | |__) | |__   
// \___ \   | | | |  | |  _  /|  __| | |  | | |  ___/|  _  /| |  | | |    |  __| | |  | | |  | |  _  /|  __|  
// ____) |  | | | |__| | | \ \| |____| |__| | | |    | | \ \| |__| | |____| |____| |__| | |__| | | \ \| |____ 
//|_____/   |_|  \____/|_|  \_\______|_____/  |_|    |_|  \_\\____/ \_____|______|_____/ \____/|_|  \_\______|


module.exports.fn_results_select_sp = function(req, res, err, data, msg) {
    createLog.info('Client IP => '+ req.ip +' | API : ' + req.route.path); 
    res.header('Content-Type', 'application/json');
    if (!err) {
        if (typeof data[0] !== 'undefined') {
            var RowDataPacket = data[0];
            var count = Object.keys(RowDataPacket).length;

            if (count != 0) { //SI LA QUERY TIENE REGISTROS
                res.status(200).json({ success: true, length: count, data: RowDataPacket });
            } else { //LA QUERY NO TIENE REGISTROS
                res.status(200).json({ success: false, length: count, message: msg });
            }
        }else{
            res.status(500).json({
                success: false,
                message: "Ha ocurrido un error... "
            })
            createLog.error('Client IP => '+ req.ip +' | API : ' + req.route.path + ' => ' + 'Verificiar Función Utilizada (Soy una Función de SP)');
        }
    } else {
        res.status(500).json({
            success: false,
            message: "Ha ocurrido un error..."
        })
        createLog.error('Client IP => '+ req.ip +' | API : ' + req.route.path + ' => ' + err);
    }
};


module.exports.fn_results_insert_sp = function(req, res, err, data, msg) {
    createLog.info('Client IP => '+ req.ip +' | API : ' + req.route.path); 
    res.header('Content-Type', 'application/json');
    if (!err) {
        if (typeof data[0] !== 'undefined') {
            var RowDataPacket = data[0];
            var affectedRows = RowDataPacket[0].affectedRows;
            var insertId = RowDataPacket[0].insertId;

            res.status(200).json({ success: true, message: "Tupla Insertada", insertId: insertId, affectedRows: affectedRows });
        }else{
            res.status(500).json({
                success: false,
                message: "Ha ocurrido un error... "
            })
            createLog.error('Client IP => '+ req.ip +' | API : ' + req.route.path + ' => ' + 'Verificiar Función Utilizada (Soy una Función de SP)');
        }
    } else {
        res.status(500).json({
            success: false,
            message: "Ha ocurrido un error... "
        })
        createLog.error('Client IP => '+ req.ip +' | API : ' + req.route.path + ' => ' + err);
    }
};

module.exports.fn_results_update_sp = function(req, res, err, data, msg) {
	createLog.info('Client IP => '+ req.ip +' | API : ' + req.route.path);  
    res.header('Content-Type', 'application/json');
    if (!err) {
        if (typeof data[0] !== 'undefined') {
            var RowDataPacket = data[0];
            var changedRows = RowDataPacket[0].changedRows;
            var affectedRows = RowDataPacket[0].affectedRows;

            //changedRows => Filas actualizadas
            //affectedRows => Filas encontradas

            if (changedRows > 0) {
                res.status(200).json({ success: true, message: "Cambio exitoso", changedRows: changedRows, affectedRows: affectedRows });
                return false;
            } else {
                if (affectedRows > 0) {
                    res.status(200).json({ success: true, message: "Cambio exitoso", changedRows: changedRows, affectedRows: affectedRows });
                    return false;
                } else {
                    res.status(200).json({ success: false, message: "Tupla no encontrada", changedRows: changedRows, affectedRows: affectedRows });
                    return false;
                }
            }
        }else{
            res.status(500).json({
                success: false,
                message: "Ha ocurrido un error... "
            })
            createLog.error('Client IP => '+ req.ip +' | API : ' + req.route.path + ' => ' + 'Verificiar Función Utilizada (Soy una Función de SP)');
        }
        
    } else {
        res.status(500).json({
            success: false,
            message: "Ha ocurrido un error... "
        })
        createLog.error('Client IP => '+ req.ip +' | API : ' + req.route.path + ' => ' + err);
    }
};

module.exports.fn_results_delete_sp = function(req, res, err, data, msg) {
    createLog.info('Client IP => '+ req.ip +' | API : ' + req.route.path);  
    res.header('Content-Type', 'application/json');
    if (!err) {
        if (typeof data[0] !== 'undefined') {
            var RowDataPacket = data[0];
            var affectedRows = RowDataPacket[0].affectedRows;

            if (affectedRows > 0) {
                res.status(200).json({ success: true, message: "Tupla eliminada", affectedRows: affectedRows });
                return false;
            } else {
                res.status(200).json({ success: false, message: "No se borraron registros", affectedRows: affectedRows });
                return false;
            }
        }else{
            res.status(500).json({
                success: false,
                message: "Ha ocurrido un error... "
            })
            createLog.error('Client IP => '+ req.ip +' | API : ' + req.route.path + ' => ' + 'Verificiar Función Utilizada (Soy una Función de SP)');
        }        
    } else {
        res.status(500).json({
            success: false,
            message: "Ha ocurrido un error... "
        })
        createLog.error('Client IP => '+ req.ip +' | API : ' + req.route.path + ' => ' + err);
    }
};

module.exports.fn_results_generic_sp = function(req, res, err, data, msg) {
    createLog.info('Client IP => '+ req.ip +' | API : ' + req.route.path); 
    res.header('Content-Type', 'application/json');
    if (!err) {
        if (typeof data[0] !== 'undefined') {
            var RowDataPacket = data[0];
            var message = "";
            if (typeof RowDataPacket == 'undefined') { // El SP  NO contiene parametro de salida => message
                message = message = "Se ejecuto correctamente";
            } else { // El SP  SI contiene parametro de salida => message
                message = RowDataPacket[0].message;
            }
            
            res.status(200).json({ success: true, message: message });
            return false;
        }else{
            res.status(500).json({
                success: false,
                message: "Ha ocurrido un error... "
            })
            createLog.error('Client IP => '+ req.ip +' | API : ' + req.route.path + ' => ' + 'Verificiar Función Utilizada (Soy una Función de SP)');
        }
    } else {
        res.status(500).json({
            success: false,
            message: "Ha ocurrido un error... "
        })
        createLog.error('Client IP => '+ req.ip +' | API : ' + req.route.path + ' => ' + err);
    }
};



module.exports.fn_result_email = function (req,res,err,data,msg){

    createLog.info('Client IP => '+ req.ip +' | API : ' + req.route.path); 
    res.header('Content-Type', 'application/json');
       
    if (!err) {
        var count = Object.keys(data).length;
        if (count != 0) { //SI LA QUERY TIENE REGISTROS
	    
            var RowDataPacket = data[0];
            var message = "";
	    let nombre = "";
            if (typeof RowDataPacket == 'undefined') { // El SP  NO contiene parametro de salida => message
                message = message = "Se ejecuto correctamente";
            } else { // El SP  SI contiene parametro de salida => message
                 const ultimoMensaje = RowDataPacket.reduce((acc,el) => acc.concat(el),[])
		 const mensajeReciente = ultimoMensaje.reverse()[0]
		 message = mensajeReciente.R_DOC;
		 nombre  = mensajeReciente.HE_ID + "-" + mensajeReciente.DOC_NOMBRE
            }
            
	    
             fs.readFile(message, function(err, data) {
	
                if (err) {
		    if (err.code === 'ENOENT') {
			 createLog.error(message,'Message')
   			 createLog.error('El archivo no se encontró');
   			 res.status(404).send('Archivo no encontrado');
 		    } else {
    			createLog.error('Error al leer el archivo');
   			 res.status(500).send('Error al leer el archivo');
  		   }
  		   return;
                }
              
		try {
		    res.setHeader('Content-Disposition', 'attachment;filename=' + `"${nombre}"`);
                    res.setHeader('Content-Type', 'text/plain');
                    res.status(200)
                    res.send(data);
		} catch(err) {
			createLog.error("Error al enviar el archivo");
			res.status(500).send("Error al enviar el archivo");
		}
               
              });

           
        } else { //LA QUERY NO TIENE REGISTROS
            res.status(200).json({ success: false, length: count, message: msg });
        }
    } else {
        res.status(500).json({
            success: false,
            message: "Ha ocurrido un error..."
        })
        createLog.error('Client IP => '+ req.ip +' | API : ' + req.route.path + ' => ' + err);
    }
}



  

module.exports.fn_deleteEmail = function(req, res, data, msg) {
    createLog.info('Client IP => '+ req.ip +' | API : ' + req.route.path); 
    res.header('Content-Type', 'application/json');
    try{
	
	fs.unlink(data, (err) => {
  		if (err) {
			if (err.code === "ENOENT"){
				res.status(404).send("Archivo no encontrado")
				createLog.error(`Error al eliminar el archivo ${err}`)
			} else {
				createLog.error(`Error al eliminar el archivo ${err}`)
			}
		}

  		res.status(204).send("Se ha eliminado con exito el archivo");
	});
    } catch(err) {
        res.status(500).json({
            success: false,
            message: "Ha ocurrido un error... "
        })
        createLog.error('Client IP => '+ req.ip +' | API : ' + req.route.path + ' => ' + err);
    }
};
