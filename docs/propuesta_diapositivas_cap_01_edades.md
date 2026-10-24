# 🏛️ Propuesta de diapositivas — Capítulo 1: Las Edades de la Historia

> Estado: **implementado** (24 de octubre de 2026).
> Referencia de formato: capítulos 3 y 4 del Tema 6 (presentaciones narradas con imagen, rótulo breve y locución).

## Resultado de la implementación

- Las casillas 2 y 5 ya son presentaciones narradas: **9 + 10 diapositivas**.
- Se creó `cap_01_edades/assets/` con **19 imágenes** locales, `puzzle.jpg` y `creditos_imagenes.json`.
- Se sustituyeron los dos `destacado` por diapositivas finales de resumen con imagen y voz.
- Se corrigió la ruta del puzzle a `assets/puzzle.jpg`.
- Se ejecutó `scripts/actualizar_datos.ps1` y se probó el circuito completo en local.
- Los minijuegos y los quizzes (10 y 13 preguntas) no se modificaron.

---

## 1. Diagnóstico

Antes de la implementación, el capítulo 1 seguía el formato antiguo de **fichas con tarjetas densas**:

- La casilla 2 («Ficha: La Prehistoria») tenía 3 tarjetas + 1 destacado.
- La casilla 5 («Ficha: La Historia») tenía 4 tarjetas + 1 destacado.
- Ninguna tarjeta usaba `imagen`, `texto` ni `locucion`.
- No existía la carpeta `cap_01_edades/assets/`. El único recurso era `puzzle.jpg`, situado en la raíz del capítulo, y la ruta del JSON apuntaba a `assets/puzzle.jpg` (ruta inexistente; el puzzle no se muestra porque el tema usa `parejas` y `linea_tiempo`).
- El resultado eran 9 diapositivas solo de texto, con párrafos largos en pantalla. No se aprovechaba la vista de presentación con imagen ni la narración por voz.

**Objetivo de la propuesta:** convertir las dos fichas en **dos presentaciones narradas** con el mismo esquema que los capítulos 3 y 4, sin tocar la estructura de 6 casillas ni los quizzes.

---

## 2. Estructura propuesta del circuito

Se mantienen las 6 casillas y los minijuegos actuales. Solo cambian las dos casillas de teoría.

| # | Tipo | Título actual | Título propuesto | Cambio |
|---|---|---|---|---|
| 1 | Minijuego · Parejas | 1. Juego | 1. Parejas del Tiempo | Sin cambios de contenido |
| 2 | **Teoría** | 2. Ficha: La Prehistoria | **2. Presentación: La Prehistoria** | 9 diapositivas narradas |
| 3 | Quiz | 3. Quiz: Prehistoria | 3. Quiz: Prehistoria | Sin cambios (10 preguntas) |
| 4 | Minijuego · Línea del tiempo | 4. Juego | 4. Línea del Tiempo de las Edades | Sin cambios de contenido |
| 5 | **Teoría** | 5. Ficha: La Historia | **5. Presentación: Las Edades de la Historia** | 10 diapositivas narradas |
| 6 | Quiz | 6. Quiz: La Historia | 6. Quiz: La Historia | Sin cambios (13 preguntas) |

**Formato de cada diapositiva:** una idea · una imagen · rótulo de 6 palabras como máximo · locución de 45–80 palabras.

- `nombre`: la idea de la diapositiva (título visible).
- `fecha`: el periodo o dato que acompaña al título.
- `imagen`: ruta local dentro de `assets/`.
- `texto`: rótulo corto sobre la imagen.
- `locucion`: explicación completa para la voz.
- `puntos`: se deja vacío o con un solo apoyo breve; el detalle ya va en la voz.

---

## 3. Presentación A (casilla 2) — La Prehistoria (9 diapositivas)

| # | Idea | Visual propuesto | Texto en pantalla | Locución (resumen) |
|---|---|---|---|---|
| A1 | Portada | Techo de bisontes de la cueva de Altamira | **La Prehistoria** | Bienvenidos a la Prehistoria, la etapa más larga de la humanidad. Empieza con los primeros seres humanos y termina cuando se inventa la escritura. |
| A2 | Una etapa sin escritura | Línea de tiempo **2,5 millones de años → 3500 a.C.**, con un icono de escritura al final | **Antes de la escritura** | La Prehistoria dura muchísimo. Como nadie escribía, la conocemos por fósiles, herramientas y pinturas que han llegado hasta nosotros. |
| A3 | Cómo vivían en el Paleolítico | Ilustración de Charles R. Knight sobre la vida en el Paleolítico | **Nómadas: cazar y recolectar** | Eran nómadas: se trasladaban siguiendo a los animales y las estaciones. Vivían de la caza, la pesca y los frutos que recogían. |
| A4 | El fuego y el arte | Techo de bisontes de la **cueva de Altamira** | **Fuego y pinturas rupestres** | Dominar el fuego les permitió calentarse, cocinar y protegerse. En las cuevas pintaron animales con carbón y pigmentos: son las pinturas rupestres. |
| A5 | La gran transformación | Campo de trigo y cabras o reconstrucción de un poblado neolítico | **8.000 a.C.: agricultura** | Hacia el 8000 a.C. empezaron a cultivar plantas y a criar animales. Ya no dependían solo de lo que encontraban. |
| A6 | Vivir en un sitio fijo | Reconstrucción de una casa neolítica + vasija y molino de mano | **Sedentarios: los primeros poblados** | Al cuidar cultivos y rebaños se quedaron a vivir en un lugar fijo. Construyeron poblados, hicieron cerámica y repartieron tareas. |
| A7 | La Edad de los Metales | Composición con un objeto de cobre, otro de bronce y otro de hierro | **Cobre → bronce → hierro** | Aprendieron a fundir metales y a darles forma. Primero el cobre, luego el bronce y después el hierro. Así fabricaron herramientas y armas más resistentes. |
| A8 | Un tesoro en España | Vista de la trinchera del yacimiento de la **Sierra de Atapuerca** (Burgos) | **Atapuerca (Burgos)** | En Atapuerca se han encontrado fósiles humanos muy antiguos. Gracias a ellos sabemos cómo eran y cómo vivían los primeros habitantes de Europa. |
| A9 | Resumen | Infografía de tres pasos: Paleolítico → Neolítico → Metales | **Recuerda** | Recuerda: primero fueron nómadas cazadores, después agricultores y ganaderos sedentarios, y al final aprendieron a trabajar los metales. |

**Cierre:** se elimina el `destacado` actual y se sustituye por la diapositiva A9, para que el resumen también tenga imagen y voz. Si se prefiere conservar el `destacado`, habría que añadirle soporte de imagen en `theoryView.js` y `game_bundle.js`; no es necesario para esta propuesta.

---

## 4. Presentación B (casilla 5) — Las Edades de la Historia (10 diapositivas)

| # | Idea | Visual propuesto | Texto en pantalla | Locución (resumen) |
|---|---|---|---|---|
| B1 | Portada | Tablillas cuneiformes del British Museum | **La Historia** | Cuando los seres humanos aprendieron a escribir, empezó la Historia. Desde entonces tenemos textos que nos cuentan lo que ocurrió. |
| B2 | La frontera | Tablilla cuneiforme en primer plano | **3500 a.C.: la escritura** | La escritura apareció hacia el 3500 a.C. Esa fecha marca el paso de la Prehistoria a la Historia. |
| B3 | La Edad Antigua | Composición: pirámides de Egipto, Partenón de Grecia y Coliseo de Roma | **Egipto · Grecia · Roma** | En la Edad Antigua florecieron grandes civilizaciones. Egipto, Grecia y Roma nos dejaron templos, leyes, libros y ciudades. |
| B4 | Hispania romana | Acueducto de Segovia o teatro romano de Mérida | **Hispania** | Los romanos conquistaron la península ibérica y la llamaron Hispania. Construyeron calzadas, acueductos y ciudades que aún quedan. |
| B5 | La Edad Media | Castillo medieval (por ejemplo, Loarre) | **476: castillos y señores** | En el año 476 cayó el Imperio romano de Occidente. Empezó la Edad Media, la época de los castillos, los señores feudales y los caballeros. |
| B6 | El reino visigodo | Corona votiva de Recesvinto (Tesoro de Guarrazar) | **El reino visigodo** | Tras los romanos, los visigodos crearon un reino con capital en Toledo. Fue el primer gran reino medieval de la Península. |
| B7 | 711: llega el islam | Arcos de la Mezquita de Córdoba | **711: al-Ándalus** | En el año 711 los musulmanes entraron en la Península y llamaron al-Ándalus a su territorio. Córdoba se convirtió en una ciudad muy importante. |
| B8 | La Edad Moderna | Réplica de la carabela Santa María | **1492: América** | En 1492 Colón llegó a América. Con los Reyes Católicos comenzó en España la Edad Moderna y el comercio con el nuevo continente. |
| B9 | La Edad Contemporánea | *El tres de mayo de 1808*, de Goya, o escena de la Revolución francesa | **1789: una nueva era** | En 1789 estalló la Revolución francesa. Poco después, España luchó contra las tropas de Napoleón en la Guerra de la Independencia. Esta edad llega hasta hoy. |
| B10 | Resumen | Línea de tiempo: **3500 a.C. · 476 · 1492 · 1789** | **Las cuatro edades** | Recuerda el orden: Antigua, Media, Moderna y Contemporánea. Cada una empieza con un cambio importante y la última es en la que vivimos. |

---

## 5. Cambios concretos en `contenido.json`

Solo se reescriben las casillas 2 y 5. Ejemplo del nuevo esquema:

```json
{
  "id": 2,
  "tipo": "teoria",
  "titulo": "2. Presentación: La Prehistoria",
  "descripcion": "Nueve diapositivas con imágenes y explicación por voz.",
  "icono": "🦴",
  "fichas": [
    {
      "titulo": "La Prehistoria",
      "subtitulo": "Desde los primeros humanos hasta la invención de la escritura",
      "icono": "🦴",
      "tarjetas": [
        {
          "nombre": "Nómadas: cazar y recolectar",
          "fecha": "Paleolítico · Hace 2,5 millones de años",
          "icono": "🔥",
          "color": "#ef4444",
          "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_01_edades/assets/a03_paleolitico.jpg",
          "texto": "Nómadas: cazar y recolectar",
          "locucion": "En el Paleolítico las personas eran nómadas: se trasladaban siguiendo a los animales y las estaciones. Vivían de la caza, la pesca y los frutos que recogían. Se refugiaban en cuevas o en campamentos sencillos.",
          "puntos": []
        }
      ]
    }
  ]
}
```

**No se tocan:**

- `juegos.parejas` (7 parejas).
- `juegos.linea_tiempo` (7 eventos).
- Las preguntas de los quizzes 3 y 6.
- La estructura de 6 casillas y las 18 estrellas.

**Sí se actualizan:**

- Títulos y descripciones de las casillas 2 y 5.
- Las tarjetas de teoría (9 + 10).
- La ruta del puzzle a `assets/puzzle.jpg`, si se quiere dejar coherente, aunque no se muestre.

---

## 6. Imágenes y créditos

### 6.1 Carpeta nueva

```text
cap_01_edades/
├── contenido.json
└── assets/
    ├── a01_portada_prehistoria.jpg
    ├── a02_linea_tiempo.jpg
    ├── a03_paleolitico.jpg
    ├── a04_altamira.jpg
    ├── a05_neolitico.jpg
    ├── a06_poblado.jpg
    ├── a07_metales.jpg
    ├── a08_atapuerca.jpg
    ├── a09_resumen_prehistoria.jpg
    ├── b01_portada_historia.jpg
    ├── b02_escritura.jpg
    ├── b03_edad_antigua.jpg
    ├── b04_hispania.jpg
    ├── b05_edad_media.jpg
    ├── b06_visigodos.jpg
    ├── b07_al_andalus.jpg
    ├── b08_edad_moderna.jpg
    ├── b09_contemporanea.jpg
    ├── b10_resumen_edades.jpg
    ├── puzzle.jpg
    └── creditos_imagenes.json
```

### 6.2 Criterios

- **19 imágenes** para las diapositivas + el puzzle existente.
- Formato apaisado 16:9, 1600 × 900 px, JPG de 70–600 KB.
- Las infografías A2, A9 y B10 son **composiciones propias**; el resto son fotografías o ilustraciones de Wikimedia Commons.
- Guardar todo en local: nada de URLs externas en `imagen`.
- Cada archivo tiene su entrada en `assets/creditos_imagenes.json` con título, autor, licencia y página de origen.
- Los montajes A7 y B3 incluyen las fuentes originales dentro de su entrada de créditos.

### 6.3 Candidatos concretos

| Diapositiva | Fuente candidata |
|---|---|
| A4 | Bisonte de la cueva de Altamira |
| A8 | Yacimiento de la Sierra de Atapuerca |
| B2 | Tablilla cuneiforme (dominio público) |
| B4 | Acueducto de Segovia |
| B5 | Castillo de Loarre |
| B6 | Corona votiva de Recesvinto |
| B7 | Arcos de la Mezquita de Córdoba |
| B8 | Réplica de una carabela o mapa del viaje de 1492 |
| B9 | *El tres de mayo de 1808*, de Goya |

Antes de implementar hay que verificar autor, licencia y que la imagen se vea con claridad en el tamaño de la diapositiva.

---

## 7. Trabajo realizado

1. ✅ Crear `cap_01_edades/assets/`.
2. ✅ Buscar, descargar y optimizar las 19 imágenes (1600 × 900).
3. ✅ Redactar las 19 locuciones definitivas.
4. ✅ Reescribir las casillas 2 y 5 de `contenido.json` con `imagen`, `texto`, `locucion` y `puntos`.
5. ✅ Crear `assets/creditos_imagenes.json`.
6. ✅ Mover `puzzle.jpg` a `assets/` y corregir su ruta.
7. ✅ Ejecutar `scripts/actualizar_datos.ps1`.
8. ✅ Probar en local: las 19 diapositivas cargan, la voz se activa, se pausa, se repite y se silencia; el circuito conserva las 18 estrellas.

**Tiempo real:** unas 4 horas, principalmente búsqueda y revisión de imágenes, composición de infografías y redacción de locuciones.

---

## 8. Criterios de aceptación

- ✅ Las dos casillas de teoría se ven como presentaciones, no como fichas de texto.
- ✅ Cada diapositiva tiene una imagen local y un rótulo de **6 palabras o menos**.
- ✅ La voz explica la idea con frases cortas y adecuadas a 10 años.
- ✅ Lo que nombra la voz se distingue en la imagen (por ejemplo, el fuego, el arco, la corona o el acueducto).
- ✅ No hay ninguna imagen enlazada a Internet.
- ✅ El capítulo sigue funcionando sin conexión y suma las mismas 18 estrellas.
- ✅ Los quizzes, las parejas y la línea del tiempo no cambian.

---

## 9. Decisiones tomadas

1. **19 diapositivas (9 + 10).** Se mantiene una idea por diapositiva en lugar de fusionar A5+A6 o B3+B4.
2. **Sustituir los `destacado` por diapositivas de resumen.** Así el cierre también tiene imagen y voz.
3. **El capítulo 2 sigue pendiente.** Continúa en formato antiguo y puede migrarse después con el mismo criterio.
