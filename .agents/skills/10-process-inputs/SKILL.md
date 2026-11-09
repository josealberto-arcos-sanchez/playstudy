---
name: 10-process-inputs
description: >-
  Recorre todos los ficheros pendientes en docs/00-input-documents/ y los
  procesa con el modelo Haiku 5.5 según su tipo: transcribe PDFs e imágenes
  con la skill 01-transcribir (copiando además las imágenes a docs/02-imagenes/),
  copia textos teóricos a docs/01-transcripciones/, aplica la skill 03-videos a
  los listados de enlaces de vídeos y archiva todos los ficheros en
  docs/00-input-documents/procesados/, verificando al final que no quede
  ninguno sin procesar.
---

# Skill: Procesamiento por lotes de documentos de entrada (`10-process-inputs`)

Esta skill recorre todos los ficheros que haya en `docs/00-input-documents/` (excluyendo la subcarpeta `docs/00-input-documents/procesados/`), aplica el flujo correspondiente a cada uno según su tipo de archivo y contenido, y garantiza que al terminar todos los ficheros hayan sido procesados y archivados en `docs/00-input-documents/procesados/`.

## 1. Regla de ejecución con Haiku 5.5 (obligatoria)

Esta skill debe ejecutarse siempre con el modelo **Haiku 5.5** (`opencode-go/claude-haiku-5-5#medium`):

- **Delegación al subagente `procesador-inputs`:** El agente principal delega la ejecución en el subagente `procesador-inputs` (configurado en `.opencode/agents/procesador-inputs.md` con `model: opencode-go/claude-haiku-5-5#medium`), o bien invoca `subagent` indicando explícitamente `agent: "procesador-inputs"`.
- A su vez, las tareas de transcripción (`01-transcribir` → `extractor-escolar`) y de extracción de vídeos (`03-videos` → `extractor-videos`) también se ejecutan con `opencode-go/claude-haiku-5-5#medium`.

## 2. Preparación de directorios

Antes de procesar los ficheros, asegúrate de que existen todas las carpetas necesarias:

```bash
mkdir -p docs/00-input-documents/procesados \
         docs/01-transcripciones \
         docs/02-imagenes \
         docs/03-videos
```

## 3. Inventario inicial de ficheros

1. Lista todos los ficheros que se encuentren directamente en `docs/00-input-documents/` (ignorando cualquier fichero dentro de `docs/00-input-documents/procesados/`).
2. Registra la lista completa de ficheros pendientes para poder verificar al final que todos han sido procesados.
3. Clasifica cada fichero en una de las cuatro categorías descritas en el apartado 4.

## 4. Reglas de procesamiento por tipo de fichero

Procesa cada fichero de `docs/00-input-documents/` siguiendo estas reglas:

### 4.1. Si el fichero es un PDF (`.pdf`)

1. **Transcribir:** Utiliza la skill `01-transcribir` con ese fichero PDF (delegando en el subagente `extractor-escolar` o siguiendo íntegramente el protocolo de `01-transcribir`) y guarda el Markdown resultante en la carpeta de transcripciones (`docs/01-transcripciones/`).
2. **Archivar:** Una vez completada y verificada la transcripción, mueve el fichero PDF a `docs/00-input-documents/procesados/`:
   ```bash
   mv "docs/00-input-documents/<fichero.pdf>" docs/00-input-documents/procesados/
   ```

### 4.2. Si el fichero es una imagen (`.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`)

1. **Transcribir:** Utiliza la skill `01-transcribir` con ese fichero de imagen y guarda el Markdown resultante en `docs/01-transcripciones/`.
2. **Copiar a imágenes:** Copia el fichero de imagen en `docs/02-imagenes/`:
   ```bash
   cp "docs/00-input-documents/<imagen>" docs/02-imagenes/
   ```
3. **Archivar:** Mueve el fichero de imagen original a `docs/00-input-documents/procesados/`:
   ```bash
   mv "docs/00-input-documents/<imagen>" docs/00-input-documents/procesados/
   ```

### 4.3. Si el fichero es un fichero de texto (`.txt`, `.md`, etc.)

Lee primero el contenido del fichero con `read` para determinar si es un **listado de links a vídeos** o **contenido teórico**:

#### Caso A: Fichero de texto con contenido teórico
*(Apuntes, resúmenes, explicaciones o material escrito que no es un listado de enlaces a vídeos)*

1. **Copiar a transcripciones:** Copia el fichero directamente en la carpeta de transcripciones (`docs/01-transcripciones/`):
   ```bash
   cp "docs/00-input-documents/<fichero_texto>" docs/01-transcripciones/
   ```
2. **Archivar:** Mueve el fichero original a `docs/00-input-documents/procesados/`:
   ```bash
   mv "docs/00-input-documents/<fichero_texto>" docs/00-input-documents/procesados/
   ```

#### Caso B: Fichero de texto con un listado de links a vídeos
*(Contiene enlaces a vídeos de YouTube u otras plataformas, como `youtube.com/watch?v=...` o `youtu.be/...`)*

1. **Aplicar `03-videos`:** Aplícale la skill `03-videos` (mediante el subagente `extractor-videos` o siguiendo el protocolo de `03-videos`), lo que generará el Markdown explicado en `docs/03-videos/` y moverá el fichero de entrada a `docs/00-input-documents/procesados/`.
2. **Comprobar archivo:** Verifica que el fichero de entrada ya se ha movido a `docs/00-input-documents/procesados/`; si aún permanece en `docs/00-input-documents/`, muévelo a `docs/00-input-documents/procesados/`.

## 5. Verificación final (obligatoria)

Antes de dar por finalizada la ejecución de la skill, realiza siempre estas comprobaciones:

- [ ] Lista el contenido de `docs/00-input-documents/` (excluyendo la carpeta `procesados/`). **No debe quedar ningún fichero pendiente** en `docs/00-input-documents/`. Si queda alguno, procésalo antes de terminar.
- [ ] Todos los ficheros del inventario inicial se encuentran ahora en `docs/00-input-documents/procesados/`.
- [ ] Cada PDF e imagen procesado cuenta con su transcripción correspondiente en `docs/01-transcripciones/`.
- [ ] Cada imagen procesada tiene una copia en `docs/02-imagenes/`.
- [ ] Cada fichero de texto con contenido teórico ha sido copiado en `docs/01-transcripciones/`.
- [ ] Cada fichero de texto con enlaces a vídeos tiene su documento generado en `docs/03-videos/`.

Finalmente, entrega al usuario una tabla o resumen con todos los ficheros procesados, el tipo detectado, la acción ejecutada y las rutas de salida generadas.
