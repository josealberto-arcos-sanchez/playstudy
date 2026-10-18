# 🎮 PlayStudy — videojuego educativo

PlayStudy es un videojuego educativo modular para PC, tablet y móvil. El contenido se organiza por **cursos → asignaturas → temas → capítulos** y está preparado para funcionar sin conexión.

## Jugar

- **Windows:** ejecuta [`jugar.bat`](jugar.bat). El script sincroniza los datos antes de abrir el juego.
- También puedes abrir [`index.html`](index.html) directamente. Para probar la versión PWA, abre el proyecto desde un servidor web seguro (HTTPS o localhost).
- **Tablet / iPad:** usa Safari o Chrome en horizontal.
- No necesita instalar Node.js, Python ni otros paquetes para jugar.

## Organización del contenido

El catálogo visible está en [`data/catalogo.json`](data/catalogo.json). Cada capítulo tiene su propio `contenido.json` y su carpeta de recursos:

```text
data/cursos/{curso}/{asignatura}/{tema}/{capitulo}/
├── contenido.json
└── assets/
    ├── puzzle.jpg
    ├── diapositiva_01.jpg
    ├── diapositiva_02.jpg
    └── creditos_imagenes.json
```

El capítulo habitual contiene seis casillas: parejas, teoría, quiz, puzzle, teoría y quiz final. La cantidad de diapositivas y preguntas puede variar según el material.

## Formato de teoría: presentación con imágenes y voz

Para los capítulos nuevos, presenta la teoría como una **secuencia de diapositivas**. Cada diapositiva debe explicar una sola idea con una imagen y una locución. El alumnado avanza y retrocede con los botones; también puede pausar, repetir o silenciar la voz.

La voz se genera en el navegador mediante **Web Speech Synthesis** a partir del campo `locucion`; no hace falta crear archivos MP3. Ejemplo de una tarjeta dentro de `fichas → tarjetas`:

La configuración ⚙️ está disponible en el menú principal y en el mapa. Allí se puede probar y seleccionar una voz que proporcione el navegador, ajustar su velocidad (de 0,70× a 1,30×) o dejar la selección automática. La voz y la velocidad se guardan en el navegador para próximas sesiones; las voces disponibles y su funcionamiento offline dependen del dispositivo. Las voces en línea pueden necesitar conexión.

```json
{
  "nombre": "Los muros románicos",
  "fecha": "Siglos XI–XII",
  "icono": "⛪",
  "color": "#8b5cf6",
  "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_XX_ejemplo/assets/diapositiva_03.jpg",
  "texto": "Muros gruesos · poca luz",
  "locucion": "Las iglesias románicas tenían muros gruesos porque sostenían gran parte del peso del techo. Como no convenía abrir huecos grandes en esas paredes, sus ventanas eran pequeñas y entraba poca luz.",
  "puntos": []
}
```

### Criterios para las diapositivas

1. **Lenguaje para niños de 10 años:** usa frases cortas, palabras comunes y voz activa. Conserva los términos históricos necesarios, pero explícalos la primera vez (por ejemplo: «una alcazaba era una fortaleza con murallas»).
2. **Explica, no solo enumeres:** relaciona las ideas con ejemplos y causas sencillas: qué es un elemento, para qué servía o qué efecto tenía.
3. **Una idea por diapositiva:** deja solo un título o rótulo breve en pantalla (idealmente hasta seis palabras). La explicación completa va en `locucion`.
4. **Imagen y voz deben coincidir:** si la locución menciona algo que se puede ver —como un rosetón, un arco apuntado o una vidriera— debe distinguirse en la imagen de esa diapositiva. Si se nombran varios detalles, usa un montaje de imágenes o ajusta la locución a lo que aparece.
5. **Incluye una imagen en cada diapositiva:** usa una fotografía, ilustración o esquema que ayude a entender la idea. Comprueba que sea clara y adecuada para la edad.
6. **La navegación es manual:** cada diapositiva es estática; el alumnado decide cuándo pasar a la anterior o a la siguiente. La voz se reproduce al abrirla y puede pausarse o repetirse.

### Buscar, guardar y acreditar imágenes

- Busca fotografías o ilustraciones pertinentes en sitios con licencias claras, por ejemplo **Wikimedia Commons**. Comprueba la página del archivo, el autor y la licencia; que una imagen aparezca en Internet no significa que se pueda reutilizar sin condiciones.
- Descarga la imagen al `assets/` del capítulo y referencia la ruta local en `imagen`. **No enlaces la diapositiva directamente a una URL externa**: guardar una copia local permite que la teoría funcione offline.
- Mantén un `assets/creditos_imagenes.json` con el nombre del archivo, título, autor, licencia y enlace a la página de origen. Si haces un recorte o un montaje, indícalo y acredita también las imágenes que lo componen.
- Optimiza las imágenes para que carguen rápido y evita guardar copias que no se usan.

Para ver el capítulo de ejemplo, consulta [`cap_04_arte_medieval/contenido.json`](data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/contenido.json), sus recursos y la [documentación de sus diapositivas](docs/propuesta_diapositivas_cap_04_arte_medieval.md).

## Añadir un capítulo

1. **Elige un ID único** para el capítulo, siguiendo el orden del tema (por ejemplo, `cap_05_nombre_corto`).
2. **Crea la carpeta y los recursos** bajo `data/cursos/{curso}/{asignatura}/{tema}/{capitulo}/`. Añade `contenido.json`, `assets/puzzle.jpg`, las imágenes locales de las diapositivas y `assets/creditos_imagenes.json`.
3. **Crea las casillas** en `contenido.json`. Sigue el circuito habitual de seis casillas y usa el formato de presentación ilustrada y narrada descrito arriba para la teoría.
4. **Registra el capítulo** en el array `capitulos` del tema correspondiente en `data/catalogo.json`. Ejemplo:

   ```json
   {
     "id": "cap_05_ejemplo",
     "numero": 5,
     "titulo": "Capítulo 5: Título",
     "subtitulo": "Descripción breve",
     "icono": "📖",
     "archivo": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_05_ejemplo/contenido.json",
     "assets_dir": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_05_ejemplo/assets/",
     "total_estrellas_posibles": 18
   }
   ```

5. **Pon la respuesta correcta en `opciones[0]`** en cada pregunta y define `"correcta": 0`; el juego mezcla las opciones al mostrarlas.
6. **Sincroniza los datos** desde la raíz del proyecto:

   ```powershell
   powershell -ExecutionPolicy Bypass -File "scripts/actualizar_datos.ps1"
   ```

   El script genera [`data/catalogo_data.js`](data/catalogo_data.js), que permite cargar los capítulos desde `file://`. No edites ese archivo a mano.
7. **Comprueba el capítulo:** que el JSON sea válido, estén las seis casillas, cada ruta de imagen exista, las locuciones correspondan con las imágenes y los créditos incluyan todos los recursos.

## Archivos principales

- `data/catalogo.json`: cursos, asignaturas, temas y capítulos disponibles.
- `data/cursos/.../contenido.json`: parejas, presentaciones, quizzes y puzzle de cada capítulo.
- `data/catalogo_data.js`: catálogo sincronizado para uso offline; se genera con el script.
- `src/views/theoryView.js`: lógica modular de la presentación teórica.
- `src/speech.js` y `src/views/settingsView.js`: selección, prueba y preferencia persistente de voces.
- `src/game_bundle.js`: JavaScript que carga el juego; si modificas la lógica de teoría, mantén este bundle y la vista modular sincronizados.
- `css/theory.css`: estilos de las diapositivas.
- `.agents/skills/gestionar-contenido-educativo/SKILL.md`: pautas ampliadas para incorporar contenido educativo.

Si modificas el código o los estilos que forman parte de la shell de la PWA (`src/game_bundle.js` o CSS), actualiza la versión de caché en `sw.js`. Añadir datos e imágenes de un capítulo no requiere modificarla.
