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
        self.host='localhost'
        self.server_port=5000
        self.channel =grpc.insecure_channel('{}:{}'.format(self.host,self.server_port))
        #self.channel =grpc.insecure_channel('localhost:50051')
        self.stub =service_grpc.MedicServiceStub(self.channel) #aca obtengo todos los servicios que declare en el proto

    def getAll(self): #genero un metodo que devuelve los resultado del servicio declarado en proto
        param = service_pb2.Empty() #inicializao param con el valor del mensaje empty
        return self.stub.GetAll(param) #llamo al servicio GetAll y le paso Empty (param)como esta declarado en el proto

#Corro la app....
if __name__ == '__main__': #inicializo la app del cliente  (creo) para ver en consola el resultado 
    print("holis")
    cliente = MedicamentoCliente()  #creo un objeto tipo MedicamentoCliente
    result = cliente.getAll()  #llamo al metodo para traer el listado .vacio en este caso
    print(MessageToJson(result)) #muestroi el resutlado




