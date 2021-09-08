const endpoint = 'http://localhost:3000';

// Insertar nuevo tipo medicamento
const buttonVerificar = document.getElementById('verificar');
buttonVerificar.addEventListener("click", () => {
    const codigo = document.getElementById('codigo');
    console.log(codigo);
    axios.post(endpoint + '/verificarCodigoIngresadoPost', {
        codigo: codigo.value,
    }).then((response) => {
        console.log(response.data);
    }).catch((err) => {
        console.log(err);
    }) 
});

traerTodos();

function traerTodos(){
    axios.get(endpoint + '/getVerificacionesCodigosProductosEnBd')
        .then((response) => {
            console.log(response);
            $('#probando').val(response.data.verificacionCodigoProductoBd);
            //console.log(response.data.verificacionCodigoProductoBd);
            //cargarTabla(response.data.verificacionCodigoProductoBd);
        })
        .catch((err) => {
            console.log(err);
        });
}

function cargarTabla(med){
    med.medicamento.sort((a,b)=>{
        return b.id - a.id;  //para ordenarlos de forma ascendente por su id
    });
    const tabla = document.getElementById('filas');
    for(let i=0; i< med.length; i++){
        const row = document.createElement('tr');
        const numero = document.createElement('td');
        numero.innerHTML = med[i].medicamento.codigo;
        const codigo = document.createElement('th');
        codigo.innerHTML = med[i].esPrioritario;
        const nombre = document.createElement('td');
        nombre.innerHTML = med[i].digitoVerificadorCorrecto;

        row.appendChild(numero);
        row.appendChild(codigo);
        row.appendChild(nombre);
        tabla.insertBefore(row, tabla.firstChild);
    }
}