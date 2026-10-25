// Configuración de ESLint (formato plano). Solo se usa en desarrollo:
// ni el juego ni los tests cargan este archivo, y jugar no necesita Node.
//
// Uso: npm run lint (o `npm run lint -- --fix` para lo que ESLint pueda arreglar).

import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    // Artefactos generados y dependencias: no se revisan a mano.
    ignores: [
      'node_modules/**',
      'tools/**',
      'data/**',
      'src/game_bundle.js',
      'sw_version.js',
    ],
  },
  js.configs.recommended,
  {
    // El código del juego se ejecuta en el navegador.
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: globals.browser,
    },
  },
  {
    // Herramientas de desarrollo y tests: se ejecutan en Node.
    files: ['scripts/**/*.mjs', 'tests/**/*.js', 'eslint.config.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: globals.node,
    },
  },
  {
    files: ['sw.js'],
    languageOptions: {
      ecmaVersion: 2024,
      globals: globals.serviceworker,
    },
  },
  {
    // El proyecto ignora errores de forma deliberada en audio, almacenamiento
    // y red: seguir jugando es preferible a romper la partida. Un catch vacío
    // es intencionado y no debe obligar a inventar un binding ni un log.
    rules: {
      'no-unused-vars': ['error', { caughtErrors: 'none' }],
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },
];
