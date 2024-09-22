module.exports = {
    env: {
        node: true,  // Permite las variables globales de Node.js, incluyendo require
        es2021: true // Permite las características de ECMAScript 2021
    },
    extends: [
        'eslint:recommended',  // Usa las configuraciones recomendadas de ESLint
        'plugin:prettier/recommended'
    ],
    parserOptions: {
        ecmaVersion: 12, // Usa ECMAScript 2021
        sourceType: 'script' // Usa el tipo de fuente "script" en lugar de "module"
    },
    rules: {
        // Tus reglas personalizadas
        'prettier/prettier': 'error',
        'no-console': 'off',  // Permite el uso de console.log
        'no-var': 'error',  // No permite el uso de var, solo let y const
        'prefer-const': 'error',  // Prefiere const si las variables no se reasignan
        'no-unused-vars': ['error', { 'argsIgnorePattern': 'next' }]  // Ignora args no usados que se llamen next (útil para middlewares en Express)
    }
};