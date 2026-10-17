// catalogo_data.js - Generado automaticamente para compatibilidad file://
(function() {
  'use strict';
  window.CATALOGO_DATA = {
  "version": "1.0",
  "cursos": [
    {
      "id": "5_primaria",
      "titulo": "5º de Primaria",
      "subtitulo": "Educación Primaria",
      "icono": "🎒",
      "color": "#3b82f6",
      "asignaturas": [
        {
          "id": "ciencias_sociales",
          "titulo": "Ciencias Sociales",
          "subtitulo": "Historia, Geografía y Sociedad",
          "icono": "🌍",
          "color": "#f59e0b",
          "temas": [
            {
              "id": "tema_06_castillos",
              "numero": 6,
              "titulo": "Tema 6: Caminando entre castillos",
              "subtitulo": "La Prehistoria y las Edades de la Historia",
              "icono": "🏰",
              "color": "#8b5cf6",
              "capitulos": [
                {
                  "id": "cap_01_edades",
                  "numero": 1,
                  "titulo": "Capítulo 1: Las Edades de la Historia",
                  "subtitulo": "La Prehistoria, la Historia y sus etapas clave",
                  "icono": "🏛️",
                  "archivo": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_01_edades/contenido.json",
                  "assets_dir": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_01_edades/assets/",
                  "total_estrellas_posibles": 18
                },
                {
                  "id": "cap_02_visigodos",
                  "numero": 2,
                  "titulo": "Capítulo 2: El Reino Visigodo",
                  "subtitulo": "El inicio de la Edad Media española",
                  "icono": "👑",
                  "archivo": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_02_visigodos/contenido.json",
                  "assets_dir": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_02_visigodos/assets/",
                  "total_estrellas_posibles": 18
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
;
  window.CAPITULOS_DATA = {
    "cap_01_edades": {
  "id": "cap_01_edades",
  "curso_id": "5_primaria",
  "asignatura_id": "ciencias_sociales",
  "tema_id": "tema_06_castillos",
  "titulo": "Capítulo 1: Las Edades de la Historia",
  "subtitulo": "Descubre las etapas de la Prehistoria y de la Historia",
  "icono": "🏛️",
  "color_primario": "#f59e0b",
  "color_secundario": "#d97706",
  "es_circular": true,
  "casillas": [
    {
      "id": 1,
      "tipo": "minijuego",
      "subtipo": "parejas",
      "titulo": "1. Parejas del Tiempo",
      "descripcion": "Encuentra las 7 parejas entre las 14 cartas misteriosas.",
      "icono": "🃏",
      "parejas": [
        { "id": "paleolitico", "etiqueta": "Paleolítico", "icono": "🔥", "detalle": "Nómadas, caza y fuego", "color": "#ef4444" },
        { "id": "neolitico", "etiqueta": "Neolítico", "icono": "🌾", "detalle": "Agricultura y poblados", "color": "#10b981" },
        { "id": "metales", "etiqueta": "Edad de los Metales", "icono": "⚔️", "detalle": "Cobre, bronce y hierro", "color": "#f97316" },
        { "id": "antigua", "etiqueta": "Edad Antigua", "icono": "🏛️", "detalle": "Invención de la escritura", "color": "#3b82f6" },
        { "id": "media", "etiqueta": "Edad Media", "icono": "🏰", "detalle": "Castillos y señores feudales", "color": "#8b5cf6" },
        { "id": "moderna", "etiqueta": "Edad Moderna", "icono": "⛵", "detalle": "Llegada a América (1492)", "color": "#06b6d4" },
        { "id": "contemporanea", "etiqueta": "Edad Contemporánea", "icono": "🚀", "detalle": "Desde 1789 hasta hoy", "color": "#ec4899" }
      ]
    },
    {
      "id": 2,
      "tipo": "teoria",
      "titulo": "2. Ficha: La Prehistoria",
      "descripcion": "Aprende las 3 etapas antes de que se inventara la escritura.",
      "icono": "🦴",
      "fichas": [
        {
          "titulo": "La Prehistoria (Hace 2,5 mill. de años - 3500 a.C.)",
          "subtitulo": "Desde la aparición de los primeros humanos hasta inventar la escritura",
          "icono": "🦴",
          "tarjetas": [
            {
              "nombre": "Paleolítico",
              "fecha": "Hace 2,5 mill. de años",
              "icono": "🔥",
              "color": "#ef4444",
              "puntos": [
                "Eran **nómadas**: se desplazaban para cazar, pescar y recolectar frutos.",
                "Descubrieron el dominio del **fuego** y pintaban en cuevas."
              ]
            },
            {
              "nombre": "Neolítico",
              "fecha": "8.000 a.C.",
              "icono": "🌾",
              "color": "#10b981",
              "puntos": [
                "Nació la **agricultura** y la **ganadería**.",
                "Se hicieron **sedentarios** (vivían en un sitio fijo) y crearon poblados."
              ]
            },
            {
              "nombre": "Edad de los Metales",
              "fecha": "5.000 a.C.",
              "icono": "⚔️",
              "color": "#f97316",
              "puntos": [
                "Aprendieron a moldear metales: **Cobre**, **Bronce** y **Hierro**.",
                "Fabricaron herramientas, armas y vasijas más resistentes."
              ]
            }
          ],
          "destacado": {
            "icono": "📍",
            "titulo": "Tesoros prehistóricos en España",
            "texto": "Destacan los fósiles humanos de **Atapuerca** (Burgos) y las pinturas rupestres de **Altamira** (Cantabria)."
          }
        }
      ]
    },
    {
      "id": 3,
      "tipo": "quiz",
      "titulo": "3. Quiz: Prehistoria",
      "descripcion": "Preguntas aleatorias para demostrar lo aprendido sobre la Prehistoria.",
      "icono": "❓",
      "preguntas": [
        {
          "enunciado": "¿Con qué acontecimiento comenzó la Prehistoria hace aproximadamente 2,5 millones de años?",
          "opciones": [
            "Con la aparición de los primeros seres humanos",
            "Con la invención de la rueda de coche",
            "Con la llegada del ser humano a la Luna",
            "Con la construcción de los primeros castillos"
          ],
          "correcta": 0,
          "explicacion": "¡Genial! La Prehistoria se inició hace 2,5 millones de años con la aparición del ser humano."
        },
        {
          "enunciado": "¿Cómo vivían los seres humanos en el Paleolítico antes de descubrir la agricultura?",
          "opciones": [
            "Eran nómadas (se desplazaban para cazar, pescar y recolectar)",
            "Vivían en ciudades con rascacielos y coches",
            "Eran sedentarios en castillos de piedra",
            "Viajaban en trenes de vapor entre poblados"
          ],
          "correcta": 0,
          "explicacion": "¡Exacto! En el Paleolítico eran nómadas y se movían continuamente en busca de alimento y refugio."
        },
        {
          "enunciado": "¿Qué gran descubrimiento del Paleolítico permitió calentarse, cocinar alimentos y ahuyentar fieras?",
          "opciones": [
            "El dominio del fuego",
            "La bombilla eléctrica",
            "La máquina de vapor",
            "La brújula magnética"
          ],
          "correcta": 0,
          "explicacion": "¡Correcto! El dominio del fuego fue fundamental para iluminar las cuevas, cocinar y calentarse."
        },
        {
          "enunciado": "¿Qué dos grandes actividades surgieron hacia el 8.000 a.C. dando inicio al Neolítico?",
          "opciones": [
            "La agricultura y la ganadería",
            "La minería del carbón y el ferrocarril",
            "La pesca con submarinos y la caza con arcos de metal",
            "La navegación a vapor y el comercio espacial"
          ],
          "correcta": 0,
          "explicacion": "¡Genial! Al cultivar plantas y criar animales, las personas transformaron por completo su modo de vida."
        },
        {
          "enunciado": "¿Qué significa que en el Neolítico los humanos se hicieron 'sedentarios'?",
          "opciones": [
            "Que pasaron a vivir en un sitio fijo y crearon poblados",
            "Que viajaban cada semana a un país diferente",
            "Que vivían únicamente flotando en balsas",
            "Que no podían hablar entre ellos"
          ],
          "correcta": 0,
          "explicacion": "¡Muy bien! Se volvieron sedentarios porque tenían que permanecer cerca de sus cultivos y rebaños."
        },
        {
          "enunciado": "¿En qué tres periodos se divide la Edad de los Metales según los materiales que aprendieron a moldear?",
          "opciones": [
            "Edad del Cobre, Edad del Bronce y Edad del Hierro",
            "Edad del Oro, Edad de la Plata y Edad del Diamante",
            "Edad del Plástico, Edad del Vidrio y Edad del Papel",
            "Edad del Carbón, Edad del Petróleo y Edad del Gas"
          ],
          "correcta": 0,
          "explicacion": "¡Así es! Aprendieron a fundir y moldear sucesivamente el cobre, el bronce y finalmente el hierro."
        },
        {
          "enunciado": "¿Qué ventaja aportó el trabajo con metales frente a las herramientas antiguas de piedra?",
          "opciones": [
            "Fabricar herramientas, armas y vasijas mucho más resistentes",
            "Hizo que los utensilios pesaran menos que una pluma",
            "Solo servían como juguetes para los niños",
            "Las herramientas de metal se rompían con más facilidad"
          ],
          "correcta": 0,
          "explicacion": "¡Excelente! Los metales permitieron fabricar instrumentos mucho más duraderos, afilados y resistentes."
        },
        {
          "enunciado": "¿En qué provincia española se encuentra el famoso yacimiento de Atapuerca, conocido por sus fósiles humanos?",
          "opciones": [
            "Burgos",
            "Sevilla",
            "Valencia",
            "Barcelona"
          ],
          "correcta": 0,
          "explicacion": "¡Perfecto! Atapuerca (Burgos) es un tesoro arqueológico mundial para conocer a los primeros humanos de Europa."
        },
        {
          "enunciado": "¿En qué comunidad autónoma se halla la célebre cueva de Altamira, famosa por sus pinturas rupestres?",
          "opciones": [
            "Cantabria",
            "Andalucía",
            "Galicia",
            "Islas Baleares"
          ],
          "correcta": 0,
          "explicacion": "¡Sensacional! Las pinturas de bisontes de la cueva de Altamira están en Cantabria."
        },
        {
          "enunciado": "¿Cuál es el orden cronológico correcto de las tres etapas de la Prehistoria?",
          "opciones": [
            "Paleolítico ➡️ Neolítico ➡️ Edad de los Metales",
            "Edad de los Metales ➡️ Neolítico ➡️ Paleolítico",
            "Neolítico ➡️ Paleolítico ➡️ Edad de los Metales",
            "Paleolítico ➡️ Edad de los Metales ➡️ Neolítico"
          ],
          "correcta": 0,
          "explicacion": "¡Bravo! Primero fue el Paleolítico, después el Neolítico y por último la Edad de los Metales."
        }
      ]
    },
    {
      "id": 4,
      "tipo": "minijuego",
      "subtipo": "puzzle",
      "titulo": "4. Puzzle: ¡Desafío de la Cueva!",
      "descripcion": "Ordena las 6 piezas del dibujo.",
      "icono": "🧩",
      "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_01_edades/assets/puzzle.jpg"
    },
    {
      "id": 5,
      "tipo": "teoria",
      "titulo": "5. Ficha: La Historia",
      "descripcion": "Las 4 grandes edades desde que el ser humano aprendió a escribir.",
      "icono": "📜",
      "fichas": [
        {
          "titulo": "La Historia (Desde 3500 a.C. hasta la actualidad)",
          "subtitulo": "Comienza oficialmente con la invención de la escritura",
          "icono": "📜",
          "tarjetas": [
            {
              "nombre": "Edad Antigua",
              "fecha": "3500 a.C. - 476 d.C.",
              "icono": "🏛️",
              "color": "#3b82f6",
              "puntos": [
                "Civilizaciones: **Egipto, Grecia y Roma**.",
                "Los romanos ocuparon la península y la llamaron **Hispania**."
              ]
            },
            {
              "nombre": "Edad Media",
              "fecha": "476 - 1492",
              "icono": "🏰",
              "color": "#8b5cf6",
              "puntos": [
                "Comenzó con la **caída del Imperio romano**.",
                "Época de señores feudales, castillos y el **reino visigodo**."
              ]
            },
            {
              "nombre": "Edad Moderna",
              "fecha": "1492 - 1789",
              "icono": "⛵",
              "color": "#06b6d4",
              "puntos": [
                "Comenzó con la **llegada de Colón a América** (1492).",
                "Destacó el reinado de los **Reyes Católicos** en España."
              ]
            },
            {
              "nombre": "Contemporánea",
              "fecha": "1789 - Actualidad",
              "icono": "🚀",
              "color": "#ec4899",
              "puntos": [
                "Inició con la **Revolución francesa**.",
                "España luchó en la Guerra de Independencia. Llega hasta hoy."
              ]
            }
          ],
          "destacado": {
            "icono": "💡",
            "titulo": "Dato Clave de la Historia",
            "texto": "¡La invención de la **escritura** marca la frontera entre la Prehistoria y la Historia!"
          }
        }
      ]
    },
    {
      "id": 6,
      "tipo": "quiz",
      "titulo": "6. Quiz: La Historia",
      "descripcion": "Preguntas aleatorias para demostrar lo aprendido sobre las Edades de la Historia.",
      "icono": "🏆",
      "preguntas": [
        {
          "enunciado": "¿Qué invento fundamental marca el inicio de la Historia y el fin de la Prehistoria hacia el 3500 a.C.?",
          "opciones": [
            "La invención de la escritura",
            "El descubrimiento del fuego",
            "La invención del microscopio",
            "El primer automóvil con motor"
          ],
          "correcta": 0,
          "explicacion": "¡Muy bien! Cuando el ser humano aprendió a escribir, comenzó oficialmente la Historia."
        },
        {
          "enunciado": "¿Por qué los historiadores dividen la Historia en distintas etapas o edades?",
          "opciones": [
            "Para facilitar su estudio, separadas por hechos de cambio profundo",
            "Para que los libros de texto no pesaran demasiado",
            "Porque cada siglo cambia el nombre de los planetas",
            "Para que cada época tuviera una bandera de color distinto"
          ],
          "correcta": 0,
          "explicacion": "¡Exacto! Se divide en edades para ordenar su estudio, delimitadas por cambios profundos en la sociedad."
        },
        {
          "enunciado": "¿Cuáles fueron tres de las grandes civilizaciones que florecieron durante la Edad Antigua?",
          "opciones": [
            "La egipcia, la griega y la romana",
            "Los vikingos, los piratas y los samuráis",
            "Los astronautas, los maquinistas y los pilotos",
            "Francia, Reino Unido y Alemania actuales"
          ],
          "correcta": 0,
          "explicacion": "¡Sensacional! Egipto, Grecia y Roma fueron las grandes civilizaciones de la Antigüedad."
        },
        {
          "enunciado": "¿Qué nombre pusieron los romanos a nuestra península ibérica en la Edad Antigua?",
          "opciones": [
            "Hispania",
            "Galia",
            "Britania",
            "Mesopotamia"
          ],
          "correcta": 0,
          "explicacion": "¡Correcto! Los romanos la bautizaron como Hispania, palabra de la que deriva España."
        },
        {
          "enunciado": "¿Qué acontecimiento crucial en el año 476 marcó el final de la Edad Antigua y el inicio de la Edad Media?",
          "opciones": [
            "La caída del Imperio romano",
            "El viaje a América de Cristóbal Colón",
            "La Revolución francesa",
            "La invención del teléfono"
          ],
          "correcta": 0,
          "explicacion": "¡Excelente! La caída del Imperio romano en el año 476 dio paso a la Edad Media."
        },
        {
          "enunciado": "En la península ibérica, ¿qué pueblo fundó su reino al inicio de la Edad Media tras la caída de Roma?",
          "opciones": [
            "El reino visigodo",
            "El imperio azteca",
            "Los antiguos griegos",
            "Los faraones egipcios"
          ],
          "correcta": 0,
          "explicacion": "¡Genial! Los visigodos crearon su reino en la península ibérica durante la Edad Media."
        },
        {
          "enunciado": "¿Qué personajes y fortalezas eran muy característicos de la sociedad en la Edad Media?",
          "opciones": [
            "Los castillos, los señores feudales y los caballeros",
            "Los rascacielos con ascensores y helipuertos",
            "Las fábricas de locomotoras y coches",
            "Los barcos de vapor y los submarinos"
          ],
          "correcta": 0,
          "explicacion": "¡Así es! La Edad Media es la época de los grandes castillos feudales, caballeros y reyes."
        },
        {
          "enunciado": "¿Qué suceso histórico en el año 1492 marcó el comienzo de la Edad Moderna?",
          "opciones": [
            "La llegada de Cristóbal Colón a América",
            "La construcción de las pirámides de Egipto",
            "La caída de la ciudad de Numancia",
            "El inicio de los primeros Juegos Olímpicos"
          ],
          "correcta": 0,
          "explicacion": "¡Perfecto! La expedición de Colón al continente americano en 1492 inició la Edad Moderna."
        },
        {
          "enunciado": "¿Qué monarcas gobernaron en España marcando el inicio de la Edad Moderna española?",
          "opciones": [
            "Los Reyes Católicos (Isabel y Fernando)",
            "Los emperadores romanos",
            "Los reyes godos de Toledo",
            "Los faraones de Egipto"
          ],
          "correcta": 0,
          "explicacion": "¡Muy bien! El reinado de los Reyes Católicos simboliza el paso de España a la Edad Moderna."
        },
        {
          "enunciado": "¿Con qué gran revolución comenzó la Edad Contemporánea en el año 1789?",
          "opciones": [
            "La Revolución francesa",
            "La Revolución industrial de los romanos",
            "La Guerra de Troya",
            "La caída del Imperio egipcio"
          ],
          "correcta": 0,
          "explicacion": "¡Bravo! La Revolución francesa de 1789 marcó el comienzo de la Edad Contemporánea."
        },
        {
          "enunciado": "Al inicio de la Edad Contemporánea, ¿a qué país se enfrentó España en la Guerra de la Independencia?",
          "opciones": [
            "A Francia (tropas de Napoleón)",
            "A Egipto",
            "A Grecia",
            "A Japón"
          ],
          "correcta": 0,
          "explicacion": "¡Exacto! El pueblo español luchó contra la invasión napoleónica francesa en la Guerra de la Independencia."
        },
        {
          "enunciado": "¿Hasta qué momento histórico se extiende la Edad Contemporánea?",
          "opciones": [
            "Hasta la actualidad (nuestros días)",
            "Terminó en el año 1900",
            "Terminó con la llegada del año 2000",
            "Duró solamente 50 años"
          ],
          "correcta": 0,
          "explicacion": "¡Eso es! La Edad Contemporánea llega hasta hoy; ¡nosotros vivimos actualmente en ella!"
        },
        {
          "enunciado": "¿Cuál es el orden cronológico correcto de las cuatro Edades de la Historia?",
          "opciones": [
            "Edad Antigua ➡️ Edad Media ➡️ Edad Moderna ➡️ Edad Contemporánea",
            "Edad Contemporánea ➡️ Edad Moderna ➡️ Edad Media ➡️ Edad Antigua",
            "Edad Media ➡️ Edad Antigua ➡️ Edad Contemporánea ➡️ Edad Moderna",
            "Edad Antigua ➡️ Edad Moderna ➡️ Edad Media ➡️ Edad Contemporánea"
          ],
          "correcta": 0,
          "explicacion": "¡Magistral! El orden es: Antigua (3500 a.C.), Media (476), Moderna (1492) y Contemporánea (desde 1789)."
        }
      ]
    }
  ]
}
,
    "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_01_edades/contenido.json": {
  "id": "cap_01_edades",
  "curso_id": "5_primaria",
  "asignatura_id": "ciencias_sociales",
  "tema_id": "tema_06_castillos",
  "titulo": "Capítulo 1: Las Edades de la Historia",
  "subtitulo": "Descubre las etapas de la Prehistoria y de la Historia",
  "icono": "🏛️",
  "color_primario": "#f59e0b",
  "color_secundario": "#d97706",
  "es_circular": true,
  "casillas": [
    {
      "id": 1,
      "tipo": "minijuego",
      "subtipo": "parejas",
      "titulo": "1. Parejas del Tiempo",
      "descripcion": "Encuentra las 7 parejas entre las 14 cartas misteriosas.",
      "icono": "🃏",
      "parejas": [
        { "id": "paleolitico", "etiqueta": "Paleolítico", "icono": "🔥", "detalle": "Nómadas, caza y fuego", "color": "#ef4444" },
        { "id": "neolitico", "etiqueta": "Neolítico", "icono": "🌾", "detalle": "Agricultura y poblados", "color": "#10b981" },
        { "id": "metales", "etiqueta": "Edad de los Metales", "icono": "⚔️", "detalle": "Cobre, bronce y hierro", "color": "#f97316" },
        { "id": "antigua", "etiqueta": "Edad Antigua", "icono": "🏛️", "detalle": "Invención de la escritura", "color": "#3b82f6" },
        { "id": "media", "etiqueta": "Edad Media", "icono": "🏰", "detalle": "Castillos y señores feudales", "color": "#8b5cf6" },
        { "id": "moderna", "etiqueta": "Edad Moderna", "icono": "⛵", "detalle": "Llegada a América (1492)", "color": "#06b6d4" },
        { "id": "contemporanea", "etiqueta": "Edad Contemporánea", "icono": "🚀", "detalle": "Desde 1789 hasta hoy", "color": "#ec4899" }
      ]
    },
    {
      "id": 2,
      "tipo": "teoria",
      "titulo": "2. Ficha: La Prehistoria",
      "descripcion": "Aprende las 3 etapas antes de que se inventara la escritura.",
      "icono": "🦴",
      "fichas": [
        {
          "titulo": "La Prehistoria (Hace 2,5 mill. de años - 3500 a.C.)",
          "subtitulo": "Desde la aparición de los primeros humanos hasta inventar la escritura",
          "icono": "🦴",
          "tarjetas": [
            {
              "nombre": "Paleolítico",
              "fecha": "Hace 2,5 mill. de años",
              "icono": "🔥",
              "color": "#ef4444",
              "puntos": [
                "Eran **nómadas**: se desplazaban para cazar, pescar y recolectar frutos.",
                "Descubrieron el dominio del **fuego** y pintaban en cuevas."
              ]
            },
            {
              "nombre": "Neolítico",
              "fecha": "8.000 a.C.",
              "icono": "🌾",
              "color": "#10b981",
              "puntos": [
                "Nació la **agricultura** y la **ganadería**.",
                "Se hicieron **sedentarios** (vivían en un sitio fijo) y crearon poblados."
              ]
            },
            {
              "nombre": "Edad de los Metales",
              "fecha": "5.000 a.C.",
              "icono": "⚔️",
              "color": "#f97316",
              "puntos": [
                "Aprendieron a moldear metales: **Cobre**, **Bronce** y **Hierro**.",
                "Fabricaron herramientas, armas y vasijas más resistentes."
              ]
            }
          ],
          "destacado": {
            "icono": "📍",
            "titulo": "Tesoros prehistóricos en España",
            "texto": "Destacan los fósiles humanos de **Atapuerca** (Burgos) y las pinturas rupestres de **Altamira** (Cantabria)."
          }
        }
      ]
    },
    {
      "id": 3,
      "tipo": "quiz",
      "titulo": "3. Quiz: Prehistoria",
      "descripcion": "Preguntas aleatorias para demostrar lo aprendido sobre la Prehistoria.",
      "icono": "❓",
      "preguntas": [
        {
          "enunciado": "¿Con qué acontecimiento comenzó la Prehistoria hace aproximadamente 2,5 millones de años?",
          "opciones": [
            "Con la aparición de los primeros seres humanos",
            "Con la invención de la rueda de coche",
            "Con la llegada del ser humano a la Luna",
            "Con la construcción de los primeros castillos"
          ],
          "correcta": 0,
          "explicacion": "¡Genial! La Prehistoria se inició hace 2,5 millones de años con la aparición del ser humano."
        },
        {
          "enunciado": "¿Cómo vivían los seres humanos en el Paleolítico antes de descubrir la agricultura?",
          "opciones": [
            "Eran nómadas (se desplazaban para cazar, pescar y recolectar)",
            "Vivían en ciudades con rascacielos y coches",
            "Eran sedentarios en castillos de piedra",
            "Viajaban en trenes de vapor entre poblados"
          ],
          "correcta": 0,
          "explicacion": "¡Exacto! En el Paleolítico eran nómadas y se movían continuamente en busca de alimento y refugio."
        },
        {
          "enunciado": "¿Qué gran descubrimiento del Paleolítico permitió calentarse, cocinar alimentos y ahuyentar fieras?",
          "opciones": [
            "El dominio del fuego",
            "La bombilla eléctrica",
            "La máquina de vapor",
            "La brújula magnética"
          ],
          "correcta": 0,
          "explicacion": "¡Correcto! El dominio del fuego fue fundamental para iluminar las cuevas, cocinar y calentarse."
        },
        {
          "enunciado": "¿Qué dos grandes actividades surgieron hacia el 8.000 a.C. dando inicio al Neolítico?",
          "opciones": [
            "La agricultura y la ganadería",
            "La minería del carbón y el ferrocarril",
            "La pesca con submarinos y la caza con arcos de metal",
            "La navegación a vapor y el comercio espacial"
          ],
          "correcta": 0,
          "explicacion": "¡Genial! Al cultivar plantas y criar animales, las personas transformaron por completo su modo de vida."
        },
        {
          "enunciado": "¿Qué significa que en el Neolítico los humanos se hicieron 'sedentarios'?",
          "opciones": [
            "Que pasaron a vivir en un sitio fijo y crearon poblados",
            "Que viajaban cada semana a un país diferente",
            "Que vivían únicamente flotando en balsas",
            "Que no podían hablar entre ellos"
          ],
          "correcta": 0,
          "explicacion": "¡Muy bien! Se volvieron sedentarios porque tenían que permanecer cerca de sus cultivos y rebaños."
        },
        {
          "enunciado": "¿En qué tres periodos se divide la Edad de los Metales según los materiales que aprendieron a moldear?",
          "opciones": [
            "Edad del Cobre, Edad del Bronce y Edad del Hierro",
            "Edad del Oro, Edad de la Plata y Edad del Diamante",
            "Edad del Plástico, Edad del Vidrio y Edad del Papel",
            "Edad del Carbón, Edad del Petróleo y Edad del Gas"
          ],
          "correcta": 0,
          "explicacion": "¡Así es! Aprendieron a fundir y moldear sucesivamente el cobre, el bronce y finalmente el hierro."
        },
        {
          "enunciado": "¿Qué ventaja aportó el trabajo con metales frente a las herramientas antiguas de piedra?",
          "opciones": [
            "Fabricar herramientas, armas y vasijas mucho más resistentes",
            "Hizo que los utensilios pesaran menos que una pluma",
            "Solo servían como juguetes para los niños",
            "Las herramientas de metal se rompían con más facilidad"
          ],
          "correcta": 0,
          "explicacion": "¡Excelente! Los metales permitieron fabricar instrumentos mucho más duraderos, afilados y resistentes."
        },
        {
          "enunciado": "¿En qué provincia española se encuentra el famoso yacimiento de Atapuerca, conocido por sus fósiles humanos?",
          "opciones": [
            "Burgos",
            "Sevilla",
            "Valencia",
            "Barcelona"
          ],
          "correcta": 0,
          "explicacion": "¡Perfecto! Atapuerca (Burgos) es un tesoro arqueológico mundial para conocer a los primeros humanos de Europa."
        },
        {
          "enunciado": "¿En qué comunidad autónoma se halla la célebre cueva de Altamira, famosa por sus pinturas rupestres?",
          "opciones": [
            "Cantabria",
            "Andalucía",
            "Galicia",
            "Islas Baleares"
          ],
          "correcta": 0,
          "explicacion": "¡Sensacional! Las pinturas de bisontes de la cueva de Altamira están en Cantabria."
        },
        {
          "enunciado": "¿Cuál es el orden cronológico correcto de las tres etapas de la Prehistoria?",
          "opciones": [
            "Paleolítico ➡️ Neolítico ➡️ Edad de los Metales",
            "Edad de los Metales ➡️ Neolítico ➡️ Paleolítico",
            "Neolítico ➡️ Paleolítico ➡️ Edad de los Metales",
            "Paleolítico ➡️ Edad de los Metales ➡️ Neolítico"
          ],
          "correcta": 0,
          "explicacion": "¡Bravo! Primero fue el Paleolítico, después el Neolítico y por último la Edad de los Metales."
        }
      ]
    },
    {
      "id": 4,
      "tipo": "minijuego",
      "subtipo": "puzzle",
      "titulo": "4. Puzzle: ¡Desafío de la Cueva!",
      "descripcion": "Ordena las 6 piezas del dibujo.",
      "icono": "🧩",
      "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_01_edades/assets/puzzle.jpg"
    },
    {
      "id": 5,
      "tipo": "teoria",
      "titulo": "5. Ficha: La Historia",
      "descripcion": "Las 4 grandes edades desde que el ser humano aprendió a escribir.",
      "icono": "📜",
      "fichas": [
        {
          "titulo": "La Historia (Desde 3500 a.C. hasta la actualidad)",
          "subtitulo": "Comienza oficialmente con la invención de la escritura",
          "icono": "📜",
          "tarjetas": [
            {
              "nombre": "Edad Antigua",
              "fecha": "3500 a.C. - 476 d.C.",
              "icono": "🏛️",
              "color": "#3b82f6",
              "puntos": [
                "Civilizaciones: **Egipto, Grecia y Roma**.",
                "Los romanos ocuparon la península y la llamaron **Hispania**."
              ]
            },
            {
              "nombre": "Edad Media",
              "fecha": "476 - 1492",
              "icono": "🏰",
              "color": "#8b5cf6",
              "puntos": [
                "Comenzó con la **caída del Imperio romano**.",
                "Época de señores feudales, castillos y el **reino visigodo**."
              ]
            },
            {
              "nombre": "Edad Moderna",
              "fecha": "1492 - 1789",
              "icono": "⛵",
              "color": "#06b6d4",
              "puntos": [
                "Comenzó con la **llegada de Colón a América** (1492).",
                "Destacó el reinado de los **Reyes Católicos** en España."
              ]
            },
            {
              "nombre": "Contemporánea",
              "fecha": "1789 - Actualidad",
              "icono": "🚀",
              "color": "#ec4899",
              "puntos": [
                "Inició con la **Revolución francesa**.",
                "España luchó en la Guerra de Independencia. Llega hasta hoy."
              ]
            }
          ],
          "destacado": {
            "icono": "💡",
            "titulo": "Dato Clave de la Historia",
            "texto": "¡La invención de la **escritura** marca la frontera entre la Prehistoria y la Historia!"
          }
        }
      ]
    },
    {
      "id": 6,
      "tipo": "quiz",
      "titulo": "6. Quiz: La Historia",
      "descripcion": "Preguntas aleatorias para demostrar lo aprendido sobre las Edades de la Historia.",
      "icono": "🏆",
      "preguntas": [
        {
          "enunciado": "¿Qué invento fundamental marca el inicio de la Historia y el fin de la Prehistoria hacia el 3500 a.C.?",
          "opciones": [
            "La invención de la escritura",
            "El descubrimiento del fuego",
            "La invención del microscopio",
            "El primer automóvil con motor"
          ],
          "correcta": 0,
          "explicacion": "¡Muy bien! Cuando el ser humano aprendió a escribir, comenzó oficialmente la Historia."
        },
        {
          "enunciado": "¿Por qué los historiadores dividen la Historia en distintas etapas o edades?",
          "opciones": [
            "Para facilitar su estudio, separadas por hechos de cambio profundo",
            "Para que los libros de texto no pesaran demasiado",
            "Porque cada siglo cambia el nombre de los planetas",
            "Para que cada época tuviera una bandera de color distinto"
          ],
          "correcta": 0,
          "explicacion": "¡Exacto! Se divide en edades para ordenar su estudio, delimitadas por cambios profundos en la sociedad."
        },
        {
          "enunciado": "¿Cuáles fueron tres de las grandes civilizaciones que florecieron durante la Edad Antigua?",
          "opciones": [
            "La egipcia, la griega y la romana",
            "Los vikingos, los piratas y los samuráis",
            "Los astronautas, los maquinistas y los pilotos",
            "Francia, Reino Unido y Alemania actuales"
          ],
          "correcta": 0,
          "explicacion": "¡Sensacional! Egipto, Grecia y Roma fueron las grandes civilizaciones de la Antigüedad."
        },
        {
          "enunciado": "¿Qué nombre pusieron los romanos a nuestra península ibérica en la Edad Antigua?",
          "opciones": [
            "Hispania",
            "Galia",
            "Britania",
            "Mesopotamia"
          ],
          "correcta": 0,
          "explicacion": "¡Correcto! Los romanos la bautizaron como Hispania, palabra de la que deriva España."
        },
        {
          "enunciado": "¿Qué acontecimiento crucial en el año 476 marcó el final de la Edad Antigua y el inicio de la Edad Media?",
          "opciones": [
            "La caída del Imperio romano",
            "El viaje a América de Cristóbal Colón",
            "La Revolución francesa",
            "La invención del teléfono"
          ],
          "correcta": 0,
          "explicacion": "¡Excelente! La caída del Imperio romano en el año 476 dio paso a la Edad Media."
        },
        {
          "enunciado": "En la península ibérica, ¿qué pueblo fundó su reino al inicio de la Edad Media tras la caída de Roma?",
          "opciones": [
            "El reino visigodo",
            "El imperio azteca",
            "Los antiguos griegos",
            "Los faraones egipcios"
          ],
          "correcta": 0,
          "explicacion": "¡Genial! Los visigodos crearon su reino en la península ibérica durante la Edad Media."
        },
        {
          "enunciado": "¿Qué personajes y fortalezas eran muy característicos de la sociedad en la Edad Media?",
          "opciones": [
            "Los castillos, los señores feudales y los caballeros",
            "Los rascacielos con ascensores y helipuertos",
            "Las fábricas de locomotoras y coches",
            "Los barcos de vapor y los submarinos"
          ],
          "correcta": 0,
          "explicacion": "¡Así es! La Edad Media es la época de los grandes castillos feudales, caballeros y reyes."
        },
        {
          "enunciado": "¿Qué suceso histórico en el año 1492 marcó el comienzo de la Edad Moderna?",
          "opciones": [
            "La llegada de Cristóbal Colón a América",
            "La construcción de las pirámides de Egipto",
            "La caída de la ciudad de Numancia",
            "El inicio de los primeros Juegos Olímpicos"
          ],
          "correcta": 0,
          "explicacion": "¡Perfecto! La expedición de Colón al continente americano en 1492 inició la Edad Moderna."
        },
        {
          "enunciado": "¿Qué monarcas gobernaron en España marcando el inicio de la Edad Moderna española?",
          "opciones": [
            "Los Reyes Católicos (Isabel y Fernando)",
            "Los emperadores romanos",
            "Los reyes godos de Toledo",
            "Los faraones de Egipto"
          ],
          "correcta": 0,
          "explicacion": "¡Muy bien! El reinado de los Reyes Católicos simboliza el paso de España a la Edad Moderna."
        },
        {
          "enunciado": "¿Con qué gran revolución comenzó la Edad Contemporánea en el año 1789?",
          "opciones": [
            "La Revolución francesa",
            "La Revolución industrial de los romanos",
            "La Guerra de Troya",
            "La caída del Imperio egipcio"
          ],
          "correcta": 0,
          "explicacion": "¡Bravo! La Revolución francesa de 1789 marcó el comienzo de la Edad Contemporánea."
        },
        {
          "enunciado": "Al inicio de la Edad Contemporánea, ¿a qué país se enfrentó España en la Guerra de la Independencia?",
          "opciones": [
            "A Francia (tropas de Napoleón)",
            "A Egipto",
            "A Grecia",
            "A Japón"
          ],
          "correcta": 0,
          "explicacion": "¡Exacto! El pueblo español luchó contra la invasión napoleónica francesa en la Guerra de la Independencia."
        },
        {
          "enunciado": "¿Hasta qué momento histórico se extiende la Edad Contemporánea?",
          "opciones": [
            "Hasta la actualidad (nuestros días)",
            "Terminó en el año 1900",
            "Terminó con la llegada del año 2000",
            "Duró solamente 50 años"
          ],
          "correcta": 0,
          "explicacion": "¡Eso es! La Edad Contemporánea llega hasta hoy; ¡nosotros vivimos actualmente en ella!"
        },
        {
          "enunciado": "¿Cuál es el orden cronológico correcto de las cuatro Edades de la Historia?",
          "opciones": [
            "Edad Antigua ➡️ Edad Media ➡️ Edad Moderna ➡️ Edad Contemporánea",
            "Edad Contemporánea ➡️ Edad Moderna ➡️ Edad Media ➡️ Edad Antigua",
            "Edad Media ➡️ Edad Antigua ➡️ Edad Contemporánea ➡️ Edad Moderna",
            "Edad Antigua ➡️ Edad Moderna ➡️ Edad Media ➡️ Edad Contemporánea"
          ],
          "correcta": 0,
          "explicacion": "¡Magistral! El orden es: Antigua (3500 a.C.), Media (476), Moderna (1492) y Contemporánea (desde 1789)."
        }
      ]
    }
  ]
}
,
    "cap_02_visigodos": {
  "id": "cap_02_visigodos",
  "curso_id": "5_primaria",
  "asignatura_id": "ciencias_sociales",
  "tema_id": "tema_06_castillos",
  "titulo": "Capítulo 2: El Reino Visigodo",
  "subtitulo": "El inicio de la Edad Media española",
  "icono": "👑",
  "color_primario": "#8b5cf6",
  "color_secundario": "#7c3aed",
  "es_circular": true,
  "casillas": [
    {
      "id": 1,
      "tipo": "minijuego",
      "subtipo": "parejas",
      "titulo": "1. Parejas Visigodas",
      "descripcion": "Encuentra las 7 parejas entre los reyes, pueblos y conceptos visigodos.",
      "icono": "🃏",
      "parejas": [
        { "id": "leovigildo", "etiqueta": "Leovigildo", "icono": "👑", "detalle": "Unificó el reino visigodo", "color": "#8b5cf6" },
        { "id": "recaredo", "etiqueta": "Recaredo", "icono": "✝️", "detalle": "Se convirtió al catolicismo (589)", "color": "#ec4899" },
        { "id": "suevos", "etiqueta": "Suevos", "icono": "🗺️", "detalle": "Capital en Braga (noroeste)", "color": "#3b82f6" },
        { "id": "toledo", "etiqueta": "Toledo", "icono": "🏰", "detalle": "Capital del reino visigodo", "color": "#f97316" },
        { "id": "nobleza", "etiqueta": "Nobleza", "icono": "🎖️", "detalle": "Ocupaban los cargos políticos", "color": "#10b981" },
        { "id": "campesinado", "etiqueta": "Campesinado", "icono": "🌾", "detalle": "Mayoría de la población", "color": "#f59e0b" },
        { "id": "herradura", "etiqueta": "Arco de herradura", "icono": "🏛️", "detalle": "Arte visigodo característico", "color": "#06b6d4" }
      ]
    },
    {
      "id": 2,
      "tipo": "teoria",
      "titulo": "2. Ficha: La llegada de los Visigodos",
      "descripcion": "Descubre cómo los pueblos germánicos llegaron a Hispania.",
      "icono": "⚔️",
      "fichas": [
        {
          "titulo": "La llegada de los Visigodos (Siglo V d.C.)",
          "subtitulo": "Los pueblos bárbaros invaden la Hispania romana",
          "icono": "⚔️",
          "tarjetas": [
            {
              "nombre": "La invasión bárbara",
              "fecha": "Principios del siglo V",
              "icono": "🌊",
              "color": "#ef4444",
              "puntos": [
                "La Hispania romana fue invadida por **alanos**, **suevos**, **vándalos** y **visigodos**, procedentes del Cáucaso y de origen escandinavo.",
                "Los **cántabros** y **vascones** del área cantábrica no formaron ningún reino y resistieron a los invasores."
              ]
            },
            {
              "nombre": "El pacto romano-visigodo",
              "fecha": "Siglo V",
              "icono": "🤝",
              "color": "#3b82f6",
              "puntos": [
                "El ejército romano necesitaba ayuda para frenar la invasión, por lo que pactó con los **visigodos** que podían instalarse en Hispania si derrotaban a los demás invasores.",
                "Los visigodos expulsaron a **alanos** y **vándalos**, mientras que los **suevos** permanecieron en el noroeste con capital en **Braga**."
              ]
            },
            {
              "nombre": "El Reino Visigodo",
              "fecha": "Siglo VI",
              "icono": "👑",
              "color": "#8b5cf6",
              "puntos": [
                "Los visigodos establecieron su capital en **Toledo**. Su reino se extendía por casi toda la península Ibérica, incluyendo parte del sur de la actual Francia.",
                "El rey **Leovigildo** conquistó el reino suevo en el año **585**, logrando dominar todo el territorio peninsular."
              ]
            }
          ],
          "destacado": {
            "icono": "📍",
            "titulo": "Pueblos que resistieron",
            "texto": "Los **cántabros** y los **vascones** del área cantábrica nunca fueron dominados por los visigodos, manteniendo su independencia."
          }
        }
      ]
    },
    {
      "id": 3,
      "tipo": "quiz",
      "titulo": "3. Quiz: La llegada de los Visigodos",
      "descripcion": "Preguntas aleatorias sobre los pueblos que invadieron Hispania.",
      "icono": "❓",
      "preguntas": [
        {
          "enunciado": "¿Qué pueblos invadieron la Hispania romana a principios del siglo V?",
          "opciones": [
            "Alanos, suevos, vándalos y visigodos",
            "Griegos, romanos, fenicios y cartagineses",
            "Vikingos, celtas, iberos y tartesios",
            "Francos, hunos, sajones y normandos"
          ],
          "correcta": 0,
          "explicacion": "¡Muy bien! Alanos, suevos, vándalos y visigodos invadieron Hispania procedentes del norte y el este de Europa."
        },
        {
          "enunciado": "¿Qué pueblos del área cantábrica NO formaron ningún reino y resistieron a los visigodos?",
          "opciones": [
            "Los cántabros y los vascones",
            "Los suevos y los alanos",
            "Los vándalos y los francos",
            "Los romanos y los griegos"
          ],
          "correcta": 0,
          "explicacion": "¡Exacto! Los cántabros y los vascones mantuvieron su independencia y no fueron sometidos por los visigodos."
        },
        {
          "enunciado": "¿Por qué el ejército romano pactó con los visigodos?",
          "opciones": [
            "Necesitaba ayuda para frenar la invasión de otros pueblos",
            "Quería que los visigodos construyeran castillos",
            "Para que enseñaran latín a los demás pueblos",
            "Porque los visigodos tenían los mejores barcos"
          ],
          "correcta": 0,
          "explicacion": "¡Correcto! Roma negoció con los visigodos: podían instalarse en Hispania a cambio de expulsar a los otros invasores."
        },
        {
          "enunciado": "¿Dónde se estableció la capital del reino visigodo?",
          "opciones": [
            "Toledo (Toletum)",
            "Braga (Bracara Augusta)",
            "Sevilla (Hispalis)",
            "Zaragoza (Caesaraugusta)"
          ],
          "correcta": 0,
          "explicacion": "¡Genial! Toledo, llamada Toletum en latín, fue la capital del reino visigodo durante todo su período."
        },
        {
          "enunciado": "¿Dónde estaba la capital del reino de los suevos?",
          "opciones": [
            "Braga (Bracara Augusta), en el noroeste",
            "Toledo, en el centro",
            "Pamplona, en el norte",
            "Mérida, en el suroeste"
          ],
          "correcta": 0,
          "explicacion": "¡Perfecto! Los suevos establecieron su capital en Braga (Bracara Augusta), en el noroeste de la Península."
        },
        {
          "enunciado": "¿Qué rey visigodo conquistó el reino suevo en el año 585?",
          "opciones": [
            "Leovigildo",
            "Recaredo",
            "Recesvinto",
            "Ataulfo"
          ],
          "correcta": 0,
          "explicacion": "¡Estupendo! Leovigildo conquistó el reino suevo en el 585, logrando unificar toda la Península Ibérica."
        },
        {
          "enunciado": "¿Cuál era el origen de los visigodos?",
          "opciones": [
            "Procedían de la región del Cáucaso y eran de origen escandinavo",
            "Eran de la Península Ibérica desde siempre",
            "Procedían del norte de África",
            "Venían de la India y Asia Central"
          ],
          "correcta": 0,
          "explicacion": "¡Así es! Los visigodos (y otros pueblos germánicos) procedían del Cáucaso y tenían origen escandinavo."
        },
        {
          "enunciado": "¿Cuál es el orden correcto de los reyes visigodos más importantes estudiados?",
          "opciones": [
            "Leovigildo ➡️ Recaredo ➡️ Recesvinto",
            "Recaredo ➡️ Leovigildo ➡️ Recesvinto",
            "Recesvinto ➡️ Recaredo ➡️ Leovigildo",
            "Leovigildo ➡️ Recesvinto ➡️ Recaredo"
          ],
          "correcta": 0,
          "explicacion": "¡Correcto! Primero Leovigildo unificó el reino, después Recaredo se convirtió al catolicismo, y más tarde Recesvinto creó leyes comunes."
        }
      ]
    },
    {
      "id": 4,
      "tipo": "minijuego",
      "subtipo": "puzzle",
      "titulo": "4. Puzzle: ¡La Península Visigoda!",
      "descripcion": "Ordena las 6 piezas del mapa visigodo.",
      "icono": "🧩",
      "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_02_visigodos/assets/puzzle.jpg"
    },
    {
      "id": 5,
      "tipo": "teoria",
      "titulo": "5. Ficha: La vida en el Reino Visigodo",
      "descripcion": "Conoce cómo era la sociedad, la religión y el arte de los visigodos.",
      "icono": "🏰",
      "fichas": [
        {
          "titulo": "La vida en el Reino Visigodo",
          "subtitulo": "Religión, sociedad y arte en el reino medieval hispano",
          "icono": "🏰",
          "tarjetas": [
            {
              "nombre": "La religión: el catolicismo",
              "fecha": "Año 589",
              "icono": "✝️",
              "color": "#ec4899",
              "puntos": [
                "Los hispanorromanos eran **católicos**, pero los visigodos eran **arrianos** (diferente versión del cristianismo). Esto causaba división.",
                "En el año **589**, el rey **Recaredo** abandonó el arrianismo y se convirtió al **catolicismo**, uniendo religiosamente a todo el reino."
              ]
            },
            {
              "nombre": "La sociedad visigoda",
              "fecha": "Siglos V-VIII",
              "icono": "👥",
              "color": "#f59e0b",
              "puntos": [
                "Con los visigodos disminuyó el comercio y la artesanía, pero **aumentó la agricultura y la ganadería**. Existían grandes diferencias entre los grupos sociales.",
                "La **nobleza** (minoría) ocupaba los cargos políticos y de la Iglesia. El **campesinado** era la mayoría y trabajaba las tierras. También había esclavos."
              ]
            },
            {
              "nombre": "Las leyes comunes",
              "fecha": "Reinado de Recesvinto",
              "icono": "📜",
              "color": "#10b981",
              "puntos": [
                "Al principio, visigodos e hispanorromanos no compartían ni religión ni leyes. Había profunda división.",
                "Durante el reinado de **Recesvinto** se elaboraron **leyes comunes** para todo el reino, lo que aumentó la unidad."
              ]
            },
            {
              "nombre": "El Arte Visigodo",
              "fecha": "Siglos V-VIII",
              "icono": "⛪",
              "color": "#06b6d4",
              "puntos": [
                "El arte visigodo experimentó un **declive** frente a los grandes monumentos romanos. Se caracterizó por la construcción de **pequeñas iglesias rurales** con pocas ventanas y **arcos de herradura**.",
                "Destacó la **orfebrería**: la creación de piezas artísticas con metal, como las famosas coronas votivas."
              ]
            }
          ],
          "destacado": {
            "icono": "🏛️",
            "titulo": "Iglesia visigoda famosa",
            "texto": "La iglesia de **San Juan de Baños de Cerrato** (Palencia) es uno de los mejores ejemplos conservados de la arquitectura visigoda, con su característico **arco de herradura**."
          }
        }
      ]
    },
    {
      "id": 6,
      "tipo": "quiz",
      "titulo": "6. Quiz: El Reino Visigodo",
      "descripcion": "Preguntas aleatorias sobre la vida, sociedad y arte en el reino visigodo.",
      "icono": "🏆",
      "preguntas": [
        {
          "enunciado": "¿Qué diferencia religiosa existía entre los hispanorromanos y los visigodos al principio?",
          "opciones": [
            "Los hispanorromanos eran católicos y los visigodos arrianos",
            "Los hispanorromanos eran musulmanes y los visigodos católicos",
            "Ambos grupos eran católicos desde el principio",
            "Los visigodos eran budistas y los hispanorromanos paganos"
          ],
          "correcta": 0,
          "explicacion": "¡Muy bien! Los hispanorromanos eran católicos mientras que los visigodos seguían el arrianismo, lo que generaba división en el reino."
        },
        {
          "enunciado": "¿Qué decisión tomó el rey Recaredo en el año 589 para unir al pueblo?",
          "opciones": [
            "Se convirtió al catolicismo, abandonando el arrianismo",
            "Expulsó a todos los hispanorromanos del reino",
            "Declaró el islam como religión oficial",
            "Prohibió todas las religiones en el reino"
          ],
          "correcta": 0,
          "explicacion": "¡Exacto! En el 589, Recaredo adoptó el catolicismo, lo que unificó religiosamente a visigodos e hispanorromanos."
        },
        {
          "enunciado": "¿Cómo cambió la economía con la llegada de los visigodos?",
          "opciones": [
            "Disminuyó el comercio pero aumentó la agricultura y la ganadería",
            "Aumentó el comercio marítimo con América",
            "Se desarrollaron mucho la industria y las fábricas",
            "Todo siguió exactamente igual que con los romanos"
          ],
          "correcta": 0,
          "explicacion": "¡Correcto! Con los visigodos el comercio y la artesanía decayeron, pero creció la importancia del mundo rural: la agricultura y ganadería."
        },
        {
          "enunciado": "¿Qué grupo social era la minoría privilegiada en el reino visigodo?",
          "opciones": [
            "La nobleza, que ocupaba los cargos políticos y de la Iglesia",
            "El campesinado, que gobernaba las ciudades",
            "Los artesanos, que controlaban el comercio",
            "Los esclavos, que dirigían el ejército"
          ],
          "correcta": 0,
          "explicacion": "¡Genial! La nobleza era una minoría que ostentaba los principales cargos políticos y religiosos del reino."
        },
        {
          "enunciado": "¿Quién era la mayoría de la población en el reino visigodo?",
          "opciones": [
            "El campesinado, que trabajaba las tierras",
            "La nobleza, que vivía en palacios",
            "Los mercaderes, que viajaban por Europa",
            "Los soldados, que vigilaban las fronteras"
          ],
          "correcta": 0,
          "explicacion": "¡Correcto! La mayoría de la población eran campesinos que trabajaban la tierra. También había esclavos."
        },
        {
          "enunciado": "¿Qué rey visigodo creó leyes comunes para todo el reino, uniendo a visigodos e hispanorromanos?",
          "opciones": [
            "Recesvinto",
            "Leovigildo",
            "Recaredo",
            "Ataulfo"
          ],
          "correcta": 0,
          "explicacion": "¡Así es! Durante el reinado de Recesvinto se elaboraron leyes comunes para todos los habitantes del reino visigodo."
        },
        {
          "enunciado": "¿Cuál es la característica más reconocible de la arquitectura visigoda?",
          "opciones": [
            "Las pequeñas iglesias rurales con arcos de herradura",
            "Las grandes pirámides de piedra como en Egipto",
            "Los enormes acueductos y anfiteatros como los romanos",
            "Los rascacielos con cúpulas doradas"
          ],
          "correcta": 0,
          "explicacion": "¡Perfecto! El arte visigodo se caracterizó por iglesias rurales de pequeño tamaño, pocas ventanas y el arco de herradura."
        },
        {
          "enunciado": "¿En qué rama artística destacaron especialmente los visigodos?",
          "opciones": [
            "En la orfebrería: piezas artísticas elaboradas con metal",
            "En la pintura de grandes murales al fresco",
            "En la escultura de estatuas de mármol gigantes",
            "En la cerámica pintada de colores vivos"
          ],
          "correcta": 0,
          "explicacion": "¡Excelente! Los visigodos destacaron en la orfebrería, creando bellas piezas artísticas con metales preciosos."
        },
        {
          "enunciado": "¿En qué provincia se encuentra la famosa iglesia visigoda de San Juan de Baños de Cerrato?",
          "opciones": [
            "Palencia",
            "Toledo",
            "Sevilla",
            "Granada"
          ],
          "correcta": 0,
          "explicacion": "¡Muy bien! La iglesia de San Juan de Baños de Cerrato, en Palencia, es uno de los mejores ejemplos de arquitectura visigoda conservada."
        },
        {
          "enunciado": "¿Cuáles son los tres reyes visigodos más importantes que estudiamos en este capítulo?",
          "opciones": [
            "Leovigildo, Recaredo y Recesvinto",
            "Julio César, Augusto y Nerón",
            "Fernando, Isabel y Carlos",
            "Pelayo, Alfonso y Sancho"
          ],
          "correcta": 0,
          "explicacion": "¡Estupendo! Leovigildo unificó el territorio, Recaredo introdujo el catolicismo y Recesvinto creó leyes comunes para todos."
        }
      ]
    }
  ]
}
,
    "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_02_visigodos/contenido.json": {
  "id": "cap_02_visigodos",
  "curso_id": "5_primaria",
  "asignatura_id": "ciencias_sociales",
  "tema_id": "tema_06_castillos",
  "titulo": "Capítulo 2: El Reino Visigodo",
  "subtitulo": "El inicio de la Edad Media española",
  "icono": "👑",
  "color_primario": "#8b5cf6",
  "color_secundario": "#7c3aed",
  "es_circular": true,
  "casillas": [
    {
      "id": 1,
      "tipo": "minijuego",
      "subtipo": "parejas",
      "titulo": "1. Parejas Visigodas",
      "descripcion": "Encuentra las 7 parejas entre los reyes, pueblos y conceptos visigodos.",
      "icono": "🃏",
      "parejas": [
        { "id": "leovigildo", "etiqueta": "Leovigildo", "icono": "👑", "detalle": "Unificó el reino visigodo", "color": "#8b5cf6" },
        { "id": "recaredo", "etiqueta": "Recaredo", "icono": "✝️", "detalle": "Se convirtió al catolicismo (589)", "color": "#ec4899" },
        { "id": "suevos", "etiqueta": "Suevos", "icono": "🗺️", "detalle": "Capital en Braga (noroeste)", "color": "#3b82f6" },
        { "id": "toledo", "etiqueta": "Toledo", "icono": "🏰", "detalle": "Capital del reino visigodo", "color": "#f97316" },
        { "id": "nobleza", "etiqueta": "Nobleza", "icono": "🎖️", "detalle": "Ocupaban los cargos políticos", "color": "#10b981" },
        { "id": "campesinado", "etiqueta": "Campesinado", "icono": "🌾", "detalle": "Mayoría de la población", "color": "#f59e0b" },
        { "id": "herradura", "etiqueta": "Arco de herradura", "icono": "🏛️", "detalle": "Arte visigodo característico", "color": "#06b6d4" }
      ]
    },
    {
      "id": 2,
      "tipo": "teoria",
      "titulo": "2. Ficha: La llegada de los Visigodos",
      "descripcion": "Descubre cómo los pueblos germánicos llegaron a Hispania.",
      "icono": "⚔️",
      "fichas": [
        {
          "titulo": "La llegada de los Visigodos (Siglo V d.C.)",
          "subtitulo": "Los pueblos bárbaros invaden la Hispania romana",
          "icono": "⚔️",
          "tarjetas": [
            {
              "nombre": "La invasión bárbara",
              "fecha": "Principios del siglo V",
              "icono": "🌊",
              "color": "#ef4444",
              "puntos": [
                "La Hispania romana fue invadida por **alanos**, **suevos**, **vándalos** y **visigodos**, procedentes del Cáucaso y de origen escandinavo.",
                "Los **cántabros** y **vascones** del área cantábrica no formaron ningún reino y resistieron a los invasores."
              ]
            },
            {
              "nombre": "El pacto romano-visigodo",
              "fecha": "Siglo V",
              "icono": "🤝",
              "color": "#3b82f6",
              "puntos": [
                "El ejército romano necesitaba ayuda para frenar la invasión, por lo que pactó con los **visigodos** que podían instalarse en Hispania si derrotaban a los demás invasores.",
                "Los visigodos expulsaron a **alanos** y **vándalos**, mientras que los **suevos** permanecieron en el noroeste con capital en **Braga**."
              ]
            },
            {
              "nombre": "El Reino Visigodo",
              "fecha": "Siglo VI",
              "icono": "👑",
              "color": "#8b5cf6",
              "puntos": [
                "Los visigodos establecieron su capital en **Toledo**. Su reino se extendía por casi toda la península Ibérica, incluyendo parte del sur de la actual Francia.",
                "El rey **Leovigildo** conquistó el reino suevo en el año **585**, logrando dominar todo el territorio peninsular."
              ]
            }
          ],
          "destacado": {
            "icono": "📍",
            "titulo": "Pueblos que resistieron",
            "texto": "Los **cántabros** y los **vascones** del área cantábrica nunca fueron dominados por los visigodos, manteniendo su independencia."
          }
        }
      ]
    },
    {
      "id": 3,
      "tipo": "quiz",
      "titulo": "3. Quiz: La llegada de los Visigodos",
      "descripcion": "Preguntas aleatorias sobre los pueblos que invadieron Hispania.",
      "icono": "❓",
      "preguntas": [
        {
          "enunciado": "¿Qué pueblos invadieron la Hispania romana a principios del siglo V?",
          "opciones": [
            "Alanos, suevos, vándalos y visigodos",
            "Griegos, romanos, fenicios y cartagineses",
            "Vikingos, celtas, iberos y tartesios",
            "Francos, hunos, sajones y normandos"
          ],
          "correcta": 0,
          "explicacion": "¡Muy bien! Alanos, suevos, vándalos y visigodos invadieron Hispania procedentes del norte y el este de Europa."
        },
        {
          "enunciado": "¿Qué pueblos del área cantábrica NO formaron ningún reino y resistieron a los visigodos?",
          "opciones": [
            "Los cántabros y los vascones",
            "Los suevos y los alanos",
            "Los vándalos y los francos",
            "Los romanos y los griegos"
          ],
          "correcta": 0,
          "explicacion": "¡Exacto! Los cántabros y los vascones mantuvieron su independencia y no fueron sometidos por los visigodos."
        },
        {
          "enunciado": "¿Por qué el ejército romano pactó con los visigodos?",
          "opciones": [
            "Necesitaba ayuda para frenar la invasión de otros pueblos",
            "Quería que los visigodos construyeran castillos",
            "Para que enseñaran latín a los demás pueblos",
            "Porque los visigodos tenían los mejores barcos"
          ],
          "correcta": 0,
          "explicacion": "¡Correcto! Roma negoció con los visigodos: podían instalarse en Hispania a cambio de expulsar a los otros invasores."
        },
        {
          "enunciado": "¿Dónde se estableció la capital del reino visigodo?",
          "opciones": [
            "Toledo (Toletum)",
            "Braga (Bracara Augusta)",
            "Sevilla (Hispalis)",
            "Zaragoza (Caesaraugusta)"
          ],
          "correcta": 0,
          "explicacion": "¡Genial! Toledo, llamada Toletum en latín, fue la capital del reino visigodo durante todo su período."
        },
        {
          "enunciado": "¿Dónde estaba la capital del reino de los suevos?",
          "opciones": [
            "Braga (Bracara Augusta), en el noroeste",
            "Toledo, en el centro",
            "Pamplona, en el norte",
            "Mérida, en el suroeste"
          ],
          "correcta": 0,
          "explicacion": "¡Perfecto! Los suevos establecieron su capital en Braga (Bracara Augusta), en el noroeste de la Península."
        },
        {
          "enunciado": "¿Qué rey visigodo conquistó el reino suevo en el año 585?",
          "opciones": [
            "Leovigildo",
            "Recaredo",
            "Recesvinto",
            "Ataulfo"
          ],
          "correcta": 0,
          "explicacion": "¡Estupendo! Leovigildo conquistó el reino suevo en el 585, logrando unificar toda la Península Ibérica."
        },
        {
          "enunciado": "¿Cuál era el origen de los visigodos?",
          "opciones": [
            "Procedían de la región del Cáucaso y eran de origen escandinavo",
            "Eran de la Península Ibérica desde siempre",
            "Procedían del norte de África",
            "Venían de la India y Asia Central"
          ],
          "correcta": 0,
          "explicacion": "¡Así es! Los visigodos (y otros pueblos germánicos) procedían del Cáucaso y tenían origen escandinavo."
        },
        {
          "enunciado": "¿Cuál es el orden correcto de los reyes visigodos más importantes estudiados?",
          "opciones": [
            "Leovigildo ➡️ Recaredo ➡️ Recesvinto",
            "Recaredo ➡️ Leovigildo ➡️ Recesvinto",
            "Recesvinto ➡️ Recaredo ➡️ Leovigildo",
            "Leovigildo ➡️ Recesvinto ➡️ Recaredo"
          ],
          "correcta": 0,
          "explicacion": "¡Correcto! Primero Leovigildo unificó el reino, después Recaredo se convirtió al catolicismo, y más tarde Recesvinto creó leyes comunes."
        }
      ]
    },
    {
      "id": 4,
      "tipo": "minijuego",
      "subtipo": "puzzle",
      "titulo": "4. Puzzle: ¡La Península Visigoda!",
      "descripcion": "Ordena las 6 piezas del mapa visigodo.",
      "icono": "🧩",
      "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_02_visigodos/assets/puzzle.jpg"
    },
    {
      "id": 5,
      "tipo": "teoria",
      "titulo": "5. Ficha: La vida en el Reino Visigodo",
      "descripcion": "Conoce cómo era la sociedad, la religión y el arte de los visigodos.",
      "icono": "🏰",
      "fichas": [
        {
          "titulo": "La vida en el Reino Visigodo",
          "subtitulo": "Religión, sociedad y arte en el reino medieval hispano",
          "icono": "🏰",
          "tarjetas": [
            {
              "nombre": "La religión: el catolicismo",
              "fecha": "Año 589",
              "icono": "✝️",
              "color": "#ec4899",
              "puntos": [
                "Los hispanorromanos eran **católicos**, pero los visigodos eran **arrianos** (diferente versión del cristianismo). Esto causaba división.",
                "En el año **589**, el rey **Recaredo** abandonó el arrianismo y se convirtió al **catolicismo**, uniendo religiosamente a todo el reino."
              ]
            },
            {
              "nombre": "La sociedad visigoda",
              "fecha": "Siglos V-VIII",
              "icono": "👥",
              "color": "#f59e0b",
              "puntos": [
                "Con los visigodos disminuyó el comercio y la artesanía, pero **aumentó la agricultura y la ganadería**. Existían grandes diferencias entre los grupos sociales.",
                "La **nobleza** (minoría) ocupaba los cargos políticos y de la Iglesia. El **campesinado** era la mayoría y trabajaba las tierras. También había esclavos."
              ]
            },
            {
              "nombre": "Las leyes comunes",
              "fecha": "Reinado de Recesvinto",
              "icono": "📜",
              "color": "#10b981",
              "puntos": [
                "Al principio, visigodos e hispanorromanos no compartían ni religión ni leyes. Había profunda división.",
                "Durante el reinado de **Recesvinto** se elaboraron **leyes comunes** para todo el reino, lo que aumentó la unidad."
              ]
            },
            {
              "nombre": "El Arte Visigodo",
              "fecha": "Siglos V-VIII",
              "icono": "⛪",
              "color": "#06b6d4",
              "puntos": [
                "El arte visigodo experimentó un **declive** frente a los grandes monumentos romanos. Se caracterizó por la construcción de **pequeñas iglesias rurales** con pocas ventanas y **arcos de herradura**.",
                "Destacó la **orfebrería**: la creación de piezas artísticas con metal, como las famosas coronas votivas."
              ]
            }
          ],
          "destacado": {
            "icono": "🏛️",
            "titulo": "Iglesia visigoda famosa",
            "texto": "La iglesia de **San Juan de Baños de Cerrato** (Palencia) es uno de los mejores ejemplos conservados de la arquitectura visigoda, con su característico **arco de herradura**."
          }
        }
      ]
    },
    {
      "id": 6,
      "tipo": "quiz",
      "titulo": "6. Quiz: El Reino Visigodo",
      "descripcion": "Preguntas aleatorias sobre la vida, sociedad y arte en el reino visigodo.",
      "icono": "🏆",
      "preguntas": [
        {
          "enunciado": "¿Qué diferencia religiosa existía entre los hispanorromanos y los visigodos al principio?",
          "opciones": [
            "Los hispanorromanos eran católicos y los visigodos arrianos",
            "Los hispanorromanos eran musulmanes y los visigodos católicos",
            "Ambos grupos eran católicos desde el principio",
            "Los visigodos eran budistas y los hispanorromanos paganos"
          ],
          "correcta": 0,
          "explicacion": "¡Muy bien! Los hispanorromanos eran católicos mientras que los visigodos seguían el arrianismo, lo que generaba división en el reino."
        },
        {
          "enunciado": "¿Qué decisión tomó el rey Recaredo en el año 589 para unir al pueblo?",
          "opciones": [
            "Se convirtió al catolicismo, abandonando el arrianismo",
            "Expulsó a todos los hispanorromanos del reino",
            "Declaró el islam como religión oficial",
            "Prohibió todas las religiones en el reino"
          ],
          "correcta": 0,
          "explicacion": "¡Exacto! En el 589, Recaredo adoptó el catolicismo, lo que unificó religiosamente a visigodos e hispanorromanos."
        },
        {
          "enunciado": "¿Cómo cambió la economía con la llegada de los visigodos?",
          "opciones": [
            "Disminuyó el comercio pero aumentó la agricultura y la ganadería",
            "Aumentó el comercio marítimo con América",
            "Se desarrollaron mucho la industria y las fábricas",
            "Todo siguió exactamente igual que con los romanos"
          ],
          "correcta": 0,
          "explicacion": "¡Correcto! Con los visigodos el comercio y la artesanía decayeron, pero creció la importancia del mundo rural: la agricultura y ganadería."
        },
        {
          "enunciado": "¿Qué grupo social era la minoría privilegiada en el reino visigodo?",
          "opciones": [
            "La nobleza, que ocupaba los cargos políticos y de la Iglesia",
            "El campesinado, que gobernaba las ciudades",
            "Los artesanos, que controlaban el comercio",
            "Los esclavos, que dirigían el ejército"
          ],
          "correcta": 0,
          "explicacion": "¡Genial! La nobleza era una minoría que ostentaba los principales cargos políticos y religiosos del reino."
        },
        {
          "enunciado": "¿Quién era la mayoría de la población en el reino visigodo?",
          "opciones": [
            "El campesinado, que trabajaba las tierras",
            "La nobleza, que vivía en palacios",
            "Los mercaderes, que viajaban por Europa",
            "Los soldados, que vigilaban las fronteras"
          ],
          "correcta": 0,
          "explicacion": "¡Correcto! La mayoría de la población eran campesinos que trabajaban la tierra. También había esclavos."
        },
        {
          "enunciado": "¿Qué rey visigodo creó leyes comunes para todo el reino, uniendo a visigodos e hispanorromanos?",
          "opciones": [
            "Recesvinto",
            "Leovigildo",
            "Recaredo",
            "Ataulfo"
          ],
          "correcta": 0,
          "explicacion": "¡Así es! Durante el reinado de Recesvinto se elaboraron leyes comunes para todos los habitantes del reino visigodo."
        },
        {
          "enunciado": "¿Cuál es la característica más reconocible de la arquitectura visigoda?",
          "opciones": [
            "Las pequeñas iglesias rurales con arcos de herradura",
            "Las grandes pirámides de piedra como en Egipto",
            "Los enormes acueductos y anfiteatros como los romanos",
            "Los rascacielos con cúpulas doradas"
          ],
          "correcta": 0,
          "explicacion": "¡Perfecto! El arte visigodo se caracterizó por iglesias rurales de pequeño tamaño, pocas ventanas y el arco de herradura."
        },
        {
          "enunciado": "¿En qué rama artística destacaron especialmente los visigodos?",
          "opciones": [
            "En la orfebrería: piezas artísticas elaboradas con metal",
            "En la pintura de grandes murales al fresco",
            "En la escultura de estatuas de mármol gigantes",
            "En la cerámica pintada de colores vivos"
          ],
          "correcta": 0,
          "explicacion": "¡Excelente! Los visigodos destacaron en la orfebrería, creando bellas piezas artísticas con metales preciosos."
        },
        {
          "enunciado": "¿En qué provincia se encuentra la famosa iglesia visigoda de San Juan de Baños de Cerrato?",
          "opciones": [
            "Palencia",
            "Toledo",
            "Sevilla",
            "Granada"
          ],
          "correcta": 0,
          "explicacion": "¡Muy bien! La iglesia de San Juan de Baños de Cerrato, en Palencia, es uno de los mejores ejemplos de arquitectura visigoda conservada."
        },
        {
          "enunciado": "¿Cuáles son los tres reyes visigodos más importantes que estudiamos en este capítulo?",
          "opciones": [
            "Leovigildo, Recaredo y Recesvinto",
            "Julio César, Augusto y Nerón",
            "Fernando, Isabel y Carlos",
            "Pelayo, Alfonso y Sancho"
          ],
          "correcta": 0,
          "explicacion": "¡Estupendo! Leovigildo unificó el territorio, Recaredo introdujo el catolicismo y Recesvinto creó leyes comunes para todos."
        }
      ]
    }
  ]
}

  };
})();
