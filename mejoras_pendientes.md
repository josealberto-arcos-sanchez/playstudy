# Propuestas de mantenibilidad — PlayStudy

Registro de mejoras pendientes. Las propuestas completadas se eliminan de esta lista en cuanto se hacen; el historial queda en git.

**Ya resueltas** (ya no constan aquí):

- ✅ **P0 — Una sola fuente de verdad**: `src/game_bundle.js` se genera con esbuild desde los módulos de `src/` (`scripts/empaquetar.ps1`); el workflow *Bundle sincronizado* comprueba en cada PR que el bundle subido coincide con los módulos. No hay copias editables a mano.
- ✅ **P1 — Registro de juegos y tipos**: `GAME_REGISTRY` / `TYPE_REGISTRY` en `src/app.js`; añadir un minijuego = crear su módulo + 1 línea de registro + su material en `contenido.json`.
- ✅ **P1 — Tests para la lógica pura**: `tests/` con `node --test` (sin dependencias) cubre `barajarJuegosCircuito`, `montarJuegosDelTema` y `StateManager` (mock de `localStorage` en `tests/helpers.js`). `npm test` en local y workflow *Tests* en cada PR.

---

## Pendientes

### 🟠 P1 — Automatizar el versionado de la caché del SW

`sw.js` depende de dos tareas humanas propensas a error:

1. **`CACHE_NAME = 'playstudy-v20'`**: hay que *acordarse* de subir el número (el README lo advierte). Propuesta: derivar la versión de un hash de los archivos del shell (p. ej. en `scripts/empaquetar.ps1`, que escriba `sw.js` con `playstudy-<hash>`), o en su defecto un `scripts/versionar.ps1`.
2. **`PRECACHE_URLS` manual**: 18 rutas escritas a mano; cada CSS nuevo hay que recordarlo. Se puede generar la lista escaneando `css/`, `src/`, `icons/` en el mismo script.

Detallito adicional: `/playstudy/` está repetido como prefijo literal en cada ruta. Con `const BASE = '/playstudy/'` (o derivándolo de `self.registration.scope`) el SW sobrevive a un cambio de ruta de despliegue.

### 🟡 P2 — Pipeline de datos: validar antes de sincronizar

`actualizar_datos.ps1` y `validar_contenido.ps1` son independientes; nada obliga a pasar el validador, y el generador **incrusta el JSON crudo sin validar** (`window.CATALOGO_DATA = $catalogoRaw`). Propuesta:

- Un solo comando (o que `jugar.bat` lo haga): **validar → si falla, abortar → sincronizar**. Hoy un `contenido.json` inválido se compila sin aviso y revienta en el navegador.
- Considerar mover el validador de PowerShell a JS (misma herramienta que tests y build) para reutilizarlo como test y evitar dos lenguajes de tooling. El contenido actual correría en un test de humo: «todo el catálogo valida».
- `data/catalogo_data.js` (~238 KB) es un artefacto generado **commiteado**: cada PR de contenido arrastra un diff gigante y propenso a conflictos de merge. Alternativas: auto-regenerarlo en un hook pre-commit (nunca editable a mano) o generarlo en CI como artifact del release.

### 🟡 P2 — Centralizar el almacenamiento local

Las claves de `localStorage` están dispersas y con tres convenciones de nombre:

| Clave | Archivo |
|---|---|
| `sound_enabled` | `src/audio.js` |
| `aventura_educativa_state_v3` | `src/state.js` |
| `playstudy_theory_mute` | `src/views/theoryView.js` |
| config del tutor (`CONFIG_KEY`) | `src/aiTutor.js` |
| config de voces (`SETTINGS_KEY`) | `src/speech.js` |

Propuesta: un módulo `src/storage.js` con las claves como constantes namespaced (`playstudy.*`) y una función de migración de las claves antiguas. Beneficios: depurar/borrar el estado del juego de un vistazo, migrar de esquema sin miedo y descubrir qué persiste sin grepear el código.

### 🟡 P2 — Hacer explícita la respuesta correcta del quiz

La convención *«la correcta va en `opciones[0]` con `correcta: 0`»* es invisible en el JSON: reordenar un array rompe contenido silenciosamente y el validador solo lo caza después. Propuesta: aceptar también una marca explícita (p. ej. `"correcta": "texto de la opción"`), manteniendo el validador compatible con el formato antiguo. El material nuevo queda autoexplicativo y a prueba de reordenaciones.

### 🟢 P3 — Limpieza y tooling menor

- **`temaActualId` es un campo muerto**: se inicializa en `src/state.js` pero *nadie lo lee*, y además guarda un id de *capítulo* con nombre de *tema*. Eliminar o renombrar según su intención original.
- **Nombres heredados**: `aventura_educativa_state_v3` y la clave `sound_enabled` conviven con la marca «PlayStudy» (`playstudy_theory_mute`). Con la migración de claves del P2 sería el momento de unificar.
- **`.editorconfig`** (cero dependencias) para fijar indentación/UTF-8/LF; a partir de ahí ESLint+Prettier como dependencias de desarrollo si se adoptan tests.
- **CI**: ya existe el workflow *Bundle sincronizado* (`.github/workflows/empaquetado.yml`). Un workflow que además ejecute validador + tests llevaría el resto de la propuesta a piloto automático.

---

## Roadmap sugerido

1. ~~**P1 tests**~~ ✔ hecho (`tests/` + workflow *Tests*).
2. **P1 versionado del SW** (un cambio pequeño, gran reducción de fricción).
3. **P2 pipeline de datos** (validar→sincronizar en un comando) y **P2 storage** con migración.
4. **P3** según crezca el equipo/contenido.

Todas las propuestas respetan las restricciones de diseño actuales: sin dependencias en runtime para jugar, soporte `file://` y offline intactos. Node/esbuild son solo herramientas de desarrollo, igual que PowerShell.