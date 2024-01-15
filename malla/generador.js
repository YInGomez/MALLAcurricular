async function obtenerDatos() {
    try {
        const respuesta = await fetch('datos.json'); // Reemplaza con la ruta correcta si está en un directorio diferente
        const datos = await respuesta.json();
        console.log('funcion obtener datos');
        return datos;

    } catch (error) {
        console.error('Error al obtener los datos:', error);
        console.log('funcion obtener datos');
    }

}

//============================================

const materias = {};

async function cargarMapeoDeMaterias() {
    const data = await obtenerDatos();

    // Construir el mapeo de códigos a nombres
    Object.values(data).forEach(materia => {
        materias[materia.id] = materia.nombreCompleto;
        // Puedes agregar más información si es necesario
    });

    console.log('mapeo de materias teminado');
}

function obtenerNombreMateria(id) {
    return materias[id] || 'Nombre Desconocido';
}

//===========================================

function crearElementoMateria(materia) {
    const div = document.createElement('div');
    div.classList.add('materia');
    div.id = materia.id;

    const buttonPri = document.createElement('button');
    buttonPri.classList.add('pri');
    buttonPri.textContent = materia.nombre;

    const buttonSec = document.createElement('button');
    buttonSec.classList.add('sec');

    const span = document.createElement('span');
    span.classList.add('material-symbols-outlined');
    span.textContent = 'info';

    buttonSec.appendChild(span);

    const divInfo = document.createElement('div');
    divInfo.classList.add('info');

    const titulo = document.createElement('h3');
    titulo.textContent = materia.nombreCompleto;

    const creditos = document.createElement('p');
    creditos.textContent = `Creditos: ${materia.creditos}`;

    const previas = document.createElement('p');
    previas.textContent = 'Previas:';

    const listaPrevias = document.createElement('ul');

    // Crear elementos para las previas aprobadas
    const listaAprobadas = document.createElement('ul');
    materia.previas.aprobadas.forEach(aprobada => {
        const itemAprobada = document.createElement('li');
        itemAprobada.textContent = obtenerNombreMateria(aprobada);
        listaAprobadas.appendChild(itemAprobada);
    });

    const aprobadas = document.createElement('li');
    aprobadas.textContent = 'Aprobadas:';
    aprobadas.appendChild(listaAprobadas);

    // Crear elementos para las previas exoneradas
    const listaExoneradas = document.createElement('ul');
    materia.previas.exoneradas.forEach(exonerada => {
        const itemExonerada = document.createElement('li');
        itemExonerada.textContent = obtenerNombreMateria(exonerada);
        listaExoneradas.appendChild(itemExonerada);
    });

    const exoneradas = document.createElement('li');
    exoneradas.textContent = 'Exoneradas:';
    exoneradas.appendChild(listaExoneradas);

    listaPrevias.appendChild(aprobadas);
    listaPrevias.appendChild(exoneradas);

    const botonCerrar = document.createElement('button');
    botonCerrar.classList.add('cerrar-ventana');
    botonCerrar.textContent = 'CERRAR';

    divInfo.appendChild(titulo);
    divInfo.appendChild(creditos);
    divInfo.appendChild(previas);
    divInfo.appendChild(listaPrevias);
    divInfo.appendChild(botonCerrar);

    div.appendChild(buttonPri);
    div.appendChild(buttonSec);
    div.appendChild(divInfo);

    return div;
}

async function mostrarDatos() {
    const contenedor = document.getElementById('contenedor');
    const data = await obtenerDatos();

    if (data) {
        data.forEach(materia => {
            const elementoMateria = crearElementoMateria(materia);
            contenedor.appendChild(elementoMateria);
        });
    }

    console.log('datos cargados');
}

cargarMapeoDeMaterias();

mostrarDatos();
