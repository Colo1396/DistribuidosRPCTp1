const endpoint = 'http://localhost:3000';

traerTodos();

// Insertar nuevo tipo medicamento
const agregarTipo = document.getElementById('agregar_tipo');
agregarTipo.addEventListener("click", () => {
    const nombreTipo = document.getElementById('nombre_tipo');
    axios.post(endpoint + '/insertType', {
        nombre: nombreTipo.value,
    }).then((response) => {
        const tabla = document.getElementById("filas_tipo")
        tabla.textContent = ""; //limpio la tabla
        traerTodos() //actualizo la tabla
    }).catch((err) => {
        console.log(err);
    }) 
})


function traerTodos(){
    axios.get(endpoint + '/getTypes')
        .then((response) => {
            cargarTabla(response.data.tipos);
        })
        .catch((err) => {
            console.log(err);
        });
}

function cargarTabla(type){
    type.sort((a,b)=>{
        return b.id - a.id;  //para ordenarlos de forma ascendente por su id
    });

    const tabla = document.getElementById('filas_tipo');
    for(let i= 0; i < type.length ; i++){
        const row = document.createElement('tr');
        const numero = document.createElement('td');
        numero.innerHTML = type[i].id;
        const nombre = document.createElement('td');
        nombre.innerHTML = type[i].nombre;
    
        const row_button = document.createElement("td");
        const button = document.createElement("a");
        button.setAttribute("class" , "btn btn-danger");
        button.innerText = "Eliminar";
        button.setAttribute("href", "/remove/"+type[i].id);

        row_button.appendChild(button);
        row.appendChild(numero);
        row.appendChild(nombre);
        row.appendChild(row_button);
        tabla.insertBefore(row, tabla.firstChild);
    }
}