var con = require('../../condb/condb');

//CREAR OBJETO
//AGREGAR METODOS userModel
let myModel = {};       

    //COUNT SOLICITUDES GDA POR TAREA 
    myModel.getAllCSOL = (callback) => {
        con.conCERT("SP");
        if(conCERT){
            conCERT.query(
                'CALL CERTIFICACION.SP_SELECT_COUNT_PEND_GDA_SOL()',
                (err, rows) => {
                    callback(err, rows)
                }
            )
        }
        conCERT.end();
    };       


    //SP DETALLE FILTRO BUSQUEDA REQUERIMIENTO X ID 
    myModel.getDetalSol = (idtas, callback) => {
        con.conCERT("SP");
        if(conCERT){
            conCERT.query(
                'CALL SP_DETALLE_PEND_GDA_SOL_X_TAS(?)',[idtas],
                (err, rows) => {
                    //callback(err, rows)
                    callback(err, rows)
                }
            )
        }
        conCERT.end();
    };

    //COUNT SOLICITUDES GDA PENDIENTES UNASSIGNED
    myModel.getAllPendBandeja = (callback) => {
        con.conCERT("SP");
        if(conCERT){
            conCERT.query(
                'CALL CERTIFICACION.SP_SELECT_COUNT_PEND_GDA_SOL_UNASSIGNED()',
                (err, rows) => {
                    callback(err, rows)
                }
            )
        }
        conCERT.end();
    };
    
    //DETALLE SOLICITUDES GDA PENDIENTES UNASSIGNED
    myModel.getDetalSolPendBandeja = (callback) => {
        con.conCERT("SP");
        if(conCERT){
            conCERT.query(
                'CALL CERTIFICACION.SP_DETALLE_PEND_GDA_SOL_UNASSIGNED()',
                (err, rows) => {
                    callback(err, rows)
                }
            )
        }
        conCERT.end();
    };

    //SP DETALLE FILTRO BUSQUEDA REQUERIMIENTO X CASE/ITERACION 
    myModel.getDetalCaseIter = (idcase, iter, callback) => {
        con.conCERT("SP");
        if(conCERT){
            conCERT.query(
                'CALL SP_DETALLE_PEND_GDA_SOL_X_CASE(?,?)',[idcase,iter],
                (err, rows) => {
                    //callback(err, rows)
                    callback(err, rows)
                }
            )
        }
        conCERT.end();
    };

    //SP DETALLE FILTRO BUSQUEDA REQUERIMIENTO X CASE/ITERACION (HISTORICO)
    myModel.getDetalHisCase = (idcase, iter, callback) => {
        con.conCERT("SP");
        if(conCERT){
            conCERT.query(
                'CALL SP_DETALLE_PEND_HIST_X_CASE(?,?)',[idcase,iter],
                (err, rows) => {
                    //callback(err, rows)
                    callback(err, rows)
                }
            )
        }
        conCERT.end();
    };

    //SP DOCUMENTOS X CASE
    myModel.getDocCase = (idcase, callback) => {
        con.conCERT("SP");
        if(conCERT){
            conCERT.query(
                'CALL SP_SELECT_DOC_APP_NUM(?)',[idcase],
                (err, rows) => {
                    //callback(err, rows)
                    callback(err, rows)
                }
            )
        }
        conCERT.end();
    };


//exportamos nuestro modelo
module.exports = myModel;
