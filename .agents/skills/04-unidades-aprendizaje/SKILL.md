---
name: 04-unidades-aprendizaje
description: >-
  Analiza los contenidos de docs/01-transcripciones/, docs/02-imagenes/ y
  docs/03-videos/ con el modelo Haiku 5.5, decide en cuántas unidades de
  aprendizaje coherentes dividir el material y genera en
  docs/04-unidades-aprendizaje/ un índice de convenciones y un fichero Markdown
  por unidad (con vídeo base, teoría consolidada, diapositivas narradas,
  minijuegos y preguntas de quiz trazables) listos para crear capítulos de
  PlayStudy. Úsala cuando el usuario quiera agrupar y estructurar el material
  extraído en unidades de aprendizaje o capítulos de juego.
---

# Skill: Generación de unidades de aprendizaje (`04-unidades-aprendizaje`)

Esta skill toma toda la materia prima ya extraída de un tema (`docs/01-transcripciones/`, `docs/02-imagenes/` y `docs/03-videos/`), analiza su estructura pedagógica, resuelve incoherencias entre fuentes y genera en `docs/04-unidades-aprendizaje/` los documentos Markdown de las **unidades de aprendizaje**. Cada unidad de aprendizaje sirve después como guion completo para construir un capítulo independiente del videojuego en PlayStudy.

---

## 1. Regla de ejecución con Haiku 5.5 (obligatoria)

El análisis y la generación de las unidades de aprendizaje se ejecutan siempre con el modelo **Haiku 5.5** (`opencode-go/claude-haiku-5-5#medium`):

1. El agente principal delega la tarea invocando la herramienta `subagent` con:
   - `agent: "generador-unidades"` (configurado en `.opencode/agents/generador-unidades.md` con `model: opencode-go/claude-haiku-5-5#medium`), o bien pasando explícitamente `model: "opencode-go/claude-haiku-5-5#medium"`.
2. En el `prompt` del subagente indica si el usuario ha pedido algún filtro específico (un tema concreto, un número determinado de unidades o todos los materiales disponibles en las tres carpetas).
3. Cuando el subagente termine, verifica que se han creado `00-indice-y-convenciones.md` y todos los ficheros `uaXX-*.md` en `docs/04-unidades-aprendizaje/`, y presenta al usuario el resumen de la división propuesta, las incoherencias detectadas y los puntos pendientes de revisión.

---

## 2. Protocolo del subagente

### Paso 1: Lectura completa de las tres fuentes

1. Lista con `glob` todos los archivos de:
   - `docs/01-transcripciones/` (transcripciones del libro de texto, fichas de repaso, resúmenes de cuaderno, guías para familias, mapas mentales y resúmenes visuales).
   - `docs/02-imagenes/` (esquemas, mapas mentales e infografías copiadas).
   - `docs/03-videos/` (explicaciones y conceptos clave de los vídeos de YouTube).
2. Lee **todos** los ficheros Markdown e inspecciona con `read` las imágenes de `docs/02-imagenes/`.

### Paso 2: Diseño de la división en unidades de aprendizaje

Antes de escribir, piensa en cuántas unidades de aprendizaje dividir todo el contenido aplicando estos criterios:

1. **Un tema concreto por unidad:** cada unidad debe corresponder a una lección o pregunta clave del libro de texto (por ejemplo, una doble página o apartado principal del índice de la unidad). No crees una unidad «cajón de sastre» solo con ejercicios de repaso; reparte los ejercicios de repaso final en la unidad temática a la que pertenezcan.
2. **Anclaje en vídeo(s) base:** siempre que sea posible, asigna a cada unidad uno (o varios) de los vídeos de `docs/03-videos/` que explique ese mismo bloque temático.
3. **Tamaño óptimo para un capítulo de PlayStudy:** cada unidad debe tener material suficiente —sin rellenos ni repeticiones— para alimentar las **6 casillas del circuito** de un capítulo de PlayStudy:
   - **2 minijuegos** (`parejas` de 7 pares + `puzzle` o `linea_tiempo` de 5 a 7 hitos).
   - **2 bloques de teoría narrada** (3 diapositivas por bloque = 6 diapositivas con imagen y locución).
   - **2 quizzes** (Quiz 1 de 4 preguntas + Quiz 2 de 4 preguntas = 8 preguntas principales, más 1–2 de reserva).
4. **Evitar la hiperfragmentación:** si al dividir un apartado quedan subtemas con solo 2 o 3 preguntas posibles, mantenlos unidos en una misma unidad e indica en el índice cómo podrían subdividirse si en el futuro se quisieran capítulos más cortos.

### Paso 3: Resolución de incoherencias y convenciones canónicas

Cruza todas las fuentes y establece una única versión canónica antes de redactar las unidades:

1. **Jerarquía de fuentes (de mayor a menor autoridad):**
   - **1.º Libro de texto** (términos, definiciones, clasificaciones, tablas de edades o fechas).
   - **2.º Infografías, mapas mentales y resúmenes visuales oficiales** de la editorial.
   - **3.º Fichas de refuerzo/ampliación y guía para familias** (vocabulario bilingüe y objetivos). Recuerda que si las fichas están en blanco, sus soluciones son propuestas.
   - **4.º Apuntes o resúmenes de cuaderno** (corrige faltas de ortografía e imprecisiones frente al libro).
   - **5.º Vídeos recomendados** (úsalos como base narrativa, analogías y ejemplos cotidianos; **nunca** uses edades, fechas o clasificaciones de un vídeo si contradicen al libro, ni evalúes en los quizzes datos de ampliación que solo salen en el vídeo).
2. **Terminología canónica:** si un mismo concepto recibe nombres distintos según la fuente (por ejemplo, *Interacción* en el libro frente a *Relación* en un esquema, o *Sistema locomotor* frente a *Sistema esquelético* en un vídeo), fija el término del libro como canónico y menciona el otro como alias en la teoría.
3. **Erratas e incidencias:** detecta erratas de impresión del libro, solapamientos de rangos, páginas no transcritas y ejercicios que dependen de un audio no disponible. **Nunca inventes el contenido de un audio ni de una página que falte.**

### Paso 4: Generar `docs/04-unidades-aprendizaje/00-indice-y-convenciones.md`

Crea primero el archivo `docs/04-unidades-aprendizaje/00-indice-y-convenciones.md` con esta estructura:

1. **Cuántas unidades y por qué:** tabla con los motivos pedagógicos y de diseño de juego, más posibles alternativas de subdivisión.
2. **Índice de unidades:** tabla con `#`, `Unidad`, `Lección/páginas del libro`, `Vídeo base`, `Minijuegos propuestos` y `Archivo` (`ua01-...md`, `ua02-...md`, etc.).
3. **Mapa completo de actividades (trazabilidad 100 %):** tabla que liste **todas** las actividades del libro y de las fichas e indique a qué unidad van y cómo se tratan (`Pregunta del quiz 1/2`, `Parejas`, `Línea del tiempo`, `Diapositiva`, `Cuaderno/proyecto no evaluable` o `Pendiente de audio`).
4. **Términos canónicos:** tabla con `Concepto`, `Término canónico (ES)`, `Inglés` (si la asignatura es bilingüe) y `Alias o término que se evita`.
5. **Tabla canónica de datos/edades/fechas** (cuando el tema incluya etapas, periodos históricos o clasificaciones con rangos).
6. **Jerarquía de fuentes.**
7. **Incidencias de coherencia detectadas:** tabla con cada discrepancia entre fuentes y cómo se ha resuelto.
8. **Imágenes y recursos visuales:** qué imágenes ya están en `docs/02-imagenes/` y cuáles deben recortarse de los PDFs de `docs/00-input-documents/procesados/` (indicando página del PDF y página del libro).

### Paso 5: Generar un fichero Markdown por cada unidad (`uaXX-<slug>.md`)

Crea un archivo `docs/04-unidades-aprendizaje/uaXX-<slug>.md` por cada unidad de aprendizaje siguiendo esta plantilla:

```markdown
# Unidad de aprendizaje X · [Título claro y atractivo]

## Ficha

- **Curso / asignatura / tema:** …
- **Lección del libro:** p. X «…». Apoyo: p. Y (actividades …).
- **Vídeo base:** VX «Título del vídeo» — https://www.youtube.com/watch?v=...
- **Vídeo complementario:** (opcional)
- **Minijuegos:** parejas, puzzle | parejas, línea del tiempo
- **Id de capítulo sugerido:** `cap_0X_slug`
- **Estado:** contenido completo. Pendiente: [audios, recortes de imágenes o revisiones].

---

## 1. Objetivos

- [3–4 objetivos claros y medibles alineados con la guía/libro]

## 2. Vocabulario

| Español | Inglés (si aplica) | Definición breve |
|---|---|---|
| … | … | … |

## 3. Vídeo base (VX): resumen

[Resumen estructurado de la explicación, ejemplos y analogías del vídeo base.]

> Nota / Ampliación: [Indica qué términos o datos del vídeo son ampliación y no se evalúan en las preguntas, o qué términos se adaptan al vocabulario canónico del libro.]

## 4. Teoría de referencia

[Síntesis rigurosa, limpia y ordenada de toda la teoría de la unidad combinando el libro, los esquemas, los apuntes y la guía, con referencias entre paréntesis a la página de origen.]

---

## 5. Diapositivas de teoría

### Teoría · Parte 1 (casilla 2)

**Diapositiva 1 · «Título corto»**
- Texto (≤ 6 palabras): …
- Imagen: [ruta en `docs/02-imagenes/` o identificador `IMG-X.Y` indicando página del libro y del PDF en `procesados/`]
- Ajuste de imagen: completo (para esquemas/infografías con texto) | recorte (para fotografías)
- Locución: «[Narración cercana y clara adaptada a la edad del alumno, describiendo lo que muestra la imagen]»

*(Repetir para Diapositivas 2 y 3)*

### Teoría · Parte 2 (casilla 5)

*(Diapositivas 4, 5 y 6; la Diapositiva 6 actúa como diapositiva de resumen visual del capítulo)*

---

## 6. Minijuegos

### 6.1 Parejas (7 pares)

| # | Etiqueta | Detalle (reverso) | Icono |
|---|---|---|---|
| 1 | … | … | 🔹 |

*(Opcional: indicar parejas alternativas con fotos o ejercicios adicionales)*

### 6.2 [Puzzle «Título» | Línea del tiempo (5–7 hitos)]

- Si es **Puzzle**: imagen de referencia, proporción 3:2, instrucción y notas.
- Si es **Línea del tiempo**: tabla ordenada cronológicamente del más antiguo al más reciente (entre 5 y 7 hitos) con `#`, `Etiqueta`, `Fecha / Edad` e `Icono`.

---

## 7. Preguntas (quiz)

### Quiz 1 (casilla 3)

**P1 · [Concepto]** *([fuente y ejercicio de origen])*
- Enunciado: ¿…?
- Opciones: **Opción correcta** · Distractor 1 · Distractor 2 · Distractor 3
- Explicación: «[Retroalimentación formativa y motivadora]»

*(P2, P3, P4)*

### Quiz 2 (casilla 6)

*(P5, P6, P7, P8)*

### Reserva

*(R-1, R-2: preguntas adicionales extraídas de ejercicios restantes)*

---

## 8. Otras actividades (no se evalúan en PlayStudy)

- [Actividades abiertas de cuaderno, proyectos de investigación, juegos de roles orales y actividades marcadas como **Pendiente de audio**.]

---

## 9. Puntos de atención

- [Soluciones propuestas pendientes de validar, ambigüedades en fotos o enunciados, erratas del original y advertencias sobre qué datos del vídeo no deben evaluarse.]
```

---

## 3. Verificación antes de terminar

Antes de dar el trabajo por finalizado, comprueba:

- [ ] Existe `docs/04-unidades-aprendizaje/00-indice-y-convenciones.md` y todos los ficheros `uaXX-*.md` listados en su índice.
- [ ] El 100 % de los ejercicios de `docs/01-transcripciones/` aparece mapeado en la tabla de trazabilidad de `00-indice-y-convenciones.md`.
- [ ] Cada unidad tiene asignado su vídeo base (si existe en `docs/03-videos/`), sus 6 diapositivas con imagen y locución, sus 2 minijuegos y sus 8 preguntas de quiz (+ reserva).
- [ ] Ninguna pregunta evaluable contradice al libro de texto ni exige datos que solo aparezcan como ampliación en un vídeo.
- [ ] Todas las opciones de una misma pregunta de quiz son distintas entre sí, los distractores son plausibles y la respuesta correcta está claramente marcada en negrita.
- [ ] Ninguna actividad dependiente de audio sin transcribir ha sido inventada (están marcadas como `Pendiente de audio`).
