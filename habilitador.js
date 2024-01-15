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
  
//   function habilitador(){
//     // let condicion = document.getElementById("cdiv").classList.contains("exonerada")
//     for (let i = 0; i < asignaturas.length; i++) {
//       const asignatura = asignaturas[i];
//       document.getElementById(asignatura.name).querySelector(".pri").disabled = (evaluarCondicion(asignatura.cond)) ? false : true;
//     }
//   }

  document.addEventListener('DOMContentLoaded', function() {
    // Itera sobre cada contenedor
    document.querySelectorAll('.materia').forEach(contenedor => {
      // Itera sobre cada botón con la clase "pri" dentro del contenedor actual
      contenedor.querySelectorAll('.pri').forEach(boton => {
        // Agrega un event listener para el clic en cada botón con la clase "pri"
        boton.addEventListener('click', function() {
            for (let i = 0; i < asignaturas.length; i++) {
                const asignatura = asignaturas[i];
                document.getElementById(asignatura.name).querySelector(".pri").disabled = (evaluarCondicion(asignatura.cond)) ? false : true;
              }
        });
      });
    });
  });