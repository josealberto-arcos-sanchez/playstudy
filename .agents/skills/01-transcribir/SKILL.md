---
name: 01-transcribir
description: >-
  Extrae de forma exhaustiva el contenido de fotos o PDFs de libros de texto, apuntes
  y cuadernos de ejercicios (teoría, imágenes, mapas, esquemas y, sobre todo,
  ejercicios y actividades) y lo guarda en un Markdown estructurado en
  docs/extracciones/ para usarlo después en PlayStudy. Úsala cuando el usuario
  aporte imágenes o archivos PDF de libros o cuadernos y quiera transcribirlos,
  describirlos o convertir sus ejercicios en material de juego.
---

# Skill: Extracción de material escolar

Esta skill convierte fotos o archivos PDF de páginas de libros de texto y cuadernos en un documento Markdown fiel y completo. Ese documento es la materia prima que otras skills (como `gestionar-contenido-educativo`) usarán para crear capítulos, quizzes, parejas, líneas del tiempo y diapositivas.

## 1. Regla de delegación (obligatoria)

Leer imágenes y PDFs consume muchos tokens. Por eso el agente principal **no abre las imágenes ni los PDFs**. El trabajo de lectura se delega siempre en el subagente `extractor-escolar`, que usa el modelo económico `opencode-go/claude-haiku-5-5#medium` (con soporte nativo para imágenes y `application/pdf`).

1. Identifica las imágenes o PDFs a procesar. Si el usuario indica una carpeta, usa `glob` (por ejemplo `**/*.{jpg,jpeg,png,webp,gif,pdf}`) para listarlos. Ordénalos por nombre, que normalmente equivale al orden de página.
2. Determina el curso, la asignatura, el tema y el tipo de fuente (`Libro de texto`, `Cuaderno`, `Ficha`). Si falta algún dato, pregunta al usuario antes de delegar. Un dato que se puede deducir de las páginas lo deja el subagente.
3. Define la ruta de salida con este patrón:
   `docs/extracciones/{curso}_{asignatura}_{tema}.md`
   Usa minúsculas y guiones bajos, por ejemplo `docs/extracciones/5_primaria_ciencias_sociales_tema_06_castillos.md`. Si el usuario indica otra ruta, respétala.
4. Lanza el subagente con la herramienta `subagent`, `agent: "extractor-escolar"`, y en el prompt incluye:
   - La lista completa de rutas de imagen o PDF, en orden.
   - Curso, asignatura, tema, tipo de fuente y ruta de salida.
   - Cualquier indicación especial del usuario (por ejemplo, «el cuaderno es de un alumno de 5.º de Primaria» o «las respuestas en rojo son de la maestra»).
5. Cuando el subagente termine, revisa el resumen que devuelve, comprueba que el archivo existe y avisa al usuario de las incidencias que haya reportado (imágenes ilegibles, páginas que faltan, dudas).

## 2. Formatos de entrada

- Acepta directamente **imágenes** (`jpg`, `jpeg`, `png`, `webp`, `gif`) y **documentos PDF** (`pdf`) mediante la herramienta `read`.
- Si el usuario aporta formatos no soportados directamente por el modelo (como `heic`, `tiff` o `bmp`) o un PDF excesivamente pesado, se pueden convertir previamente a `jpg` (por ejemplo con `pdftoppm -jpeg -r 150` en `/tmp/opencode/`).

## 3. Protocolo del subagente

Este apartado lo sigue el subagente `extractor-escolar`. Léelo para saber qué debe producir la extracción.

### 3.1 Principios

- **Fidelidad primero.** Transcribe lo que aparece. No resumas la teoría ni cambies el enunciado de un ejercicio.
- **Nada se inventa.** Si una parte no se lee bien, escribe `[ilegible]` o `[no visible]`, y explica en la sección de incidencias qué falta. Si una respuesta debe deducirse, márcala como `[propuesta de solución]`.
- **Orden de página.** Recorre las imágenes en el orden recibido y no reorganices el contenido por temas.
- **Un bloque por elemento.** Cada ejercicio, imagen o recuadro tiene su propio bloque, con su número de página.
- **Idioma.** Escribe el documento en español, con las palabras originales entre comillas cuando sean de otro idioma.

### 3.2 Capas de extracción

**Capa 1: Teoría.** Transcribe títulos, subtítulos, párrafos, definiciones en negrita, recuadros de «Recuerda», «Importante» o «Sabías que», pies de foto y fechas. En cuadernos manuscritos, transcribe tal cual y añade `[sic]` en las faltas. Corrige la ortografía solo en la versión limpia cuando el texto sea claramente un error de escritura, y señálalo con `[corregido: …]`.

**Capa 2: Imágenes, mapas, esquemas y tablas.** Por cada elemento visual indica:
- Tipo: `fotografía`, `ilustración`, `mapa`, `esquema`, `organigrama`, `línea del tiempo`, `tabla`, `gráfica`.
- Qué muestra, con detalle suficiente para que alguien que no la ve pueda entender la explicación. Describe elementos, colores relevantes, posiciones y flechas.
- Todas las etiquetas y textos que aparecen dentro de la imagen, en su orden de lectura.
- Relación con la teoría: a qué párrafo o concepto corresponde.
- Si la imagen es un esquema o infografía con texto pequeño, indícalo, porque necesitará un ajuste de imagen completo en PlayStudy.

**Capa 3: Ejercicios y actividades (prioridad máxima).** Este es el foco principal de la extracción. Por cada ejercicio, anota:
- **Número y página** de origen, y la sección del libro o cuaderno.
- **Tipo de actividad:** `pregunta abierta`, `test`, `verdadero o falso`, `relacionar`, `completar huecos`, `ordenar`, `dibujar o colorear`, `mapa para localizar`, `resolver operación`, `otro`.
- **Enunciado exacto**, con sus apartados (a, b, c…) y sus opciones.
- **Material necesario:** si el ejercicio depende de una imagen, tabla, mapa o texto de la página, referencia el elemento de la Capa 2 por su identificador.
- **Respuesta del alumno:** si hay texto o marcas escritas a mano, transcríbelas literalmente. Después evalúa cada respuesta como `correcta`, `parcial`, `incorrecta` o `sin respuesta`, con una frase que explique por qué.
- **Solución verificada:** la respuesta correcta según la teoría de la misma unidad. Si el ejercicio está en blanco, escribe la solución pedagógica. Si el libro trae solucionario visible, usa esa solución y márcala como `[según el libro]`.
- **Concepto evaluado y dónde aparece en la teoría** (página y apartado).
- **Adaptación a PlayStudy:** 
  - Formato recomendado: `quiz` (opción múltiple), `parejas`, `linea_tiempo` o `diapositiva`.
  - Para `quiz`: enunciado, respuesta correcta y **3 distractores plausibles** que reflejen errores frecuentes, nunca opciones absurdas.
  - Para `parejas`: par concepto y detalle breve.
  - Para `linea_tiempo`: fecha y acontecimiento.

**Capa 4: Material para el videojuego.** Al final del documento, reúne:
- **Candidatos a parejas de memoria:** concepto → detalle breve (máximo 12 pares, ordenados por importancia).
- **Candidatos a línea del tiempo:** fecha → acontecimiento, en orden cronológico.
- **Ideas para diapositivas:** por cada apartado teórico importante, una frase con el mensaje principal y la imagen necesaria (si el libro la tiene, referencia su identificador).
- **Puntos de atención:** errores repetidos en los cuadernos, conceptos que el ejercicio evalúa y que la teoría explica poco, o cualquier duda que deba revisar un adulto.

## 4. Formato de salida

El archivo debe respetar esta estructura, para que otras skills puedan leerlo sin ambigüedades:

```markdown
# Extracción: [Título del tema o unidad]

- **Curso:** …
- **Asignatura:** …
- **Tema:** …
- **Fuente:** Libro de texto | Cuaderno | Ficha
- **Imágenes procesadas:** N (lista de archivos en orden)
- **Fecha de extracción:** AAAA-MM-DD

---

## 1. Contenido teórico

### Página X: [apartado]
…transcripción…

---

## 2. Imágenes, mapas y esquemas

### IMG-X.Y · Página X · [tipo]
- **Descripción:** …
- **Texto dentro de la imagen:** …
- **Relación con la teoría:** …
- **Notas para PlayStudy:** …

---

## 3. Ejercicios y actividades

### Ejercicio N (página X) · [tipo de actividad]
- **Enunciado:** …
- **Material necesario:** IMG-X.Y / ninguno
- **Respuesta del alumno:** … (evaluación: correcta | parcial | incorrecta | sin respuesta — motivo)
- **Solución verificada:** … [según el libro | propuesta de solución]
- **Concepto evaluado:** … (página X, apartado)
- **Adaptación a PlayStudy:**
  - Formato: quiz | parejas | linea_tiempo | diapositiva
  - Pregunta: …
  - Correcta: …
  - Distractores: …, …, …

---

## 4. Material para el videojuego

### Candidatos a parejas
- Concepto → detalle

### Candidatos a línea del tiempo
- Fecha → acontecimiento

### Ideas para diapositivas
- Apartado → mensaje principal → imagen (IMG-X.Y / por crear)

### Puntos de atención
- …

---

## 5. Incidencias
- Imágenes ilegibles, páginas que faltan, dudas de interpretación o partes marcadas como `[ilegible]`.
```

## 5. Verificación antes de terminar

Antes de dar la extracción por buena, el subagente comprueba:

- [ ] Se han procesado todas las imágenes de la lista, y cada una aparece al menos en una sección.
- [ ] Cada ejercicio tiene número, página, enunciado, solución y adaptación.
- [ ] Cada elemento visual con texto tiene sus etiquetas transcritas.
- [ ] Ninguna solución se presenta como dato del libro si no lo es (se usa `[propuesta de solución]`).
- [ ] Los distractores de los quizzes son plausibles y no contienen la respuesta correcta.
- [ ] Las fechas de la línea del tiempo están en orden cronológico.
- [ ] La sección de incidencias recoge todo lo que no se pudo leer.

## 6. Relación con PlayStudy

Esta skill no escribe en `data/`. Su salida es un documento de trabajo en `docs/extracciones/`. Para convertir una extracción en capítulos del juego, carga después la skill `gestionar-contenido-educativo` y usa como fuente el apartado 3 (ejercicios), el apartado 4 (material para el videojuego) y las imágenes de la sección 2.
