---
name: gestionar-contenido-educativo
description: >-
  Guía paso a paso para añadir o modificar cursos, asignaturas, temas y capítulos
  en la plataforma de videojuegos educativos (PlayStudy), manteniendo la compatibilidad
  offline y la sincronización de datos.
---

# 📚 Skill: Gestión y Adición de Contenido Educativo en PlayStudy

Esta skill describe el procedimiento estándar para añadir nuevo material didáctico al juego: desde crear un nuevo curso completo hasta incorporar capítulos específicos con teoría, cuestionarios (quizzes), juegos de memoria y puzzles personalizados.

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

Los detalles del juego para cada capítulo (preguntas, cartas de memoria, fichas de teoría y puzzle) se guardan en su propio archivo:
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

2. **Añadir la imagen del puzzle**:
   Guardar la imagen del puzzle en:
   `data/cursos/{curso_id}/{asig_id}/{tema_id}/{cap_id}/assets/puzzle.jpg` (proporción óptima ~ 3:2 o 4:3).

3. **Crear el archivo `contenido.json`**:
   Crear `data/cursos/.../{cap_id}/contenido.json` siguiendo la plantilla de 6 paradas (ver sección 3).

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

5. **Sincronizar datos**:
   Ejecutar el script de sincronización para que funcione 100% offline con doble clic:
   ```powershell
   powershell -ExecutionPolicy Bypass -File "scripts/actualizar_datos.ps1"
   ```
   *(Nota: `jugar.bat` ejecuta este script automáticamente al arrancar).*

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

Cada capítulo consta de un circuito interactivo continuo de 6 paradas (3 estrellas por parada = 18 estrellas):

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
  "casillas": [
    {
      "id": 1,
      "tipo": "minijuego",
      "subtipo": "parejas",
      "titulo": "1. Parejas Memorables",
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
    {
      "id": 2,
      "tipo": "teoria",
      "titulo": "2. Ficha: Primera Parte Teórica",
      "descripcion": "Aprende los conceptos clave.",
      "icono": "📖",
      "fichas": [
        {
          "titulo": "Título de la Ficha",
          "subtitulo": "Subtítulo explicativo",
          "icono": "📖",
          "tarjetas": [
            {
              "nombre": "Sección 1",
              "fecha": "Época o fecha",
              "icono": "📌",
              "color": "#3b82f6",
              "puntos": [
                "Punto clave 1 en **negrita**.",
                "Punto clave 2 explicativo."
              ]
            }
          ],
          "destacado": {
            "icono": "💡",
            "titulo": "Dato Importante",
            "texto": "Información destacada para recordar."
          }
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
            "Opción correcta (siempre en la posición 0, el juego las mezcla automáticamente)",
            "Opción incorrecta 1",
            "Opción incorrecta 2",
            "Opción incorrecta 3"
          ],
          "correcta": 0,
          "explicacion": "¡Correcto! Explicación formativa y motivadora."
        }
      ]
    },
    {
      "id": 4,
      "tipo": "minijuego",
      "subtipo": "puzzle",
      "titulo": "4. Puzzle: ¡Desafío Visual!",
      "descripcion": "Ordena las 6 piezas del dibujo.",
      "icono": "🧩",
      "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_XX_nombre/assets/puzzle.jpg"
    },
    {
      "id": 5,
      "tipo": "teoria",
      "titulo": "5. Ficha: Segunda Parte Teórica",
      "descripcion": "Aprende sobre la vida, sociedad o cultura.",
      "icono": "📜",
      "fichas": [
        {
          "titulo": "Título de la Segunda Ficha",
          "subtitulo": "Subtítulo explicativo",
          "icono": "📜",
          "tarjetas": [
            {
              "nombre": "Sección 2",
              "fecha": "Periodo",
              "icono": "🏰",
              "color": "#8b5cf6",
              "puntos": [
                "Detalles de la vida cotidiana.",
                "Aspectos culturales y sociales."
              ]
            }
          ],
          "destacado": {
            "icono": "🏛️",
            "titulo": "Monumento o Elemento Clave",
            "texto": "Ejemplo real conservado hoy en día."
          }
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
            "Opción correcta",
            "Opción incorrecta A",
            "Opción incorrecta B",
            "Opción incorrecta C"
          ],
          "correcta": 0,
          "explicacion": "¡Sensacional! Retroalimentación positiva."
        }
      ]
    }
  ]
}
```

---

## ⚡ 4. Puntos Críticos y Buenas Prácticas

1. **La opción correcta siempre va en el índice `0`**:
   En el archivo `contenido.json`, define siempre la respuesta verdadera en `opciones[0]` con `"correcta": 0`. El motor del juego baraja las respuestas al azar al mostrarlas al niño.
2. **Imágenes para el puzzle**:
   - Guardar como JPG en formato apaisado (`assets/puzzle.jpg`).
   - Peso recomendado: entre 100 KB y 600 KB para que cargue al instante.
3. **No olvidar sincronizar si se prueba sin servidor web**:
   - Ejecutar `scripts/actualizar_datos.ps1` o arrancar desde `jugar.bat`.
   - Si se añade un capítulo y se recarga el navegador sin ejecutar la sincronización, el archivo `data/catalogo_data.js` no contendrá los nuevos datos cuando se acceda vía `file://`.
4. **Paleta de colores para las tarjetas**:
   - Rojo: `#ef4444`
   - Verde: `#10b981`
   - Azul: `#3b82f6`
   - Naranja: `#f97316`
   - Violeta: `#8b5cf6`
   - Ámbar/Amarillo: `#f59e0b`
   - Cyan: `#06b6d4`
   - Rosa: `#ec4899`
