const createLog  = require("../logs/createLog").fn_createLog;
const getAuth    = require("../sec/getAuth");
const Controller = require('../controller/auth/auth.controller');
const jwt        = require("jsonwebtoken"); 

module.exports.fn_verifyToken = function (req, res, next) {
    createLog.info('Client IP => '+ req.ip +' | API : ' + req.route.path + ' | Verifica Token'); 
    const bearerHeader = req.headers['authorization'];
    
    if(typeof bearerHeader != 'undefined'){

        //Obtenremos el Token
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];

        //Comprobamos que el token sea valido
        jwt.verify(bearerHeader, getAuth.AuthPW, function(err, decoded) {
            if (err) {
                if(err.name == "JsonWebTokenError"){
                    res.status(200).json({success: false, message: "El token es invalido"})
                    createLog.error('Client IP => '+ req.ip +' | API : ' + req.route.path + ' | Verifica Token (El token es invalido)');
                    return false;
                }else if(err.name == "TokenExpiredError"){
                    res.status(200).json({success: false, message: "El token se encuentra expirado"})
                    createLog.error('Client IP => '+ req.ip +' | API : ' + req.route.path + ' | Verifica Token (El token se encuentra expirado)');
                    return false;
                }else{
                    res.status(200).json({success: false, message: "Ha ocurrido un error, contacta con el administrador"})
                    createLog.error('Client IP => '+ req.ip +' | API : ' + req.route.path + ' | Verifica Token (Failed)');
                    return false;
                }
            }else{
                //El token es correcto
                var decoded     = jwt.verify(bearerHeader, getAuth.AuthPW);
                var userId      = decoded.userId;
                var routePath   = req.route.path
                //Comprobamos que el usuario tenga permisos de acceso a dicha ruta
                Controller.routesAccess(userId, routePath, (err, data) =>{
                    if(!err){
                        var AccessRoute = data[0].result;
                        if(AccessRoute == 1){
                            req.token = bearerToken;
                            next();
                        }else{
                            res.status(500).json({success: false, message: "No tienes permisos para acceder a la Ruta"})
                            createLog.error('Client IP => '+ req.ip +' | API : ' + req.route.path + ' | Verifica Token (No tienes permisos para acceder a la Ruta)');
                            return false;
                        }  
                    }else{
                        res.status(500).json({success: false, message: "Ha ocurrido un error..."})
                        createLog.error('Client IP => '+ req.ip +' | API (Middleware) | Check Access User : '+req.route.path+' => '+err);
                    }
                });
            }
        });
    }else{
        //Token vacio
        res.status(200).json({success: false, message: "No tienes permisos"})
        createLog.error('Client IP => '+ req.ip +' | API : ' + req.route.path + ' | Verifica Token (No tienes permisos)');
        return false;
    }
    
};

module.exports.fn_results_auth = function (req, res, err, data, msg) {
    createLog.info('Client IP => '+ req.ip +' | API (Middleware) : ' + req.route.path);  
	res.header('Content-Type' , 'application/json');
	if(!err){
        var count = Object.keys(data).length;
        if(count != 0){ //El login fue exitoso
            const user = data[0].user;
            const userId = data[0].userId;
            const token = jwt.sign({user,userId}, getAuth.AuthPW, {
                algorithm: 'HS256',
                expiresIn: '48h' // Expira en 1 hora /d : dias /h : horas /m: minutos
                //expiresIn: 1 * 1 * 1 //Expira en 1 segundo xd
                //expiresIn: 60 * 60 * 24 //Expira en 24 horas
            });
			res.status(200).json({success: true, token: token});
		}else{//Login Erroneo
			res.status(200).json({success: false, message: msg});
		}
	}else{
		res.status(500).json({
			success: false, message: "Ha ocurrido un error..."
		})
		createLog.error('Client IP => '+ req.ip +' | API (Middleware) : '+req.route.path+' => '+err);
	}
}; 