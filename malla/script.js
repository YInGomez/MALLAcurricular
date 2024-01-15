
//============================================================================================
// Espera a que se cargue el DOM antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {
  // Selecciona todos los contenedores de clase "materia"
  const contenedores = document.querySelectorAll('.materia');

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
          contenedor.classList.remove('aprobada');
          contenedor.classList.add('exonerada'); // Agrega la clase al contenedor "materia"
        }

        //habilitador();
      });
    });
  });
});

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

// Definir una serie de objetos con propiedades name y cond
const asignaturas = [
  { name: 'cdivv', cond: 'document.getElementById("cdiv").classList.contains("aprobada")' },
  // Puedes agregar más objetos según tus necesidades
];

function habilitador(){
  // let condicion = document.getElementById("cdiv").classList.contains("exonerada")
  for (let i = 0; i < asignaturas.length; i++) {
    const asignatura = asignaturas[i];
    document.getElementById(asignatura.name).querySelector(".pri").disabled = (evaluarCondicion(asignatura.cond)) ? false : true;
  }
}
*/
  // for (var i = 0; i < asignaturas.length; i++ ) {
  // }
/*
const = array con todas las materias
consr = array con las condicones de cada materia

const condicones = {};

function CrearCondiciones(){
  const data = await obtenerDatos();

    // Construir el mapeo de códigos a nombres
    Object.values(data).forEach(materia => {

        condiciones[name] = materia.id;

        // Puedes agregar más información si es necesario
    });

}
*/

// Evaluar las condiciones en un contexto específico (por ejemplo, dentro de un if)
// objetos.forEach(function(obj) {
//   var resultado = evaluarCondicion(obj.cond);
//   console.log(obj.name + ': ' + resultado);


//   document.getElementById(obj.name).querySelector(".pri").disabled = (resultado) ? false : true;



  // // Puedes usar el resultado como condicional en un if
  // if (resultado) {
  //   console.log(obj.name + ' es verdadero');
  //   // Hacer algo si la condición es verdadera
  // } else {
  //   console.log(obj.name + ' es falso');
  //   // Hacer algo si la condición es falsa
  // }
// });

//======================================================================================

document.addEventListener('DOMContentLoaded', function() {
  // Selecciona todos los botones sec (ícono de información)
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
});

//=======================================================================================

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

