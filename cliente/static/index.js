const endpoint = 'http://localhost:3000';

axios.get(endpoint + '/getTypes')
    .then((response) => {
        cargarTipos('filter-tipos', response.data.tipos);
        cargarTipos('form-tipos', response.data.tipos);
    })
    .catch((err) => {
        console.log(err);
    });


traerTodos();
// Actualiza la tabla cuando cambio el tipo seleccionado
const selectTipo = document.getElementById('filter-tipos');
selectTipo.addEventListener("change", () => {
    const tabla = document.getElementById('filas');
    tabla.textContent = "";
    if(selectTipo.selectedIndex){
        const id =  selectTipo.value;
        const nombre = selectTipo.options[selectTipo.selectedIndex].text;
        const tipo = { id: id, nombre: nombre };
        traerPorTipo(tipo);
    } else {
        traerTodos();
    }
});

// Insertar nuevo medicamento
const agregarMed = document.getElementById('agregar');
agregarMed.addEventListener("click", () => {
    const codigo = document.getElementById('codigo');
    const nombre = document.getElementById('nombre');
    const droga = document.getElementById('droga'); 
    const opcion = document.getElementById('form-tipos');
    const id = opcion.value;
    const opcionNombre = opcion.options[opcion.selectedIndex].text;
    const tipo = { id: id, nombre: opcionNombre }

    axios.post(endpoint + '/insert', {
        codigo: codigo.value,
        nombre: nombre.value,
        droga: droga.value,
        tipo: tipo,
    }).then((response) => {
        var event = new Event('change');
        selectTipo.dispatchEvent(event);
    }).catch((err) => {
        console.log(err);
    }) 
})

function traerTodos(){
    axios.get(endpoint + '/getAll')
        .then((response) => {
            cargarTabla(response.data.medicamentos);
        })
        .catch((err) => {
            console.log(err);
        });
}

function traerPorTipo(tipo){
    axios.get(endpoint + '/getByType', {
        params: {
            id: tipo.id,
            nombre: tipo.nombre
        }
    }).then((response) => {
        cargarTabla(response.data.medicamentos);
    }).catch((err) => {
        console.log(err);
    });
}

function cargarTipos(id, tipos){
    const parent = document.getElementById(id);
    for(i in tipos){
        const opcion = document.createElement('option');
        opcion.value = tipos[i].id;
        opcion.innerHTML = tipos[i].nombre;
        parent.appendChild(opcion);
    }
}

function cargarTabla(med){
    const tabla = document.getElementById('filas');
    for(i in med){
        const row = document.createElement('tr');
        const numero = document.createElement('td');
        numero.innerHTML = med.length - i;
        const codigo = document.createElement('th');
        codigo.innerHTML = med[i].codigo;
        const nombre = document.createElement('td');
        nombre.innerHTML = med[i].nombre;
        const droga = document.createElement('td');
        droga.innerHTML = med[i].droga;
        const tipo = document.createElement('td');
        tipo.innerHTML = med[i].tipo.nombre;

        row.appendChild(numero);
        row.appendChild(codigo);
        row.appendChild(nombre);
        row.appendChild(droga);
        row.appendChild(tipo);
        tabla.insertBefore(row, tabla.firstChild);
    }
}