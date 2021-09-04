
module.exports = (sequalize, type) =>{
    return sequalize.define('Tipo',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull : false
        },
        nombre: {
            type: type.STRING,
            allowNull : false
        },
        cargado: {
            type: type.BOOLEAN,
            defaultValue: true,
            allowNull : false
        }
    });
}