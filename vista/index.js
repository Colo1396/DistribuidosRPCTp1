const endpoint = 'http://localhost:3000';

axios.get(endpoint + '/getAll')
    .then( (response) => {
        cargarTabla(response.data.medicamentos);
    })
    .catch( (err) => {
        console.log(err);
    });


function cargarTabla(med){
    const tabla = document.getElementById('filas');
    for(i in med){
        console.log(med);
        const row = document.createElement('tr');
        const codigo = document.createElement('th');
        codigo.innerHTML = med[i].codigo;
        const nombre = document.createElement('td');
        nombre.innerHTML = med[i].nombre;
        const droga = document.createElement('td');
        droga.innerHTML = med[i].droga;
        const tipo = document.createElement('td');
        tipo.innerHTML = 'nada';

        row.appendChild(codigo);
        row.appendChild(nombre);
        row.appendChild(droga);
        row.appendChild(tipo);
        tabla.appendChild(row);
    }
}