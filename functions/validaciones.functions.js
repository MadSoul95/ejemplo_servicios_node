module.exports.fn_valida_param = function (req,res, paramsReq, params, callback) {
    
    // => Parametros
    // req => petición servicio
    // res => respuesta servicio
    // paramsReq => parámetros requeridos para que funcione el servicio
    // params => parámetros no obligatorios
    // callback => avisa al código que lo invoca cuando la función termina
    
    if (Object.keys(req.body).length === 0) {
        res.status(500).json({success: false, message: "Error: No has enviado parámetros"});
        return false;
    }
    var cont_ok = 0;
    var cant_param =  paramsReq.length;
    var reqBody = req.body;
    for (var key in reqBody) {
      for(i=0; i< paramsReq.length; i++){
        if(key == paramsReq[i]){
            cont_ok++;
        }
      }
	}
    if(cant_param > cont_ok){ 
        res.status(500).json({success: false, message: "Error: Faltan parámetros"});
        return false;
    }else{
        //Captura de parametros y enviada por callback (myParams)
        var myParams = "";
        //Captura Parametros que NO son obligatorios
        for(i=0; i< params.length; i++){
            var valParams   =   "if (!(req.body."+params[i]+")) {"+
                                    " myParams += \"var "+params[i]+" = JSON.parse(JSON.stringify(''));\""+
                                "}else{"+
                                    " myParams += \"var "+params[i]+" = JSON.parse(JSON.stringify(req.body."+params[i]+"));\""+
                                "}";
            eval(valParams);
        }
        //Caputra Parametros Obligatorios
        for(i=0; i< paramsReq.length; i++){
            myParams += "var "+paramsReq[i]+" = JSON.parse(JSON.stringify(req.body."+paramsReq[i]+"));";
        }
        callback(myParams); //Devuelvo el callback para hacer saber que la función debe proseguir.
    }
};

module.exports.fn_validateEmail = function (mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        return true;
    }else{
        return false;
    }
};

module.exports.fn_IsValidJSONString = function (str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

module.exports.fn_reOrderJSON = function (data, paramsJSON) {
    return JSON.parse(JSON.stringify( data, paramsJSON ));
};