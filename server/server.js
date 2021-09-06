/**ir a la carpte server 
 * para instalar todas las dependencias usadas ejecutar: npm install  
 * para iniciar el server ejecutar: 'npm start'
*/

const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "../proto/medicamento.proto";
var protoLoader = require("@grpc/proto-loader");
const Op = require('sequelize').Op;

const {MedicamentoModel, TipoModel } =  require("./conexion"); //database MySQL con ORM(Sequalize)

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const medProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

/* Esta parte tendria que estar en la base de datos
const tipos = [
    { id: "1", nombre: "aerosoles" },
    { id: "2", nombre: "colirios" },
    { id: "3", nombre: "capsulas" },
    { id: "4", nombre: "polvo en suspension" },
    { id: "5", nombre: "jarabes" },
    { id: "6", nombre: "cremas" }
];

const medicamentos = [    
    { codigo: "12345", nombre: "amoxol", droga: "amoxilina", tipo: tipos[2] },
    { codigo: "23456", nombre: "dioxitlan", droga: "amoxilina", tipo: tipos[2] },
];

*/

// Agrego el servicio con todas sus funciones al server
server.addService(medProto.MedicService.service, {
    GetAll: async (_, callback) => {
        const medicamentos = await MedicamentoModel.findAll({ 
            where: {  /** ME TRAE TODOS LOS MEDICAMENTOS QUE TENGAN ASOCIADO UN TIPO_MEDICAMENTO CARGADO */
                "$tipo.cargado$" : true
            },
            include: "tipo",
            raw: true,
            nest: true
        });

        callback( null, {medicamentos: medicamentos} );
    },

    InsertType: async (call, callback) => {
        const tipo ={
            "id" : call.request.id,
            "nombre" : call.request.nombre
        }
        callback(null, await TipoModel.create(tipo));
    },

    RemoveType: async (call, callback) => {
        /*** REALIZO UNA BAJA LOGICA DEL TIPO ELEMENTO */
        const tipo = await TipoModel.update(
            {cargado : false}, //le cambio el atributo de cargado a falso
            {where : {id : call.request.id } }
        );
        callback(null, tipo )
    },

    Insert: async (call, callback) => {
        const med = {
            "codigo": call.request.codigo,
            "nombre" : call.request.nombre,
            "droga" : call.request.droga,
            "idTipoMedicamento" : call.request.tipo.id  
        }
        callback(null, await MedicamentoModel.create(med) );
    },

    GetByType: async (call, callback) => {
        const medicamentos = await MedicamentoModel.findAll({ 
            where: {  /** ME TRAE TODOS LOS MEDICAMENTOS QUE TENGAN ASOCIADO UN TIPO_MEDICAMENTO CARGADO */
                "$tipo.cargado$" : true,
                "$tipo.id$" : call.request.id /** PARA VERIFICAR QUE SEA DEL MISMO TIPO DE MEDICAMENTO */
            },
            include: "tipo"
        });
        callback( null, {medicamentos: medicamentos} );
    },

    GetByInitial: async (call, callback) => {
        const inicial = call.request.inicial;
        const medicamentos = await MedicamentoModel.findAll({ 
            where: {  /** ME TRAE TODOS LOS MEDICAMENTOS QUE TENGAN ASOCIADO UN TIPO_MEDICAMENTO CARGADO */
                "$tipo.cargado$" : true,
                nombre: {
                    [Op.like]: inicial + '%'
                }
            },
            include: "tipo"
        });
        callback( null, {medicamentos: medicamentos} );
    },

    GetTypes: async (call, callback) => {
        const tipos = await TipoModel.findAll({
            where: {
                "$cargado$" : true
            }
        });

        callback( null, {tipos: tipos});
    },

    GetType: async (call, callback) => { /** Traigo un unico tipo producto */
        const tipo = await TipoModel.findOne({
            where:{
                "$id$" : call.request.id
            }

        });
        callback( null, tipo);
    }

});

server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        console.log("Server running at http://127.0.0.1:50051");
        server.start();
    }
);