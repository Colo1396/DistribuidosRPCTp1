const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./medicamento.proto";
var protoLoader = require("@grpc/proto-loader");

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

// Esta parte tendria que estar en la base de datos
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

// Agrego el servicio con todas sus funciones al server
server.addService(medProto.MedicService.service, {
    GetAll: (_, callback) => {
        callback(null, { medicamentos: medicamentos });
    },
    InsertType: (call, callback) => {
        const tipo = call.request;
        tipos.push(tipo);
        callback(null, tipo);
    },
    RemoveType: (call, callback) => {
        const tipo = call.request;
        tipos.filter(t => t.id !== tipo.id);
        callback(null, tipo);
    },
    Insert: (call, callback) => {
        const med = call.request;
        medicamentos.push(med);
        callback(null, med);
    },
    GetByType: (call, callback) => {
        const tipo = call.request;
        const porTipo = medicamentos.filter(m => m.tipo.id === tipo.id);
        callback(null, { medicamentos: porTipo });
    },
    GetByInitial: (call, callback) => {
        const inicial = call.request;
        const porInicial = medicamentos.filter(m => m.charAt(0) === inicial);
        callback(null, { medicamentos: porInicial });
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