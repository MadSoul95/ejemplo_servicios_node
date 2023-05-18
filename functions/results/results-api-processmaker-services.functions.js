const createLog = require("../../logs/createLog").fn_createLog;

module.exports.fn_results_pmSoap = function(req, res, err, data, msg) {
    createLog.info('Client IP => '+ req.ip +' | API : ' + req.route.path); 
    res.header('Content-Type', 'application/json');
    if (!err) {
        if (data.status_code == 0) {
            //0 => Login Correcto
            res.status(200).json({  success: true, status_code: data.status_code, message: data.message});
        }else{
            //5 => Usuario Inactivo
            res.status(200).json({  success: false, status_code: data.status_code, message: data.message});
        }
    } else {
        res.status(500).json({
            success: false,
            message: "Ha ocurrido un error..."
        })
        createLog.error('Client IP => '+ req.ip +' | API : ' + req.route.path + ' => ' + err);
    }
};