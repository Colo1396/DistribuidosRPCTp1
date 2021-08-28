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

const MedicService = grpc.loadPackageDefinition(packageDefinition).MedicService;

const client = new MedicService(
    "localhost:50051",
    grpc.credentials.createInsecure()
);

client.Insert({
        codigo: "11111",
        nombre: "nombre",
        droga: "droga",
        tipo: { id: "1", nombre: "aerosoles" }
    }, (error, medicamentos) => {
        if(error) throw error

        console.log("Added medicamento");
});

client.GetAll({}, (error, response) => {
    if(error) throw error

    console.log(response.medicamentos);
});

client.InsertType({
       id: "0", 
       nombre: "mytype"
    }, (error, medicamentos) => {
        if(error) throw error

        console.log("Added type");
});