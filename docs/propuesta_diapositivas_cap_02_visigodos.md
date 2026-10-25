# 👑 Propuesta de diapositivas — Capítulo 2: El Reino Visigodo

> Estado: **implementado** (24 de octubre de 2026).
> Referencia de formato: capítulos 1, 3 y 4 del Tema 6 (presentaciones narradas con imagen, rótulo breve y locución).

## Resultado de la implementación

- Las dos casillas de teoría son presentaciones narradas: **5 + 8 diapositivas**.
- Se creó `cap_02_visigodos/assets/` con **13 imágenes** de diapositivas, `puzzle.jpg` y `creditos_imagenes.json`.
- Cada diapositiva tiene `imagen`, `texto` y `locucion`; `puntos` queda vacío porque la explicación va en la voz.
- Los minijuegos (parejas, línea del tiempo y puzzle) y los quizzes (8 y 12 preguntas) no se modificaron.

---

## 1. Estructura del circuito

Se mantienen las 6 casillas. Solo cambian las dos casillas de teoría, que pasan a ser presentaciones.

| # | Tipo | Título | Cambio |
|---|---|---|---|
| 1 | Minijuego | 1. Juego | Sin cambios (el tema decide el juego) |
| 2 | **Teoría** | **2. Presentación: La llegada de los visigodos** | 5 diapositivas narradas |
| 3 | Quiz | 3. Quiz: La llegada de los Visigodos | Sin cambios (8 preguntas) |
| 4 | Minijuego | 4. Juego | Sin cambios |
| 5 | **Teoría** | **5. Presentación: La vida en el reino visigodo** | 8 diapositivas narradas |
| 6 | Quiz | 6. Quiz: El Reino Visigodo | Sin cambios (12 preguntas) |

**Formato de cada diapositiva:** una idea · una imagen · rótulo de 6 palabras como máximo · locución de 45–80 palabras.

---

## 2. Presentación A (casilla 2) — La llegada de los visigodos

| # | Idea | Imagen | Texto en pantalla | Locución (resumen) |
|---|---|---|---|---|
| A1 | Bienvenida y capital del reino | Panorámica de Toledo | **El reino visigodo** | Durante casi tres siglos los visigodos gobernaron un reino con capital en Toledo. La foto muestra la ciudad actual: los edificios son posteriores; de la época visigoda quedan pocos restos. |
| A2 | Las invasiones del 409 | Mapa de las áreas de asentamiento (409-429) | **409: invasiones germánicas** | Alanos, suevos y vándalos cruzaron los Pirineos y se repartieron el territorio mientras Roma se debilitaba. |
| A3 | El origen del pueblo godo | Mapa «Godos: reinos, culturas y migraciones» | **Godos: reinos y migraciones** | Los visigodos venían del norte de Europa, se desplazaron hacia el mar Negro y el Cáucaso y después entraron en el Imperio romano. |
| A4 | El pacto con Roma y el reparto | Mapa de Europa en 526 | **Un reino en la Península** | Roma pactó con los visigodos; los suevos se quedaron en el noroeste con capital en Braga; los vascos y cántabros vivían con independencia. Capital primero en Tolosa y luego en Toledo. |
| A5 | Recuerda | Infografía: Toledo · 585 · el norte | **Recuerda** | Toledo como capital; en el 585 Leovigildo conquistó a los suevos; cántabros y vascones nunca formaron parte del reino. |

## 3. Presentación B (casilla 5) — La vida en el reino visigodo

| # | Idea | Imagen | Texto en pantalla | Locución (resumen) |
|---|---|---|---|---|
| B1 | El reino se hace católico | *III Concilio de Toledo*, de José Martí y Monsó | **589: Recaredo se hace católico** | Los visigodos eran arrianos y los hispanorromanos católicos. En el 589 Recaredo se convirtió al catolicismo en el Tercer Concilio de Toledo. |
| B2 | La sociedad y los objetos de cada día | Vitrina con cerámicas y metales visigodos | **Objetos de la vida diaria** | La mayoría eran campesinos; creció el mundo rural. La nobleza ocupaba los cargos y también había esclavos. Jarras, hebillas y pendientes muestran la vida cotidiana. |
| B3 | Unas leyes para todos | Página del *Liber Iudiciorum* (Ms. 1109 de Montserrat) | **Un libro de leyes** | Con Recesvinto se reunieron las leyes en un solo libro para todo el reino. La página conservada es una copia posterior. |
| B4 | Iglesias rurales de piedra | Santa María de Quintanilla de las Viñas (Burgos) | **Iglesias pequeñas, en el campo** | Construyeron iglesias pequeñas con grandes sillares y pocas ventanas, con poca luz en el interior. |
| B5 | El arco de herradura | Muro de San Juan de Baños (Palencia) con ventana de arco de herradura | **El arco de herradura** | La curva baja por debajo de la línea de las columnas, como una herradura. Se usaba en puertas y ventanas. |
| B6 | La orfebrería | Detalle de la corona votiva de Recesvinto | **Coronas y joyas de oro** | Trabajaron el oro con perlas y piedras. De la corona cuelgan letras de oro con el nombre del rey; se conserva en el MAN. |
| B7 | El final del reino | *Batalla de Guadalete*, de Mariano Barbasán | **711: el final del reino** | El reino estaba débil por las luchas internas. En el 711 Don Rodrigo fue derrotado en Guadalete y los musulmanes llamaron al-Ándalus al territorio conquistado. |
| B8 | Recuerda | Infografía: 589 · leyes · 711 | **Recuerda** | Recaredo unió el reino en el catolicismo; Recesvinto escribió leyes comunes; en el 711 terminó el reino de Toledo. |

---

## 4. Imágenes y créditos

```text
cap_02_visigodos/
├── contenido.json
└── assets/
    ├── a01_toledo.jpg
    ├── a02_invasiones_409.jpg
    ├── a03_origen_godos.jpg
    ├── a04_reino_anno_526.jpg
    ├── a05_resumen_reino_visigodo.jpg
    ├── b01_concilio_toledo.jpg
    ├── b02_objetos_vida_diaria.jpg
    ├── b03_liber_iudiciorum.jpg
    ├── b04_iglesia_quintanilla.jpg
    ├── b05_arco_herradura.jpg
    ├── b06_corona_votiva.jpg
    ├── b07_batalla_guadalete.jpg
    ├── b08_resumen_vida_reino.jpg
    ├── puzzle.jpg
    └── creditos_imagenes.json
```

- Fotografías y mapas: Wikimedia Commons, con la licencia y la página de origen de cada archivo en `assets/creditos_imagenes.json`.
- Mapas A2, A3 y A4: versiones en español (dos son SVG de Commons y una es un mapa CC0).
- Infografías A5 y B8: composiciones propias de PlayStudy en el estilo de las diapositivas de resumen de los capítulos 1 y 3.
- B3: montaje PlayStudy de la página del manuscrito sobre un fondo claro.
- Todas las imágenes se guardan en local para que la teoría funcione sin conexión.

---

## 5. Criterios de aceptación

- ✅ Las dos casillas de teoría se ven como presentaciones narradas, con imagen en cada diapositiva.
- ✅ Cada diapositiva tiene `imagen`, `texto` (6 palabras o menos) y `locucion`.
- ✅ Lo que nombra la voz se distingue en la imagen (por ejemplo, el arco de herradura, la corona o el mapa del 526).
- ✅ Las diapositivas con mapas o infografías usan `"ajuste_imagen": "completo"`.
- ✅ Los quizzes y los minijuegos no cambian y el circuito suma las mismas 18 estrellas.
- ✅ `npm run datos` valida el contenido y regenera `data/catalogo_data.js` con el capítulo actualizado.
