---
name: gestionar-contenido-educativo
description: >-
  Guía paso a paso para añadir o modificar cursos, asignaturas, temas y capítulos
  en la plataforma de videojuegos educativos (PlayStudy), manteniendo la compatibilidad
  offline y la sincronización de datos.
---

# 📚 Skill: Gestión y Adición de Contenido Educativo en PlayStudy

Esta skill describe el procedimiento estándar para añadir nuevo material didáctico al juego: desde crear un nuevo curso completo hasta incorporar capítulos específicos con teoría, cuestionarios (quizzes), juegos de memoria, líneas del tiempo y puzzles personalizados.

---

## 🏛️ 1. Jerarquía de Datos

El sistema se estructura en 4 niveles descendentes:

```text
1. Cursos       (ej: 5_primaria -> "5º de Primaria")
   └── 2. Asignaturas  (ej: ciencias_sociales -> "Ciencias Sociales")
        └── 3. Temas        (ej: tema_06_castillos -> "Tema 6: Caminando entre castillos")
             └── 4. Capítulos    (ej: cap_02_visigodos -> "Capítulo 2: El Reino Visigodo")
```

Toda la estructura visible del menú se registra centralmente en:
👉 `data/catalogo.json`

Los detalles del juego para cada capítulo (preguntas, cartas de memoria, fichas de teoría, línea del tiempo y puzzle) se guardan en su propio archivo:
👉 `data/cursos/{curso_id}/{asig_id}/{tema_id}/{cap_id}/contenido.json`

---

## 🚀 2. Flujo de Trabajo: Cómo Añadir un Nuevo Elemento

### Opción A: Añadir un Nuevo Capítulo (caso más habitual)

1. **Crear la carpeta del capítulo**:
   Crear el directorio:
   ```text
   data/cursos/{curso_id}/{asig_id}/{tema_id}/{cap_id}/
   └── assets/
   ```
   *Ejemplo*: `data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/`

2. **Añadir los recursos de los juegos**:
   - Si el tema usa el puzzle, guarda `assets/puzzle.jpg` (proporción óptima ~ 3:2 o 4:3).
   - Si usa la línea del tiempo, no hacen falta imágenes: los eventos se definen como texto e iconos.
   - Añade también las imágenes de las diapositivas de teoría y su `assets/creditos_imagenes.json`.

3. **Crear el archivo `contenido.json`**:
   Crea `data/cursos/.../{cap_id}/contenido.json` con el catálogo `juegos` (material de cada minijuego) y las 6 paradas del circuito (ver sección 3).

4. **Registrar el capítulo en `data/catalogo.json`**:
   Localizar el tema correspondiente e incorporar el objeto del capítulo en la lista `"capitulos"`:
   ```json
   {
     "id": "cap_03_al_andalus",
     "numero": 3,
     "titulo": "Capítulo 3: Al-Ándalus",
     "subtitulo": "La Hispania musulmana y su legado cultural",
     "icono": "🕌",
     "archivo": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/contenido.json",
     "assets_dir": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/",
     "total_estrellas_posibles": 18
   }
   ```

5. **Validar y sincronizar datos**:
   Ejecutar el pipeline, que valida **antes** de escribir y aborta si hay errores:
   ```powershell
   npm run datos
   ```
   *(Nota: `jugar.bat` lo ejecuta automáticamente al arrancar. `npm run datos:validar` solo revisa y `npm run datos:check` comprueba que el artefacto subido está sincronizado).*

---

### Opción B: Añadir un Nuevo Tema

1. Crear la carpeta del tema:
   `data/cursos/{curso_id}/{asig_id}/tema_{numero}_{nombre_corto}/`
2. En `data/catalogo.json`, añadir el objeto dentro de `temas` de la asignatura:
   ```json
   {
     "id": "tema_07_reconquista",
     "numero": 7,
     "titulo": "Tema 7: Reinos Cristianos y Reconquista",
     "subtitulo": "La expansión cristiana y la sociedad medieval",
     "icono": "🛡️",
     "color": "#3b82f6",
     "juegos": ["parejas", "linea_tiempo"],
     "capitulos": []
   }
   ```
3. Añadir sus capítulos dentro del array `"capitulos"` siguiendo la **Opción A**.

---

### Opción C: Añadir una Nueva Asignatura

1. Crear carpeta: `data/cursos/{curso_id}/{asig_id}/` (ej. `ciencias_naturales`, `matematicas`, `lengua`).
2. En `data/catalogo.json`, agregar el bloque bajo `"asignaturas"` del curso:
   ```json
   {
     "id": "ciencias_naturales",
     "titulo": "Ciencias Naturales",
     "subtitulo": "Los seres vivos, el cuerpo humano y la materia",
     "icono": "🔬",
     "color": "#10b981",
     "temas": []
   }
   ```

---

### Opción D: Añadir un Nuevo Curso

1. Crear carpeta: `data/cursos/{curso_id}/` (ej. `6_primaria`).
2. En `data/catalogo.json`, agregar el bloque en el array raíz `"cursos"`:
   ```json
   {
     "id": "6_primaria",
     "titulo": "6º de Primaria",
     "subtitulo": "Educación Primaria",
     "icono": "🎒",
     "color": "#f97316",
     "asignaturas": []
   }
   ```

---

## 🧩 3. Plantilla Estándar de `contenido.json` (6 Casillas del Circuito)

Cada capítulo consta de un circuito interactivo continuo de 6 paradas (3 estrellas por parada = 18 estrellas).

Cada tema elige **exactamente dos** minijuegos con la propiedad `"juegos": ["parejas", "linea_tiempo"]` del catálogo. El capítulo guarda en su objeto `juegos` el material de todos sus minijuegos, indexado por subtipo; las dos casillas `"tipo": "minijuego"` son solo paradas donde el cargador monta los juegos elegidos. Después, los juegos se barajan entre las paradas y la teoría y los quizzes mantienen su posición.

Así se puede cambiar la pareja de juegos de un tema sin reescribir el capítulo, y el material de un juego que no se muestra (por ejemplo, el puzzle) queda guardado para recuperarlo después.

```json
{
  "id": "cap_XX_nombre",
  "curso_id": "5_primaria",
  "asignatura_id": "ciencias_sociales",
  "tema_id": "tema_XX_nombre",
  "titulo": "Capítulo X: Título del Capítulo",
  "subtitulo": "Descripción breve del capítulo",
  "icono": "👑",
  "color_primario": "#8b5cf6",
  "color_secundario": "#7c3aed",
  "es_circular": true,
  "juegos": {
    "parejas": {
      "subtipo": "parejas",
      "titulo": "Parejas Memorables",
      "descripcion": "Encuentra las 7 parejas entre las 14 cartas.",
      "icono": "🃏",
      "parejas": [
        { "id": "p1", "etiqueta": "Concepto 1", "icono": "👑", "detalle": "Explicación breve", "color": "#8b5cf6" },
        { "id": "p2", "etiqueta": "Concepto 2", "icono": "🏰", "detalle": "Explicación breve", "color": "#3b82f6" },
        { "id": "p3", "etiqueta": "Concepto 3", "icono": "🌾", "detalle": "Explicación breve", "color": "#10b981" },
        { "id": "p4", "etiqueta": "Concepto 4", "icono": "⚔️", "detalle": "Explicación breve", "color": "#ef4444" },
        { "id": "p5", "etiqueta": "Concepto 5", "icono": "📜", "detalle": "Explicación breve", "color": "#f59e0b" },
        { "id": "p6", "etiqueta": "Concepto 6", "icono": "🏛️", "detalle": "Explicación breve", "color": "#06b6d4" },
        { "id": "p7", "etiqueta": "Concepto 7", "icono": "🗺️", "detalle": "Explicación breve", "color": "#ec4899" }
      ]
    },
    "linea_tiempo": {
      "subtipo": "linea_tiempo",
      "titulo": "Línea del Tiempo",
      "descripcion": "Ordena los acontecimientos del más antiguo al más reciente.",
      "icono": "🕰️",
      "eventos": [
        { "id": "e1", "etiqueta": "Acontecimiento 1", "fecha": "500 a.C.", "icono": "🏛️", "color": "#3b82f6" },
        { "id": "e2", "etiqueta": "Acontecimiento 2", "fecha": "711", "icono": "⚔️", "color": "#ef4444" },
        { "id": "e3", "etiqueta": "Acontecimiento 3", "fecha": "1492", "icono": "⛵", "color": "#10b981" }
      ]
    },
    "puzzle": {
      "subtipo": "puzzle",
      "titulo": "Puzzle: ¡Desafío Visual!",
      "descripcion": "Ordena las 6 piezas del dibujo.",
      "icono": "🧩",
      "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_XX_nombre/assets/puzzle.jpg"
    }
  },
  "casillas": [
    {
      "id": 1,
      "tipo": "minijuego",
      "titulo": "1. Juego",
      "descripcion": "Juego del tema",
      "icono": "🎮"
    },
    {
      "id": 2,
      "tipo": "teoria",
      "titulo": "2. Presentación: Primera Parte Teórica",
      "descripcion": "Cinco diapositivas con imágenes y explicación por voz.",
      "icono": "📖",
      "fichas": [
        {
          "titulo": "Primera parte",
          "subtitulo": "Subtítulo explicativo",
          "icono": "📖",
          "tarjetas": [
            {
              "nombre": "Idea de la diapositiva",
              "fecha": "Época o fecha",
              "icono": "📌",
              "color": "#3b82f6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_XX_nombre/assets/a01_idea.jpg",
              "texto": "Rótulo breve (≤ 6 palabras)",
              "ajuste_imagen": "completo",
              "locucion": "Explicación completa para la voz. Debe coincidir con lo que se ve en la imagen.",
              "puntos": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "tipo": "quiz",
      "titulo": "3. Quiz: Comprobación 1",
      "descripcion": "Demuestra lo aprendido en la primera parte.",
      "icono": "❓",
      "preguntas": [
        {
          "enunciado": "¿Pregunta sobre la teoría vista?",
          "opciones": [
            "Texto exacto de la opción correcta",
            "Opción incorrecta 1",
            "Opción incorrecta 2",
            "Opción incorrecta 3"
          ],
          "correcta": "Texto exacto de la opción correcta",
          "explicacion": "¡Correcto! Explicación formativa y motivadora."
        }
      ]
    },
    {
      "id": 4,
      "tipo": "minijuego",
      "titulo": "4. Juego",
      "descripcion": "Juego del tema",
      "icono": "🎮"
    },
    {
      "id": 5,
      "tipo": "teoria",
      "titulo": "5. Presentación: Segunda Parte Teórica",
      "descripcion": "Cinco diapositivas con imágenes y explicación por voz.",
      "icono": "📜",
      "fichas": [
        {
          "titulo": "Segunda parte",
          "subtitulo": "Subtítulo explicativo",
          "icono": "📜",
          "tarjetas": [
            {
              "nombre": "Idea de la diapositiva",
              "fecha": "Periodo",
              "icono": "🏰",
              "color": "#8b5cf6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_XX_nombre/assets/b01_idea.jpg",
              "texto": "Rótulo breve (≤ 6 palabras)",
              "locucion": "Explicación completa para la voz. Debe coincidir con lo que se ve en la imagen.",
              "puntos": []
            }
          ]
        }
      ]
    },
    {
      "id": 6,
      "tipo": "quiz",
      "titulo": "6. Quiz: Desafío Final",
      "descripcion": "Preguntas finales sobre todo el capítulo.",
      "icono": "🏆",
      "preguntas": [
        {
          "enunciado": "¿Segunda pregunta final?",
          "opciones": [
            "Texto exacto de la opción correcta",
            "Opción incorrecta A",
            "Opción incorrecta B",
            "Opción incorrecta C"
          ],
          "correcta": "Texto exacto de la opción correcta",
          "explicacion": "¡Sensacional! Retroalimentación positiva."
        }
      ]
    }
  ]
}
```

---

## ⚡ 4. Puntos Críticos y Buenas Prácticas

> **La teoría es siempre una presentación narrada.** Cada objeto de `tarjetas` es **una diapositiva** y necesita obligatoriamente `imagen` (ruta local en `assets/`) y `locucion`. El rótulo visible va en `texto` (idealmente 6 palabras o menos); `nombre` y `fecha` encabezan la diapositiva. `puntos` es opcional y sirve de apoyo escrito o accesible: no sustituye a la imagen ni a la locución. Para cerrar con un resumen, añade una última tarjeta con su propia imagen (por ejemplo, una infografía `*_resumen.jpg`) y su locución. El reproductor avisa por consola (`[Teoría]`) si alguna tarjeta no tiene imagen o locución.

1. **La respuesta correcta se marca con su texto**:
   En `contenido.json`, escribe en `correcta` el texto exacto de una de las opciones, por ejemplo `"correcta": "El dominio del fuego"`. Así el quiz sigue siendo correcto aunque se reordenen las opciones y el JSON se entiende sin conocer ninguna convención. El motor baraja las respuestas al azar al mostrarlas al niño. Las opciones de una misma pregunta deben ser distintas. El formato heredado `"correcta": 0` (con la respuesta en `opciones[0]`) se sigue aceptando, pero no se usa en material nuevo.
2. **Imágenes para el puzzle**:
   - Guardar como JPG en formato apaisado (`assets/puzzle.jpg`).
   - Peso recomendado: entre 100 KB y 600 KB para que cargue al instante.
3. **Ajustar la narración a la edad del alumnado**:
   - Para material de 5.º de Primaria, usar frases cortas, palabras cotidianas y voz activa.
   - Mantener los términos históricos necesarios, pero explicarlos con palabras sencillas la primera vez (por ejemplo: «una alcazaba era una fortaleza con murallas»).
   - Explicar las relaciones de causa y efecto con ejemplos concretos, sin dar por sabido el vocabulario técnico.
4. **Comprobar que las imágenes muestran lo que cuenta la voz**:
   - Si la locución nombra un detalle visible (como un rosetón, un arco apuntado o una vidriera), comprobar que se distingue claramente en la imagen de esa diapositiva.
   - Si una imagen no muestra todos los elementos mencionados, añadir una segunda imagen o un pequeño montaje, o ajustar la locución para que describa lo que sí se ve.
   - Mantener el texto en pantalla breve; la explicación más completa va en la locución.
5. **Sincronizar y validar antes de dar el material por terminado**:
   - Ejecutar `npm run datos` (o arrancar desde `jugar.bat`): primero valida todo el contenido y, solo si no hay errores, regenera `data/catalogo_data.js`.
   - Si se añade un capítulo y se recarga el navegador sin ejecutar la sincronización, el archivo `data/catalogo_data.js` no contendrá los nuevos datos cuando se acceda vía `file://`.
   - El validador comprueba que cada diapositiva tiene imagen y locución, que las rutas existen, que los créditos están completos y que ninguna ficha usa bloques de texto sin imagen. Se puede ejecutar solo con `npm run datos:validar`; `npm run datos:check` añade la comprobación de que el artefacto subido está sincronizado.
6. **Paleta de colores para las tarjetas**:
   - Rojo: `#ef4444`
   - Verde: `#10b981`
   - Azul: `#3b82f6`
   - Naranja: `#f97316`
   - Violeta: `#8b5cf6`
   - Ámbar/Amarillo: `#f59e0b`
   - Cyan: `#06b6d4`
   - Rosa: `#ec4899`
7. **Dos juegos por tema**:
   - La lista `"juegos"` del tema debe contener exactamente dos subtipos.
   - Cada capítulo del tema debe definir el material de esos dos juegos en su objeto `juegos`. Si falta alguno, el cargador lo avisa por consola y usa los juegos disponibles.
   - No borres el material de un juego que dejas de mostrar: puede volver a activarse cambiando la lista del tema.
8. **Línea del tiempo**:
   - El orden del array `eventos` es el orden cronológico correcto; escríbelo del más antiguo al más reciente.
   - Cada evento necesita `id`, `etiqueta`, `fecha` e `icono`; `color` es opcional.
   - Usa entre 5 y 7 acontecimientos para que las tarjetas se lean bien en tablet y móvil.
9. **Imágenes con texto o esquemas**:
   - Si la imagen de una diapositiva es una infografía, línea del tiempo, mapa o esquema (no una fotografía), añade `"ajuste_imagen": "completo"` a la tarjeta.
   - Con ese ajuste la imagen se muestra entera y a mayor tamaño, con el rótulo debajo, para que el texto no quede recortado por los lados.
   - En fotografías no lo pongas: se recortan ligeramente para llenar el marco y se ven mejor.
