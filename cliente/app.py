import os,sys
CURRENT_DIR =os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.dirname(CURRENT_DIR))
from flask import Flask,render_template
from flask import Flask,request,jsonify,make_response
from flask_cors import CORS, cross_origin
from google.protobuf.json_format import MessageToJson
from cliente.grpcCliente import MedicamentoCliente

#pip install flask
#pip install  
#pip install grpc
#pipenv install grpcio-tools grpcio googleapis-common-protos

#flask es para servicios web de python
app= Flask(__name__)
CORS(app)

#deflaro la ruta
@app.route('/')
def hello():
    return "hello world"
    #return render_template('index.html')

#-------------------------------------------
#Aca creo el metodo get para poder llamar el servicio proto GetAll
@app.route("/getAll",methods={"GET"}) #declaro el endpoint
@cross_origin()
def getAll():#declaro una funcion getALl
    cliente =MedicamentoCliente() #del archivo grpcCliente creo el objeto MedicamentoCliente()
    result =cliente.getAll() #del objeto cliente llamo al metodo getAll
    return MessageToJson(result) #muestro el resultado de lo que me devolvio get all

@app.route("/insertType",methods={"POST"})
@cross_origin()
def insertType():
    cliente = MedicamentoCliente()
    result = cliente.insertType(request.json)
    #return make_response("ok")
    return MessageToJson(result)

# descomentar la linea 20 y 21 para correr la app.py de forma local Flask para probar los endpoint
if __name__== '__main__':
   app.run(port =3000, debug =True)