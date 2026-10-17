# 🏛️ Plataforma Educativa Gamificada
> Videojuego educativo modular en HTML5 para PC, tablets y móviles con organización por Cursos, Asignaturas, Temas y Capítulos.

---

## 🎮 Cómo Jugar en PC o Tablet

* **En tu PC:** Haz doble clic sobre [`jugar.bat`](file:///c:/jose_alberto/proyectos/videojuego/jugar.bat) o directamente en [`index.html`](file:///c:/jose_alberto/proyectos/videojuego/index.html).
* **En Tablet / iPad:** Ábrelo en Safari o Chrome con la tablet en formato apaisado (horizontal).
* **Sin instalación:** Funciona 100% offline sin necesidad de Node, Python ni servidores externos.

---

## 📂 Organización Jerárquica de Materiales

El juego cuenta con un **menú inicial paso a paso** que clasifica el contenido de forma intuitiva:

```text
🎒 Curso: 5º de Primaria
└── 🌍 Asignatura: Ciencias Sociales
    └── 🏰 Tema: Tema 6: Caminando entre castillos
        └── 🏛️ Capítulo: Capítulo 1: Las Edades de la Historia (¡A jugar!)
```

### Estructura de Carpetas del Proyecto:
```text
videojuego/
├── data/
│   ├── catalogo.json             # Catálogo general de Cursos > Asignaturas > Temas > Capítulos
│   └── cursos/
│       └── 5_primaria/
│           └── ciencias_sociales/
│               └── tema_06_castillos/
│                   └── cap_01_edades/
│                       ├── contenido.json    # Casillas, fichas visuales y quizzes
│                       └── assets/           # Imágenes exclusivas de este capítulo (puzzle, fotos...)
│                           └── puzzle.jpg
├── css/                          # Estilos visuales modulares (menu, map, memory, puzzle, theory, quiz)
├── src/                          # Código fuente modular
├── index.html                    # Punto de entrada
└── jugar.bat                     # Acceso directo para Windows
```

---

## 🔄 El Bucle de Juego del Capítulo 1 (6 Paradas en Circuito)

Cada capítulo es un circuito continuo en el que el niño puede avanzar y rejugar paradas para mejorar su récord:

1. **🃏 Casilla 1:** Minijuego de Parejas (14 cartas / 7 parejas históricas).
2. **🦴 Casilla 2:** Micro-Ficha visual de La Prehistoria (tarjetas de Paleolítico, Neolítico, Metales y yacimientos).
3. **❓ Casilla 3:** Quiz de Prehistoria (3 preguntas rápidas).
4. **🧩 Casilla 4:** Puzzle cómico de 6 piezas (soporta imagen personalizada).
5. **📜 Casilla 5:** Micro-Ficha visual de La Historia (Edad Antigua, Media, Moderna y Contemporánea).
6. **🏆 Casilla 6:** Quiz de La Historia (4 preguntas).
7. **👑 Podio Central:** Corona de Oro al conseguir las 18 estrellas totales (**18/18 ⭐**).
