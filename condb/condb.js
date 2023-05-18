var RouteDB          = require('../properties/properties');
var propertiesReader = require('properties-reader');
var properties       = propertiesReader(RouteDB.fn_environment()+'/database.properties');
const mysql          = require('mysql');

function fn_returnFlags(flag) {
    var v_flag = "";
    if (flag == "SP") {
        v_flag = "-FOUND_ROWS";
    }
    return v_flag;
};

//DB => API
module.exports.conAPI = function(flag) {
    conAPI = mysql.createConnection({
        host:       properties.get('db.host_API'),
        user:       properties.get('db.user_API'),
        password:   properties.get('db.pass_API'),
        database:   properties.get('db.db_API'),
        port:       properties.get('db.port_API'),
        charset:    "utf8",
        flags:      fn_returnFlags(flag)
    });
    return conAPI;
};

//DB => PANEL_BECH
module.exports.conPANEL_BECH = function(flag) {
    conPANEL_BECH = mysql.createConnection({
        host:       properties.get('db.host_PANEL_BECH'),
        user:       properties.get('db.user_PANEL_BECH'),
        password:   properties.get('db.pass_PANEL_BECH'),
        database:   properties.get('db.db_PANEL_BECH'),
        port:       properties.get('db.port_PANEL_BECH'),
        charset:    "utf8",
        flags:      fn_returnFlags(flag)
    });
    return conPANEL_BECH;
};


//DB => CERTIFICACION
module.exports.conCERT = function(flag) {
    conCERT = mysql.createConnection({
        host:       properties.get('db.host_CERT'),
        user:       properties.get('db.user_CERT'),
        password:   properties.get('db.pass_CERT'),
        database:   properties.get('db.db_CERT'),
        port:       properties.get('db.port_CERT'),
        charset:    "utf8",
        flags:      fn_returnFlags(flag)
    });
    return conCERT;
};

//DB => CERTIFICACION_GESTION
module.exports.conCERT_GEST = function(flag) {
    conCERT_GEST = mysql.createConnection({
        host:       properties.get('db.host_CERT_GEST'),
        user:       properties.get('db.user_CERT_GEST'),
        password:   properties.get('db.pass_CERT_GEST'),
        database:   properties.get('db.db_CERT_GEST'),
        port:       properties.get('db.port_conCERT_GEST'),
        charset:    "utf8",
        flags:      fn_returnFlags(flag)
    });
    return conCERT_GEST;
};

//DB => WF_BECH
module.exports.conWF_BECH = function(flag) {
    conWF_BECH = mysql.createConnection({
        host:       properties.get('db.host_WF_BECH'),
        user:       properties.get('db.user_WF_BECH'),
        password:   properties.get('db.pass_WF_BECH'),
        database:   properties.get('db.db_WF_BECH'),
        port:       properties.get('db.port_WF_BECH'),
        charset: "utf8",
        flags: fn_returnFlags(flag)
    });
    return conWF_BECH;
};

//DB => RB_BECH
module.exports.conRB_BECH = function(flag) {
    conRB_BECH = mysql.createConnection({
        host:       properties.get('db.host_RB_BECH'),
        user:       properties.get('db.user_RB_BECH'),
        password:   properties.get('db.pass_RB_BECH'),
        database:   properties.get('db.db_RB_BECH'),
        port:       properties.get('db.port_RB_BECH'),
        charset: "utf8",
        flags: fn_returnFlags(flag)
    });
    return conRB_BECH;
};

//DB => TAREAS
module.exports.conTAR = function(flag) {
    conTAR = mysql.createConnection({
        host:       properties.get('db.host_TAREAS'),
        user:       properties.get('db.user_TAREAS'),
        password:   properties.get('db.pass_TAREAS'),
        database:   properties.get('db.db_TAREAS'),
        port:       properties.get('db.port_TAREAS'),
        charset: "utf8",
        flags: fn_returnFlags(flag)
    });
    return conTAR;
};

//DB => bitnami_testlink
module.exports.conTESTLINK = function(flag) {
    conTESTLINK = mysql.createConnection({
        host:       properties.get('db.host_TL'),
        user:       properties.get('db.user_TL'),
        password:   properties.get('db.pass_TL'),
        database:   properties.get('db.db_TL'),
        port:       properties.get('db.port_TL'),
        charset: "utf8",
        flags: fn_returnFlags(flag)
    });
    return conTESTLINK;
};

//DB => auditoria_agil
module.exports.conAUD_AGIL = function(flag) {
    conAUD_AGIL = mysql.createConnection({
        host:       properties.get('db.host_AUD_AGIL'),
        user:       properties.get('db.user_AUD_AGIL'),
        password:   properties.get('db.pass_AUD_AGIL'),
        database:   properties.get('db.db_AUD_AGIL'),
        port:       properties.get('db.port_AUD_AGIL'),
        charset: "utf8",
        flags: fn_returnFlags(flag)
    });
    return conAUD_AGIL;
};