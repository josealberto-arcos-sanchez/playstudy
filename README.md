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

El capítulo habitual contiene seis casillas: dos juegos, teoría, quiz, teoría y quiz final. La cantidad de diapositivas y preguntas puede variar según el material.

## Juegos elegidos por tema

Cada tema decide qué **dos** minijuegos aparecen en todos sus capítulos. La elección se guarda en el tema de `data/catalogo.json`:

```json
{
  "id": "tema_06_castillos",
  "titulo": "Tema 6: Caminando entre castillos",
  "juegos": ["parejas", "linea_tiempo"]
}
```

- La lista debe tener **exactamente dos subtipos**. El orden no importa: después los juegos se barajan entre las dos paradas de juego.
- Cada capítulo conserva en su `contenido.json` un catálogo `juegos` con el material de todos sus minijuegos, indexado por subtipo. Así se puede cambiar la pareja de juegos del tema sin reescribir los capítulos.
- Las dos casillas `"tipo": "minijuego"` del capítulo son solo **paradas**: el cargador coloca en ellas los juegos que el tema tenga configurados. Si un capítulo no define alguno de los juegos pedidos, se avisa por consola y se usan los juegos disponibles.
- El material de un juego que ya no se muestra (por ejemplo, el puzzle) puede seguir guardado en el catálogo `juegos` para recuperarlo más adelante.

### Línea del tiempo (`linea_tiempo`)

Ordena acontecimientos del más antiguo al más reciente. Se juega tocando dos tarjetas para intercambiarlas y pulsando **Comprobar orden**. Las fechas se pueden ocultar para aumentar el reto.

```json
{
  "subtipo": "linea_tiempo",
  "titulo": "Línea del Tiempo de las Edades",
  "descripcion": "Ordena las etapas de la Historia.",
  "icono": "🕰️",
  "eventos": [
    { "id": "paleolitico", "etiqueta": "Paleolítico", "fecha": "Hace 2,5 millones de años", "icono": "🔥", "color": "#ef4444" },
    { "id": "neolitico", "etiqueta": "Neolítico", "fecha": "Hacia 8000 a.C.", "icono": "🌾", "color": "#10b981" }
  ]
}
```

El **orden del array `eventos` es el orden correcto**: escríbelos del más antiguo al más reciente. Cada evento necesita `id`, `etiqueta`, `fecha` e `icono`; `color` es opcional. Puedes añadir `"mostrar_fechas": false` para que el juego empiece con las fechas ocultas.

## Formato de teoría: presentación con imágenes y voz

Toda la teoría del juego se presenta como una **secuencia de diapositivas narradas**. Cada diapositiva explica una sola idea con una imagen y una locución, y son **obligatorias las dos**: una tarjeta sin `imagen` o sin `locucion` no cumple el formato de presentación. El alumnado avanza y retrocede con los botones; también puede pausar, repetir o silenciar la voz.

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
5. **Incluye una imagen en cada diapositiva:** usa una fotografía, ilustración o esquema que ayude a entender la idea. Comprueba que sea clara y adecuada para la edad. La ruta de `imagen` siempre es local, dentro de `assets/`.
6. **La navegación es manual:** cada diapositiva es estática; el alumnado decide cuándo pasar a la anterior o a la siguiente. La voz se reproduce al abrirla y puede pausarse o repetirse.
7. **Cierra con una diapositiva de resumen:** si quieres recordar las ideas clave, añade una última tarjeta con su infografía y su locución. `puntos` es solo un apoyo escrito opcional.
8. **Comprueba que se ve:** si el reproductor detecta una diapositiva sin imagen o sin locución, lo avisa en la consola del navegador (`F12 → Console`, líneas `[Teoría]`).

### Buscar, guardar y acreditar imágenes

- Busca fotografías o ilustraciones pertinentes en sitios con licencias claras, por ejemplo **Wikimedia Commons**. Comprueba la página del archivo, el autor y la licencia; que una imagen aparezca en Internet no significa que se pueda reutilizar sin condiciones.
- Descarga la imagen al `assets/` del capítulo y referencia la ruta local en `imagen`. **No enlaces la diapositiva directamente a una URL externa**: guardar una copia local permite que la teoría funcione offline.
- Mantén un `assets/creditos_imagenes.json` con el nombre del archivo, título, autor, licencia y enlace a la página de origen. Si haces un recorte o un montaje, indícalo y acredita también las imágenes que lo componen.
- Optimiza las imágenes para que carguen rápido y evita guardar copias que no se usan.

Para ver el capítulo de ejemplo, consulta [`cap_04_arte_medieval/contenido.json`](data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/contenido.json), sus recursos y la [documentación de sus diapositivas](docs/propuesta_diapositivas_cap_04_arte_medieval.md).

## Tutor con IA para preguntar dudas (opcional)

Desde la teoría, el botón **🙋 Preguntar** abre un tutor que responde dudas sobre las diapositivas del capítulo. Es opcional y necesita conexión a Internet. El tutor usa la teoría como punto de partida, pero si la pregunta está relacionada puede ampliar con conocimientos generales adecuados a la edad del niño, para fomentar la curiosidad.

Para activarlo, un adulto debe abrir **⚙️ Configuración → Tutor con IA** y pegar una clave de API propia:

- **Google Gemini** (según el modelo, puede tener plan gratuito).
- **Anthropic (Claude)**.
- **OpenRouter** (permite usar muchos modelos, incluidos los de OpenAI).

> OpenAI no permite llamadas directas desde el navegador por CORS, así que su clave no funciona aquí; para modelos de OpenAI hay que usar OpenRouter.

La clave se guarda **solo en el `localStorage` de ese navegador**, por proveedor, y no se sincroniza entre dispositivos. Desde la misma pantalla se puede borrar. Al preguntar, se envía al proveedor únicamente el texto de la teoría del capítulo y la pregunta; no se envía nada más. El campo **Modelo** usa el **ID exacto de la API**, no el nombre comercial. Por ejemplo, para Gemini 3.8 Flash hay que escribir `gemini-3.8-flash` (el juego convierte automáticamente `3.8 Flash`, espacios o minúsculas, pero no inventa IDs que no existan).

La pregunta también se puede **dictar por voz** con el botón **🎤 Hablar**. El navegador escucha, escribe la transcripción en el cuadro de texto y la pregunta se envía al pulsar **Preguntar**, para poder revisarla antes. El dictado usa la **Web Speech API** del navegador: funciona en Chrome, Edge y Safari, necesita micrófono, conexión a Internet y un contexto seguro (HTTPS o `localhost`). Firefox no la incluye, así que allí el botón no aparece. El audio del dictado lo procesa el servicio de voz del navegador; no se envía a la API del tutor.

El botón **Probar conexión** guarda la configuración y lanza una pregunta de prueba. Si falla, muestra el motivo; los detalles técnicos del proveedor aparecen en la consola del navegador (`F12 → Console`, líneas `[Tutor IA]`). La espera máxima es de 2 minutos. Gemini 3.8 Flash está teniendo latencias altas de forma intermitente; si tarda demasiado, prueba `gemini-3.6-flash` en el campo Modelo.

Ten en cuenta que PlayStudy es una web estática: cualquier persona con acceso a ese dispositivo y al navegador puede leer la clave guardada. Usa una clave con límite de gasto bajo, no la configures en equipos compartidos y revócala si se filtra. El resto del juego sigue funcionando sin conexión; solo el tutor necesita Internet.

## Añadir un capítulo

1. **Elige un ID único** para el capítulo, siguiendo el orden del tema (por ejemplo, `cap_05_nombre_corto`).
2. **Crea la carpeta y los recursos** bajo `data/cursos/{curso}/{asignatura}/{tema}/{capitulo}/`. Añade `contenido.json`, las imágenes locales de las diapositivas, `assets/creditos_imagenes.json` y los recursos que necesiten sus juegos (por ejemplo, `assets/puzzle.jpg` si el capítulo conserva el puzzle).
3. **Crea el catálogo de juegos y las casillas** en `contenido.json`. Añade un objeto `juegos` con el material de cada minijuego (clave = subtipo) y deja dos casillas `"tipo": "minijuego"` como paradas. El tema decide cuáles de esos juegos se montan en las paradas; después se barajan entre ellas. La teoría y los quizzes conservan su orden. Para añadir un juego nuevo, crea su material en `juegos` y añade su subtipo a la lista `juegos` del tema.
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
7. **Comprueba el capítulo** con el validador de contenido:

   ```powershell
   powershell -ExecutionPolicy Bypass -File "scripts/validar_contenido.ps1"
   ```

   Revisa que el JSON sea válido, que estén las seis casillas, que el tema tenga exactamente dos juegos y el capítulo defina su material, que **cada diapositiva tenga `imagen` y `locucion`**, que existan todas las rutas de imagen, que los créditos incluyan todos los recursos y que la respuesta correcta de cada quiz esté en `opciones[0]`.

## Modificar el código del juego

El código vive en los módulos de `src/` (`app.js`, `state.js`, `dataLoader.js`, `gameOrder.js`, `audio.js`, `speech.js`, `aiTutor.js`, `views/` y `games/`). `index.html` no los carga uno a uno porque los módulos ES no funcionan al abrir el juego con doble clic (`file://`): en su lugar carga `src/game_bundle.js`, un único script clásico **generado a partir de esos módulos**. Por eso:

1. **No edites `src/game_bundle.js` a mano.** Edita el módulo correspondiente en `src/` y regenera el bundle:

   ```powershell
   powershell -ExecutionPolicy Bypass -File "scripts/empaquetar.ps1"
   ```

2. La primera ejecución descarga automáticamente el binario de esbuild (unos 10 MB) a `tools/`, comprueba su checksum SHA-512 contra el registro de npm y lo reutiliza a partir de ahí. `tools/` está ignorado por git y no hace falta instalar Node.js ni ningún otro paquete.
3. El workflow **Bundle sincronizado** (`.github/workflows/empaquetado.yml`) comprueba en cada PR que el bundle subido coincide con lo que generan los módulos. Si difiere, regenera el bundle con el comando del paso 1 e inclúyelo en el commit. También puedes comprobarlo en local con `scripts/empaquetar.ps1 -Check`.
4. El bundle sube a git (los jugadores abren `index.html` sin servidor ni build), al igual que `data/catalogo_data.js`. Ambos son artefactos generados: no se editan directamente.

## Archivos principales

- `data/catalogo.json`: cursos, asignaturas, temas y capítulos disponibles.
- `data/cursos/.../contenido.json`: catálogo de juegos (parejas, línea del tiempo, puzzle…), presentaciones y quizzes de cada capítulo.
- `data/catalogo_data.js`: catálogo sincronizado para uso offline; se genera con el script.
- `scripts/validar_contenido.ps1`: comprueba que todos los capítulos usan el formato de presentaciones narradas (imagen y locución en cada diapositiva) y que las rutas y los créditos están completos.
- `scripts/empaquetar.ps1`: genera `src/game_bundle.js` a partir de los módulos de `src/`; con `-Check` solo comprueba que están sincronizados.
- `src/app.js`: orquestador del juego. Su `GAME_REGISTRY` / `TYPE_REGISTRY` mapan cada subtipo de minijuego y tipo de casilla a su clase; para añadir un minijuego nuevo, crea su módulo en `src/games/` y súmalo a `GAME_REGISTRY`.
- `src/gameOrder.js`: monta los dos juegos elegidos por el tema y baraja las paradas del circuito (la teoría y los quizzes no se mueven).
- `src/games/timelineGame.js`: minijuego de línea del tiempo.
- `css/timeline.css`: estilos de la línea del tiempo.
- `src/views/theoryView.js`: lógica modular de la presentación teórica.
- `src/speech.js` y `src/views/settingsView.js`: selección, prueba y preferencia persistente de voces.
- `src/aiTutor.js`: tutor con IA opcional; guarda la clave de API en `localStorage` y llama al proveedor elegido.
- `src/game_bundle.js`: único JavaScript que carga `index.html`; se **genera** desde los módulos de `src/` con `scripts/empaquetar.ps1` y no se edita a mano.
- `css/theory.css`: estilos de las diapositivas.
- `.agents/skills/gestionar-contenido-educativo/SKILL.md`: pautas ampliadas para incorporar contenido educativo.

Si modificas el código o los estilos que forman parte de la shell de la PWA (el bundle regenerado o CSS), actualiza la versión `CACHE_NAME` en `sw.js`. Añadir datos e imágenes de un capítulo no requiere modificarla.
