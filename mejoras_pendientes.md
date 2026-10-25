# Propuestas de mantenibilidad — PlayStudy

Registro de mejoras pendientes. Las propuestas completadas se eliminan de esta lista en cuanto se hacen; el historial queda en git.

**Ya resueltas** (ya no constan aquí):

- ✅ **P0 — Una sola fuente de verdad**: `src/game_bundle.js` se genera con esbuild desde los módulos de `src/` (`scripts/empaquetar.ps1`); el workflow *Bundle sincronizado* comprueba en cada PR que el bundle subido coincide con los módulos. No hay copias editables a mano.
- ✅ **P1 — Registro de juegos y tipos**: `GAME_REGISTRY` / `TYPE_REGISTRY` en `src/app.js`; añadir un minijuego = crear su módulo + 1 línea de registro + su material en `contenido.json`.
- ✅ **P1 — Tests para la lógica pura**: `tests/` con `node --test` (sin dependencias) cubre `barajarJuegosCircuito`, `montarJuegosDelTema` y `StateManager` (mock de `localStorage` en `tests/helpers.js`). `npm test` en local y workflow *Tests* en cada PR.
- ✅ **P1 — Versionado automático de la caché del SW**: `scripts/versionar.ps1` genera `sw_version.js` con `CACHE_NAME = playstudy-<hash>` (hash del contenido del shell) y la lista de `PRECACHE_URLS` escaneando `css/`, `icons/`, `index.html`, `manifest.json` y el bundle. `sw.js` la carga con `importScripts` y deriva `BASE` de `self.registration.scope`, así que no queda ningún `/playstudy/` escrito a mano. `jugar.bat` lo regenera al arrancar y el workflow *Versionado SW* comprueba en cada PR que el artefacto coincide. Sin tareas manuales: añadir un CSS o un icono mueve la versión solo.
- ✅ **P2 — Pipeline de datos**: `scripts/datos.mjs` valida el catálogo y los capítulos (estructura, imágenes, locuciones, créditos y quizzes) y **solo entonces** regenera `data/catalogo_data.js` (`npm run datos`; `npm run datos:validar` y `npm run datos:check`). `jugar.bat` ejecuta el pipeline antes de abrir y el workflow *Tests* valida el catálogo real y comprueba que el artefacto está sincronizado. Se eliminó el validador de PowerShell: tests y datos comparten Node y un único juego de reglas. `catalogo_data.js` sigue commiteado porque `file://` lo necesita, pero ya no puede desincronizarse ni editarse a mano sin que falle CI.
- ✅ **P2 — Almacenamiento local centralizado**: `src/storage.js` declara todas las claves bajo `playstudy.*` (`progreso`, `sonido`, `teoria.voz_silenciada`, `tutor_ia.v1`, `voces.v1`, `migracion.v1`) y expone helpers tolerantes a fallos (`leerTexto`, `guardarJSON`, `leerBooleano`…). `migrarClavesAntiguas()` se ejecuta al importar el módulo y traslada `aventura_educativa_state_v3`, `sound_enabled`, `playstudy_theory_mute`, `playstudy_ai_tutor_v1` y `playstudy_voice_settings_v1` sin perder progreso ni configuración. `tests/storage.test.js` cubre los helpers y `tests/migracion.test.js` verifica la migración de extremo a extremo. Ya no queda ningún acceso directo a `localStorage` fuera del módulo.

---

## Pendientes

### 🟡 P2 — Hacer explícita la respuesta correcta del quiz

La convención *«la correcta va en `opciones[0]` con `correcta: 0`»* es invisible en el JSON: reordenar un array rompe contenido silenciosamente y el validador solo lo caza después. Propuesta: aceptar también una marca explícita (p. ej. `"correcta": "texto de la opción"`), manteniendo el validador compatible con el formato antiguo. El material nuevo queda autoexplicativo y a prueba de reordenaciones.

### 🟢 P3 — Limpieza y tooling menor

- **`temaActualId` es un campo muerto**: se inicializa en `src/state.js` pero *nadie lo lee*, y además guarda un id de *capítulo* con nombre de *tema*. Eliminar o renombrar según su intención original.
- **`.editorconfig`** (cero dependencias) para fijar indentación/UTF-8/LF; a partir de ahí ESLint+Prettier como dependencias de desarrollo si se adoptan tests.
- **CI**: los workflows *Tests* (tests + `datos:check`), *Bundle sincronizado* y *Versionado SW* cubren ya validación y artefactos en cada PR. Queda ESLint/Prettier si se adoptan.

---

## Roadmap sugerido

1. ~~**P1 tests**~~ ✔ hecho (`tests/` + workflow *Tests*).
2. ~~**P1 versionado del SW**~~ ✔ hecho (`scripts/versionar.ps1` + `sw_version.js` + workflow *Versionado SW*).
3. ~~**P2 pipeline de datos**~~ ✔ hecho (`scripts/datos.mjs` + `npm run datos` / `datos:check`).
4. ~~**P2 storage centralizado**~~ ✔ hecho (`src/storage.js` + migración de claves + tests).
5. **P3** según crezca el equipo/contenido.

Todas las propuestas respetan las restricciones de diseño actuales: sin dependencias en runtime para jugar, soporte `file://` y offline intactos. Node/esbuild son solo herramientas de desarrollo, igual que PowerShell.