module.exports = function(app){
	require('./auth/auth.routes')(app); //Login API
	require('./dates/dates.routes')(app); //Fechas
	require('./processmaker/processmaker.routes')(app); //PM Querys
	require('./processmaker-services/processmaker-services.routes')(app); //SOAP SERVICES PM
	require('./subproyecto/subproyecto.routes')(app); //SUBPROYECTO
	require('./tareas-procesos/tareas-procesos.routes')(app); //Tareas proceso
	require('./iniciativa/iniciativa.routes')(app);  //selects inicitiva
	require('./reportes/reportes.routes')(app);  //reportes
	require('./area/area.routes')(app);  //areas
	require('./area-actividad/area-actividad.routes')(app);  //actividades areas
	require('./canal/canal.routes')(app);  //canal
	require('./tipo-fase/tipo-fase.routes')(app);  //fases		
	require('./browser/browser.routes')(app);  //browser
	require('./estado/estado.routes')(app);  //estado
	require('./usuarios-proceso/usuarios-proceso.routes')(app);  //usuarios-proceso
	require('./actividad-cert/actividad-cert.routes')(app);  //actividad cert
	require('./actividad-cert-usr/actividad-cert-usr.routes')(app);  //actividad cert usr
	require('./usuarios-banco/usuarios-banco.routes')(app);  //usuarios banco
	require('./tipo-respuesta/tipo-respuesta.routes')(app);  //tipo respuesta
	require('./dispositivo/dispositivo.routes')(app);  //dispositivo
	require('./roles-banco/roles-banco.routes')(app);  //roles-banco
	require('./tipo-iniciativa/tipo-iniciativa.routes')(app);  //tipo-iniciativa	
	require('./testlink/testlink.routes')(app);  //TestLink
	require('./verifica-rol/verifica-rol.routes')(app);  //Verificar Rol
	require('./gda-solicitud/gda-solicitud.routes')(app);  //gda-solicitud 
	require('./gda-sol/gda-sol.routes')(app);  //gda-sol 
	require('./gda-reasignacion/gda-reasignacion.routes')(app);  //gda-reasignacion 
	require('./capacidad/capacidad.routes')(app);  //capacidad 
	require('./ejecucion/ejecucion.routes')(app);  //ejecucion
	require('./diseno/diseno.routes')(app);  //diseno  
	require('./gda-control/gda-control.routes')(app);  //gda-control  
	require('./ficha/ficha.routes')(app);  //ficha iniciativa
	require('./correcciones/correcciones.routes')(app);  //correccion actividades
	require('./postcertificacion/postcertificacion.routes')(app);  //postcertificacion
	require('./auditoria_agil/auditoria_agil.routes')(app);  //auditoria agil
	require('./horas-extras/email-revisar')(app); // Horas extras
}

