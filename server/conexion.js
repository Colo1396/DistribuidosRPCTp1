const {Sequelize} = require('sequelize');

const medicamentoModel = require('./models/Medicamento');
const Tipo = require('./models/Tipo');
const tipoModel = require('./models/Tipo');

/** CONFIGURACIÓN CONEXION PARA LA BD */
const sequelize = new Sequelize("bennrlvakykbsfdqy0mi", "umf5hwldmy9temjq", "Xq4jEVlQNQMfga1gvuuj",{
    host : "bennrlvakykbsfdqy0mi-mysql.services.clever-cloud.com",
    port: "3306",
    dialect: "mysql"
});

/*CONFIGURACIÓN LOCAL*/
/*
const sequelize = new Sequelize("farmacia_db", "root", "toor" ,{
    host : "localhost",
    port: "3306",
    dialect: "mysql"
});
*/

 
/*** REALIZO LOS MAPEOS DE LAS CLASES */
const TipoModel = tipoModel(sequelize, Sequelize);
const MedicamentoModel = medicamentoModel(sequelize, Sequelize);


 /*** relacion one to many de Medicamento y Tipo **/
TipoModel.hasMany(MedicamentoModel, {
        foreignKey: 'idTipoMedicamento' , 
        as: 'productos'
    });
MedicamentoModel.belongsTo(TipoModel, {
    foreignKey: 'idTipoMedicamento',
    as: 'tipo'
});

/** INICIALIZO EL MAPEO **/
sequelize.sync({ force:false })

    .then( ()=>{
        console.log("Mapeos exitosos");
    });


/** EXPORTO LOS OBJETOS PARA PODER USARLOS PARA LAS CONSULTAS */
module.exports = {
    TipoModel,
    MedicamentoModel
}