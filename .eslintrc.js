module.exports = {
  // Sirve para ser consistente y tener una sintaxis correcta, entre otras cosas quita los ; Ten cuidado si tienes instalado otros formatters como Prettier
  root: true,
  extends: ['standard'],
  globals: {
    IS_DEVELOPMENT: 'readonly'
  },
  parserOptions: {
    ecmasVersion: 2020
  }
}
