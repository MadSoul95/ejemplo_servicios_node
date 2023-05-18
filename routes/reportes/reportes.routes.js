module.exports = function(app){
    require('./casos/casos.routes')(app); //CASOS
    require('./registro-iniciativa/registro-iniciativa.routes')(app); //REGISTRO-INICIATIVA
}