const {Sequelize} = require('sequelize');

const medicamentoModel = require('./models/Medicamento');
const Tipo = require('./models/Tipo');
const tipoModel = require('./models/Tipo');

/** cONFIGURO LA CONEXION PARA LA BD 
Esto lo cambian poniendo sus parametros */
const sequelize = new Sequelize("bennrlvakykbsfdqy0mi", "umf5hwldmy9temjq", "Xq4jEVlQNQMfga1gvuuj" ,{
    host : "bennrlvakykbsfdqy0mi-mysql.services.clever-cloud.com",
    port: "3306",
    dialect: "mysql"
});

 
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