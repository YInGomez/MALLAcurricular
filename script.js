
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

//======================================================================================

const materias = {};

function cargarMapeoDeMaterias(data) {
  // Construir el mapeo de códigos a nombres
  Object.values(data).forEach(materia => {
      materias[materia.id] = materia.nombreCompleto;
      // Puedes agregar más información si es necesario
  });

  console.log('mapeo de materias teminado');
}

function obtenerNombreMateria(id) {
  return materias[id] || 'Nombre Desconocido';}

//======================================================================================

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

function mostrarDatos(data) {
  const contenedor = document.getElementById('contenedor');

  if (data) {
      data.forEach(materia => {
          const elementoMateria = crearElementoMateria(materia);
          contenedor.appendChild(elementoMateria);
      });
  }

  console.log('datos cargados');
}

//======================================================================================
/*
function evaluarCondicion(condicion) {
  // Expresión regular para encontrar las partes del código que deben ser evaluadas
  var regex = /document\.getElementById\("([^"]+)"\)\.classList\.contains\("([^"]+)"\)/g;
  
  // Obtener todas las coincidencias
  var matches = condicion.match(regex);
  
  // Evaluar cada coincidencia
  if (matches) {
    return matches.every(function(match) {
      // Obtener el elemento y la clase
      var partes = match.split('"');
      var elementoId = partes[1];
      var clase = partes[3];
      
      // Evaluar la condición
      var elemento = document.getElementById(elementoId);
      return elemento && elemento.classList.contains(clase);
    });
  }
  
  // Si no hay coincidencias, devolver falso
  return false;
}

const asignaturas = [
  {name: 'cdivv', cond: () => {document.getElementById("cdiv").classList.contains("exonerada")}},
  //más objetos
];

function habilitador() {
  // Itera sobre cada contenedor
  document.querySelectorAll('.materia').forEach(contenedor => {
    // Itera sobre cada botón con la clase "pri" dentro del contenedor actual
    contenedor.querySelectorAll('.pri').forEach(boton => {
      // Agrega un event listener para el clic en cada botón con la clase "pri"
      boton.addEventListener('click', function() {
        for (let i = 0; i < asignaturas.length; i++) {
          const asignatura = asignaturas[i];
          document.getElementById(asignatura.name).querySelector(".pri").disabled = (asignatura.cond) ? false : true;
        }
      });
    });
  });
};
*/
let condiciones;

function prueba(data){
  condiciones = data.map(obj => {
    return {
      "id": obj.id,
      "aprobadas": obj.previas.aprobadas,
      "exoneradas": obj.previas.exoneradas
  };
  })
  console.log(condiciones);
}

//condiciones.forEach(habilitador(asignatura));

function habilitador(asignaturas) {
  for (let i = 0; i < asignaturas.length; i++) {
    const asignatura = asignaturas[i];
    let a = asignatura.aprobadas.every(id => document.getElementById(id)?.classList.contains('aprobada'));
    let e = asignatura.exoneradas.every(id => document.getElementById(id)?.classList.contains('exonerada'));

    document.getElementById(asignatura.id).querySelector(".pri").disabled = (a && e) ? false : true;
  }
  // asignaturas.forEach(function(){
  //   let a = asignatura.aprobadas.every(id => document.getElementById(id)?.classList.contains('aprobada'));
  //   let e = asignatura.exoneradas.every(id => document.getElementById(id)?.classList.contains('exonerada'));

  //   document.getElementById(asignatura.id).querySelector(".pri").disabled = (a && e) ? false : true;
  // })
}


//======================================================================================

function coloresBTNinfo(){
  const contenedores = document.querySelectorAll('.materia');
  console.log(contenedores);

  // Itera sobre cada contenedor
  contenedores.forEach(contenedor => {

    // Encuentra todos los botones dentro del contenedor actual
    const botonesPri = contenedor.querySelectorAll('.pri');
    let contadorClics = 0; // Inicializa el contador de clics para este conjunto de botones

    // Itera sobre cada botón con la clase "pri" dentro del contenedor actual
    botonesPri.forEach(boton => {
      // Agrega un event listener para el clic en cada botón con la clase "pri"
      boton.addEventListener('click', function() {
        contadorClics++; // Incrementa el contador de clics cada vez que se hace clic en un botón

        if (contadorClics > 2) {
          contadorClics = 0;
          contenedor.classList.remove('aprobada', 'exonerada'); // Elimina las clases del contenedor "materia"
        }

        if (contadorClics === 1) {
          contenedor.classList.add('aprobada'); // Agrega la clase al contenedor "materia"
        } else if (contadorClics === 2) {
          // contenedor.classList.remove('aprobada');
          contenedor.classList.add('exonerada'); // Agrega la clase al contenedor "materia"
        }

        habilitador(condiciones);
        
      });
    });
  });

  //======================================================================================


  const botonesInfo = document.querySelectorAll('.sec');

  // Itera sobre cada botón sec
  botonesInfo.forEach(boton => {
    // Agrega un event listener para el clic en cada botón sec
    boton.addEventListener('click', function() {
      // Encuentra el div de información asociado al botón actual
      const info = boton.nextElementSibling;

      // Muestra el div de superposición
      const overlay = document.getElementById('infoOverlay');
      overlay.style.display = 'block';

      // Muestra el div de información correspondiente
      info.style.display = 'block';

      // Encuentra el botón de cerrar-ventana dentro del div de información
      const botonCerrar = info.querySelector('.cerrar-ventana');

      // Agrega un event listener para el clic en el botón cerrar-ventana
      botonCerrar.addEventListener('click', function(event) {
        // Oculta el div de información al hacer clic en el botón cerrar-ventana
        info.style.display = 'none';

        // Oculta el div de superposición
        overlay.style.display = 'none';

        // Detiene la propagación del evento para evitar que se cierre la ventana al hacer clic en el overlay
        event.stopPropagation();
      });

      // Agrega un event listener al div de superposición para cerrar la ventana al hacer clic en él
      overlay.addEventListener('click', function() {
        // Oculta el div de información al hacer clic en el overlay
        info.style.display = 'none';

        // Oculta el div de superposición
        overlay.style.display = 'none';
      });
    });
  });

}

//======================================================================================

async function cargarDatosYMostrar() {
  try {
      const data = await obtenerDatos();
      cargarMapeoDeMaterias(data);
      mostrarDatos(data);
      prueba(data);
      coloresBTNinfo();
      habilitador(condiciones);
  } catch (error) {
      console.error('Error al cargar y mostrar datos:', error);
  }
}

cargarDatosYMostrar();

/*
{
  "id": "",
  "nombre": "",
  "nombreCompleto": "",
  "creditos": "",
  "previas": {
    "aprobadas": [],
    "exoneradas": []
  }
}
*/

//======================================================================================

function toggleMenu() {
  // Seleccionar elementos relevantes del DOM
  var menu = document.querySelector('.menu'); // Elemento del menú
  var menuIndicators = document.querySelectorAll('.menuButton'); // Indicadores de menú
  var dropdown = document.getElementById('dropdownContent'); // Contenido desplegable del menú
  var overlay = document.getElementById('menuOverlay'); // Overlay para bloquear clics en la web

  // Alternar la clase 'open' para mostrar/ocultar el menú
  menu.classList.toggle('open');

  // Cambiar el texto de los indicadores de menú ('menuButton')
  menuIndicators.forEach(function(indicator) {
    indicator.textContent = menu.classList.contains('open') ? 'close' : 'menu';
  });

  // Alternar la visibilidad del contenido desplegable del menú
  dropdown.style.display = dropdown.style.display === 'none' || dropdown.style.display === '' ? 'block' : 'none';

  // Alternar la visibilidad del overlay para bloquear clics en la web
  overlay.style.display = overlay.style.display === 'none' || overlay.style.display === '' ? 'block' : 'none';
}

