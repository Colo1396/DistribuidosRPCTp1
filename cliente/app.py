import os,sys
CURRENT_DIR =os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.dirname(CURRENT_DIR))
from flask import Flask,render_template
from flask import Flask,request,jsonify,make_response,redirect, url_for, flash, json
from flask_cors import CORS, cross_origin
from google.protobuf.json_format import MessageToDict, MessageToJson
from cliente.grpcCliente import MedicamentoCliente

#pip install flask
#pip install  
#pip install grpc
#pipenv install grpcio-tools grpcio googleapis-common-protos

#flask es para servicios web de python
app= Flask(__name__)
CORS(app)

app.secret_key = ''

#deflaro la ruta
@app.route("/",methods={"GET"})
@cross_origin()
def home():
    return redirect('/medicamentoList')

cliente =MedicamentoCliente() #del archivo grpcCliente creo el objeto MedicamentoCliente()

#-------------------------------------------
@app.route("/medicamentoList",methods={"GET"}) #declaro el endpoint
@cross_origin()
def medicamentoList():#vista principal donde cargan los medicamentos
    return render_template("index.html")


#Aca creo el metodo get para poder llamar el servicio proto GetAll
@app.route("/getAll",methods={"GET"}) #declaro el endpoint
@cross_origin()
def getAll():#declaro una funcion getALl
    result =cliente.getAll() #del objeto cliente llamo al metodo getAll
    return MessageToJson(result) #muestro el resultado de lo que me devolvio get all

@app.route("/insertType",methods={"POST"})
@cross_origin()
def insertType():
    result = cliente.insertType(request.json)
    #return make_response("ok")
    return MessageToJson(result)

@app.route("/insert", methods={"POST"})
@cross_origin()
def insert():
    result = cliente.insert(request.json)
    return MessageToJson(result)

@app.route("/getByType", methods={"GET"})
@cross_origin()
def getByType():
    tipo = {}
    tipo["id"] = int(request.args.get('id'))
    tipo["nombre"] = request.args.get('nombre')
    result = cliente.getByType(tipo)
    return MessageToJson(result)

@app.route("/getTypes", methods={"GET"})
@cross_origin()
def getTypes():
    result = cliente.getTypes()
    return MessageToJson(result)


@app.route("/tipoList", methods={"GET"}) #vista donde se realizara el insert y remove para los tipos
@cross_origin()
def tipoList():
    return render_template('tipoList.html')

#eliminar un tipo (baja logica)
@app.route("/remove/<int:id>") #obtengo el id del tipo por la ruta
@cross_origin()
def remove(id):
    prototipo={ #creo un diccionario con el id obtenido para realizar la busqueda de dicho objeto en la BD
        "id" : id
    }
    tipoBuscado = MessageToDict(cliente.getType(prototipo)) #me devuelve el objeto y lo convierto en un diccionario
    result = cliente.remove(tipoBuscado) #le doy la baja logica

    return redirect('/tipoList') #refresco la vista 


#traer medicamentos por letra inicial
@app.route("/getByInicial" , methods={"GET"})
@cross_origin()
def getByInicial():
    inicial = {
        "letraInicial" : request.args.get("letraInicial")
    }
    result = cliente.GetByInicial(inicial)
    return MessageToJson(result)

#Verificar código producto ingresado
@app.route("/verificarCodigoIngresado", methods={"GET"})
@cross_origin()
def getVerificarCodigo():
    return render_template('verificar.html')

@app.route("/verificarCodigoIngresadoPost", methods={"POST"})
@cross_origin()
def verificarCodigoIngresadoPost():
    result = cliente.GetVerificacionCodigoProducto(request.json)
    print(result)
    return MessageToJson(result) 

#Verificar lista de códigos de medicamentos
@app.route("/getVerificacionesCodigosProductosEnBd", methods={"GET"})
@cross_origin()
def getVerificacionesCodigosProductosEnBd():
    result = cliente.GetVerificacionesCodigosProductosEnBd()
    return render_template('verificarListaCodigos.html', verificacionCodigoProductoBd = result)   

# descomentar la linea 20 y 21 para correr la app.py de forma local Flask para probar los endpoint
if __name__== '__main__':
   app.run(port =3000, debug =True)