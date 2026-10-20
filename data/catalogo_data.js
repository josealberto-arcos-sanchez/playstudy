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
                },
                {
                  "id": "cap_03_al_andalus",
                  "numero": 3,
                  "titulo": "Capítulo 3: Al-Ándalus y los Reinos Cristianos",
                  "subtitulo": "El origen de al-Ándalus, los núcleos cristianos y la Reconquista",
                  "icono": "🕌",
                  "archivo": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/contenido.json",
                  "assets_dir": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/",
                  "total_estrellas_posibles": 18
                },
                {
                  "id": "cap_04_arte_medieval",
                  "numero": 4,
                  "titulo": "Capítulo 4: El Arte y la Cultura Medievales",
                  "subtitulo": "Arte andalusí, románico, gótico y cultura medieval",
                  "icono": "⛪",
                  "archivo": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/contenido.json",
                  "assets_dir": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/",
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
                "Época de señores feudales, castillos y el **reino visigodo**.",
                "En el siglo VII nació el **islam** en Arabia; en el **711** los musulmanes entraron en la Península y llamaron **al-Ándalus** a su territorio."
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
                "Época de señores feudales, castillos y el **reino visigodo**.",
                "En el siglo VII nació el **islam** en Arabia; en el **711** los musulmanes entraron en la Península y llamaron **al-Ándalus** a su territorio."
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
        { "id": "don_rodrigo", "etiqueta": "Don Rodrigo", "icono": "⚔️", "detalle": "Último rey visigodo, derrotado en Guadalete (711)", "color": "#ef4444" },
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
              "nombre": "El final del reino visigodo",
              "fecha": "Año 711",
              "icono": "⚔️",
              "color": "#ef4444",
              "puntos": [
                "A principios del siglo VIII, el reino visigodo vivía una **crisis**: los nobles luchaban por el trono.",
                "En el año **711**, el rey **Don Rodrigo** fue derrotado por los musulmanes en la **batalla de Guadalete**.",
                "Con esa derrota terminó el **reino de Toledo** y los musulmanes conquistaron casi toda la Península."
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
        },
        {
          "enunciado": "¿Qué rey visigodo fue derrotado en la batalla de Guadalete en el año 711?",
          "opciones": [
            "Don Rodrigo",
            "Leovigildo",
            "Recaredo",
            "Recesvinto"
          ],
          "correcta": 0,
          "explicacion": "¡Correcto! Don Rodrigo fue el último rey visigodo. En el año 711 fue derrotado en Guadalete por los musulmanes."
        },
        {
          "enunciado": "¿Qué consecuencia tuvo la derrota visigoda en la batalla de Guadalete?",
          "opciones": [
            "El fin del reino de Toledo y la conquista musulmana de casi toda la Península",
            "El inicio de la Reconquista y la creación del reino de Asturias",
            "La unión de Castilla y León en un solo reino",
            "La conversión de los visigodos al islam"
          ],
          "correcta": 0,
          "explicacion": "¡Muy bien! Tras Guadalete, el reino visigodo de Toledo desapareció y los musulmanes conquistaron casi toda la Península. A ese territorio llamaron al-Ándalus."
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
        { "id": "don_rodrigo", "etiqueta": "Don Rodrigo", "icono": "⚔️", "detalle": "Último rey visigodo, derrotado en Guadalete (711)", "color": "#ef4444" },
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
              "nombre": "El final del reino visigodo",
              "fecha": "Año 711",
              "icono": "⚔️",
              "color": "#ef4444",
              "puntos": [
                "A principios del siglo VIII, el reino visigodo vivía una **crisis**: los nobles luchaban por el trono.",
                "En el año **711**, el rey **Don Rodrigo** fue derrotado por los musulmanes en la **batalla de Guadalete**.",
                "Con esa derrota terminó el **reino de Toledo** y los musulmanes conquistaron casi toda la Península."
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
        },
        {
          "enunciado": "¿Qué rey visigodo fue derrotado en la batalla de Guadalete en el año 711?",
          "opciones": [
            "Don Rodrigo",
            "Leovigildo",
            "Recaredo",
            "Recesvinto"
          ],
          "correcta": 0,
          "explicacion": "¡Correcto! Don Rodrigo fue el último rey visigodo. En el año 711 fue derrotado en Guadalete por los musulmanes."
        },
        {
          "enunciado": "¿Qué consecuencia tuvo la derrota visigoda en la batalla de Guadalete?",
          "opciones": [
            "El fin del reino de Toledo y la conquista musulmana de casi toda la Península",
            "El inicio de la Reconquista y la creación del reino de Asturias",
            "La unión de Castilla y León en un solo reino",
            "La conversión de los visigodos al islam"
          ],
          "correcta": 0,
          "explicacion": "¡Muy bien! Tras Guadalete, el reino visigodo de Toledo desapareció y los musulmanes conquistaron casi toda la Península. A ese territorio llamaron al-Ándalus."
        }
      ]
    }
  ]
}
,
    "cap_03_al_andalus": {
  "id": "cap_03_al_andalus",
  "curso_id": "5_primaria",
  "asignatura_id": "ciencias_sociales",
  "tema_id": "tema_06_castillos",
  "titulo": "Capítulo 3: Al-Ándalus y los Reinos Cristianos",
  "subtitulo": "El origen de al-Ándalus, los núcleos cristianos del norte y la Reconquista",
  "icono": "🕌",
  "color_primario": "#10b981",
  "color_secundario": "#059669",
  "es_circular": true,
  "casillas": [
    {
      "id": 1,
      "tipo": "minijuego",
      "subtipo": "parejas",
      "titulo": "1. Parejas Medievales",
      "descripcion": "Encuentra las 7 parejas entre los protagonistas, lugares y conceptos clave.",
      "icono": "🃏",
      "parejas": [
        { "id": "al_andalus", "etiqueta": "Al-Ándalus", "icono": "🕌", "detalle": "Territorio musulmán peninsular", "color": "#10b981" },
        { "id": "mahoma", "etiqueta": "Mahoma", "icono": "📖", "detalle": "Fundador del islam (siglo VII)", "color": "#f59e0b" },
        { "id": "don_rodrigo", "etiqueta": "Don Rodrigo", "icono": "⚔️", "detalle": "Derrotado en Guadalete (711)", "color": "#ef4444" },
        { "id": "abd_al_rahman_i", "etiqueta": "Abd al-Rahman I", "icono": "🏛️", "detalle": "Emirato independiente (756)", "color": "#3b82f6" },
        { "id": "abd_al_rahman_iii", "etiqueta": "Abd al-Rahman III", "icono": "👑", "detalle": "Califato de Córdoba (929)", "color": "#8b5cf6" },
        { "id": "taifas", "etiqueta": "Reinos de Taifas", "icono": "🏰", "detalle": "División de al-Ándalus (1031)", "color": "#f97316" },
        { "id": "granada", "etiqueta": "Reino de Granada", "icono": "🌺", "detalle": "Último territorio nazarí (siglo XIII)", "color": "#ec4899" }
      ]
    },
    {
      "id": 2,
      "tipo": "teoria",
      "titulo": "2. Presentación: El origen y la evolución de Al-Ándalus",
      "descripcion": "Ocho diapositivas con imágenes y explicación por voz.",
      "icono": "📖",
      "fichas": [
        {
          "titulo": "El origen y la evolución de Al-Ándalus",
          "subtitulo": "Desde la llegada en 711 hasta el reino nazarí de Granada",
          "icono": "🕌",
          "tarjetas": [
            {
              "nombre": "El islam y Al-Ándalus",
              "fecha": "Desde el siglo VII",
              "icono": "🕌",
              "color": "#10b981",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/a09_kaaba.jpg",
              "texto": "La Kaaba, en La Meca",
              "locucion": "El islam nació en Arabia a principios del siglo séptimo. Mahoma fue su fundador y sus enseñanzas se recogen en el Corán. A quienes practican esta religión se les llama musulmanes. En la imagen se ve la Kaaba, en La Meca, el lugar más sagrado del islam; hacia ella se orientan los musulmanes para rezar. Siglos después, los musulmanes llevaron esta religión a la península ibérica.",
              "puntos": [
                "Nació en **Arabia** a principios del **siglo VII**.",
                "Su fundador fue **Mahoma** y su libro sagrado es el **Corán**."
              ]
            },
            {
              "nombre": "La expansión del islam",
              "fecha": "Siglos VII y VIII",
              "icono": "🗺️",
              "color": "#3b82f6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/a07_expansion_islam.png",
              "texto": "La expansión del islam",
              "locucion": "Este mapa muestra la expansión del islam hasta la caída de los omeyas. Después de la muerte de Mahoma, los musulmanes extendieron su territorio más allá de Arabia. En su expansión inicial llegaron desde la India hasta el norte de África. En el año setecientos once cruzaron el estrecho desde el norte de África y entraron en la península ibérica.",
              "puntos": [
                "El mapa muestra las conquistas del islam entre los siglos **VII** y **VIII**.",
                "En su expansión inicial llegaron desde la **India** hasta el **norte de África**.",
                "En el año **711** cruzaron el estrecho y entraron en la **península ibérica**."
              ]
            },
            {
              "nombre": "La llegada a la Península",
              "fecha": "Año 711",
              "icono": "🗺️",
              "color": "#3b82f6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/a02_conquista_711.png",
              "texto": "La batalla de Guadalete",
              "locucion": "En el año setecientos once, en medio de una disputa por el trono visigodo, tropas musulmanas llegaron desde el norte de África. Vencieron al rey don Rodrigo en la batalla de Guadalete. Con esa derrota terminó el reino visigodo de Toledo y los musulmanes conquistaron gran parte de la Península. Llamaron al-Ándalus al territorio que gobernaron. El mapa marca Guadalete y muestra cómo avanzaron hacia otras ciudades durante los años siguientes.",
              "puntos": [
                "En **711**, los musulmanes vencieron a **Don Rodrigo** en **Guadalete**.",
                "Con esa derrota terminó el **reino de Toledo**.",
                "Llamaron **al-Ándalus** al territorio que conquistaron."
              ]
            },
            {
              "nombre": "Al-Ándalus y el califato",
              "fecha": "Siglo VIII",
              "icono": "👑",
              "color": "#8b5cf6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/a08_damasco_omeya.jpg",
              "texto": "Damasco, capital del califato omeya",
              "locucion": "Al principio, al-Ándalus era una provincia del califato omeya, un imperio musulmán con capital en Damasco. El califa era su máxima autoridad: dirigía el imperio y también era la cabeza religiosa. A mediados del siglo octavo, los abasíes derrocaron a la familia Omeya, es decir, les quitaron el poder. Algunos omeyas huyeron y uno de ellos, el príncipe Abd al-Rahman Primero, llegó a al-Ándalus. En la imagen se ve la Gran Mezquita de Damasco, construida en época omeya.",
              "puntos": [
                "Al principio, al-Ándalus era una **provincia (emirato dependiente)** del **califato omeya**, con capital en **Damasco**.",
                "El **califa** era la máxima autoridad: dirigía el imperio y la religión.",
                "A mediados del siglo VIII, los abasíes **derrocaron** a los omeyas; algunos huyeron y **Abd al-Rahman I**, un príncipe omeya, llegó a al-Ándalus."
              ]
            },
            {
              "nombre": "Del emirato al califato",
              "fecha": "Años 756 y 929",
              "icono": "👑",
              "color": "#8b5cf6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/a03_medina_azahara.jpg",
              "texto": "Medina Azahara, cerca de Córdoba",
              "locucion": "En el año setecientos cincuenta y seis, Abd al-Rahman Primero creó en Córdoba un emirato independiente: al-Ándalus dejó de depender del califato abasí de Bagdad. En el año novecientos veintinueve, Abd al-Rahman Tercero se proclamó califa y creó el califato de Córdoba. Cerca de la ciudad mandó construir Medina Azahara, una ciudad palatina para la corte y el gobierno. En la fotografía se ven restos de edificios y arcos del conjunto.",
              "puntos": [
                "**756**: Abd al-Rahman I creó el **emirato independiente** de Córdoba.",
                "**929**: Abd al-Rahman III se proclamó **califa** y creó el **califato de Córdoba**.",
                "Cerca de Córdoba se construyó **Medina Azahara**, la ciudad palatina del califa."
              ]
            },
            {
              "nombre": "Los reinos de taifas",
              "fecha": "Desde el año 1031",
              "icono": "🏰",
              "color": "#f59e0b",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/a04_aljaferia.jpg",
              "texto": "El palacio de la Aljafería",
              "locucion": "En mil treinta y uno, las disputas dividieron el califato en pequeños reinos llamados taifas. La Aljafería de Zaragoza, que aparece en la imagen, fue un palacio construido en esa época. Más tarde llegaron desde el norte de África los almorávides y los almohades, que gobernaron distintos territorios de al-Ándalus.",
              "puntos": [
                "**1031**: el califato de Córdoba se dividió en pequeños reinos llamados **taifas**.",
                "Más tarde llegaron los **almorávides** y los **almohades** desde el norte de África."
              ]
            },
            {
              "nombre": "El reino nazarí de Granada",
              "fecha": "Siglos XIII – XV",
              "icono": "🌺",
              "color": "#ec4899",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/a05_alhambra_panorama.jpg",
              "texto": "La Alhambra de Granada",
              "locucion": "Desde el siglo trece, Granada fue el último reino musulmán de la Península. Lo gobernó la familia nazarí y su residencia principal estaba en la Alhambra, un conjunto de palacios y fortalezas. El reino nazarí terminó en mil cuatrocientos noventa y dos, cuando Granada pasó a manos de los Reyes Católicos.",
              "puntos": [
                "Desde el **siglo XIII**, solo quedó el **reino nazarí de Granada**.",
                "Terminó en **1492**, con los Reyes Católicos."
              ]
            },
            {
              "nombre": "La Alhambra, palacios y patios",
              "fecha": "Granada nazarí",
              "icono": "⛲",
              "color": "#06b6d4",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/a06_patio_leones.jpg",
              "texto": "El Patio de los Leones",
              "locucion": "Esta fotografía muestra el Patio de los Leones, dentro de la Alhambra. Fíjate en las columnas, los arcos y la fuente central. La Alhambra no era un único edificio: tenía patios, salas y jardines. Sus construcciones nos recuerdan el papel de Granada como capital del reino nazarí.",
              "puntos": []
            }
          ],
          "destacado": {
            "icono": "🕰️",
            "titulo": "La línea del tiempo de al-Ándalus",
            "locucion": "Recuerda estas fechas. En el año setecientos once, los musulmanes vencieron a Don Rodrigo en Guadalete y llamaron al-Ándalus a su territorio. Al principio, al-Ándalus fue un emirato dependiente del califato omeya. En setecientos cincuenta y seis, Abd al-Rahman Primero creó el emirato independiente. En novecientos veintinueve, Abd al-Rahman Tercero proclamó el califato de Córdoba. En mil treinta y uno, el califato se dividió en taifas. Desde el siglo trece, solo quedó el reino nazarí de Granada, que terminó en mil cuatrocientos noventa y dos.",
            "texto": "**711** Guadalete y emirato dependiente · **756** emirato independiente · **929** califato de Córdoba · **1031** taifas · **siglo XIII** reino nazarí de Granada · **1492** fin de al-Ándalus"
          }
        }
      ]
    },
    {
      "id": 3,
      "tipo": "quiz",
      "titulo": "3. Quiz: Al-Ándalus",
      "descripcion": "Comprueba lo que has aprendido sobre el origen y evolución de al-Ándalus.",
      "icono": "❓",
      "preguntas": [
        {
          "enunciado": "¿En qué siglo surgió el islam y quién fue su fundador?",
          "opciones": [
            "En el siglo VII, en Arabia, fundado por Mahoma",
            "En el siglo I, en Roma, fundado por Julio César",
            "En el siglo XV, en América, fundado por Cristóbal Colón",
            "En el siglo X, en China, fundado por Confucio"
          ],
          "correcta": 0,
          "explicacion": "¡Correcto! El islam nació a principios del siglo VII en Arabia. Su fundador fue Mahoma y su libro sagrado es el Corán."
        },
        {
          "enunciado": "¿Cómo se llama el libro sagrado de los musulmanes donde se recogen por escrito sus enseñanzas?",
          "opciones": [
            "El Corán",
            "La Biblia",
            "La Torá",
            "El Fuero Real"
          ],
          "correcta": 0,
          "explicacion": "¡Exacto! El Corán es el libro sagrado del islam, con todos los preceptos que debe cumplir un musulmán."
        },
        {
          "enunciado": "¿Qué rey visigodo fue derrotado en la batalla de Guadalete y qué consecuencia tuvo esta derrota?",
          "opciones": [
            "Don Rodrigo, el fin del reino de Toledo",
            "Leovigildo, el inicio de la Reconquista",
            "Recaredo, la creación de al-Ándalus",
            "Alarico, la invasión de los francos"
          ],
          "correcta": 0,
          "explicacion": "¡Muy bien! Don Rodrigo fue derrotado en Guadalete en el año 711. Con él terminó el reino visigodo de Toledo y los musulmanes conquistaron casi toda la Península."
        },
        {
          "enunciado": "¿Cómo llamaron los musulmanes al territorio que ocuparon en la península ibérica?",
          "opciones": [
            "Al-Ándalus",
            "Hispania",
            "Lusitania",
            "Tarraconense"
          ],
          "correcta": 0,
          "explicacion": "¡Genial! Los musulmanes llamaron al-Ándalus a su territorio, y a sus habitantes andalusíes."
        },
        {
          "enunciado": "¿Qué territorio llegaron a controlar los musulmanes durante su expansión inicial?",
          "opciones": [
            "Desde la India hasta el norte de África",
            "Desde China hasta Europa central",
            "Desde Arabia hasta América",
            "Solo la península ibérica"
          ],
          "correcta": 0,
          "explicacion": "¡Muy bien! En su expansión inicial, los musulmanes llegaron desde la India hasta el norte de África. Poco después, en el 711, entraron en la península ibérica."
        },
        {
          "enunciado": "¿Qué era al-Ándalus en un primer momento dentro del imperio islámico?",
          "opciones": [
            "Una provincia (emirato) que dependía del califato omeya de Damasco",
            "Un imperio independiente gobernado por un emperador",
            "Una república formada por ciudades libres",
            "Un reino cristiano aliado de los francos"
          ],
          "correcta": 0,
          "explicacion": "¡Exacto! Al principio, al-Ándalus era una provincia del califato omeya. Estaba gobernada por un emir que dependía del califa de Damasco."
        },
        {
          "enunciado": "¿Cómo se llamaba el imperio islámico al que pertenecía al-Ándalus?",
          "opciones": [
            "Califato",
            "Imperio Romano",
            "Imperio Bizantino",
            "Sultanato"
          ],
          "correcta": 0,
          "explicacion": "¡Correcto! Al-Ándalus pertenecía al califato omeya, el imperio islámico con capital en Damasco."
        },
        {
          "enunciado": "¿Quién dirigía el califato islámico?",
          "opciones": [
            "El califa",
            "El emperador",
            "El sultán",
            "El papa"
          ],
          "correcta": 0,
          "explicacion": "¡Muy bien! El califa era la máxima autoridad del califato: dirigía el imperio y también era la cabeza religiosa."
        },
        {
          "enunciado": "¿Qué ocurrió con la familia Omeya a mediados del siglo VIII?",
          "opciones": [
            "Fue derrocada y algunos miembros huyeron a al-Ándalus",
            "Fue derrocada y desapareció por completo",
            "Fue derrotada por los reinos cristianos",
            "Se convirtió en la familia real de Córdoba"
          ],
          "correcta": 0,
          "explicacion": "¡Así es! En el año 750, los abasíes derrocaron a los omeyas. Algunos miembros de la familia huyeron; uno de ellos, Abd al-Rahman I, llegó a al-Ándalus."
        },
        {
          "enunciado": "¿Quién fue Abd al-Rahman?",
          "opciones": [
            "Un príncipe omeya que huyó a al-Ándalus y creó el emirato independiente de Córdoba en 756",
            "El último califa de Damasco",
            "El rey visigodo derrotado en Guadalete",
            "El califa que proclamó el califato de Córdoba en 929"
          ],
          "correcta": 0,
          "explicacion": "¡Perfecto! Abd al-Rahman I era un príncipe de la familia Omeya. Tras la derrota de su familia, huyó a al-Ándalus y en 756 creó el emirato independiente de Córdoba."
        },
        {
          "enunciado": "¿En qué año se independizó al-Ándalus del califato bajo el mando de Abd al-Rahman I?",
          "opciones": [
            "756",
            "711",
            "929",
            "1031"
          ],
          "correcta": 0,
          "explicacion": "¡Perfecto! En el año 756, Abd al-Rahman I independizó al-Ándalus del califato abasí y creó el emirato independiente de Córdoba."
        },
        {
          "enunciado": "¿Qué proclamó Abd al-Rahman III en el año 929?",
          "opciones": [
            "El califato de Córdoba",
            "El reino nazarí de Granada",
            "La rendición ante los cristianos",
            "La división en taifas"
          ],
          "correcta": 0,
          "explicacion": "¡Así es! En el año 929, Abd al-Rahman III se proclamó califa y creó el califato de Córdoba, su época de máximo esplendor."
        },
        {
          "enunciado": "¿Qué ocurrió con el califato de Córdoba en el año 1031?",
          "opciones": [
            "Se fragmentó en pequeños reinos llamados taifas",
            "Fue conquistado por los cristianos",
            "Pasó a formar parte del imperio bizantino",
            "Se convirtió en el reino nazarí de Granada"
          ],
          "correcta": 0,
          "explicacion": "¡Estupendo! En 1031 el califato de Córdoba se dividió en numerosos reinos pequeños llamados taifas."
        },
        {
          "enunciado": "¿Qué pueblos procedentes del norte de África llegaron para ayudar a los andalusíes ante el avance cristiano?",
          "opciones": [
            "Los almorávides y los almohades",
            "Los suevos y los vándalos",
            "Los alanos y los celtas",
            "Los francos y los normandos"
          ],
          "correcta": 0,
          "explicacion": "¡Correcto! Los reyes de taifas solicitaron auxilio a los almorávides y más tarde a los almohades."
        },
        {
          "enunciado": "¿Qué territorio dominaban los andalusíes en la península ibérica a partir del siglo XIII?",
          "opciones": [
            "El reino nazarí de Granada",
            "Todo el norte peninsular",
            "Las taifas del norte",
            "El califato de Córdoba"
          ],
          "correcta": 0,
          "explicacion": "¡Excelente! Desde el siglo XIII, el territorio musulmán se redujo al reino nazarí de Granada, que resistió hasta 1492."
        }
      ]
    },
    {
      "id": 4,
      "tipo": "minijuego",
      "subtipo": "puzzle",
      "titulo": "4. Puzzle: ¡Al-Ándalus Medieval!",
      "descripcion": "Ordena las 6 piezas del mapa, monumentos y sabios de al-Ándalus.",
      "icono": "🧩",
      "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/puzzle.jpg"
    },
    {
      "id": 5,
      "tipo": "teoria",
      "titulo": "5. Presentación: Los reinos cristianos",
      "descripcion": "Ocho diapositivas con imágenes y explicación por voz.",
      "icono": "📜",
      "fichas": [
        {
          "titulo": "Los reinos cristianos y su expansión",
          "subtitulo": "Los núcleos del norte, los cambios territoriales y la convivencia",
          "icono": "🛡️",
          "tarjetas": [
            {
              "nombre": "Covadonga y los primeros núcleos",
              "fecha": "Siglos VIII y IX",
              "icono": "⛰️",
              "color": "#3b82f6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/b01_covadonga.jpg",
              "texto": "Los primeros núcleos cristianos",
              "locucion": "En el norte de la Península surgieron varios núcleos cristianos. Según la tradición, en el año setecientos veintidós, don Pelayo y sus seguidores vencieron en Covadonga; después se consolidó el reino de Asturias. Esta pintura, realizada muchos siglos más tarde, representa a don Pelayo como rey: no es una imagen de la batalla tal como ocurrió.",
              "puntos": []
            },
            {
              "nombre": "El reino de Asturias",
              "fecha": "Alrededor del año 800",
              "icono": "🏰",
              "color": "#8b5cf6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/b02_asturias_800.jpg",
              "texto": "El reino de Asturias hacia 800",
              "locucion": "Este mapa muestra el reino de Asturias alrededor del año ochocientos. Con el tiempo, aquel reino extendió su territorio hacia el sur y su centro político pasó a León. A lo largo de varios siglos también se formaron reinos como León, Castilla y Portugal. El mapa representa solo un momento de una historia que fue cambiando.",
              "puntos": []
            },
            {
              "nombre": "Las coronas cristianas",
              "fecha": "Siglos XI – XIII",
              "icono": "👑",
              "color": "#f97316",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/b03_mapa_1224_es.jpg",
              "texto": "La Península Ibérica en 1224",
              "locucion": "En mil ochenta y cinco, el rey Alfonso Sexto de Castilla conquistó Toledo, una ciudad muy importante. En mil ciento treinta y siete se formó la Corona de Aragón, que reunió el reino de Aragón y los territorios catalanes. En mil doscientos treinta, Castilla y León quedaron unidos bajo un mismo rey. En el siglo trece, Jaime Primero el Conquistador incorporó a la Corona de Aragón Valencia y las islas Baleares. Este mapa muestra la Península en mil doscientos veinticuatro, seis años antes de la unión de Castilla y León: las fronteras y los nombres de los territorios siguieron cambiando.",
              "puntos": [
                "**1085**: Alfonso VI de Castilla conquistó **Toledo**.",
                "**1137**: se formó la **Corona de Aragón**.",
                "**1230**: Castilla y León quedaron unidos.",
                "En el siglo XIII, **Jaime I** incorporó **Valencia** y las **islas Baleares**."
              ]
            },
            {
              "nombre": "Las Navas de Tolosa",
              "fecha": "Año 1212",
              "icono": "🛡️",
              "color": "#ef4444",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/b04_batalla_navas.jpg",
              "texto": "Una batalla decisiva",
              "locucion": "En mil doscientos doce, varios reyes cristianos se enfrentaron al ejército almohade en Las Navas de Tolosa. La victoria facilitó nuevas conquistas en los años siguientes, aunque el reino nazarí de Granada continuó existiendo hasta mil cuatrocientos noventa y dos. Esta pintura representa la batalla, pero se realizó en el siglo diecinueve, mucho después del acontecimiento.",
              "puntos": []
            },
            {
              "nombre": "El último reino andalusí",
              "fecha": "Hasta el año 1492",
              "icono": "🌺",
              "color": "#ec4899",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/a05_alhambra_panorama.jpg",
              "texto": "Granada, reino nazarí",
              "locucion": "Con el avance de los reinos cristianos, el territorio musulmán se fue reduciendo. Granada fue el último reino nazarí de la Península y mantuvo su independencia hasta mil cuatrocientos noventa y dos. En esta fotografía, tomada desde el barrio del Albaicín, se ven la Alhambra y Sierra Nevada.",
              "puntos": []
            },
            {
              "nombre": "Repoblar los territorios",
              "fecha": "A lo largo de la Edad Media",
              "icono": "🏘️",
              "color": "#f59e0b",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/b06_agricultura_medieval.jpg",
              "texto": "Trabajar la tierra",
              "locucion": "Esta ilustración de un manuscrito del siglo catorce muestra a campesinos arando con bueyes. Cuando un reino conquistaba un territorio, podían llegar nuevas familias para vivir y cultivar allí. A ese proceso se le llama repoblación. No ocurrió siempre de la misma forma: dependía del lugar y de la época; la imagen sirve para ver una tarea del campo, no representa una repoblación concreta de la Península.",
              "puntos": []
            },
            {
              "nombre": "Tres comunidades",
              "fecha": "La sociedad medieval",
              "icono": "🤝",
              "color": "#10b981",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/b05_musicos_cantigas.jpg",
              "texto": "Músicos de las Cantigas de Santa María",
              "locucion": "Esta miniatura del siglo trece pertenece a las Cantigas de Santa María, una obra de la corte de Alfonso Décimo. Muestra a dos músicos tocando instrumentos. En muchas ciudades de la Península vivían cristianos, musulmanes y judíos. A veces comerciaban o compartían espacios, aunque también hubo conflictos y las normas no eran iguales para todos.",
              "puntos": []
            },
            {
              "nombre": "Los mudéjares",
              "fecha": "La Edad Media",
              "icono": "🕌",
              "color": "#06b6d4",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/b07_torre_mudejar_toledo.jpg",
              "texto": "Una torre de estilo mudéjar",
              "locucion": "A los musulmanes que permanecían en territorios gobernados por reyes cristianos se les llamaba mudéjares. Podían conservar su religión y algunas costumbres, aunque vivían bajo nuevas autoridades y sus derechos podían ser distintos. Esta torre de la iglesia de Santo Tomé, en Toledo, es un ejemplo de arte mudéjar: un estilo que incorporó técnicas y formas artísticas andalusíes.",
              "puntos": []
            }
          ],
          "destacado": {
            "icono": "⚔️",
            "titulo": "La Batalla de Las Navas de Tolosa (1212)",
            "locucion": "En mil doscientos doce, los ejércitos de varios reinos cristianos vencieron al ejército almohade en Las Navas de Tolosa. Fue una batalla importante, pero el reino nazarí de Granada continuó existiendo hasta mil cuatrocientos noventa y dos.",
            "texto": "La victoria cristiana fue importante, aunque Granada siguió siendo un reino independiente durante casi tres siglos más."
          }
        }
      ]
    },
    {
      "id": 6,
      "tipo": "quiz",
      "titulo": "6. Quiz: Reinos Cristianos y Convivencia",
      "descripcion": "Demuestra lo que sabes sobre la Reconquista, al-Ándalus y las tres culturas.",
      "icono": "🏆",
      "preguntas": [
        {
          "enunciado": "¿Qué líder noble venció a los musulmanes en la batalla de Covadonga en el año 722 originando el reino de Asturias?",
          "opciones": [
            "Don Pelayo",
            "Alfonso VI",
            "Jaime I el Conquistador",
            "Don Rodrigo"
          ],
          "correcta": 0,
          "explicacion": "¡Genial! Don Pelayo lideró a los astures en Covadonga en el 722, dando origen al reino de Asturias."
        },
        {
          "enunciado": "¿Qué tres reinos se formaron con el tiempo en la parte occidental de la Península?",
          "opciones": [
            "Castilla, Portugal y León",
            "Navarra, Aragón y Cataluña",
            "Valencia, Baleares y Murcia",
            "Toledo, Córdoba y Granada"
          ],
          "correcta": 0,
          "explicacion": "¡Exacto! Con el tiempo se formaron en el oeste peninsular los reinos de León, Castilla y Portugal."
        },
        {
          "enunciado": "¿Qué gran ciudad conquistó el rey Alfonso VI en el año 1085, consolidando la frontera cristiana?",
          "opciones": [
            "Toledo",
            "Córdoba",
            "Granada",
            "Sevilla"
          ],
          "correcta": 0,
          "explicacion": "¡Muy bien! En 1085, Alfonso VI conquistó la histórica ciudad de Toledo para el reino cristiano."
        },
        {
          "enunciado": "¿En qué año se unieron Aragón y Barcelona para formar la Corona de Aragón?",
          "opciones": [
            "En 1137",
            "En 711",
            "En 1212",
            "En 1492"
          ],
          "correcta": 0,
          "explicacion": "¡Perfecto! En 1137 se formalizó la unión dinástica entre Aragón y el condado de Barcelona."
        },
        {
          "enunciado": "¿Qué histórica batalla ganaron los cristianos en 1212 abriendo las puertas del valle del Guadalquivir?",
          "opciones": [
            "Batalla de Las Navas de Tolosa",
            "Batalla de Covadonga",
            "Batalla de Guadalete",
            "Batalla de Roncesvalles"
          ],
          "correcta": 0,
          "explicacion": "¡Así es! La batalla de Las Navas de Tolosa (1212) fue el punto de inflexión decisivo de la Reconquista."
        },
        {
          "enunciado": "¿Qué rey de la Corona de Aragón conquistó las islas Baleares y el reino de Valencia?",
          "opciones": [
            "Jaime I el Conquistador",
            "Alfonso VIII de Castilla",
            "Don Pelayo",
            "Fernando el Católico"
          ],
          "correcta": 0,
          "explicacion": "¡Estupendo! Jaime I el Conquistador expandió la Corona de Aragón por Valencia, Baleares y el mar Mediterráneo."
        },
        {
          "enunciado": "¿En qué año se unificaron definitivamente Castilla y León formando la Corona de Castilla?",
          "opciones": [
            "En 1230",
            "En 722",
            "En 1031",
            "En 1085"
          ],
          "correcta": 0,
          "explicacion": "¡Correcto! En 1230 se unieron definitivamente Castilla y León formando la poderosa Corona de Castilla."
        },
        {
          "enunciado": "¿Cómo se llamaba a los musulmanes que vivían en las tierras conquistadas por los reinos cristianos?",
          "opciones": [
            "Mudéjares",
            "Almorávides",
            "Visigodos",
            "Andalusíes"
          ],
          "correcta": 0,
          "explicacion": "¡Genial! Los mudéjares eran los musulmanes que conservaron su religión viviendo bajo dominio cristiano."
        },
        {
          "enunciado": "¿Qué tres comunidades culturales y religiosas convivían en muchas ciudades medievales de la Península?",
          "opciones": [
            "Cristianos, musulmanes y judíos",
            "Romanos, griegos y egipcios",
            "Celtas, iberos y fenicios",
            "Suevos, alanos y vándalos"
          ],
          "correcta": 0,
          "explicacion": "¡Excelente! La época medieval peninsular destacó por la enriquecedora convivencia entre cristianos, musulmanes y judíos."
        },
        {
          "enunciado": "¿Cuál es el orden cronológico correcto de estos acontecimientos históricos?",
          "opciones": [
            "Batalla de Guadalete (711) ➡️ Batalla de Covadonga (722) ➡️ Conquista de Toledo (1085) ➡️ Navas de Tolosa (1212)",
            "Batalla de Covadonga (722) ➡️ Batalla de Guadalete (711) ➡️ Navas de Tolosa (1212) ➡️ Conquista de Toledo (1085)",
            "Navas de Tolosa (1212) ➡️ Conquista de Toledo (1085) ➡️ Batalla de Guadalete (711) ➡️ Batalla de Covadonga (722)",
            "Batalla de Guadalete (711) ➡️ Navas de Tolosa (1212) ➡️ Batalla de Covadonga (722) ➡️ Conquista de Toledo (1085)"
          ],
          "correcta": 0,
          "explicacion": "¡Brillante! Primero la llegada en Guadalete (711), el inicio de la resistencia en Covadonga (722), la toma de Toledo (1085) y la gran victoria en Las Navas de Tolosa (1212)."
        },
        {
          "enunciado": "¿Cuál es el orden correcto de las etapas de al-Ándalus?",
          "opciones": [
            "Emirato dependiente ➡️ Emirato independiente (756) ➡️ Califato (929) ➡️ Taifas (1031) ➡️ Reino nazarí (siglo XIII)",
            "Califato (929) ➡️ Emirato dependiente ➡️ Taifas (1031) ➡️ Emirato independiente (756) ➡️ Reino nazarí",
            "Taifas (1031) ➡️ Califato (929) ➡️ Emirato independiente (756) ➡️ Emirato dependiente ➡️ Reino nazarí",
            "Reino nazarí ➡️ Taifas (1031) ➡️ Califato (929) ➡️ Emirato independiente (756) ➡️ Emirato dependiente"
          ],
          "correcta": 0,
          "explicacion": "¡Brillante! Primero al-Ándalus dependía del califato; en 756 se hizo emirato independiente; en 929 se proclamó el califato de Córdoba; en 1031 se dividió en taifas; y desde el siglo XIII solo quedó el reino nazarí de Granada."
        }
      ]
    }
  ]
}
,
    "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/contenido.json": {
  "id": "cap_03_al_andalus",
  "curso_id": "5_primaria",
  "asignatura_id": "ciencias_sociales",
  "tema_id": "tema_06_castillos",
  "titulo": "Capítulo 3: Al-Ándalus y los Reinos Cristianos",
  "subtitulo": "El origen de al-Ándalus, los núcleos cristianos del norte y la Reconquista",
  "icono": "🕌",
  "color_primario": "#10b981",
  "color_secundario": "#059669",
  "es_circular": true,
  "casillas": [
    {
      "id": 1,
      "tipo": "minijuego",
      "subtipo": "parejas",
      "titulo": "1. Parejas Medievales",
      "descripcion": "Encuentra las 7 parejas entre los protagonistas, lugares y conceptos clave.",
      "icono": "🃏",
      "parejas": [
        { "id": "al_andalus", "etiqueta": "Al-Ándalus", "icono": "🕌", "detalle": "Territorio musulmán peninsular", "color": "#10b981" },
        { "id": "mahoma", "etiqueta": "Mahoma", "icono": "📖", "detalle": "Fundador del islam (siglo VII)", "color": "#f59e0b" },
        { "id": "don_rodrigo", "etiqueta": "Don Rodrigo", "icono": "⚔️", "detalle": "Derrotado en Guadalete (711)", "color": "#ef4444" },
        { "id": "abd_al_rahman_i", "etiqueta": "Abd al-Rahman I", "icono": "🏛️", "detalle": "Emirato independiente (756)", "color": "#3b82f6" },
        { "id": "abd_al_rahman_iii", "etiqueta": "Abd al-Rahman III", "icono": "👑", "detalle": "Califato de Córdoba (929)", "color": "#8b5cf6" },
        { "id": "taifas", "etiqueta": "Reinos de Taifas", "icono": "🏰", "detalle": "División de al-Ándalus (1031)", "color": "#f97316" },
        { "id": "granada", "etiqueta": "Reino de Granada", "icono": "🌺", "detalle": "Último territorio nazarí (siglo XIII)", "color": "#ec4899" }
      ]
    },
    {
      "id": 2,
      "tipo": "teoria",
      "titulo": "2. Presentación: El origen y la evolución de Al-Ándalus",
      "descripcion": "Ocho diapositivas con imágenes y explicación por voz.",
      "icono": "📖",
      "fichas": [
        {
          "titulo": "El origen y la evolución de Al-Ándalus",
          "subtitulo": "Desde la llegada en 711 hasta el reino nazarí de Granada",
          "icono": "🕌",
          "tarjetas": [
            {
              "nombre": "El islam y Al-Ándalus",
              "fecha": "Desde el siglo VII",
              "icono": "🕌",
              "color": "#10b981",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/a09_kaaba.jpg",
              "texto": "La Kaaba, en La Meca",
              "locucion": "El islam nació en Arabia a principios del siglo séptimo. Mahoma fue su fundador y sus enseñanzas se recogen en el Corán. A quienes practican esta religión se les llama musulmanes. En la imagen se ve la Kaaba, en La Meca, el lugar más sagrado del islam; hacia ella se orientan los musulmanes para rezar. Siglos después, los musulmanes llevaron esta religión a la península ibérica.",
              "puntos": [
                "Nació en **Arabia** a principios del **siglo VII**.",
                "Su fundador fue **Mahoma** y su libro sagrado es el **Corán**."
              ]
            },
            {
              "nombre": "La expansión del islam",
              "fecha": "Siglos VII y VIII",
              "icono": "🗺️",
              "color": "#3b82f6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/a07_expansion_islam.png",
              "texto": "La expansión del islam",
              "locucion": "Este mapa muestra la expansión del islam hasta la caída de los omeyas. Después de la muerte de Mahoma, los musulmanes extendieron su territorio más allá de Arabia. En su expansión inicial llegaron desde la India hasta el norte de África. En el año setecientos once cruzaron el estrecho desde el norte de África y entraron en la península ibérica.",
              "puntos": [
                "El mapa muestra las conquistas del islam entre los siglos **VII** y **VIII**.",
                "En su expansión inicial llegaron desde la **India** hasta el **norte de África**.",
                "En el año **711** cruzaron el estrecho y entraron en la **península ibérica**."
              ]
            },
            {
              "nombre": "La llegada a la Península",
              "fecha": "Año 711",
              "icono": "🗺️",
              "color": "#3b82f6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/a02_conquista_711.png",
              "texto": "La batalla de Guadalete",
              "locucion": "En el año setecientos once, en medio de una disputa por el trono visigodo, tropas musulmanas llegaron desde el norte de África. Vencieron al rey don Rodrigo en la batalla de Guadalete. Con esa derrota terminó el reino visigodo de Toledo y los musulmanes conquistaron gran parte de la Península. Llamaron al-Ándalus al territorio que gobernaron. El mapa marca Guadalete y muestra cómo avanzaron hacia otras ciudades durante los años siguientes.",
              "puntos": [
                "En **711**, los musulmanes vencieron a **Don Rodrigo** en **Guadalete**.",
                "Con esa derrota terminó el **reino de Toledo**.",
                "Llamaron **al-Ándalus** al territorio que conquistaron."
              ]
            },
            {
              "nombre": "Al-Ándalus y el califato",
              "fecha": "Siglo VIII",
              "icono": "👑",
              "color": "#8b5cf6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/a08_damasco_omeya.jpg",
              "texto": "Damasco, capital del califato omeya",
              "locucion": "Al principio, al-Ándalus era una provincia del califato omeya, un imperio musulmán con capital en Damasco. El califa era su máxima autoridad: dirigía el imperio y también era la cabeza religiosa. A mediados del siglo octavo, los abasíes derrocaron a la familia Omeya, es decir, les quitaron el poder. Algunos omeyas huyeron y uno de ellos, el príncipe Abd al-Rahman Primero, llegó a al-Ándalus. En la imagen se ve la Gran Mezquita de Damasco, construida en época omeya.",
              "puntos": [
                "Al principio, al-Ándalus era una **provincia (emirato dependiente)** del **califato omeya**, con capital en **Damasco**.",
                "El **califa** era la máxima autoridad: dirigía el imperio y la religión.",
                "A mediados del siglo VIII, los abasíes **derrocaron** a los omeyas; algunos huyeron y **Abd al-Rahman I**, un príncipe omeya, llegó a al-Ándalus."
              ]
            },
            {
              "nombre": "Del emirato al califato",
              "fecha": "Años 756 y 929",
              "icono": "👑",
              "color": "#8b5cf6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/a03_medina_azahara.jpg",
              "texto": "Medina Azahara, cerca de Córdoba",
              "locucion": "En el año setecientos cincuenta y seis, Abd al-Rahman Primero creó en Córdoba un emirato independiente: al-Ándalus dejó de depender del califato abasí de Bagdad. En el año novecientos veintinueve, Abd al-Rahman Tercero se proclamó califa y creó el califato de Córdoba. Cerca de la ciudad mandó construir Medina Azahara, una ciudad palatina para la corte y el gobierno. En la fotografía se ven restos de edificios y arcos del conjunto.",
              "puntos": [
                "**756**: Abd al-Rahman I creó el **emirato independiente** de Córdoba.",
                "**929**: Abd al-Rahman III se proclamó **califa** y creó el **califato de Córdoba**.",
                "Cerca de Córdoba se construyó **Medina Azahara**, la ciudad palatina del califa."
              ]
            },
            {
              "nombre": "Los reinos de taifas",
              "fecha": "Desde el año 1031",
              "icono": "🏰",
              "color": "#f59e0b",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/a04_aljaferia.jpg",
              "texto": "El palacio de la Aljafería",
              "locucion": "En mil treinta y uno, las disputas dividieron el califato en pequeños reinos llamados taifas. La Aljafería de Zaragoza, que aparece en la imagen, fue un palacio construido en esa época. Más tarde llegaron desde el norte de África los almorávides y los almohades, que gobernaron distintos territorios de al-Ándalus.",
              "puntos": [
                "**1031**: el califato de Córdoba se dividió en pequeños reinos llamados **taifas**.",
                "Más tarde llegaron los **almorávides** y los **almohades** desde el norte de África."
              ]
            },
            {
              "nombre": "El reino nazarí de Granada",
              "fecha": "Siglos XIII – XV",
              "icono": "🌺",
              "color": "#ec4899",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/a05_alhambra_panorama.jpg",
              "texto": "La Alhambra de Granada",
              "locucion": "Desde el siglo trece, Granada fue el último reino musulmán de la Península. Lo gobernó la familia nazarí y su residencia principal estaba en la Alhambra, un conjunto de palacios y fortalezas. El reino nazarí terminó en mil cuatrocientos noventa y dos, cuando Granada pasó a manos de los Reyes Católicos.",
              "puntos": [
                "Desde el **siglo XIII**, solo quedó el **reino nazarí de Granada**.",
                "Terminó en **1492**, con los Reyes Católicos."
              ]
            },
            {
              "nombre": "La Alhambra, palacios y patios",
              "fecha": "Granada nazarí",
              "icono": "⛲",
              "color": "#06b6d4",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/a06_patio_leones.jpg",
              "texto": "El Patio de los Leones",
              "locucion": "Esta fotografía muestra el Patio de los Leones, dentro de la Alhambra. Fíjate en las columnas, los arcos y la fuente central. La Alhambra no era un único edificio: tenía patios, salas y jardines. Sus construcciones nos recuerdan el papel de Granada como capital del reino nazarí.",
              "puntos": []
            }
          ],
          "destacado": {
            "icono": "🕰️",
            "titulo": "La línea del tiempo de al-Ándalus",
            "locucion": "Recuerda estas fechas. En el año setecientos once, los musulmanes vencieron a Don Rodrigo en Guadalete y llamaron al-Ándalus a su territorio. Al principio, al-Ándalus fue un emirato dependiente del califato omeya. En setecientos cincuenta y seis, Abd al-Rahman Primero creó el emirato independiente. En novecientos veintinueve, Abd al-Rahman Tercero proclamó el califato de Córdoba. En mil treinta y uno, el califato se dividió en taifas. Desde el siglo trece, solo quedó el reino nazarí de Granada, que terminó en mil cuatrocientos noventa y dos.",
            "texto": "**711** Guadalete y emirato dependiente · **756** emirato independiente · **929** califato de Córdoba · **1031** taifas · **siglo XIII** reino nazarí de Granada · **1492** fin de al-Ándalus"
          }
        }
      ]
    },
    {
      "id": 3,
      "tipo": "quiz",
      "titulo": "3. Quiz: Al-Ándalus",
      "descripcion": "Comprueba lo que has aprendido sobre el origen y evolución de al-Ándalus.",
      "icono": "❓",
      "preguntas": [
        {
          "enunciado": "¿En qué siglo surgió el islam y quién fue su fundador?",
          "opciones": [
            "En el siglo VII, en Arabia, fundado por Mahoma",
            "En el siglo I, en Roma, fundado por Julio César",
            "En el siglo XV, en América, fundado por Cristóbal Colón",
            "En el siglo X, en China, fundado por Confucio"
          ],
          "correcta": 0,
          "explicacion": "¡Correcto! El islam nació a principios del siglo VII en Arabia. Su fundador fue Mahoma y su libro sagrado es el Corán."
        },
        {
          "enunciado": "¿Cómo se llama el libro sagrado de los musulmanes donde se recogen por escrito sus enseñanzas?",
          "opciones": [
            "El Corán",
            "La Biblia",
            "La Torá",
            "El Fuero Real"
          ],
          "correcta": 0,
          "explicacion": "¡Exacto! El Corán es el libro sagrado del islam, con todos los preceptos que debe cumplir un musulmán."
        },
        {
          "enunciado": "¿Qué rey visigodo fue derrotado en la batalla de Guadalete y qué consecuencia tuvo esta derrota?",
          "opciones": [
            "Don Rodrigo, el fin del reino de Toledo",
            "Leovigildo, el inicio de la Reconquista",
            "Recaredo, la creación de al-Ándalus",
            "Alarico, la invasión de los francos"
          ],
          "correcta": 0,
          "explicacion": "¡Muy bien! Don Rodrigo fue derrotado en Guadalete en el año 711. Con él terminó el reino visigodo de Toledo y los musulmanes conquistaron casi toda la Península."
        },
        {
          "enunciado": "¿Cómo llamaron los musulmanes al territorio que ocuparon en la península ibérica?",
          "opciones": [
            "Al-Ándalus",
            "Hispania",
            "Lusitania",
            "Tarraconense"
          ],
          "correcta": 0,
          "explicacion": "¡Genial! Los musulmanes llamaron al-Ándalus a su territorio, y a sus habitantes andalusíes."
        },
        {
          "enunciado": "¿Qué territorio llegaron a controlar los musulmanes durante su expansión inicial?",
          "opciones": [
            "Desde la India hasta el norte de África",
            "Desde China hasta Europa central",
            "Desde Arabia hasta América",
            "Solo la península ibérica"
          ],
          "correcta": 0,
          "explicacion": "¡Muy bien! En su expansión inicial, los musulmanes llegaron desde la India hasta el norte de África. Poco después, en el 711, entraron en la península ibérica."
        },
        {
          "enunciado": "¿Qué era al-Ándalus en un primer momento dentro del imperio islámico?",
          "opciones": [
            "Una provincia (emirato) que dependía del califato omeya de Damasco",
            "Un imperio independiente gobernado por un emperador",
            "Una república formada por ciudades libres",
            "Un reino cristiano aliado de los francos"
          ],
          "correcta": 0,
          "explicacion": "¡Exacto! Al principio, al-Ándalus era una provincia del califato omeya. Estaba gobernada por un emir que dependía del califa de Damasco."
        },
        {
          "enunciado": "¿Cómo se llamaba el imperio islámico al que pertenecía al-Ándalus?",
          "opciones": [
            "Califato",
            "Imperio Romano",
            "Imperio Bizantino",
            "Sultanato"
          ],
          "correcta": 0,
          "explicacion": "¡Correcto! Al-Ándalus pertenecía al califato omeya, el imperio islámico con capital en Damasco."
        },
        {
          "enunciado": "¿Quién dirigía el califato islámico?",
          "opciones": [
            "El califa",
            "El emperador",
            "El sultán",
            "El papa"
          ],
          "correcta": 0,
          "explicacion": "¡Muy bien! El califa era la máxima autoridad del califato: dirigía el imperio y también era la cabeza religiosa."
        },
        {
          "enunciado": "¿Qué ocurrió con la familia Omeya a mediados del siglo VIII?",
          "opciones": [
            "Fue derrocada y algunos miembros huyeron a al-Ándalus",
            "Fue derrocada y desapareció por completo",
            "Fue derrotada por los reinos cristianos",
            "Se convirtió en la familia real de Córdoba"
          ],
          "correcta": 0,
          "explicacion": "¡Así es! En el año 750, los abasíes derrocaron a los omeyas. Algunos miembros de la familia huyeron; uno de ellos, Abd al-Rahman I, llegó a al-Ándalus."
        },
        {
          "enunciado": "¿Quién fue Abd al-Rahman?",
          "opciones": [
            "Un príncipe omeya que huyó a al-Ándalus y creó el emirato independiente de Córdoba en 756",
            "El último califa de Damasco",
            "El rey visigodo derrotado en Guadalete",
            "El califa que proclamó el califato de Córdoba en 929"
          ],
          "correcta": 0,
          "explicacion": "¡Perfecto! Abd al-Rahman I era un príncipe de la familia Omeya. Tras la derrota de su familia, huyó a al-Ándalus y en 756 creó el emirato independiente de Córdoba."
        },
        {
          "enunciado": "¿En qué año se independizó al-Ándalus del califato bajo el mando de Abd al-Rahman I?",
          "opciones": [
            "756",
            "711",
            "929",
            "1031"
          ],
          "correcta": 0,
          "explicacion": "¡Perfecto! En el año 756, Abd al-Rahman I independizó al-Ándalus del califato abasí y creó el emirato independiente de Córdoba."
        },
        {
          "enunciado": "¿Qué proclamó Abd al-Rahman III en el año 929?",
          "opciones": [
            "El califato de Córdoba",
            "El reino nazarí de Granada",
            "La rendición ante los cristianos",
            "La división en taifas"
          ],
          "correcta": 0,
          "explicacion": "¡Así es! En el año 929, Abd al-Rahman III se proclamó califa y creó el califato de Córdoba, su época de máximo esplendor."
        },
        {
          "enunciado": "¿Qué ocurrió con el califato de Córdoba en el año 1031?",
          "opciones": [
            "Se fragmentó en pequeños reinos llamados taifas",
            "Fue conquistado por los cristianos",
            "Pasó a formar parte del imperio bizantino",
            "Se convirtió en el reino nazarí de Granada"
          ],
          "correcta": 0,
          "explicacion": "¡Estupendo! En 1031 el califato de Córdoba se dividió en numerosos reinos pequeños llamados taifas."
        },
        {
          "enunciado": "¿Qué pueblos procedentes del norte de África llegaron para ayudar a los andalusíes ante el avance cristiano?",
          "opciones": [
            "Los almorávides y los almohades",
            "Los suevos y los vándalos",
            "Los alanos y los celtas",
            "Los francos y los normandos"
          ],
          "correcta": 0,
          "explicacion": "¡Correcto! Los reyes de taifas solicitaron auxilio a los almorávides y más tarde a los almohades."
        },
        {
          "enunciado": "¿Qué territorio dominaban los andalusíes en la península ibérica a partir del siglo XIII?",
          "opciones": [
            "El reino nazarí de Granada",
            "Todo el norte peninsular",
            "Las taifas del norte",
            "El califato de Córdoba"
          ],
          "correcta": 0,
          "explicacion": "¡Excelente! Desde el siglo XIII, el territorio musulmán se redujo al reino nazarí de Granada, que resistió hasta 1492."
        }
      ]
    },
    {
      "id": 4,
      "tipo": "minijuego",
      "subtipo": "puzzle",
      "titulo": "4. Puzzle: ¡Al-Ándalus Medieval!",
      "descripcion": "Ordena las 6 piezas del mapa, monumentos y sabios de al-Ándalus.",
      "icono": "🧩",
      "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/puzzle.jpg"
    },
    {
      "id": 5,
      "tipo": "teoria",
      "titulo": "5. Presentación: Los reinos cristianos",
      "descripcion": "Ocho diapositivas con imágenes y explicación por voz.",
      "icono": "📜",
      "fichas": [
        {
          "titulo": "Los reinos cristianos y su expansión",
          "subtitulo": "Los núcleos del norte, los cambios territoriales y la convivencia",
          "icono": "🛡️",
          "tarjetas": [
            {
              "nombre": "Covadonga y los primeros núcleos",
              "fecha": "Siglos VIII y IX",
              "icono": "⛰️",
              "color": "#3b82f6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/b01_covadonga.jpg",
              "texto": "Los primeros núcleos cristianos",
              "locucion": "En el norte de la Península surgieron varios núcleos cristianos. Según la tradición, en el año setecientos veintidós, don Pelayo y sus seguidores vencieron en Covadonga; después se consolidó el reino de Asturias. Esta pintura, realizada muchos siglos más tarde, representa a don Pelayo como rey: no es una imagen de la batalla tal como ocurrió.",
              "puntos": []
            },
            {
              "nombre": "El reino de Asturias",
              "fecha": "Alrededor del año 800",
              "icono": "🏰",
              "color": "#8b5cf6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/b02_asturias_800.jpg",
              "texto": "El reino de Asturias hacia 800",
              "locucion": "Este mapa muestra el reino de Asturias alrededor del año ochocientos. Con el tiempo, aquel reino extendió su territorio hacia el sur y su centro político pasó a León. A lo largo de varios siglos también se formaron reinos como León, Castilla y Portugal. El mapa representa solo un momento de una historia que fue cambiando.",
              "puntos": []
            },
            {
              "nombre": "Las coronas cristianas",
              "fecha": "Siglos XI – XIII",
              "icono": "👑",
              "color": "#f97316",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/b03_mapa_1224_es.jpg",
              "texto": "La Península Ibérica en 1224",
              "locucion": "En mil ochenta y cinco, el rey Alfonso Sexto de Castilla conquistó Toledo, una ciudad muy importante. En mil ciento treinta y siete se formó la Corona de Aragón, que reunió el reino de Aragón y los territorios catalanes. En mil doscientos treinta, Castilla y León quedaron unidos bajo un mismo rey. En el siglo trece, Jaime Primero el Conquistador incorporó a la Corona de Aragón Valencia y las islas Baleares. Este mapa muestra la Península en mil doscientos veinticuatro, seis años antes de la unión de Castilla y León: las fronteras y los nombres de los territorios siguieron cambiando.",
              "puntos": [
                "**1085**: Alfonso VI de Castilla conquistó **Toledo**.",
                "**1137**: se formó la **Corona de Aragón**.",
                "**1230**: Castilla y León quedaron unidos.",
                "En el siglo XIII, **Jaime I** incorporó **Valencia** y las **islas Baleares**."
              ]
            },
            {
              "nombre": "Las Navas de Tolosa",
              "fecha": "Año 1212",
              "icono": "🛡️",
              "color": "#ef4444",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/b04_batalla_navas.jpg",
              "texto": "Una batalla decisiva",
              "locucion": "En mil doscientos doce, varios reyes cristianos se enfrentaron al ejército almohade en Las Navas de Tolosa. La victoria facilitó nuevas conquistas en los años siguientes, aunque el reino nazarí de Granada continuó existiendo hasta mil cuatrocientos noventa y dos. Esta pintura representa la batalla, pero se realizó en el siglo diecinueve, mucho después del acontecimiento.",
              "puntos": []
            },
            {
              "nombre": "El último reino andalusí",
              "fecha": "Hasta el año 1492",
              "icono": "🌺",
              "color": "#ec4899",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/a05_alhambra_panorama.jpg",
              "texto": "Granada, reino nazarí",
              "locucion": "Con el avance de los reinos cristianos, el territorio musulmán se fue reduciendo. Granada fue el último reino nazarí de la Península y mantuvo su independencia hasta mil cuatrocientos noventa y dos. En esta fotografía, tomada desde el barrio del Albaicín, se ven la Alhambra y Sierra Nevada.",
              "puntos": []
            },
            {
              "nombre": "Repoblar los territorios",
              "fecha": "A lo largo de la Edad Media",
              "icono": "🏘️",
              "color": "#f59e0b",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/b06_agricultura_medieval.jpg",
              "texto": "Trabajar la tierra",
              "locucion": "Esta ilustración de un manuscrito del siglo catorce muestra a campesinos arando con bueyes. Cuando un reino conquistaba un territorio, podían llegar nuevas familias para vivir y cultivar allí. A ese proceso se le llama repoblación. No ocurrió siempre de la misma forma: dependía del lugar y de la época; la imagen sirve para ver una tarea del campo, no representa una repoblación concreta de la Península.",
              "puntos": []
            },
            {
              "nombre": "Tres comunidades",
              "fecha": "La sociedad medieval",
              "icono": "🤝",
              "color": "#10b981",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/b05_musicos_cantigas.jpg",
              "texto": "Músicos de las Cantigas de Santa María",
              "locucion": "Esta miniatura del siglo trece pertenece a las Cantigas de Santa María, una obra de la corte de Alfonso Décimo. Muestra a dos músicos tocando instrumentos. En muchas ciudades de la Península vivían cristianos, musulmanes y judíos. A veces comerciaban o compartían espacios, aunque también hubo conflictos y las normas no eran iguales para todos.",
              "puntos": []
            },
            {
              "nombre": "Los mudéjares",
              "fecha": "La Edad Media",
              "icono": "🕌",
              "color": "#06b6d4",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_03_al_andalus/assets/b07_torre_mudejar_toledo.jpg",
              "texto": "Una torre de estilo mudéjar",
              "locucion": "A los musulmanes que permanecían en territorios gobernados por reyes cristianos se les llamaba mudéjares. Podían conservar su religión y algunas costumbres, aunque vivían bajo nuevas autoridades y sus derechos podían ser distintos. Esta torre de la iglesia de Santo Tomé, en Toledo, es un ejemplo de arte mudéjar: un estilo que incorporó técnicas y formas artísticas andalusíes.",
              "puntos": []
            }
          ],
          "destacado": {
            "icono": "⚔️",
            "titulo": "La Batalla de Las Navas de Tolosa (1212)",
            "locucion": "En mil doscientos doce, los ejércitos de varios reinos cristianos vencieron al ejército almohade en Las Navas de Tolosa. Fue una batalla importante, pero el reino nazarí de Granada continuó existiendo hasta mil cuatrocientos noventa y dos.",
            "texto": "La victoria cristiana fue importante, aunque Granada siguió siendo un reino independiente durante casi tres siglos más."
          }
        }
      ]
    },
    {
      "id": 6,
      "tipo": "quiz",
      "titulo": "6. Quiz: Reinos Cristianos y Convivencia",
      "descripcion": "Demuestra lo que sabes sobre la Reconquista, al-Ándalus y las tres culturas.",
      "icono": "🏆",
      "preguntas": [
        {
          "enunciado": "¿Qué líder noble venció a los musulmanes en la batalla de Covadonga en el año 722 originando el reino de Asturias?",
          "opciones": [
            "Don Pelayo",
            "Alfonso VI",
            "Jaime I el Conquistador",
            "Don Rodrigo"
          ],
          "correcta": 0,
          "explicacion": "¡Genial! Don Pelayo lideró a los astures en Covadonga en el 722, dando origen al reino de Asturias."
        },
        {
          "enunciado": "¿Qué tres reinos se formaron con el tiempo en la parte occidental de la Península?",
          "opciones": [
            "Castilla, Portugal y León",
            "Navarra, Aragón y Cataluña",
            "Valencia, Baleares y Murcia",
            "Toledo, Córdoba y Granada"
          ],
          "correcta": 0,
          "explicacion": "¡Exacto! Con el tiempo se formaron en el oeste peninsular los reinos de León, Castilla y Portugal."
        },
        {
          "enunciado": "¿Qué gran ciudad conquistó el rey Alfonso VI en el año 1085, consolidando la frontera cristiana?",
          "opciones": [
            "Toledo",
            "Córdoba",
            "Granada",
            "Sevilla"
          ],
          "correcta": 0,
          "explicacion": "¡Muy bien! En 1085, Alfonso VI conquistó la histórica ciudad de Toledo para el reino cristiano."
        },
        {
          "enunciado": "¿En qué año se unieron Aragón y Barcelona para formar la Corona de Aragón?",
          "opciones": [
            "En 1137",
            "En 711",
            "En 1212",
            "En 1492"
          ],
          "correcta": 0,
          "explicacion": "¡Perfecto! En 1137 se formalizó la unión dinástica entre Aragón y el condado de Barcelona."
        },
        {
          "enunciado": "¿Qué histórica batalla ganaron los cristianos en 1212 abriendo las puertas del valle del Guadalquivir?",
          "opciones": [
            "Batalla de Las Navas de Tolosa",
            "Batalla de Covadonga",
            "Batalla de Guadalete",
            "Batalla de Roncesvalles"
          ],
          "correcta": 0,
          "explicacion": "¡Así es! La batalla de Las Navas de Tolosa (1212) fue el punto de inflexión decisivo de la Reconquista."
        },
        {
          "enunciado": "¿Qué rey de la Corona de Aragón conquistó las islas Baleares y el reino de Valencia?",
          "opciones": [
            "Jaime I el Conquistador",
            "Alfonso VIII de Castilla",
            "Don Pelayo",
            "Fernando el Católico"
          ],
          "correcta": 0,
          "explicacion": "¡Estupendo! Jaime I el Conquistador expandió la Corona de Aragón por Valencia, Baleares y el mar Mediterráneo."
        },
        {
          "enunciado": "¿En qué año se unificaron definitivamente Castilla y León formando la Corona de Castilla?",
          "opciones": [
            "En 1230",
            "En 722",
            "En 1031",
            "En 1085"
          ],
          "correcta": 0,
          "explicacion": "¡Correcto! En 1230 se unieron definitivamente Castilla y León formando la poderosa Corona de Castilla."
        },
        {
          "enunciado": "¿Cómo se llamaba a los musulmanes que vivían en las tierras conquistadas por los reinos cristianos?",
          "opciones": [
            "Mudéjares",
            "Almorávides",
            "Visigodos",
            "Andalusíes"
          ],
          "correcta": 0,
          "explicacion": "¡Genial! Los mudéjares eran los musulmanes que conservaron su religión viviendo bajo dominio cristiano."
        },
        {
          "enunciado": "¿Qué tres comunidades culturales y religiosas convivían en muchas ciudades medievales de la Península?",
          "opciones": [
            "Cristianos, musulmanes y judíos",
            "Romanos, griegos y egipcios",
            "Celtas, iberos y fenicios",
            "Suevos, alanos y vándalos"
          ],
          "correcta": 0,
          "explicacion": "¡Excelente! La época medieval peninsular destacó por la enriquecedora convivencia entre cristianos, musulmanes y judíos."
        },
        {
          "enunciado": "¿Cuál es el orden cronológico correcto de estos acontecimientos históricos?",
          "opciones": [
            "Batalla de Guadalete (711) ➡️ Batalla de Covadonga (722) ➡️ Conquista de Toledo (1085) ➡️ Navas de Tolosa (1212)",
            "Batalla de Covadonga (722) ➡️ Batalla de Guadalete (711) ➡️ Navas de Tolosa (1212) ➡️ Conquista de Toledo (1085)",
            "Navas de Tolosa (1212) ➡️ Conquista de Toledo (1085) ➡️ Batalla de Guadalete (711) ➡️ Batalla de Covadonga (722)",
            "Batalla de Guadalete (711) ➡️ Navas de Tolosa (1212) ➡️ Batalla de Covadonga (722) ➡️ Conquista de Toledo (1085)"
          ],
          "correcta": 0,
          "explicacion": "¡Brillante! Primero la llegada en Guadalete (711), el inicio de la resistencia en Covadonga (722), la toma de Toledo (1085) y la gran victoria en Las Navas de Tolosa (1212)."
        },
        {
          "enunciado": "¿Cuál es el orden correcto de las etapas de al-Ándalus?",
          "opciones": [
            "Emirato dependiente ➡️ Emirato independiente (756) ➡️ Califato (929) ➡️ Taifas (1031) ➡️ Reino nazarí (siglo XIII)",
            "Califato (929) ➡️ Emirato dependiente ➡️ Taifas (1031) ➡️ Emirato independiente (756) ➡️ Reino nazarí",
            "Taifas (1031) ➡️ Califato (929) ➡️ Emirato independiente (756) ➡️ Emirato dependiente ➡️ Reino nazarí",
            "Reino nazarí ➡️ Taifas (1031) ➡️ Califato (929) ➡️ Emirato independiente (756) ➡️ Emirato dependiente"
          ],
          "correcta": 0,
          "explicacion": "¡Brillante! Primero al-Ándalus dependía del califato; en 756 se hizo emirato independiente; en 929 se proclamó el califato de Córdoba; en 1031 se dividió en taifas; y desde el siglo XIII solo quedó el reino nazarí de Granada."
        }
      ]
    }
  ]
}
,
    "cap_04_arte_medieval": {
  "id": "cap_04_arte_medieval",
  "curso_id": "5_primaria",
  "asignatura_id": "ciencias_sociales",
  "tema_id": "tema_06_castillos",
  "titulo": "Capítulo 4: El Arte y la Cultura Medievales",
  "subtitulo": "El arte andalusí, el románico, el gótico y la cultura medieval",
  "icono": "⛪",
  "color_primario": "#f97316",
  "color_secundario": "#ea580c",
  "es_circular": true,
  "casillas": [
    {
      "id": 1,
      "tipo": "minijuego",
      "subtipo": "parejas",
      "titulo": "1. Parejas del Arte Medieval",
      "descripcion": "Relaciona los estilos, edificios y elementos de la Edad Media.",
      "icono": "🃏",
      "parejas": [
        { "id": "andalusi", "etiqueta": "Arte andalusí", "icono": "🕌", "detalle": "Ladrillo, yeso y mucha decoración", "color": "#10b981" },
        { "id": "herradura", "etiqueta": "Arco de herradura", "icono": "🐴", "detalle": "Un arco característico del arte islámico", "color": "#06b6d4" },
        { "id": "cordoba", "etiqueta": "Mezquita de Córdoba", "icono": "🏛️", "detalle": "Gran construcción de al-Ándalus", "color": "#f59e0b" },
        { "id": "alhambra", "etiqueta": "La Alhambra", "icono": "🏰", "detalle": "Palacios nazaríes de Granada", "color": "#ec4899" },
        { "id": "camino", "etiqueta": "Camino de Santiago", "icono": "🥾", "detalle": "Ruta de peregrinación que difundió el románico", "color": "#3b82f6" },
        { "id": "romanico", "etiqueta": "Arte románico", "icono": "⛪", "detalle": "Muros gruesos, ventanas pequeñas y arco de medio punto", "color": "#8b5cf6" },
        { "id": "gotico", "etiqueta": "Arte gótico", "icono": "🌈", "detalle": "Catedrales altas, arcos apuntados y vidrieras", "color": "#ef4444" }
      ]
    },
    {
      "id": 2,
      "tipo": "teoria",
      "titulo": "2. Presentación: El Arte Andalusí",
      "descripcion": "Ocho diapositivas con imágenes y explicación por voz.",
      "icono": "🕌",
      "fichas": [
        {
          "titulo": "El arte andalusí",
          "subtitulo": "El arte islámico de la Península",
          "icono": "🕌",
          "tarjetas": [
            {
              "nombre": "El arte andalusí",
              "fecha": "Al-Ándalus",
              "icono": "🕌",
              "color": "#10b981",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/a01_mezquita.jpg",
              "texto": "Mezquita de Córdoba",
              "locucion": "¡Bienvenidos al arte de al-Ándalus! Así se llamaban las tierras de la Península gobernadas por musulmanes en la Edad Media. Allí construyeron edificios para rezar, vivir y proteger las ciudades: mezquitas, palacios y alcazabas. Una alcazaba era una fortaleza con murallas. Sus edificios nos cuentan cómo vivía la gente.",
              "puntos": []
            },
            {
              "nombre": "Un arte de ocho siglos",
              "fecha": "711 – 1492",
              "icono": "🗺️",
              "color": "#3b82f6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/a02_mapa_al_andalus.jpg",
              "texto": "Territorio peninsular",
              "locucion": "Desde el año setecientos once hasta mil cuatrocientos noventa y dos, los gobernantes musulmanes controlaron distintas zonas de la Península. Sus fronteras cambiaron muchas veces, así que este mapa enseña solo un momento de la historia. En al-Ándalus se construyeron mezquitas para rezar y alcazabas: fortalezas protegidas por murallas.",
              "puntos": []
            },
            {
              "nombre": "Materiales y decoración",
              "fecha": "Ladrillo · yeso · madera",
              "icono": "🧱",
              "color": "#f59e0b",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/a03_decoracion_medina_azahara.jpg",
              "texto": "Edificios muy decorados",
              "locucion": "En muchos edificios andalusíes, los ladrillos formaban los muros y el yeso podía cubrirlos o crear adornos. El yeso se ponía húmedo: mientras estaba blando, los artesanos podían dibujar y tallar formas en él. Al secarse, se endurecía y el adorno quedaba firme. Por eso era un material práctico para decorar, aunque los diseños también se elegían para embellecer el edificio. Algunos techos eran planos y de madera.",
              "puntos": []
            },
            {
              "nombre": "El arco de herradura",
              "fecha": "Arcos y columnas",
              "icono": "🐴",
              "color": "#06b6d4",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/a04_arcos_herradura.jpg",
              "texto": "Arcos y columnas",
              "locucion": "Mira la curva: se cierra un poco hacia dentro y parece una herradura de caballo. Por eso se llama arco de herradura. Un arco cubre el hueco entre dos apoyos y reparte el peso hacia las columnas o los muros. Al repetir arcos sobre columnas se forman galerías, como en la Mezquita de Córdoba. También se usaban techos planos de madera y cúpulas, techos curvos con forma de media esfera.",
              "puntos": []
            },
            {
              "nombre": "Córdoba, capital andalusí",
              "fecha": "Mezquita · Medina Azahara",
              "icono": "🏛️",
              "color": "#f97316",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/a01_mezquita.jpg",
              "texto": "Mezquita de Córdoba",
              "locucion": "Córdoba fue una capital muy importante de al-Ándalus. Desde el año novecientos veintinueve fue la capital del califato de Córdoba, gobernado por un califa. Cerca de allí se construyó Medina Azahara, un palacio donde vivía el califa, el gobernante principal. La Mezquita de Córdoba se amplió en varias épocas. Dentro, muchas columnas sostienen filas de arcos. Las piezas rojas y claras se alternan y forman las franjas de colores que hacen tan fácil reconocerla.",
              "puntos": [
                "Córdoba fue una capital muy importante de al-Ándalus.",
                "Desde **929**, fue la capital del **califato de Córdoba**, gobernado por un **califa**."
              ]
            },
            {
              "nombre": "Palacios y torres",
              "fecha": "Época de los reinos de taifas",
              "icono": "🏰",
              "color": "#8b5cf6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/a06_aljaferia_giralda.jpg",
              "texto": "Aljafería · Giralda",
              "locucion": "Estos edificios tenían usos distintos y se construyeron en momentos diferentes. La Aljafería de Zaragoza fue un palacio de la época de los reinos de taifas, pequeños reinos en que se dividió al-Ándalus. Allí vivían los gobernantes y recibían visitas. La Giralda de Sevilla se levantó más tarde como torre de la mezquita. Desde ella se llamaba a la gente a rezar. Hoy forma parte de la catedral.",
              "puntos": []
            },
            {
              "nombre": "El reino nazarí de Granada",
              "fecha": "Siglos XIII – XV",
              "icono": "🌺",
              "color": "#ec4899",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/a07_alhambra.jpg",
              "texto": "La Alhambra",
              "locucion": "Con el paso del tiempo, las tierras de al-Ándalus se hicieron más pequeñas. El reino de Granada fue el último reino musulmán de la Península. Sus gobernantes pertenecían a una familia llamada nazarí y vivían en la Alhambra. No era un solo palacio, sino varios edificios protegidos por murallas: había lugares para defenderse, vivir y recibir visitas.",
              "puntos": []
            },
            {
              "nombre": "Palacios entre jardines y patios",
              "fecha": "La Alhambra de Granada",
              "icono": "⛲",
              "color": "#f59e0b",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/a08_patio_leones.jpg",
              "texto": "El Patio de los Leones",
              "locucion": "En la Alhambra, muchas habitaciones daban a patios y jardines. Las fuentes y los canales llevaban agua, que ayudaba a refrescar el lugar y también lo decoraba. Este es el Patio de los Leones. Busca la fuente del centro, las columnas delgadas y los arcos con dibujos. ¿Qué formas ves repetidas?",
              "puntos": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "tipo": "quiz",
      "titulo": "3. Quiz: El Arte Andalusí",
      "descripcion": "Comprueba lo que sabes sobre los edificios de al-Ándalus.",
      "icono": "❓",
      "preguntas": [
        {
          "enunciado": "¿Qué materiales se utilizaban mucho en el arte andalusí?",
          "opciones": ["Ladrillo y yeso", "Hormigón y acero", "Mármol y cristal únicamente", "Plástico y madera"],
          "correcta": 0,
          "explicacion": "¡Correcto! En muchas construcciones andalusíes se usaban ladrillo y yeso, y se decoraban mucho."
        },
        {
          "enunciado": "¿Qué forma tenía el arco más frecuente en el arte andalusí?",
          "opciones": ["De herradura", "Apuntado", "De medio punto", "Triangular"],
          "correcta": 0,
          "explicacion": "¡Muy bien! El arco de herradura es uno de los rasgos más reconocibles del arte islámico peninsular."
        },
        {
          "enunciado": "¿Qué gran edificio se construyó en Córdoba, capital de al-Ándalus durante una parte de la Edad Media?",
          "opciones": ["La Mezquita de Córdoba", "La catedral de Burgos", "La basílica de San Vicente", "La catedral de León"],
          "correcta": 0,
          "explicacion": "¡Exacto! La Mezquita de Córdoba es una de las construcciones más destacadas del arte andalusí."
        },
        {
          "enunciado": "¿Qué era la Aljafería de Zaragoza?",
          "opciones": ["Un palacio residencial", "Un monasterio románico", "Una catedral gótica", "Una ruta de peregrinación"],
          "correcta": 0,
          "explicacion": "¡Correcto! La Aljafería fue un palacio residencial construido en época de los reinos de taifas."
        },
        {
          "enunciado": "¿Qué edificio de Sevilla fue la torre de una antigua mezquita?",
          "opciones": ["La Giralda", "La Aljafería", "La Alhambra", "Medina Azahara"],
          "correcta": 0,
          "explicacion": "¡Bien! La Giralda fue la torre de la antigua mezquita de Sevilla."
        },
        {
          "enunciado": "¿En qué ciudad fijaron su residencia los nazaríes?",
          "opciones": ["En Granada, en la Alhambra", "En Toledo, en la Giralda", "En Córdoba, en la Aljafería", "En Burgos, en la mezquita"],
          "correcta": 0,
          "explicacion": "¡Así es! Los nazaríes establecieron su residencia en la Alhambra de Granada."
        },
        {
          "enunciado": "¿Cómo eran muchos techos andalusíes?",
          "opciones": ["Planos y de madera, aunque también hubo cúpulas", "Siempre puntiagudos y de vidrio", "Todos estaban hechos de hierro", "No tenían techo"],
          "correcta": 0,
          "explicacion": "¡Excelente! Había techos planos de madera y también destacó la construcción de cúpulas."
        }
      ]
    },
    {
      "id": 4,
      "tipo": "minijuego",
      "subtipo": "puzzle",
      "titulo": "4. Puzzle: Tres Estilos Medievales",
      "descripcion": "Reconstruye una imagen con monumentos andalusíes, románicos y góticos.",
      "icono": "🧩",
      "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/puzzle.jpg"
    },
    {
      "id": 5,
      "tipo": "teoria",
      "titulo": "5. Presentación: Románico, Gótico y Cultura",
      "descripcion": "Once diapositivas con imágenes y explicación por voz.",
      "icono": "⛪",
      "fichas": [
        {
          "titulo": "Románico, gótico y cultura medieval",
          "subtitulo": "Los reinos cristianos de la Península",
          "icono": "⛪",
          "tarjetas": [
            {
              "nombre": "Dos estilos medievales",
              "fecha": "Románico · Gótico",
              "icono": "⛪",
              "color": "#8b5cf6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/b05_leon_catedral.jpg",
              "texto": "Románico y Gótico",
              "locucion": "En los reinos cristianos de la Edad Media destacaron dos estilos: el románico y, más tarde, el gótico. No solo se veían distintos: también se construían de otra manera. Al mirar una iglesia, podemos comparar su altura, sus muros, la forma de los arcos y cuánta luz entra por las ventanas.",
              "puntos": []
            },
            {
              "nombre": "El Camino de Santiago",
              "fecha": "Desde el siglo XI",
              "icono": "🥾",
              "color": "#3b82f6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/b01_camino.jpg",
              "texto": "Una ruta de peregrinación",
              "locucion": "Desde el siglo once, muchos viajeros llamados peregrinos recorrían el Camino de Santiago como viaje religioso para visitar la tumba del apóstol Santiago. En el camino compartían ideas y maneras de construir. Así se extendió el estilo románico por la ruta. También se levantaron iglesias y monasterios donde los viajeros podían descansar y recibir ayuda.",
              "puntos": []
            },
            {
              "nombre": "Iglesias románicas",
              "fecha": "Siglos XI – XII",
              "icono": "🏰",
              "color": "#8b5cf6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/b02_fromista.jpg",
              "texto": "Muros gruesos · poca luz",
              "locucion": "Las iglesias románicas solían ser bajas y fuertes. Sus muros de piedra sostenían gran parte del peso del techo. Por eso eran gruesos y tenían ventanas pequeñas: abrir huecos grandes podía debilitar las paredes, y entraba poca luz. El arco de medio punto tiene forma de media circunferencia. La parte redondeada del fondo de la iglesia se llama ábside. Algunas iglesias también tenían torres.",
              "puntos": []
            },
            {
              "nombre": "Pórticos y pinturas románicas",
              "fecha": "Esculturas · pinturas",
              "icono": "🎨",
              "color": "#f59e0b",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/b04_taull_frescos.jpg",
              "texto": "Historias en los muros",
              "locucion": "La entrada principal de una iglesia se llama portada y podía decorarse con figuras talladas en piedra. Dentro se pintaban escenas de la Biblia. Como muchas personas no sabían leer, las imágenes les ayudaban a conocer esas historias. Algunas pinturas se hacían al fresco: el artista pintaba sobre la pared cuando el yeso aún estaba húmedo. Al secarse, el color quedaba unido al muro.",
              "puntos": []
            },
            {
              "nombre": "Ejemplos del arte románico",
              "fecha": "Frómista · Ávila · Tahull",
              "icono": "🏛️",
              "color": "#8b5cf6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/b03_san_vicente_avila.jpg",
              "texto": "San Vicente de Ávila",
              "locucion": "San Martín de Frómista, en Palencia, y la basílica de San Vicente, en Ávila, son iglesias románicas. También lo es San Clemente de Tahull, en Lleida, conocida por sus pinturas en los muros. Cada iglesia tiene sus propios detalles, pero podemos buscar rasgos comunes: paredes de piedra, arcos redondos y una forma fuerte y sencilla.",
              "puntos": []
            },
            {
              "nombre": "Catedrales góticas",
              "fecha": "Siglos XIII – XV",
              "icono": "⛪",
              "color": "#ef4444",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/b05_leon_catedral.jpg",
              "texto": "Altas y esbeltas",
              "locucion": "El gótico se desarrolló sobre todo entre los siglos trece y quince. Sus catedrales eran muy altas y tenían torres delgadas. El arco apuntado termina en punta. Junto con otros apoyos, ayudaba a llevar el peso del edificio hacia el suelo. Así, las paredes podían ser menos gruesas y dejar espacio para ventanas más grandes.",
              "puntos": []
            },
            {
              "nombre": "La luz del gótico",
              "fecha": "Rosetones · vidrieras",
              "icono": "🌈",
              "color": "#06b6d4",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/b12_roseton_vidrieras.jpg",
              "texto": "Rosetón · vidrieras",
              "locucion": "En la imagen grande puedes ver un rosetón: una ventana redonda con dibujos que parecen pétalos. En la foto pequeña aparecen vidrieras, ventanas hechas con piezas de vidrio de colores unidas por tiras de metal. Cuando la luz pasa por ellas, llena la catedral de colores. Por eso el gótico puede tener interiores mucho más luminosos que una iglesia románica.",
              "puntos": []
            },
            {
              "nombre": "Grandes catedrales",
              "fecha": "Burgos · León · Toledo",
              "icono": "🏙️",
              "color": "#f97316",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/b07_burgos_catedral.jpg",
              "texto": "Catedrales góticas",
              "locucion": "La catedral era la iglesia principal de una ciudad y allí tenía su sede el obispo, que dirigía la comunidad cristiana local. Construir una catedral tan grande podía llevar muchos años y necesitaba albañiles, escultores y otros trabajadores. En la Península destacan las de Burgos, León, Toledo, Barcelona y Palma. Mira cómo sus torres hacen que parezca aún más alta.",
              "puntos": []
            },
            {
              "nombre": "Los monasterios y los libros",
              "fecha": "La cultura cristiana",
              "icono": "📚",
              "color": "#10b981",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/b10_cantar_mio_cid.jpg",
              "texto": "Copiar y guardar libros",
              "locucion": "En los reinos cristianos, los monasterios eran lugares importantes para aprender y guardar libros. Muchos monjes y monjas sabían leer y escribir. Como todavía no existía la imprenta, cada libro se copiaba a mano, letra por letra. ¡Imagina cuánto tiempo llevaba! Esos libros escritos a mano se llaman manuscritos y ayudaron a conservar historias e ideas.",
              "puntos": []
            },
            {
              "nombre": "La Escuela de Traductores de Toledo",
              "fecha": "Alfonso X el Sabio",
              "icono": "📜",
              "color": "#f59e0b",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/b09_alfonso_x.jpg",
              "texto": "Traducir juntos",
              "locucion": "En Toledo vivían cristianos, musulmanes y judíos. Personas de estas comunidades colaboraban para traducir libros: es decir, contar las mismas ideas en otro idioma. En la llamada Escuela de Traductores de Toledo tradujeron obras antiguas que estaban escritas en otras lenguas. Así, más personas pudieron conocer esas ideas. El trabajo recibió el apoyo de los obispos y del rey Alfonso Décimo, llamado el Sabio.",
              "puntos": []
            },
            {
              "nombre": "Primeras manifestaciones literarias",
              "fecha": "Castellano · catalán · portugués",
              "icono": "📝",
              "color": "#ec4899",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/b10_cantar_mio_cid.jpg",
              "texto": "El Cantar de Mio Cid",
              "locucion": "Durante la Edad Media, el latín todavía se usaba en muchos libros. Pero la gente lo hablaba de maneras distintas según el lugar, y con el paso del tiempo nacieron nuevas lenguas: castellano, catalán y portugués, entre otras. Se llaman lenguas romances porque vienen del latín de los romanos; no tiene que ver con las historias de amor. En castellano se escribió el Cantar de Mio Cid, una de las primeras obras literarias importantes.",
              "puntos": []
            }
          ]
        }
      ]
    },
    {
      "id": 6,
      "tipo": "quiz",
      "titulo": "6. Quiz: Románico, Gótico y Cultura",
      "descripcion": "Pon a prueba lo que sabes de los estilos y la cultura medievales.",
      "icono": "🏆",
      "preguntas": [
        {
          "enunciado": "¿Por qué ruta llegó el románico a la Península?",
          "opciones": ["Por el Camino de Santiago", "Por la Ruta de la Seda", "Por el Camino de Roma", "Por el Camino de las Islas"],
          "correcta": 0,
          "explicacion": "¡Correcto! La peregrinación por el Camino de Santiago favoreció la llegada del románico."
        },
        {
          "enunciado": "¿Qué tipo de arco era el más frecuente en el románico?",
          "opciones": ["El arco de medio punto", "El arco apuntado", "El arco de herradura", "El arco triangular"],
          "correcta": 0,
          "explicacion": "¡Muy bien! El arco románico más habitual tiene forma semicircular y se llama de medio punto."
        },
        {
          "enunciado": "¿Cómo eran los muros y las ventanas de las iglesias románicas?",
          "opciones": ["Muros gruesos y ventanas pequeñas", "Muros finos y ventanas enormes", "Muros de cristal y sin ventanas", "Muros de madera y rosetones grandes"],
          "correcta": 0,
          "explicacion": "¡Exacto! Los muros gruesos y las ventanas pequeñas hacían que los interiores románicos fueran oscuros."
        },
        {
          "enunciado": "¿Cómo se llama la parte posterior de una iglesia románica, normalmente semicircular?",
          "opciones": ["El ábside", "El rosetón", "La cúpula", "El claustro"],
          "correcta": 0,
          "explicacion": "¡Correcto! El ábside es la parte posterior del edificio y suele tener forma semicircular."
        },
        {
          "enunciado": "¿En qué siglos fue típico el estilo gótico?",
          "opciones": ["Siglos XIII, XIV y XV", "Siglos VIII, IX y X", "Siglos V, VI y VII", "Siglos XVI, XVII y XVIII"],
          "correcta": 0,
          "explicacion": "¡Así es! El gótico fue característico de los siglos trece, catorce y quince."
        },
        {
          "enunciado": "¿Qué forma tenían los arcos típicos del gótico?",
          "opciones": ["Apuntada, con un vértice", "Semicircular, de medio punto", "En forma de herradura", "Triangular y plano"],
          "correcta": 0,
          "explicacion": "¡Muy bien! Los arcos apuntados terminan en un vértice en el centro."
        },
        {
          "enunciado": "¿Qué ayudaba a que las catedrales góticas fueran muy luminosas?",
          "opciones": ["Las grandes ventanas con vidrieras de colores", "Los muros más gruesos", "Las ventanas muy pequeñas", "Los techos planos de madera"],
          "correcta": 0,
          "explicacion": "¡Correcto! Las vidrieras dejaban entrar la luz y llenaban el interior de colores."
        },
        {
          "enunciado": "¿Dónde se desarrollaba principalmente la cultura cristiana medieval?",
          "opciones": ["En los monasterios", "En los mercados", "En los castillos únicamente", "En los puertos"],
          "correcta": 0,
          "explicacion": "¡Exacto! Los monasterios eran centros importantes de cultura y conservación de libros."
        },
        {
          "enunciado": "¿Con qué rey se relaciona la Escuela de Traductores de Toledo?",
          "opciones": ["Alfonso X el Sabio", "Don Pelayo", "Abd al-Rahman III", "Jaime I"],
          "correcta": 0,
          "explicacion": "¡Muy bien! Alfonso X el Sabio impulsó el trabajo de traducción en Toledo."
        },
        {
          "enunciado": "¿De qué lengua proceden el castellano, el catalán y el portugués?",
          "opciones": ["Del latín", "Del griego", "Del árabe únicamente", "Del germánico"],
          "correcta": 0,
          "explicacion": "¡Correcto! El castellano, el catalán y el portugués son lenguas romances derivadas del latín."
        }
      ]
    }
  ]
}
,
    "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/contenido.json": {
  "id": "cap_04_arte_medieval",
  "curso_id": "5_primaria",
  "asignatura_id": "ciencias_sociales",
  "tema_id": "tema_06_castillos",
  "titulo": "Capítulo 4: El Arte y la Cultura Medievales",
  "subtitulo": "El arte andalusí, el románico, el gótico y la cultura medieval",
  "icono": "⛪",
  "color_primario": "#f97316",
  "color_secundario": "#ea580c",
  "es_circular": true,
  "casillas": [
    {
      "id": 1,
      "tipo": "minijuego",
      "subtipo": "parejas",
      "titulo": "1. Parejas del Arte Medieval",
      "descripcion": "Relaciona los estilos, edificios y elementos de la Edad Media.",
      "icono": "🃏",
      "parejas": [
        { "id": "andalusi", "etiqueta": "Arte andalusí", "icono": "🕌", "detalle": "Ladrillo, yeso y mucha decoración", "color": "#10b981" },
        { "id": "herradura", "etiqueta": "Arco de herradura", "icono": "🐴", "detalle": "Un arco característico del arte islámico", "color": "#06b6d4" },
        { "id": "cordoba", "etiqueta": "Mezquita de Córdoba", "icono": "🏛️", "detalle": "Gran construcción de al-Ándalus", "color": "#f59e0b" },
        { "id": "alhambra", "etiqueta": "La Alhambra", "icono": "🏰", "detalle": "Palacios nazaríes de Granada", "color": "#ec4899" },
        { "id": "camino", "etiqueta": "Camino de Santiago", "icono": "🥾", "detalle": "Ruta de peregrinación que difundió el románico", "color": "#3b82f6" },
        { "id": "romanico", "etiqueta": "Arte románico", "icono": "⛪", "detalle": "Muros gruesos, ventanas pequeñas y arco de medio punto", "color": "#8b5cf6" },
        { "id": "gotico", "etiqueta": "Arte gótico", "icono": "🌈", "detalle": "Catedrales altas, arcos apuntados y vidrieras", "color": "#ef4444" }
      ]
    },
    {
      "id": 2,
      "tipo": "teoria",
      "titulo": "2. Presentación: El Arte Andalusí",
      "descripcion": "Ocho diapositivas con imágenes y explicación por voz.",
      "icono": "🕌",
      "fichas": [
        {
          "titulo": "El arte andalusí",
          "subtitulo": "El arte islámico de la Península",
          "icono": "🕌",
          "tarjetas": [
            {
              "nombre": "El arte andalusí",
              "fecha": "Al-Ándalus",
              "icono": "🕌",
              "color": "#10b981",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/a01_mezquita.jpg",
              "texto": "Mezquita de Córdoba",
              "locucion": "¡Bienvenidos al arte de al-Ándalus! Así se llamaban las tierras de la Península gobernadas por musulmanes en la Edad Media. Allí construyeron edificios para rezar, vivir y proteger las ciudades: mezquitas, palacios y alcazabas. Una alcazaba era una fortaleza con murallas. Sus edificios nos cuentan cómo vivía la gente.",
              "puntos": []
            },
            {
              "nombre": "Un arte de ocho siglos",
              "fecha": "711 – 1492",
              "icono": "🗺️",
              "color": "#3b82f6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/a02_mapa_al_andalus.jpg",
              "texto": "Territorio peninsular",
              "locucion": "Desde el año setecientos once hasta mil cuatrocientos noventa y dos, los gobernantes musulmanes controlaron distintas zonas de la Península. Sus fronteras cambiaron muchas veces, así que este mapa enseña solo un momento de la historia. En al-Ándalus se construyeron mezquitas para rezar y alcazabas: fortalezas protegidas por murallas.",
              "puntos": []
            },
            {
              "nombre": "Materiales y decoración",
              "fecha": "Ladrillo · yeso · madera",
              "icono": "🧱",
              "color": "#f59e0b",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/a03_decoracion_medina_azahara.jpg",
              "texto": "Edificios muy decorados",
              "locucion": "En muchos edificios andalusíes, los ladrillos formaban los muros y el yeso podía cubrirlos o crear adornos. El yeso se ponía húmedo: mientras estaba blando, los artesanos podían dibujar y tallar formas en él. Al secarse, se endurecía y el adorno quedaba firme. Por eso era un material práctico para decorar, aunque los diseños también se elegían para embellecer el edificio. Algunos techos eran planos y de madera.",
              "puntos": []
            },
            {
              "nombre": "El arco de herradura",
              "fecha": "Arcos y columnas",
              "icono": "🐴",
              "color": "#06b6d4",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/a04_arcos_herradura.jpg",
              "texto": "Arcos y columnas",
              "locucion": "Mira la curva: se cierra un poco hacia dentro y parece una herradura de caballo. Por eso se llama arco de herradura. Un arco cubre el hueco entre dos apoyos y reparte el peso hacia las columnas o los muros. Al repetir arcos sobre columnas se forman galerías, como en la Mezquita de Córdoba. También se usaban techos planos de madera y cúpulas, techos curvos con forma de media esfera.",
              "puntos": []
            },
            {
              "nombre": "Córdoba, capital andalusí",
              "fecha": "Mezquita · Medina Azahara",
              "icono": "🏛️",
              "color": "#f97316",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/a01_mezquita.jpg",
              "texto": "Mezquita de Córdoba",
              "locucion": "Córdoba fue una capital muy importante de al-Ándalus. Desde el año novecientos veintinueve fue la capital del califato de Córdoba, gobernado por un califa. Cerca de allí se construyó Medina Azahara, un palacio donde vivía el califa, el gobernante principal. La Mezquita de Córdoba se amplió en varias épocas. Dentro, muchas columnas sostienen filas de arcos. Las piezas rojas y claras se alternan y forman las franjas de colores que hacen tan fácil reconocerla.",
              "puntos": [
                "Córdoba fue una capital muy importante de al-Ándalus.",
                "Desde **929**, fue la capital del **califato de Córdoba**, gobernado por un **califa**."
              ]
            },
            {
              "nombre": "Palacios y torres",
              "fecha": "Época de los reinos de taifas",
              "icono": "🏰",
              "color": "#8b5cf6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/a06_aljaferia_giralda.jpg",
              "texto": "Aljafería · Giralda",
              "locucion": "Estos edificios tenían usos distintos y se construyeron en momentos diferentes. La Aljafería de Zaragoza fue un palacio de la época de los reinos de taifas, pequeños reinos en que se dividió al-Ándalus. Allí vivían los gobernantes y recibían visitas. La Giralda de Sevilla se levantó más tarde como torre de la mezquita. Desde ella se llamaba a la gente a rezar. Hoy forma parte de la catedral.",
              "puntos": []
            },
            {
              "nombre": "El reino nazarí de Granada",
              "fecha": "Siglos XIII – XV",
              "icono": "🌺",
              "color": "#ec4899",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/a07_alhambra.jpg",
              "texto": "La Alhambra",
              "locucion": "Con el paso del tiempo, las tierras de al-Ándalus se hicieron más pequeñas. El reino de Granada fue el último reino musulmán de la Península. Sus gobernantes pertenecían a una familia llamada nazarí y vivían en la Alhambra. No era un solo palacio, sino varios edificios protegidos por murallas: había lugares para defenderse, vivir y recibir visitas.",
              "puntos": []
            },
            {
              "nombre": "Palacios entre jardines y patios",
              "fecha": "La Alhambra de Granada",
              "icono": "⛲",
              "color": "#f59e0b",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/a08_patio_leones.jpg",
              "texto": "El Patio de los Leones",
              "locucion": "En la Alhambra, muchas habitaciones daban a patios y jardines. Las fuentes y los canales llevaban agua, que ayudaba a refrescar el lugar y también lo decoraba. Este es el Patio de los Leones. Busca la fuente del centro, las columnas delgadas y los arcos con dibujos. ¿Qué formas ves repetidas?",
              "puntos": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "tipo": "quiz",
      "titulo": "3. Quiz: El Arte Andalusí",
      "descripcion": "Comprueba lo que sabes sobre los edificios de al-Ándalus.",
      "icono": "❓",
      "preguntas": [
        {
          "enunciado": "¿Qué materiales se utilizaban mucho en el arte andalusí?",
          "opciones": ["Ladrillo y yeso", "Hormigón y acero", "Mármol y cristal únicamente", "Plástico y madera"],
          "correcta": 0,
          "explicacion": "¡Correcto! En muchas construcciones andalusíes se usaban ladrillo y yeso, y se decoraban mucho."
        },
        {
          "enunciado": "¿Qué forma tenía el arco más frecuente en el arte andalusí?",
          "opciones": ["De herradura", "Apuntado", "De medio punto", "Triangular"],
          "correcta": 0,
          "explicacion": "¡Muy bien! El arco de herradura es uno de los rasgos más reconocibles del arte islámico peninsular."
        },
        {
          "enunciado": "¿Qué gran edificio se construyó en Córdoba, capital de al-Ándalus durante una parte de la Edad Media?",
          "opciones": ["La Mezquita de Córdoba", "La catedral de Burgos", "La basílica de San Vicente", "La catedral de León"],
          "correcta": 0,
          "explicacion": "¡Exacto! La Mezquita de Córdoba es una de las construcciones más destacadas del arte andalusí."
        },
        {
          "enunciado": "¿Qué era la Aljafería de Zaragoza?",
          "opciones": ["Un palacio residencial", "Un monasterio románico", "Una catedral gótica", "Una ruta de peregrinación"],
          "correcta": 0,
          "explicacion": "¡Correcto! La Aljafería fue un palacio residencial construido en época de los reinos de taifas."
        },
        {
          "enunciado": "¿Qué edificio de Sevilla fue la torre de una antigua mezquita?",
          "opciones": ["La Giralda", "La Aljafería", "La Alhambra", "Medina Azahara"],
          "correcta": 0,
          "explicacion": "¡Bien! La Giralda fue la torre de la antigua mezquita de Sevilla."
        },
        {
          "enunciado": "¿En qué ciudad fijaron su residencia los nazaríes?",
          "opciones": ["En Granada, en la Alhambra", "En Toledo, en la Giralda", "En Córdoba, en la Aljafería", "En Burgos, en la mezquita"],
          "correcta": 0,
          "explicacion": "¡Así es! Los nazaríes establecieron su residencia en la Alhambra de Granada."
        },
        {
          "enunciado": "¿Cómo eran muchos techos andalusíes?",
          "opciones": ["Planos y de madera, aunque también hubo cúpulas", "Siempre puntiagudos y de vidrio", "Todos estaban hechos de hierro", "No tenían techo"],
          "correcta": 0,
          "explicacion": "¡Excelente! Había techos planos de madera y también destacó la construcción de cúpulas."
        }
      ]
    },
    {
      "id": 4,
      "tipo": "minijuego",
      "subtipo": "puzzle",
      "titulo": "4. Puzzle: Tres Estilos Medievales",
      "descripcion": "Reconstruye una imagen con monumentos andalusíes, románicos y góticos.",
      "icono": "🧩",
      "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/puzzle.jpg"
    },
    {
      "id": 5,
      "tipo": "teoria",
      "titulo": "5. Presentación: Románico, Gótico y Cultura",
      "descripcion": "Once diapositivas con imágenes y explicación por voz.",
      "icono": "⛪",
      "fichas": [
        {
          "titulo": "Románico, gótico y cultura medieval",
          "subtitulo": "Los reinos cristianos de la Península",
          "icono": "⛪",
          "tarjetas": [
            {
              "nombre": "Dos estilos medievales",
              "fecha": "Románico · Gótico",
              "icono": "⛪",
              "color": "#8b5cf6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/b05_leon_catedral.jpg",
              "texto": "Románico y Gótico",
              "locucion": "En los reinos cristianos de la Edad Media destacaron dos estilos: el románico y, más tarde, el gótico. No solo se veían distintos: también se construían de otra manera. Al mirar una iglesia, podemos comparar su altura, sus muros, la forma de los arcos y cuánta luz entra por las ventanas.",
              "puntos": []
            },
            {
              "nombre": "El Camino de Santiago",
              "fecha": "Desde el siglo XI",
              "icono": "🥾",
              "color": "#3b82f6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/b01_camino.jpg",
              "texto": "Una ruta de peregrinación",
              "locucion": "Desde el siglo once, muchos viajeros llamados peregrinos recorrían el Camino de Santiago como viaje religioso para visitar la tumba del apóstol Santiago. En el camino compartían ideas y maneras de construir. Así se extendió el estilo románico por la ruta. También se levantaron iglesias y monasterios donde los viajeros podían descansar y recibir ayuda.",
              "puntos": []
            },
            {
              "nombre": "Iglesias románicas",
              "fecha": "Siglos XI – XII",
              "icono": "🏰",
              "color": "#8b5cf6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/b02_fromista.jpg",
              "texto": "Muros gruesos · poca luz",
              "locucion": "Las iglesias románicas solían ser bajas y fuertes. Sus muros de piedra sostenían gran parte del peso del techo. Por eso eran gruesos y tenían ventanas pequeñas: abrir huecos grandes podía debilitar las paredes, y entraba poca luz. El arco de medio punto tiene forma de media circunferencia. La parte redondeada del fondo de la iglesia se llama ábside. Algunas iglesias también tenían torres.",
              "puntos": []
            },
            {
              "nombre": "Pórticos y pinturas románicas",
              "fecha": "Esculturas · pinturas",
              "icono": "🎨",
              "color": "#f59e0b",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/b04_taull_frescos.jpg",
              "texto": "Historias en los muros",
              "locucion": "La entrada principal de una iglesia se llama portada y podía decorarse con figuras talladas en piedra. Dentro se pintaban escenas de la Biblia. Como muchas personas no sabían leer, las imágenes les ayudaban a conocer esas historias. Algunas pinturas se hacían al fresco: el artista pintaba sobre la pared cuando el yeso aún estaba húmedo. Al secarse, el color quedaba unido al muro.",
              "puntos": []
            },
            {
              "nombre": "Ejemplos del arte románico",
              "fecha": "Frómista · Ávila · Tahull",
              "icono": "🏛️",
              "color": "#8b5cf6",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/b03_san_vicente_avila.jpg",
              "texto": "San Vicente de Ávila",
              "locucion": "San Martín de Frómista, en Palencia, y la basílica de San Vicente, en Ávila, son iglesias románicas. También lo es San Clemente de Tahull, en Lleida, conocida por sus pinturas en los muros. Cada iglesia tiene sus propios detalles, pero podemos buscar rasgos comunes: paredes de piedra, arcos redondos y una forma fuerte y sencilla.",
              "puntos": []
            },
            {
              "nombre": "Catedrales góticas",
              "fecha": "Siglos XIII – XV",
              "icono": "⛪",
              "color": "#ef4444",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/b05_leon_catedral.jpg",
              "texto": "Altas y esbeltas",
              "locucion": "El gótico se desarrolló sobre todo entre los siglos trece y quince. Sus catedrales eran muy altas y tenían torres delgadas. El arco apuntado termina en punta. Junto con otros apoyos, ayudaba a llevar el peso del edificio hacia el suelo. Así, las paredes podían ser menos gruesas y dejar espacio para ventanas más grandes.",
              "puntos": []
            },
            {
              "nombre": "La luz del gótico",
              "fecha": "Rosetones · vidrieras",
              "icono": "🌈",
              "color": "#06b6d4",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/b12_roseton_vidrieras.jpg",
              "texto": "Rosetón · vidrieras",
              "locucion": "En la imagen grande puedes ver un rosetón: una ventana redonda con dibujos que parecen pétalos. En la foto pequeña aparecen vidrieras, ventanas hechas con piezas de vidrio de colores unidas por tiras de metal. Cuando la luz pasa por ellas, llena la catedral de colores. Por eso el gótico puede tener interiores mucho más luminosos que una iglesia románica.",
              "puntos": []
            },
            {
              "nombre": "Grandes catedrales",
              "fecha": "Burgos · León · Toledo",
              "icono": "🏙️",
              "color": "#f97316",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/b07_burgos_catedral.jpg",
              "texto": "Catedrales góticas",
              "locucion": "La catedral era la iglesia principal de una ciudad y allí tenía su sede el obispo, que dirigía la comunidad cristiana local. Construir una catedral tan grande podía llevar muchos años y necesitaba albañiles, escultores y otros trabajadores. En la Península destacan las de Burgos, León, Toledo, Barcelona y Palma. Mira cómo sus torres hacen que parezca aún más alta.",
              "puntos": []
            },
            {
              "nombre": "Los monasterios y los libros",
              "fecha": "La cultura cristiana",
              "icono": "📚",
              "color": "#10b981",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/b10_cantar_mio_cid.jpg",
              "texto": "Copiar y guardar libros",
              "locucion": "En los reinos cristianos, los monasterios eran lugares importantes para aprender y guardar libros. Muchos monjes y monjas sabían leer y escribir. Como todavía no existía la imprenta, cada libro se copiaba a mano, letra por letra. ¡Imagina cuánto tiempo llevaba! Esos libros escritos a mano se llaman manuscritos y ayudaron a conservar historias e ideas.",
              "puntos": []
            },
            {
              "nombre": "La Escuela de Traductores de Toledo",
              "fecha": "Alfonso X el Sabio",
              "icono": "📜",
              "color": "#f59e0b",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/b09_alfonso_x.jpg",
              "texto": "Traducir juntos",
              "locucion": "En Toledo vivían cristianos, musulmanes y judíos. Personas de estas comunidades colaboraban para traducir libros: es decir, contar las mismas ideas en otro idioma. En la llamada Escuela de Traductores de Toledo tradujeron obras antiguas que estaban escritas en otras lenguas. Así, más personas pudieron conocer esas ideas. El trabajo recibió el apoyo de los obispos y del rey Alfonso Décimo, llamado el Sabio.",
              "puntos": []
            },
            {
              "nombre": "Primeras manifestaciones literarias",
              "fecha": "Castellano · catalán · portugués",
              "icono": "📝",
              "color": "#ec4899",
              "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_04_arte_medieval/assets/b10_cantar_mio_cid.jpg",
              "texto": "El Cantar de Mio Cid",
              "locucion": "Durante la Edad Media, el latín todavía se usaba en muchos libros. Pero la gente lo hablaba de maneras distintas según el lugar, y con el paso del tiempo nacieron nuevas lenguas: castellano, catalán y portugués, entre otras. Se llaman lenguas romances porque vienen del latín de los romanos; no tiene que ver con las historias de amor. En castellano se escribió el Cantar de Mio Cid, una de las primeras obras literarias importantes.",
              "puntos": []
            }
          ]
        }
      ]
    },
    {
      "id": 6,
      "tipo": "quiz",
      "titulo": "6. Quiz: Románico, Gótico y Cultura",
      "descripcion": "Pon a prueba lo que sabes de los estilos y la cultura medievales.",
      "icono": "🏆",
      "preguntas": [
        {
          "enunciado": "¿Por qué ruta llegó el románico a la Península?",
          "opciones": ["Por el Camino de Santiago", "Por la Ruta de la Seda", "Por el Camino de Roma", "Por el Camino de las Islas"],
          "correcta": 0,
          "explicacion": "¡Correcto! La peregrinación por el Camino de Santiago favoreció la llegada del románico."
        },
        {
          "enunciado": "¿Qué tipo de arco era el más frecuente en el románico?",
          "opciones": ["El arco de medio punto", "El arco apuntado", "El arco de herradura", "El arco triangular"],
          "correcta": 0,
          "explicacion": "¡Muy bien! El arco románico más habitual tiene forma semicircular y se llama de medio punto."
        },
        {
          "enunciado": "¿Cómo eran los muros y las ventanas de las iglesias románicas?",
          "opciones": ["Muros gruesos y ventanas pequeñas", "Muros finos y ventanas enormes", "Muros de cristal y sin ventanas", "Muros de madera y rosetones grandes"],
          "correcta": 0,
          "explicacion": "¡Exacto! Los muros gruesos y las ventanas pequeñas hacían que los interiores románicos fueran oscuros."
        },
        {
          "enunciado": "¿Cómo se llama la parte posterior de una iglesia románica, normalmente semicircular?",
          "opciones": ["El ábside", "El rosetón", "La cúpula", "El claustro"],
          "correcta": 0,
          "explicacion": "¡Correcto! El ábside es la parte posterior del edificio y suele tener forma semicircular."
        },
        {
          "enunciado": "¿En qué siglos fue típico el estilo gótico?",
          "opciones": ["Siglos XIII, XIV y XV", "Siglos VIII, IX y X", "Siglos V, VI y VII", "Siglos XVI, XVII y XVIII"],
          "correcta": 0,
          "explicacion": "¡Así es! El gótico fue característico de los siglos trece, catorce y quince."
        },
        {
          "enunciado": "¿Qué forma tenían los arcos típicos del gótico?",
          "opciones": ["Apuntada, con un vértice", "Semicircular, de medio punto", "En forma de herradura", "Triangular y plano"],
          "correcta": 0,
          "explicacion": "¡Muy bien! Los arcos apuntados terminan en un vértice en el centro."
        },
        {
          "enunciado": "¿Qué ayudaba a que las catedrales góticas fueran muy luminosas?",
          "opciones": ["Las grandes ventanas con vidrieras de colores", "Los muros más gruesos", "Las ventanas muy pequeñas", "Los techos planos de madera"],
          "correcta": 0,
          "explicacion": "¡Correcto! Las vidrieras dejaban entrar la luz y llenaban el interior de colores."
        },
        {
          "enunciado": "¿Dónde se desarrollaba principalmente la cultura cristiana medieval?",
          "opciones": ["En los monasterios", "En los mercados", "En los castillos únicamente", "En los puertos"],
          "correcta": 0,
          "explicacion": "¡Exacto! Los monasterios eran centros importantes de cultura y conservación de libros."
        },
        {
          "enunciado": "¿Con qué rey se relaciona la Escuela de Traductores de Toledo?",
          "opciones": ["Alfonso X el Sabio", "Don Pelayo", "Abd al-Rahman III", "Jaime I"],
          "correcta": 0,
          "explicacion": "¡Muy bien! Alfonso X el Sabio impulsó el trabajo de traducción en Toledo."
        },
        {
          "enunciado": "¿De qué lengua proceden el castellano, el catalán y el portugués?",
          "opciones": ["Del latín", "Del griego", "Del árabe únicamente", "Del germánico"],
          "correcta": 0,
          "explicacion": "¡Correcto! El castellano, el catalán y el portugués son lenguas romances derivadas del latín."
        }
      ]
    }
  ]
}

  };
})();
