module.exports = (sequalize, type) =>{
    return sequalize.define('Medicamento',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull : false
        },
        codigo: {
            type: type.STRING,
            allowNull : false
        },
        nombre: {
            type: type.STRING,
            allowNull : false
        },
        droga: {
            type: type.STRING,
            allowNull : false
        },
        idTipoMedicamento: {
            type: type.INTEGER,
            allowNull : false
        }
    });
}