---
name: 03-videos
description: >-
  Procesa un fichero con enlaces a vídeos educativos de YouTube, extrae su
  descripción y transcripción mediante el subagente extractor-videos (Haiku 5.5),
  genera un documento Markdown detallado en docs/03-videos/ con un apartado por
  vídeo (nombre, enlace, explicación detallada y conceptos clave) y mueve el
  fichero de entrada a docs/00-input-documents/procesados/. Úsala cuando el
  usuario aporte un fichero con links de YouTube para documentar los vídeos de
  una unidad.
---

# Skill: Extracción y explicación de vídeos de YouTube

Esta skill toma un fichero de texto con enlaces a vídeos de YouTube (por ejemplo `docs/00-input-documents/videos_recomendados.txt`), extrae el contenido de cada vídeo a partir de su descripción y de sus subtítulos, genera un Markdown estructurado en `docs/03-videos/` y mueve el fichero original a `docs/00-input-documents/procesados/`.

## 1. Regla de delegación (obligatoria)

El trabajo de extracción y redacción se delega siempre en el subagente `extractor-videos`, que usa el modelo `opencode-go/claude-haiku-5-5#medium`.

1. Localiza el fichero de entrada con los enlaces de YouTube (normalmente en `docs/00-input-documents/`).
2. Comprueba si ya existe la transcripción del tema en `docs/01-transcripciones/` para tomar de ahí el curso, la asignatura, la unidad y los títulos de las páginas.
3. Define la ruta de salida en `docs/03-videos/`, por ejemplo:
   `docs/03-videos/unidad-1-videos-recomendados.md`
   Si el usuario pide un nombre concreto, respétalo.
4. Lanza el subagente con la herramienta `subagent`:
   - `agent: "extractor-videos"`
   - En el `prompt` incluye: ruta del fichero de entrada, ruta de salida en `docs/03-videos/`, ruta de la transcripción de referencia en `docs/01-transcripciones/` (si existe) y datos de curso, asignatura y tema.
5. Cuando el subagente termine, comprueba que el Markdown se ha creado en `docs/03-videos/` y que el fichero de entrada se ha movido a `docs/00-input-documents/procesados/`.

## 2. Protocolo del subagente

### Paso 1: Extraer descripción y subtítulos

Ejecuta con `shell` el script incluido en esta skill pasándole el fichero de entrada:

```bash
python3 .agents/skills/03-videos/scripts/extraer_youtube.py "<ruta_fichero_entrada>"
```

El script lee todos los enlaces de YouTube del fichero (`youtube.com/watch?v=...` o `youtu.be/...`), descarga la descripción de la página y obtiene la transcripción con `youtube-transcript-api` (en español o inglés).

### Paso 2: Contextualizar con la unidad (si existe)

Si hay un documento de la unidad en `docs/01-transcripciones/`, consulta su cabecera y sus títulos de página para:
- completar los metadatos (`Curso`, `Asignatura`, `Tema`),
- indicar en cada vídeo con qué página o apartado del libro se relaciona.

### Paso 3: Redactar el Markdown en `docs/03-videos/`

Escribe el documento en español siguiendo esta plantilla:

```markdown
# Vídeos recomendados: [Unidad y asignatura]

- **Curso:** …
- **Asignatura:** …
- **Tema:** …
- **Fuente:** `[nombre del fichero de entrada]` (N vídeos de YouTube)
- **Idioma de los vídeos:** español | inglés | …
- **Fecha de extracción:** AAAA-MM-DD

> Método: el contenido de cada vídeo se ha elaborado a partir de su transcripción automática de YouTube y de su descripción. Las imágenes y animaciones no se han revisado, así que las referencias visuales son solo las que se deducen del propio audio.

---

## 1. [Nombre del vídeo]

- **Enlace:** https://www.youtube.com/watch?v=...
- **Relación con la unidad:** [apartado y página del libro, si se conoce].

### Explicación

[Explicación detallada, ordenada por bloques o etapas según la estructura del propio vídeo. Incluye las definiciones, ejemplos, comparaciones y conclusiones que se mencionan en la locución y en la descripción.]

### Conceptos clave

[Tabla o lista con los términos principales del vídeo —en inglés y español si el vídeo está en inglés— y su definición según el vídeo.]
```

Reglas de redacción:
- **Fidelidad al vídeo:** explica todo el recorrido del vídeo (introducción, ejemplos, etapas o bloques y conclusión) sin omitir datos importantes ni añadir información externa que el vídeo no mencione.
- **No inventar lo visual:** como no se ven los fotogramas, no describas colores, dibujos ni escenas que no se deduzcan de la voz o de la descripción.
- **Corrección de subtítulos automáticos:** los subtítulos generados automáticamente suelen tener pequeños errores de reconocimiento de voz (por ejemplo, *«dv peres / oliveros»* por *«viviparous / oviparous»* o *«son died»* por *«some die»*). Interprétalos según el contexto escolar del vídeo y escribe el término correcto en la explicación.
- **Bilingüe cuando proceda:** si el vídeo está en inglés, redacta la explicación en español pero conserva entre paréntesis o en la tabla de conceptos clave los términos en inglés que el alumno necesita recordar.

### Paso 4: Mover el fichero de entrada a `procesados/`

Una vez guardado el archivo en `docs/03-videos/`, mueve el fichero de enlaces a `docs/00-input-documents/procesados/`:

```bash
mkdir -p docs/00-input-documents/procesados
mv "<ruta_fichero_entrada>" docs/00-input-documents/procesados/
```

## 3. Verificación antes de terminar

- [ ] Todos los vídeos del fichero tienen su propio apartado numerado con nombre y enlace.
- [ ] Cada vídeo incluye una explicación detallada y una sección de conceptos clave.
- [ ] El archivo se ha guardado en `docs/03-videos/`.
- [ ] El fichero original con los enlaces se ha movido a `docs/00-input-documents/procesados/`.
