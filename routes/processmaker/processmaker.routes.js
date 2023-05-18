module.exports = function(app){
    require('./users/users.routes')(app); //Users API 
    require('./groups/groups.routes')(app); //Grupos API 
}