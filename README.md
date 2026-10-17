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

## 🚀 Cómo Añadir Nuevos Capítulos de Forma Sencilla y Escalable

Para añadir cualquier nuevo capítulo en el futuro solo hay que hacer **dos cosas**:

1. **Crear la carpeta del capítulo** con su [`contenido.json`](file:///c:/jose_alberto/proyectos/videojuego/data/cursos/) y su imagen `assets/puzzle.jpg`:
   ```text
   data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_XX_nombre/
   ├── contenido.json
   └── assets/
       └── puzzle.jpg
   ```
2. **Añadir la entrada en [`data/catalogo.json`](file:///c:/jose_alberto/proyectos/videojuego/data/catalogo.json)** dentro del tema correspondiente.

¡Y listo! Al hacer doble clic en [`jugar.bat`](file:///c:/jose_alberto/proyectos/videojuego/jugar.bat), el sistema compila y sincroniza automáticamente los datos para que funcionen 100% offline (o con servidor HTTP si se prefiere). También puedes sincronizar manualmente ejecutando [`scripts/actualizar_datos.ps1`](file:///c:/jose_alberto/proyectos/videojuego/scripts/actualizar_datos.ps1).
