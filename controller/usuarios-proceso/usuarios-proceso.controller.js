var con = require('../../condb/condb');
let myModel = {};


//SELECT USUARIOS X ID
myModel.getAllUsers = (id, callback) => {
    con.conWF_BECH();
    if(conWF_BECH){
        conWF_BECH.query(
            ' SELECT '+
            ' GU.USR_UID AS user_uid, '+
            ' WF_BECH.F_NOMBRE(GU.USR_UID)  AS user_nom, '+
            ' GU.USR_UID AS grp_uid, '+
            ' WF_BECH.F_GRUPO(GU.GRP_UID) AS grp_nom '+
            ' FROM WF_BECH.GROUP_USER GU  '+
            ' LEFT JOIN WF_BECH.USERS U ON U.USR_UID = GU.USR_UID  '+
            ' WHERE GU.GRP_UID = ? '+
            ' AND U.USR_STATUS = "ACTIVE" ORDER BY WF_BECH.F_NOMBRE(GU.USR_UID) ASC ',[id] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conWF_BECH.end();
};

//SELECT USUARIOS X NOMBRE
myModel.getAllUsersXNom = (nom, callback) => {
    con.conWF_BECH();
    if(conWF_BECH){
        conWF_BECH.query(
            ' SELECT '+
            ' GU.USR_UID AS user_uid, '+
            ' WF_BECH.F_NOMBRE(GU.USR_UID)  AS user_nom, '+
            ' GU.USR_UID AS grp_uid, '+
            ' WF_BECH.F_GRUPO(GU.GRP_UID) AS grp_nom '+
            ' FROM WF_BECH.GROUP_USER GU  '+
            ' LEFT JOIN WF_BECH.USERS U ON U.USR_UID = GU.USR_UID  '+
            ' WHERE WF_BECH.F_GRUPO(GU.GRP_UID) = ? '+
            ' AND U.USR_STATUS = "ACTIVE" ORDER BY WF_BECH.F_NOMBRE(GU.USR_UID) ASC ',[nom] ,
            (err, rows) => {
				callback(err, rows)
            }
        )
    }
	conWF_BECH.end();
};

//SELECT USUARIOS X NOMBRE (MULTIPLE)
myModel.getAllUsersXNomArray = (nom_array, callback) => {
    var isArray = "0";
    var array = "";
    try {
        array = eval(nom_array);
        isArray = "1";
    } catch (error) {
        isArray = "0";
    }

    if (isArray == "1") {
        var i;
        var arr_for_sql = "";
        for (i = 0; i < array.length; i++) {
            arr_for_sql += array[i] + ",";
        }
        arr_for_sql = arr_for_sql.slice(0, -1);
        con.conWF_BECH();
        if(conWF_BECH){
            conWF_BECH.query(
                ' SELECT '+
                ' DISTINCT(GU.USR_UID) AS user_uid, '+
                ' WF_BECH.F_NOMBRE(GU.USR_UID)  AS user_nom, '+
                ' GU.USR_UID AS grp_uid, '+
                ' WF_BECH.F_GRUPO(GU.GRP_UID) AS grp_nom '+
                ' FROM WF_BECH.GROUP_USER GU  '+
                ' LEFT JOIN WF_BECH.USERS U ON U.USR_UID = GU.USR_UID  '+
                ' WHERE FIND_IN_SET(WF_BECH.F_GRUPO(GU.GRP_UID), ?) '+
                ' AND U.USR_STATUS = "ACTIVE" ORDER BY WF_BECH.F_NOMBRE(GU.USR_UID) ASC ',[arr_for_sql] ,
                (err, rows) => {
                    callback(err, null, rows)
                }
            )
        }
        conWF_BECH.end();
    }else{
        callback(null, 'Error: Debes enviar un array ex: ["1","2"]', null)
    }
};
                            
//exportamos nuestro modelo
module.exports = myModel;
