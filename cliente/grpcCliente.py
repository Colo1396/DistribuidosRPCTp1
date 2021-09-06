#para instalar el entorno virtual ejecutar -> pip3 install pipenv
#entrar a la carpeta cliente y ejecutar -> pipenv shell
#ahora instalo todas las dependencias del entorno virtual con -> pipenv install --ignore-pipfile

import os,sys
CURRENT_DIR =os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.dirname(CURRENT_DIR))

import grpc 
import medicamento_pb2 as service_pb2 
import medicamento_pb2_grpc as service_grpc 
from google.protobuf.json_format import MessageToJson


#creo el objeto MedicamenteoCliente que tiene 2 metodos
class MedicamentoCliente(object):
    def __init__(self):  #inicializo el canal y apartir del stub traigo los servicios del proto
        self.host='127.0.0.1'
        self.server_port=50051
        self.channel =grpc.insecure_channel('{}:{}'.format(self.host,self.server_port))
        #self.channel =grpc.insecure_channel('localhost:50051')
        self.stub =service_grpc.MedicServiceStub(self.channel) #aca obtengo todos los servicios que declare en el proto

    def getAll(self): #genero un metodo que devuelve los resultado del servicio declarado en proto
        param = service_pb2.Empty() #inicializao param con el valor del mensaje empty
        return self.stub.GetAll(param) #llamo al servicio GetAll y le paso Empty (param)como esta declarado en el proto
    
    def insertType(self,tipoMedicamento):
        pTipoMedicamento =service_pb2.TipoMedicamento(
            nombre =tipoMedicamento['nombre']
        )
        return self.stub.InsertType(pTipoMedicamento)

    def insert(self, nuevoMedicamento ):
        pNuevoMedicamento = service_pb2.Medicamento(
            codigo = nuevoMedicamento["codigo"],
            nombre = nuevoMedicamento["nombre"],
            droga = nuevoMedicamento["droga"],
            tipo = service_pb2.TipoMedicamento(
                id = int(nuevoMedicamento["tipo"]["id"]),
                nombre = nuevoMedicamento["tipo"]["nombre"]
            )
        )
        return self.stub.Insert(pNuevoMedicamento)
    
    def remove(self, tipoMedicamento):
        pTipoMedicamento =service_pb2.TipoMedicamento(
            id =tipoMedicamento["id"],
        )
        return self.stub.RemoveType(pTipoMedicamento)
    
    def getByType(self, tipoMedicamento):
        pTipoMedicamento =service_pb2.TipoMedicamento(
            id =tipoMedicamento["id"],
            nombre = tipoMedicamento["nombre"]
        )
        return self.stub.GetByType(pTipoMedicamento)

    def getTypes(self):
        param = service_pb2.Empty()
        return self.stub.GetTypes(param)

    def getType(self, tipoMedicamento):
        pTipoMedicamento =service_pb2.TipoMedicamento(
            id =tipoMedicamento["id"]
        )
        return self.stub.GetType(pTipoMedicamento)


#Corro la app....
if __name__ == '__main__': #inicializo la app del cliente  (creo) para ver en consola el resultado 
    cliente = MedicamentoCliente()  #creo un objeto tipo MedicamentoCliente


""" TESTEOS VARIOS

    print ("------------LISTAR-------------------------")
    cliente = MedicamentoCliente()  #creo un objeto tipo MedicamentoCliente
    result = cliente.getAll()  #llamo al metodo para traer el listado .vacio en este caso
    print(MessageToJson(result)) #muestroi el resutlado


    print ("--------------AGREGO TIPO MEDICAMENTO-----------------------")
    insertTypeParam = {
        "nombre": "quimicos"
    }
    result = cliente.insertType(insertTypeParam)  
    print(MessageToJson(result)) #muestroi el resutlado


    print ("--------------AGREGO NUEVO MEDICAMENTO-----------------------")
    insertParam = {
        "codigo": "44444",
        "nombre" : "paracetamol",
        "droga" : "analgesico",
        "tipo" : {
            "id" : 1,
            "nombre" : "aerosoles"
        }
    }
    result = cliente.insert(insertParam) 
    print(MessageToJson(result)) #muestroi el resutlado

    print ("--------------REMUEVO TIPO MEDICAMENTO-----------------------")
    removeParam = {"id": 3, "nombre": "capsulas"}

    result = cliente.remove(removeParam) 
    print(MessageToJson(result)) #muestroi el resutlado
    

    print ("--------------OBTENER MEDICAMENTOS POR TIPO MEDICAMENTO-----------------------")
    tipoMed = {"id": 2, "nombre": "colirios"}

    result = cliente.getByType(tipoMed) 
    print(MessageToJson(result)) #muestroi el resutlado

    
    print ("------------TRAIGO UN UNICO TIPO MEDICAMENTO-------------------------")
    prototipo = {
        "id" : 3
    }
    result = cliente.getType(prototipo)  #llamo al metodo para traer el listado .vacio en este caso
    print(result) #muestroi el resutlado

"""    




